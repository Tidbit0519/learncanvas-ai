import { Int32, Timestamp } from "mongodb";
import mongoose from "mongoose";

const submissionSchema = mongoose.Schema({
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

export default mongoose.model('Submission', submissionSchema);