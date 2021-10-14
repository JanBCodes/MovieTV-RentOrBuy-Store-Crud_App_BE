const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    admin: //TRUE === ADMIN  FALSE === CUSTOMER
    {
        type: Boolean,
        default: false
    },

    firstName:
    {
        type: String,
        required: true
    },

    lastName:
    {
        type: String,
        required: true
    },
    
    email:
    {
        type: String,
        required: true
    },

    password: //Y,M.D
    {
        type: String,
        required: true
    },

    dateCreated:
    {
        type: Date,
        default:Date.now()
    }
    
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
// Map
// Schema