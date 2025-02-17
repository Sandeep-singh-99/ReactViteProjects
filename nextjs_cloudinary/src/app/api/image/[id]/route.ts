import cloudinary from "../../../../../lib/cloudinary";
import ConnectDB from "../../../../../lib/db";
import { UploadImage } from "../../../../../lib/upload-image";
import { Image } from "../../../../../models/image-model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB()
  const id = (await params).id;

  const image = await Image.findById(id);

  return Response.json(image, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await ConnectDB()
  const id = (await params).id;

  const formData = await request.formData();

  try {
    const image = formData.get("image") as File;
    const imageFromDB = await Image.findById(id);
    if (image) {
      // delete the previous one firt
      cloudinary.uploader
        .destroy(imageFromDB.public_id)
        .then((result) => console.log("result: ", result));

      // upload the image
      const uploadResult: any = await UploadImage(image, "image-upload");

      await Image.findByIdAndUpdate(id, {
        image_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    return Response.json(
      { message: "Image updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating", error);
    return Response.json(
      { message: "Error updating image." },
      { status: 400 }
    );
  }
}
