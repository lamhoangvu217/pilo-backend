const checklist = require("../controllers/CheckListController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
router.post("/:cardId", auth, checklist.create);
router.patch("/:cardId/:itemId", auth, checklist.edit);
router.patch("/:cardId/:complete/:itemId", auth, checklist.status);
router.delete("/:cardId/:itemId", auth, checklist.delete);
module.exports = router;
