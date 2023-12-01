const fs = require('fs');
const path = require('path');

const deleteImage = async (images) => {
    try {
        const uploadFolder = path.join(
            __dirname,
            "../",
            process.env.UPLOADS_DIR
        );

        for (const image of images) {
            const imagePath = path.join(uploadFolder, image.images);
            await fs.promises.unlink(imagePath);
        }

        console.log('Imágenes eliminadas correctamente');
    } catch (error) {
        console.error('Error al eliminar imágenes', error);
        throw error;
    }
};

module.exports = deleteImage;
