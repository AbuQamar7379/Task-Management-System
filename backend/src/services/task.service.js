const taskModel = require("../models/task.model");

class TaskService {
    create = async(taskData) => {
        try {
            let task = await taskModel.create(taskData);
            return task;
        } catch (err) {
            throw err;
        }
    };

    allTasksByUserId = async(userId) => {
        try {
            let tasks = await taskModel.find({ userId });
            //if (!tasks.length) {
            //    throw new Error("User doesn't have any task");
            //  }
            return tasks;
        } catch (err) {
            throw err;
        }
    };

    getTaskById = async(userId, taskId) => {
        try {
            let task = await taskModel.findOne({ userId, _id: taskId });
            if (!task) {
                throw new Error("Can't found the task by provided ID");
            }
            return task;
        } catch (err) {
            throw err;
        }
    };

    updateTaskById = async(userId, taskId, updatedData) => {
        try {
            let task = await taskModel.findOneAndUpdate({ userId: userId, _id: taskId }, { $set: updatedData }, { new: true });
            if (!task) {
                throw new Error("Can't found the task by provided ID");
            }
            return task;
        } catch (err) {
            throw err;
        }
    };

    deleteTaskById = async(userId, taskId) => {
        try {
            let task = await taskModel.findOneAndDelete({
                userId: userId,
                _id: taskId,
            });
            if (!task) {
                throw new Error("Can't found the task by provided ID");
            }
            return task;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = TaskService;