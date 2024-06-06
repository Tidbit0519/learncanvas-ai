import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

User.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    } else {
        return next()
    }
});

User.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

export default mongoose.model('User', User);