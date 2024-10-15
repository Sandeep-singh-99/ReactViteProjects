const ImgUploads = require("../models/image-models");

const uploadImage = async (req, res) => {
  try {
    const { path: imageUrl, filename: cloudinaryId } = req.file;

    const image = await ImgUploads.create({ imageUrl, cloudinaryId });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await ImgUploads.find();

    if (image.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found",
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  getImage,
};
