import mongoose, {model, models, Schema} from "mongoose";

interface Todo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
}

const todoSchema = new Schema<Todo>({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
})

const TodoModel = models?.TodoModel || model<Todo>("TodoModel", todoSchema);


export default TodoModel;
