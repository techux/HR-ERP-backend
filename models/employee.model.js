const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
    },
    position: {
        type: String,
        required: true,
        // enum: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
        // default: "Intern"
    },
    joiningDate: {
        type: Date,
        required: true
    },
    attendace: {
        type: String,
        enum: ['Present', 'Absent', 'Medical Leave', 'Work from Home'],
        default: 'Absent'
    },
},
{
    timestamps: true,
    versionKey: false
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;