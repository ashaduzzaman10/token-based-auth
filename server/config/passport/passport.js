require("dotenv").config()
const passport = require("passport");
const userModel = require("../../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.SECRET_KEY;


passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		userModel.findOne({ id: jwt_payload.id }, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);

			}
		});
	})
);