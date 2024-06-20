import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/index.js";
import handleRefreshToken from "../controllers/refreshTokenControllers.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
	if (
		!req.body.firstname ||
		!req.body.lastname ||
		!req.body.email ||
		!req.body.password
	) {
		return res.status(400).send("All fields are required");
	}
	const { firstname, lastname, email, password, role } = req.body;

	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).send("User with this email already exists");
		}

		const newUser = await User.create({
			firstname,
			lastname,
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
	const cookies = req.cookies;

	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).send("Username and password are required.");

	try {
		const foundUser = await User.findOne({ email: email });
		if (!foundUser) {
			return res.status(401).send("Invalid email or password");
		}

		foundUser.comparePassword(req.body.password, async (err, isMatch) => {
			if (isMatch) {
				const tokenObj = {
					id: foundUser._id,
					firstname: foundUser.firstname,
					role: foundUser.role,
				};

				const accessToken = jwt.sign(tokenObj, process.env.JWT_SECRET, {
					expiresIn: "15s",
				});

				const refreshToken = jwt.sign(
					tokenObj,
					process.env.REFRESH_TOKEN_SECRET,
					{
						expiresIn: "1d",
					}
				);

				foundUser.refreshToken = refreshToken;
				await foundUser.save();

				res.cookie("jwt", refreshToken, {
					httpOnly: true,
					sameSite: "None",
					expires: new Date(Date.now() + 86400000),
					secure: true,
					maxAge: 86400000,
				});

				return res.status(200).json({
					token: "Bearer " + accessToken,
				});
			} else {
				return res.status(401).send("Invalid email or password");
			}
		});
	} catch (error) {
		res.status(500).send(error.message);
	}
});

authRouter.post("/refresh", handleRefreshToken);

export default authRouter;
