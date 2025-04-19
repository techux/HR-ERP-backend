const express = require("express");
const upload = require("../middlewares/multer.middleware");

const {
  allLeavesController,
  newLeaveController,
  updateLeaveController,
} = require("../controllers/leave.controller");

const router = express.Router();

router.get("/", allLeavesController);
router.post("/", upload.single("document"), newLeaveController);
router.patch("/:id", updateLeaveController);

module.exports = router;
