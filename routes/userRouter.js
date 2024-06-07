import { Router } from "express";
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

userRouter.get("/", async (req, res) => {
	roleCheck(req, res, next);
	const users = await User.find();
	res.status(200).send(users);
});

userRouter.get("/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404).send("User not found");
	} else if (req.user._id.toString() !== req.params.id) {
		res.status(401).send("Unauthorized access");
	}

	res.status(200).send(user);
});

userRouter.patch("/:id", async (req, res) => {
	if (req.user._id.toString() !== req.params.id) {
		res.status(401).send("Unauthorized access");
	}

	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).send(user);
});

userRouter.delete("/:id", async (req, res) => {
	roleCheck(req, res, next);
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404).send("User not found");
	}

	await user.remove();
	res.status(200).send("User deleted successfully");
});

export default userRouter;
