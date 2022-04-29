const db = require("../models");
const apiResponse = require("../helpers/apiResponse");
const Task = db.task;
const Project = db.project;
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send({ message: "name can not be empty!" });
      return;
    }
    const newTask = new Task({
      name: req.body.name,
      duedate: req.body.duedate,
      description: req.body.description,
      status: req.body.status,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
