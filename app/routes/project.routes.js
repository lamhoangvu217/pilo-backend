const project = require("../controllers/ProjectController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Retrieve all board
router.get("/", auth, project.findAll);

// Create a new Tutorial
router.post("/", auth, project.create);

// Retrieve all published project
router.get("/published", auth, project.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", auth, project.findOne);

// Update a Tutorial with id
router.put("/:id", auth, project.update);

// Delete a Tutorial with id
router.delete("/:id", auth, project.delete);

// Create a new Tutorial
router.delete("/", auth, project.deleteAll);

module.exports = router;
