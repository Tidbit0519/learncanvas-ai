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

const idCheck = (req, res, next) => {
	if (req.user._id.toString() !== req.params.id) {
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
	idCheck(req, res, async () => {
		const user = await User.findByIdAndUpdate(req.params.id);
		res.status(200).send(user);
	});
});

userRouter.patch("/:id", async (req, res) => {
	rolesCheck(req, res, async () => {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send("User not found");
		}

		user.role = roles.ADMIN;

		await user.save();
		res.status(200).send(user);
	});
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
