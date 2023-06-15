
const calculateCompressionQuality = (originalSize, maxSize) => {
    let quality = 1;
    if (originalSize > maxSize) {
        quality = Math.floor((maxSize / originalSize) * 10) / 10;
    }
    return quality;
}

const compressImage = (file, maxSizeInBytes) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          let img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                let compressedFile = null;
                let quality = calculateCompressionQuality(file.size, maxSizeInBytes);
                canvas.toBlob(
                    (blob) => {
                        compressedFile = new File([blob], file.name, { type: file.type });
                        resolve(compressedFile);
                    },
                    file.type,
                    quality
                );
            };
            img.onerror = (error) => {
                reject(error);
            };
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
}

export default compressImage