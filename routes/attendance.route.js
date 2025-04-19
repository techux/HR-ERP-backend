const express = require('express');
const { allAttendanceController, updateAttendanceController } = require('../controllers/attendance.controller');

const router = express.Router();

router.get('/', allAttendanceController);
router.patch('/:id', updateAttendanceController);

module.exports = router;