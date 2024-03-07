const strategy = require("./config/passport");

module.exports = (passport) => {
    passport.use(strategy);
};