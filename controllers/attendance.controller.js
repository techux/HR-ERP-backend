const Employee = require('../models/employee.model');
// const Attendance = require('../models/attendance.model');

const allAttendanceController = async (req, res) => {
    try {
        const attendace = await Employee.find().select('name position department attendace');
        // const attendance = await Attendance.find().populate('employeeId', 'name position department');
        res.status(200).json({
            status: "ok",
            message: "All Attendance fetched successfully",
            data: attendace
        });
    } catch (error) {
        console.error(`Error on allAttendanceController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });
    }
}


const updateAttendanceController = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const attendance = await Employee.findByIdAndUpdate(
            employeeId ,
            { attendace:status },
            { new: true }
        ).select('name position department attendace');        

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.status(200).json({
            status: "ok",
            message: "Attendance updated successfully",
            data: attendance
        });
    } catch (error) {
        console.error(`Error on updateAttendanceController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });
    }
}


module.exports = {
    allAttendanceController,
    updateAttendanceController
}