const db = require("../models");
const apiResponse = require("../helpers/apiResponse");
const User = db.user;

exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
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
