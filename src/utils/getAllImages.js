const fs = require('fs');
const path = require('path');



const getAllImages = (req, res) => {
    const directoryPath = path.join(__dirname, "../", 'Uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error leyendo la carpeta de imágenes:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const images = files.filter(file => imageExtensions.includes(path.extname(file)));
        console.log(images);

        const response = images.map(file => ({
            filename: file,
            id: file.id,
            url: `/images/${file}`,
        }));

        res.json(response);
    });
};

module.exports = getAllImages

