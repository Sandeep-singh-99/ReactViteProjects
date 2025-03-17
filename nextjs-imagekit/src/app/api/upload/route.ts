import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/db";
import { imagekit } from "../../../../lib/imagekit";
import ImageUpload from "../../../../model/image.model";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming FormData request body
    const formData = await req.formData();
    const imageFile = formData.get("image"); // get the file from formData

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "No valid file provided" },
        { status: 400 }
      );
    }

    ConnectDB();

    // Upload to ImageKit
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `image-${Date.now()}.jpg`,
    });

    const imageUrl = uploadResponse.url;

    // Save to MongoDB
    await ImageUpload.create({
      image: imageUrl,
      imagekitFileId: uploadResponse.fileId,
    });

    return NextResponse.json(
      { message: "Image uploaded successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    ConnectDB();

    const images = await ImageUpload.find();

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}
