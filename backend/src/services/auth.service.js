const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
    registerUser = async(body) => {
        try {
            let exixtingUser = await userModel.findOne({ email: body.email });
            if (exixtingUser) {
                throw new Error("User already exist");
            }

            let newUser = new userModel(body);
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(newUser.password, salt);
            newUser.password = hash;
            let saved = await this.saveDoc(newUser);
            return saved;
        } catch (err) {
            throw err;
        }
    };

    loginUser = async(body) => {
        try {
            let { email, password } = body;

            let user = await userModel.findOne({ email });
            if (!user) {
                throw new Error("User not found, Check the email");
            }

            // check password
            let isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error("Invalid Password!");
            }
            let payload = {
                id: user._id,
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET);

            return { token, user };
        } catch (err) {
            throw err;
        }
    };

    saveDoc = async(doc) => {
        return await doc.save();
    };

    secretData = async() => {
        return "You are authorized person you can access all the resources now!";
    };

    findUserById = async(userId) => {
        try {
            let user = await userModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            throw err;
        }
    };
}
module.exports = AuthService;