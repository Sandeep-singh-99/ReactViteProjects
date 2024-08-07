const express = require("express");
const multer = require("multer");
const path = require("path");
const UploadModel = require("./models/file-model");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://localhost:27017/MulterWithMongodb");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to upload file
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename, path, mimetype, size } = req.file;

  const file = await UploadModel.create({
    filename,
    path,
    mimetype,
    size,
  });

  try {
    await file.save();
    res.status(200).json({ message: "File uploaded successfully", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get("/files", async (req, res) => {
//     try {
//       const files = await UploadModel.find();
  
//       if (!files) {
//         return res.status(404).json({ error: "No files found in the database" });
//       }
  
//       fs.readdir('uploads', (err, directoryFiles) => {
//         if (err) {
//           return res.status(500).json({ error: "Unable to read directory" });
//         }
  
//         // Filter for image files
//         const imageFiles = directoryFiles.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
//         const imagePaths = imageFiles.map(file => `/uploads/${file}`);
  
//         res.json(imagePaths);
//       });
  
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


app.get("/files", async (req, res) => {
    try {
      const files = await UploadModel.find();
      if (!files) {
        return res.status(404).json({ error: "No files found in the database" });
      }
      res.json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server  is running http://localhost:${PORT}`);
});
