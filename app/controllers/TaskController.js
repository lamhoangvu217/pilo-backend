const db = require("../models");
const Task = db.task;
const List = db.list;
const User = db.user;
exports.create = async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      duedate: req.body.duedate,
      description: req.body.description,
    });
    const task = await newTask.save();
    const list = await List.findById(req.params["listId"]);

    list.tasks.push(task.id);
    await list.save();
    res.json({ task: task, listId: list.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
exports.findAll = async (req, res) => {
  try {
    const list = await List.findById(req.params["listId"]);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }
    const tasks = [];
    for (const taskId of list.tasks) {
      tasks.push(await Task.findById(taskId));
    }
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
exports.findOne = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
