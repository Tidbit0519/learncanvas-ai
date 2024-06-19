import jwt from "jsonwebtoken";
import { User } from "../model/index.js";

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded.id) {
                return res.sendStatus(403);
            }
            const tokenObj = { id: foundUser._id, firstname: foundUser.firstname, role: foundUser.role };
            const accessToken = jwt.sign(
                tokenObj,
                `${ process.env.ACCESS_TOKEN_SECRET }`,
                { expiresIn: "5m" }
            );
            return res.status(200).json({
                id: foundUser._id,
                token: "Bearer " + accessToken
            });
        }
    );
};

export default handleRefreshToken;
