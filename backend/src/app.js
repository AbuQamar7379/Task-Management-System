const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/auth.routes");
const passport = require("passport");
const configurePassport = require("./configurePassport");
const taskRouter = require("./routes/task.routes");

//configurePassport(passport);

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/task", taskRouter);

module.exports = app;