import ConnectDB from "@/libs/db";
import Topic from "@/models/topicmodel";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, description } = await request.json();
    await ConnectDB();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic created successfully" }, {status: 201});
}

export async function GET() {
    try {
        await ConnectDB();
        const topics = await Topic.find({});
        return NextResponse.json({ topics });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id"); // Retrieve `id` from the URL parameters
        
        if (!id) {
            return NextResponse.json({ message: "Topic ID is required" }, { status: 400 });
        }
        
        await ConnectDB();

        // Check if the topic exists
        const topic = await Topic.findById(id);
        if (!topic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        // Delete the topic
        await Topic.findByIdAndDelete(id);

        return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting topic:", error);
        return NextResponse.json({ message: "Failed to delete topic" }, { status: 500 });
    }
}