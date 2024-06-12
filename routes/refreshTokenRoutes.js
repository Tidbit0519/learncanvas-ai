import { User } from "../model";
import jwt from "jsonwebtoken";

const refreshTokenRouter = Router();

refreshTokenRouter.post("/", async (req, res) => {
    if (!req.cookies.jwt) {
        return res.status(401).send("Unauthorized");
    }
    const refreshToken = req.cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        const userObj = await User.findById(user.id);
        const tokenObj = { id: userObj._id, role: userObj.role };
        const token = jwt.sign(tokenObj, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ token: 'Bearer ' + token });
    });
});

export default refreshTokenRouter;