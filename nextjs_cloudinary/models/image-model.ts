import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
});

export const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);
