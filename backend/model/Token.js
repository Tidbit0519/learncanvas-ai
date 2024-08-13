import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    canvasToken: {
        type: String,
        required: true
    },
    domainUrl: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        expires: 60 * 60 * 24 * 7,
    }
});

tokenSchema.methods.getCanvasToken = function() {
    return this.canvasToken;
};
tokenSchema.methods.getDomainUrl = function() {
    return this.domainUrl;
};

export default mongoose.model('Token', tokenSchema);