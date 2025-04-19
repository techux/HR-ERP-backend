const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    status: {
        type: String,
        // enum: ["New", "Schedulde", "Ongoing", "Selected", "Rejected"]
        // default: "New",
    }
},{
    timestamps: true
})

const Candidate = new mongoose.model("Candidate", candidateSchema)

module.exports = Candidate;