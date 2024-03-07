const router = require("express").Router();
//const passport = require("passport");
const {
    register,
    login,
    afterAuthorization,
} = require("../controllers/auth.controller");
const {
    authenticateUserUsingPassport,
} = require("../middlewares/passportAuth.middleware");
//const authenticateUser = require("../middleware/authenticateToken");
//const authenticateUser = passport.authenticate("jwt", { session: false });

router.post("/register", register);
router.post("/login", login);

// passport Example route
router.get("/authorized", authenticateUserUsingPassport, afterAuthorization);

module.exports = router;