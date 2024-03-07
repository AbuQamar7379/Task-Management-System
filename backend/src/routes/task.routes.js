const router = require("express").Router();
const authenticate = require("../middlewares/authenticateToken.middleware");
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} = require("../controllers/task.controller");

router.post("/new", authenticate, createTask);
router.get("/all", authenticate, getAllTasks);
router.get("/:taskId", authenticate, getTaskById);
router.put("/update/:taskId", authenticate, updateTaskById);
router.delete("/delete/:taskId", authenticate, deleteTaskById);

module.exports = router;