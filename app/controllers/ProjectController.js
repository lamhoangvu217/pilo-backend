const db = require("../models");
const apiResponse = require("../helpers/apiResponse");
const { project } = require("../models");
const Project = db.project;
const User = db.user;
// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  try {
    if (!req.body.name) {
      res.status(400).send({ message: "name can not be empty!" });
      return;
    }
    // Create a project
    const newProject = new Project({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      thumbnail: req.body.thumbnail,
      description: req.body.description,
    });
    const project = await newProject.save();
    const user = await User.findById(req.user.id);
    console.log(user);
    user.projects.unshift(project.id);
    await user.save();
    // Save Tutorial in the database
    await project.save();

    return res.json(project);
    // project.save(project)
    //   .then((data) => {
    //     return apiResponse.successResponseWithData(
    //       res,
    //       "Project created successfully !.",
    //       data
    //     );
    //   })
    //   .catch((err) => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the board.",
    //     });
    //   });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  // const title = req.query.title;
  // var condition = title
  //   ? { tile: { $regex: new RegExp(title), $options: "i" } }
  //   : {};
  // console.log(title, condition);
  const user = await User.findById(req.user.id);
  const projects = [];
  console.log(user);
  for (const projectId of user.projects) {
    projects.push(await Project.findById(projectId));
  }
  // Project
  //   .save(projects)
  //   .then((data) => {
  //     return apiResponse.successResponseWithData(res, "List projects", data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while retrieving boards.",
  //     });
  //   });
  return res.json(projects);
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Project.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
