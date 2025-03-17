"use client";


import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [upload, setUpload] = useState<File | null>(null); // Store file in state
  const [allImages, setAllImages] = useState<string[]>([]); // Store all image URLs

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setUpload(file); // Store the file
    }
  };

  const fetchAllImages = async () => {
    try {
      const response = await fetch("/api/upload");
      const data = await response.json();
      setAllImages(data.images.map((image: { image: string }) => image.image)); // Extract image URLs
    } catch (error) {
      toast.error("Failed to fetch images");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upload) {
      toast.error("Please select an image to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", upload); // Append the file to the FormData

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // Send as FormData
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchAllImages(); // Refresh images after successful upload
        setUpload(null); // Reset the file
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <h1>All Images</h1>
      <button onClick={fetchAllImages}>Fetch All Images</button>
      <div>
        {allImages.length === 0 ? (
          <p>No images found.</p>
        ) : (
          allImages.map((image, index) => (
            <img key={index} src={image} alt={`image-${index}`} width={300} />
          ))
        )}
      </div>
    </div>
  );
}
