import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    domainUrl: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 60 * 60 * 24 * 7
    }
});

export default mongoose.model('Token', tokenSchema);