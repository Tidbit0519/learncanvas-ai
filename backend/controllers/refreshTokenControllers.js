import jwt from "jsonwebtoken";
import { User } from "../model/index.js";

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401);
	}
	const refreshToken = cookies.jwt;
	const userId = jwt.decode(refreshToken).id;

	const foundUser = await User.findOne({ _id: userId });
	if (!foundUser) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser._id.toString() !== decoded.id) {
			console.log(err);
			return res.sendStatus(403);
		}
		const tokenObj = {
			id: foundUser._id,
			firstname: foundUser.firstname,
			role: foundUser.role,
			tokenId: foundUser.tokenId,
		};

		const accessToken = jwt.sign(tokenObj, process.env.JWT_SECRET, {
			expiresIn: process.env.NODE_ENV === "development" ? "1d" : "15m",
		});

		return res.status(200).json({
			token: "Bearer " + accessToken,
		});
	});
};

export default handleRefreshToken;
