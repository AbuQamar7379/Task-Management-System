const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    let { authorization } = req.headers;
    let token = authorization && authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden" });
        }
        // if (req.params.userId !== user.id) {
        //return res.status(404).send({
        //message: "User not found with the userId and token you provided",
        //});
        //}
        req.user = user;
        next();
    });
};

module.exports = authenticateUser;