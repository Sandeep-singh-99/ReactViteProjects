import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  gallery: {
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    margin: "10px",
    maxWidth: "200px",
    maxHeight: "200px",
  },
};

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
        setImages(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      <div className="App">
        <h1>Upload Image</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Submit</button>
      </div>

      <div>
        <h2>Image Gallery</h2>
        <div style={styles.gallery}>
          {images.map((file) => (
            <>
              <h1>{file.size}</h1>
              <img
                key={file._id}
                src={`http://localhost:5000/uploads/${file.filename}`}
                alt={file.filename}
                style={styles.image}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
