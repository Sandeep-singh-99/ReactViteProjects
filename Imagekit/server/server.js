require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Image = require('./model/image-model');
const multer = require('multer');
const cors = require('cors');
const ImageKit = require('imagekit');
const imageModel = require('./model/image-model');


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT

mongoose.connect('mongodb://localhost:27017/imagekit')

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

const storage = multer.memoryStorage(); // Store images in memory for upload
const upload = multer({ storage: storage });

// Upload image route
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload image to ImageKit
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer, // File buffer
            fileName: req.file.originalname, // File name
            useUniqueFileName: true, // Automatically generate a unique file name
        });

        // Create a new image record in MongoDB
        const newImage = new imageModel({
            imageUrl: uploadResponse.url,
            thumbnailUrl: uploadResponse.thumbnailUrl,
            imageName: req.file.originalname,
            imagekitFileId: uploadResponse.fileId 
        });

        await newImage.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            image: newImage,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all uploaded images
app.get('/images', async (req, res) => {
    try {
        const images = await imageModel.find();
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete image route
app.delete('/images/:id', async (req, res) => {
    try {
        const imageId = req.params.id;

        // Find the image from the database
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete the image from ImageKit
        await imagekit.deleteFile(image.imagekitFileId); // ImageKit delete using fileId

        // Delete the image record from MongoDB
        await Image.findByIdAndDelete(imageId);

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

