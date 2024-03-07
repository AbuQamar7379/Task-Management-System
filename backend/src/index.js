require("dotenv")
    .config /*{ path: "src/.env" }*/ ();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGODB_URI;
const app = require("./app.js");

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Mongo DB connected");
        app.listen(PORT, () => {
            console.log("Server running at " + PORT);
        });
    })
    .catch((err) => {
        console.log("Failed to connect DB", err);
    });