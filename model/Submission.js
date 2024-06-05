import mongoose from "mongoose";

const Submission = mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    content_summary: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Submission', Submission);