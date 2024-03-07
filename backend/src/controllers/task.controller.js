const TaskService = require("../services/task.service");
const TaskServiceInstance = new TaskService();

const createTask = async(req, res) => {
    try {
        const { title, description, isCompletedTask, priority } = req.body;
        const userId = req.user.id;
        let task = await TaskServiceInstance.create({
            title,
            description,
            isCompletedTask,
            priority,
            userId,
        });
        return res.status(201).send({ task });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const getAllTasks = async(req, res) => {
    try {
        let tasks = await TaskServiceInstance.allTasksByUserId(req.user.id);
        return res.status(200).send(tasks);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const getTaskById = async(req, res) => {
    try {
        let { taskId } = req.params;
        let userId = req.user.id;
        let task = await TaskServiceInstance.getTaskById(userId, taskId);
        return res.status(200).send(task);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const updateTaskById = async(req, res) => {
    try {
        let { taskId } = req.params;
        let userId = req.user.id;
        let task = await TaskServiceInstance.updateTaskById(
            userId,
            taskId,
            req.body
        );
        return res.status(201).send(task);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const deleteTaskById = async(req, res) => {
    try {
        let { taskId } = req.params;
        let userId = req.user.id;
        let task = await TaskServiceInstance.deleteTaskById(userId, taskId);
        return res.status(204).send({ task, message: "Deleted Successfully" });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
};