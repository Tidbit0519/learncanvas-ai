import mongoose from "mongoose";
import bcrypt from "bcrypt";

const User = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Invalid email address",
			],
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		submissions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Submission",
			},
		],
		tokenId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Token",
		},
		lastActive: {
			type: Date,
			default: Date.now,
		},
		canLogin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

User.pre("save", async function (next) {
	if (this.isModified("password") || this.isNew) {
		const hash = await bcrypt.hash(this.password, 10);
		this.password = hash;
		next();
	} else {
		return next();
	}
});

User.methods.canLoginCheck = function () {
	return this.canLogin;
};

User.methods.comparePassword = function (password) {
	bcrypt.compare(password, this.password, async (err, isMatch) => {
		const hash = await bcrypt.hash(password, 10)
		console.log(hash)
		console.log(this.password)
		if (err) {
			return err;
		}
		return isMatch;
	});
};

User.methods.isAdmin = function () {
	return this.role === "admin";
};

User.methods.idCheck = function (req) {
	return this._id.toString() === req.params.id.toString();
};

export default mongoose.model("User", User);
