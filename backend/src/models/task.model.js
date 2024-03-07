const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        //required: true,
        enum: ["Low", "Medium", "High"],
        default: "Low",
    },
    isCompletedTask: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, { timestamps: true });

const taskModel = mongoose.model("task", taskSchema);

module.exports = taskModel;