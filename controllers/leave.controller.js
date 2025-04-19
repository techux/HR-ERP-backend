const Leave = require('../models/leave.model');
const Employee = require('../models/employee.model');
const cloudinary = require("../utils/cloudinary")


const allLeavesController = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId', 'name');

        res.status(200).json({
            status: "ok",
            message: 'All leaves fetched successfully',
            data: leaves
        });
    } catch (error) {
        console.error(`Error on allLeavesController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });

    }
}

const newLeaveController = async (req, res) => {
    try {
        const { employeeId, designation, date, reason } = req.body;
        const leaveDocument = req.file;

        const uploadLeaveDocument = await cloudinary.uploader.upload(leaveDocument.path, {
            resource_type: 'raw', 
            public_id: `leaveDocument/${Date.now()}`,
            folder: 'leaveDocument'
        });

        const leaveDocumentUrl = uploadLeaveDocument.secure_url;

        const leave = await Leave.create({
            employeeId,
            designation,
            date,
            document: leaveDocumentUrl,
            reason
        });
        
        res.status(201).json({
            status: "ok",
            message: 'Leave created successfully',
            data: leave
        });

    } catch (error) {
        console.error(`Error on newLeaveController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });

    }
}


const updateLeaveController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Approve', 'Reject'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid status value. Allowed are 'Pending', 'Approve', or 'Reject'."
            });
        }

        const leave = await Leave.findByIdAndUpdate(id, {status}, { new: true });

        if (!leave) {
            return res.status(404).json({
                status: "error",
                message: "Leave not found"
            });
        }
        res.status(200).json({
            status: "ok",
            message: 'Leave updated successfully',
            data: leave
        });
    } catch (error) {
        console.error(`Error on updateLeaveController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    allLeavesController,
    newLeaveController,
    updateLeaveController
}