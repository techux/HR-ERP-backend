const express = require("express");

const {
  allEmployeeController,
  addEmployeeController,
  removeEmployeeController,
  updateEmployeeController
} = require("../controllers/employee.controller");


const router = express.Router();

router.get("/", allEmployeeController);
router.post("/", addEmployeeController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", removeEmployeeController);


module.exports = router;