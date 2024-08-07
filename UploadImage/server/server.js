const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require('fs')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

// set up storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({filePath: `/uploads/${req.file.filename}`})
  // res.json({ message: "File uploaded successfully"});
}


app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).json({error: "Unable to read directory"})
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    const imagePaths = imageFiles.map(file => `/uploads/${file}`);

    res.json(imagePaths)
  })
})

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
