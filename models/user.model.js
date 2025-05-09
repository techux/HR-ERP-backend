const { validate } = require('email-validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: e => validate(e),
            message: props => `${props.value} is not a valid email!`
        }        
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['librarian', 'member'],
        default: 'member'
    }
},
{
    timestamps: true,
    versionKey: false
})


const User = mongoose.model("user", userSchema);

module.exports = User;