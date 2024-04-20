const Schema = require('mongoose').Schema;

// Must this be in order? When you add things?
module.exports = new Schema({
    FirstName: {
        type:String,
        required: true,
    },
    LastName: {
        type:String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
}, { collection : 'allUsers'});