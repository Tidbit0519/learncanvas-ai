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
	if (req.user._id.toString() !== req.params.id || req.user.role !== roles.ADMIN) {
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
		res.status(200).send(user);
	});
});

userRouter.patch("/:id", async (req, res) => {
	idCheck(req, res, async () => {
		const { email, password, newPassword, role } = req.body;
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("User not found");
		}

		if (password) {
			user.comparePassword(password, (err, isMatch) => {
				if (isMatch) {
					user.email = email || user.email;
					user.password = newPassword || user.password;
					roleCheck(req, res, () => {
						user.role = role || user.role;
					});
				} else {
					res.status(403).send("Invalid password");
				}
			});
		} else {
			res.status(400).send("Please provide a password");
		}
	});

	const updatedUser = await user.save();
	res.status(200).send(updatedUser);
});

userRouter.delete("/:id", async (req, res) => {
	roleCheck(req, res, async () => {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("User not found");
		}

		await user.remove();
		res.status(200).send("User deleted successfully");
	});
});

export default userRouter;
