const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining structure for the Schema
const registerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


//Creating Model for the Schema
const Register = mongoose.model('Register', registerSchema);

module.exports = Register; 
