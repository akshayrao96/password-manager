// This is so that we can USE the schema
// const mongoose = require('mongoose');

const model = require('mongoose').model;

const PasswordSchema = require('./passwordManager.schema.cjs');

// Now we can go ahead and create the model to use the Schema

const PasswordModel = model('Password', PasswordSchema);

// Now we need to create a couple of APIs so that it can interact with the DB

function insertPassword(passwordId) {
    return PasswordModel.create(passwordId);

}


function getAllPassword() {
    return PasswordModel.find().exec();
}

function getPasswordsByOwner(owner) {
    return PasswordModel.find({
        // want to pass in an object
        owner: owner, 
    }).exect();
}

module.exports = {
    insertPassword,
    getAllPassword,
    getPasswordsByOwner
}
