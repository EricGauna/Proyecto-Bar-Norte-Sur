const fs = require("fs").promises;
const sharp = require("sharp");
const path = require("path");
const uuid = require("uuid");

const uploadsPath = path.join(
  __dirname,
  "../",
  process.env.UPLOADS_DIR
);

const addImage = async (imageBuffer) => {
  await fs.mkdir(uploadsPath, {
    recursive: true,
  });

  const image = sharp(imageBuffer);

  const imageMetadata = await image.metadata();

  if (imageMetadata.width > 1500) {
    image.resize(1500);
  }

  const imageName = `${uuid.v4()}.${
    imageMetadata.format
  }`;

  const imagePath = path.join(
    uploadsPath,
    imageName
  );

  await image.toFile(imagePath);

  return imageName;
};

module.exports = addImage;
