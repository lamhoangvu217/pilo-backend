const task = require("../controllers/TaskController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/listCards/:listId", auth, task.findAll);
router.post("/:listId", auth, task.create);
router.get("/:id", auth, task.findOne);

module.exports = router;
