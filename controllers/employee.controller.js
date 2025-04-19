const Employee = require('../models/employee.model');


const allEmployeeController = async (req, res) => {
    try {
        const employees = await Employee.find().select("-attendace");
        return res.status(200).json({
            status: "ok",
            message: "All Employees fetched successfully",
            data: employees
         });
    } catch (error) {
        console.error(`Error in allEmployeeController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


const addEmployeeController = async (req, res) => {
    try {
        const { name, email, phone, department, position, joiningDate } = req.body;

        if (!name || !email || !phone || !department || !position || !joiningDate) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }
        const isEmailExist = await Employee.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({
                status: "error",
                message: "Email already exists"
            });
        }

        const employee = await Employee.create({ name, email, phone, department, position, joiningDate }).select("-attendace");
        return res.status(201).json({
            status: "ok",
            message: "Employee created successfully",
            data: employee
         });
    } catch (error) {
        console.error(`Error in addEmployeeController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


const removeEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id).select("-__v -attendace -createdAt -updatedAt -status");
        if (!employee) {
            return res.status(404).json({
                status: "error",
                message: "Employee not found"
            });
        }
        return res.status(200).json({
            status: "ok",
            message: "Employee deleted successfully",
            data: employee
         });
    } catch (error) {
        console.error(`Error in removeEmployeeController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


const updateEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, department, position, joiningDate } = req.body;

        if (!name || !email || !phone || !department || !position || !joiningDate) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }
        
        const allowedPositions = ["Intern", "Full Time", "Junior", "Senior", "Team Lead"];
        if (!allowedPositions.includes(position)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid position value"
            });
        }

        const employee = await Employee.findByIdAndUpdate(
            id, 
            { name, email, phone, department, position, joiningDate }
            , { new: true }
        ).select("-attendace");

        if (!employee) {
            return res.status(404).json({
                status: "error",
                message: "Employee not found"
            });
        }
        return res.status(200).json({
            status: "ok",
            message: "Employee updated successfully",
            data: employee
         });
    } catch (error) {
        console.error(`Error in updateEmployeeController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


module.exports = {
    allEmployeeController,
    addEmployeeController,
    removeEmployeeController,
    updateEmployeeController
}