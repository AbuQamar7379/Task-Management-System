const { Strategy, ExtractJwt } = require("passport-jwt");
const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtVerify = async(payload, done) => {
    try {
        let user = await AuthServiceInstance.findUserById(payload.id);
        if (!user) {
            done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
};

const jwtStrategy = new Strategy(options, jwtVerify);

module.exports = { jwtStrategy };

/*
let strategy = new Strategy(options, async(payload, done) => {
    try {
        let user = await AuthServiceInstance.findUserById(payload.id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
*/