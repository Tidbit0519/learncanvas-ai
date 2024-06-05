import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
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
    },
    refreshToken: [String]
}, {
    timestamps: true
});