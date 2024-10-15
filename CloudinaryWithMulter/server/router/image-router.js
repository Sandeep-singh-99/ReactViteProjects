const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const { uploadImage, getImage } = require('../controller/image-controller');
const router = express.Router();

router.route("/upload").post(upload.single('image'), uploadImage);

router.get('/images', getImage);

module.exports = router