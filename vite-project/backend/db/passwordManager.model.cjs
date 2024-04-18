// This is so that we can USE the schema
// const mongoose = require('mongoose');
// You can search up MONGOOSE documentation to understand how to use this
// This is basically the API page, you need another API page to talk to MongoDB

const model = require('mongoose').model;

const PasswordSchema = require('./passwordManager.schema.cjs');

// Now we can go ahead and create the model to use the Schema
// 'Password' that would not be used in this case, is just a req to create the Model
const PasswordModel = model('Password', PasswordSchema);

// Now we need to create a couple of APIs so that it can interact with the DB

function insertPassword(passwordId) {
    return PasswordModel.create(passwordId);
}


function getAllPassword() {
    return PasswordModel.find().exec();
}

function getPasswordById(id) {
    return PasswordModel.findById(id).exec();
}

function deletePassword(id) {
    return PasswordModel.deleteOne({_id: id})
}

function updatePassword(id, passwordInfo) {
    return PasswordModel.findOneAndUpdate({_id: id}, passwordInfo)
}

function getPasswordByOwner(owner) {
    return PasswordModel.find({
        owner: owner,
    }).exec();
}
// function getPasswordsByOwner(owner) {
//     return PasswordModel.find({
//         // want to pass in an object
//         owner: owner, 
//     }).exect();
// }

module.exports = {
    getPasswordById,
    deletePassword,
    updatePassword,
    insertPassword,
    getAllPassword,
    getPasswordByOwner,
    // getPasswordsByOwner
}
