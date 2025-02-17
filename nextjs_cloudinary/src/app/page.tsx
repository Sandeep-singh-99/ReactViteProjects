"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File>();
  const router = useRouter();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/get-image", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok.");
        }

        return response.json();
      })
      .then((data) => setImages(data));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    fetch("http://localhost:3000/api/upload-image", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok.");
      }
      return response.json();
    });

    alert("Image uploaded successfully.");
    router.push("/");
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

        <div className="grid grid-cols-4">
          {images.map((image: any, index) => (
            <Link key={index} href={`/update-image/${image._id}`}>
              <img src={image.image_url} className="w-72 h-72 object-cover object-center" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
