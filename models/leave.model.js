const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approve', 'Reject'],
        default: 'Pending'
    }
},{
    timestamps: true
})

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;