import React, { useState, useEffect } from "react";

function App() {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.blob()) // Convert response to Blob
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      })
      .catch((error) => console.error("Error loading video:", error));
  }, []);

  return (
    <>
      <h1>Video</h1>
      {videoSrc && <video width={550} controls src={videoSrc}></video>}
    </>
  );
}

export default App;
