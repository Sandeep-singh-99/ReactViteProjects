import { model, models, Schema } from "mongoose";

const imageSchema = new Schema({
    image: {
        type: String,
        required: true
    },

    imagekitFileId: {
        type: String,
    }
}, {timestamps: true});

const ImageUpload = models?.ImageUpload || model("ImageUpload", imageSchema);

export default ImageUpload;