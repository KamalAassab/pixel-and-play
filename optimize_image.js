const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'BG-pattern.png');
const outputPath = path.join(__dirname, 'public', 'BG-pattern-optimized.webp');

sharp(inputPath)
    .resize(1920) // Resize to reasonable HD width
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(info => {
        console.log('Image optimized:', info);
    })
    .catch(err => {
        console.error('Error optimizing image:', err);
    });
