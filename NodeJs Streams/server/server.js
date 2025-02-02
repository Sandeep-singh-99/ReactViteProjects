const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/videos", (req, res) => {
  const filePath = path.join(__dirname, "public", "video1.mkv");

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error("File not found:", err);
      return res.status(404).send("Video not found");
    }

    const { range } = req.headers;
    const fileSize = stats.size;

    if (range) {
      // Parse range header (e.g., "bytes=1000-")
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      // Create a readable stream for the requested chunk
      const fileStream = fs.createReadStream(filePath, { start, end });

      // Send Partial Content response with required headers
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4", // Change to video/mkv if needed
      });

      fileStream.pipe(res);
    } else {
      // Send full video (not recommended for large files)
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(filePath).pipe(res);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
