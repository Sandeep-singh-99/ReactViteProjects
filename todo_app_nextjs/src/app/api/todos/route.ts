import TodoModel from "../../../../models/todo-mode";
import {NextRequest, NextResponse} from "next/server";
import {ConnectDB} from "../../../../lib/db";

export async function GET() {
    await ConnectDB()
    const todos = await TodoModel.find()
    return NextResponse.json(todos)
}

export async function POST(req: NextRequest) {
    await ConnectDB()
    const { title, description } = await req.json()

    const todo = await TodoModel.create({ title, description })

    return NextResponse.json(todo)
}
