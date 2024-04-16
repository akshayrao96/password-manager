// this isn't a requirement for mongo but it makes accessing the data
// a lot easier
// This is just creating a schema

const Schema = require('mongoose').Schema;

exports.PasswordSchema = new Schema({
    URL: {
        type: String,
        required: true,
    },
    Password: String,
    // owner:String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
}, { collection : 'allPasswords1'});