const AuthService = require("../services/auth.service");
const AuthServiceInsatance = new AuthService();

const register = async(req, res) => {
    try {
        let body = req.body;
        let user = await AuthServiceInsatance.registerUser(body);
        return res.status(201).send({
            userId: user._id,
            message: "User registered successfully",
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const login = async(req, res) => {
    try {
        let body = req.body;
        let { token, userId } = await AuthServiceInsatance.loginUser(body);
        return res
            .status(200)
            .send({ message: "user logged in successfully", userId, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const afterAuthorization = async(req, res) => {
    try {
        let SECRET_DATA = await AuthServiceInsatance.secretData();
        return res.status(200).send({ SECRET_DATA, userId: req.user });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = { register, login, afterAuthorization };