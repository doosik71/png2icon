const pngToIco = require('png-to-ico');

const imageLoader = document.getElementById('imageLoader');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');

convertBtn.addEventListener('click', () => {
    const file = imageLoader.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const buffer = Buffer.from(event.target.result);
        pngToIco(buffer)
            .then(buf => {
                const blob = new Blob([buf], { type: 'image/x-icon' });
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = 'favicon.ico';
                downloadLink.style.display = 'block';
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred during conversion.');
            });
    };
    reader.readAsArrayBuffer(file);
});