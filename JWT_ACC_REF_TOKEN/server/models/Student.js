import { model, Schema } from "mongoose";

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const StudentModel = model('student', StudentSchema)

export default StudentModel;