import {ConnectDB} from "../../../../../lib/db";
import {NextRequest, NextResponse} from "next/server";
import TodoModel from "../../../../../models/todo-mode";


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await ConnectDB()
    const { id } = params

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
        return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Todo deleted successfully" });
}


