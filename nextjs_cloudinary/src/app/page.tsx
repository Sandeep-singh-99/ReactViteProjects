"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File>();
  const [images, setImages] = useState([]);
  const router = useRouter();

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-image");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Handle file input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image function
  const onSubmit = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("Image uploaded successfully.");
      fetchImages(); // Refresh images after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Delete image function
  const deleteImage = async (imageId: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/delete-image", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Image deleted successfully.");
        fetchImages(); // Refresh images after deletion
      } else {
        alert(data.message || "Error deleting image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-10">
      <div className="w-full">
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 bg-black text-white p-2 font-semibold rounded-md hover:bg-gray-600 text-sm"
      >
        Upload Image
      </button>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold">All Images</h1>

        <div className="grid grid-cols-4 gap-4">
          {images.map((image: any) => (
            <div key={image._id} className="relative">
              <Link href={`/update-image/${image._id}`}>
                <img
                  src={image.image_url}
                  alt="Uploaded Image"
                  className="w-72 h-72 object-cover object-center rounded-lg"
                />
              </Link>
              <button
                onClick={() => deleteImage(image._id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
