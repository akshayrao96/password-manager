const model = require('mongoose').model;

const UserSchema = require('./user.schema.cjs');

// Now we can go ahead and create the model to use the Schema
// 'Password' that would not be used in this case, is just a req to create the Model
const UserModel = model('User', UserSchema);

// Now we need to create a couple of APIs so that it can interact with the DB

function insertUser(user) {
    return UserModel.create(user);
}


function getUserByUsername(username) {
    return UserModel.findOne({Username: username}).exec();
}

module.exports = {
    insertUser,
    getUserByUsername,
}