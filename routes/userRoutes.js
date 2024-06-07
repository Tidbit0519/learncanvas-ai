import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import passportConfig from "../config/passportConfig.js";
import roles from "../config/roles.js";
import { User } from "../model/index.js";

passportConfig(passport);

const userRouter = Router();
const roleCheck = (req, res, next) => {
	if (req.user.role !== roles.ADMIN) {
		return res.status(401).send("Unauthorized access");
	}
	next();
};

const idCheck = (req, res, next) => {
	if (
		req.user._id.toString() !== req.params.id &&
		req.user.role !== roles.ADMIN
	) {
		console.log(req.user._id.toString());
		console.log(req.params.id);
		return res.status(401).send("Unauthorized access");
	}
	next();
};

userRouter.get("/", async (req, res) => {
	roleCheck(req, res, async () => {
		const users = await User.find();
		res.status(200).send(users);
	});
});

userRouter.get("/:id", async (req, res) => {
	idCheck(req, res, async () => {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("User not found");
		}

		res.status(200).send(user);
	});
});

userRouter.patch("/:id", async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.query;
		const { email, role } = req.body;
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).send("User not found");
		}

		// For Admins
		if (req.user.role === roles.ADMIN) {
			user.email = email || user.email;
			user.role = role || user.role;
			if (newPassword) {
				user.password = newPassword;
			}
			await user.save();
			return res.status(200).send(user);
		}

		// For Users
		if (!oldPassword || !newPassword) {
			return res
				.status(403)
				.send("Please provide both old and new passwords");
		}

		user.comparePassword(oldPassword, async (err, isMatch) => {
			if (isMatch) {
				user.email = email || user.email;
				user.password = newPassword, 10;
				await user.save();
				return res.status(200).send(user);
			} else {
				return res.status(403).send("Invalid password");
			}
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).send("Internal server error");
	}
});

userRouter.delete("/:id", async (req, res) => {
	roleCheck(req, res, async () => {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("User not found");
		}

		await User.findByIdAndDelete(req.params.id);
		res.status(200).send("User deleted successfully");
	});
});

export default userRouter;
