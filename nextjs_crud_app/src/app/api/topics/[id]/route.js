import ConnectDB from "@/libs/db";
import Topic from "@/models/topicmodel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { title, description } = await request.json();

        await ConnectDB();

        // Check if the topic exists
        const topic = await Topic.findById(id);
        if (!topic) {
            return NextResponse.json({ message: "Topic not found" }, { status: 404 });
        }

        // Update the topic
        await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

        return NextResponse.json({ message: "Topic updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating topic:", error);
        return NextResponse.json({ message: "Failed to update topic" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    const { id } = params;
    await ConnectDB();
    const topic = await Topic.findById(id);
    return NextResponse.json({ topic }, { status: 200 });
}