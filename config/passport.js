import User from "../model/User";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const secret = process.env.JWT_SECRET;

const passport = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: secret,
	};

	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				const user = await User.findById(jwt_payload.id);
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (err) {
				return done(err, false);
			}
		})
	);
};
