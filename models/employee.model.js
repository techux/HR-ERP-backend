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
        required: true
    },
    position: {
        type: String,
        required: true,
        enum: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
        default: "Intern"
    },
    joiningDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;