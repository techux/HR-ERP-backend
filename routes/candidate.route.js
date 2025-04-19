const express = require("express");

const router = express.Router();

const {
  allCandidateController,
  newCandidateController,
  removeCandidateController,
  updateCandidateStatusController,
} = require("../controllers/candidate.controller");

const { auth } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.get("/", allCandidateController);
router.post("/", upload.single("resume"), newCandidateController);
router.patch("/:id", updateCandidateStatusController);
router.delete("/:id", removeCandidateController);

module.exports = router;
