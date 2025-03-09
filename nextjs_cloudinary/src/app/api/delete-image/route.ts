import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "../../../../lib/db";
import { Image } from "../../../../models/image-model";
import { DeleteImage } from "../../../../lib/delete-image";

export async function DELETE(request: NextRequest) {
  await ConnectDB();

  try {
    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json({ message: "Missing imageId" }, { status: 400 });
    }

    // Find the image in the database
    const image = await Image.findById(imageId);
    if (!image) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    const deleteResult: any = await DeleteImage(image.public_id);

    if (deleteResult.result !== "ok") {
      return NextResponse.json({ message: "Failed to delete image from Cloudinary." }, { status: 400 });
    }

    // Remove image from MongoDB
    await Image.findByIdAndDelete(imageId);

    return NextResponse.json({ message: "Image deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ message: "Error deleting image." }, { status: 500 });
  }
}
