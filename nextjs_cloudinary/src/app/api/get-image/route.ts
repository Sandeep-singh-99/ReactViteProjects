import { NextResponse } from "next/server";
import ConnectDB from "../../../../lib/db";
import { Image } from "../../../../models/image-model";

export async function GET() {
    await ConnectDB();

    const images = await Image.find();

    return NextResponse.json(images, { status: 200 });
}