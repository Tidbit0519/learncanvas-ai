import User from "../model/User.js";
import dotenv from "dotenv";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

dotenv.config();

const passportConfig = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	};

	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				console.log(jwt_payload);
				const user = await User.findById(jwt_payload.id);
				if (user) {
					return done(null, user);
				}
				return done(null, false);
			} catch (error) {
				console.error(error);
				return done(error, false);
			}
		})
	);
};

export default passportConfig;
