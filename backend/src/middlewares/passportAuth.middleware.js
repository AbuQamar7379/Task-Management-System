const passport = require("passport");

const verifyCallBack = (req, resolve, reject) => (err, user, info) => {
    if (err || info || !user) {
        return reject(new Error("Unauthorized user"));
    }
    req.user = user;
    resolve();
};

const authenticateUserUsingPassport = async(req, res, next) => {
    return new Promise((resolve, reject) => {
            passport.authenticate(
                "jwt", { session: false },
                verifyCallBack(req, resolve, reject)
            )(req, res, next);
        })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = { authenticateUserUsingPassport };