import { Router } from "express";
import passport from "passport";
import passportConfig from "../config/passportConfig.js";
import jwt from "jsonwebtoken";
import { User } from "../model/index.js";

passportConfig(passport);

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send("All fields are required");
	}
	const { email, password, role } = req.body;

	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).send("User with this email already exists");
		}

		const newUser = await User.create({
			email,
			password,
			role: "user",
		});
		res.status(200).json({
			message: "User created successfully",
			newUser,
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

authRouter.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(404).send("User not found");
		} else {
			user.comparePassword(req.body.password, (err, isMatch) => {
				if (isMatch) {
					const tokenObj = { id: user._id, roles: user.role };
					const token = jwt.sign(tokenObj, process.env.JWT_SECRET, {
						expiresIn: "1d",
					});
					return res.status(200).json({ token: 'Bearer ' + token });
				} else {
					return res.status(401).send("Invalid email or password");
				}
			});
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default authRouter;