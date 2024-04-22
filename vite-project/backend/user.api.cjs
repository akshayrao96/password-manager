
const express = require('express');
const router = express.Router();

const userModel = require('./db/user.model.cjs')

// localhost:8000/users/?startOfUsername=h
router.post('/register', async function(request, response) {
    const requestBody = request.body

    const firstName = requestBody.FirstName
    const lastName = requestBody.LastName
    const username = requestBody.Username
    const password = requestBody.Password

    const newUser = {
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: password
    }

    try {
        if (!firstName ||!lastName ||!username ||!password) {
            response.status(400);
            return response.send("Please make sure that you have input a Name, Last Name, Username and Password.")
        }

        const userAlreadyExists = await userModel.getUserByUsername(username);
        if (userAlreadyExists) {
            response.status(400);
            return response.send("This user already exists, please choose a different username.")
        }
        
        const createUserResponse = await userModel.insertUser(newUser);

        // what is the first parameter of this cookie?
        response.cookie('Username', username);

        return response.send('User with username ' + username + ' created.');
    } catch (error) {
        response.status(400);
        return response.send("Failed to create user with message " + error);
    }

});

router.post('/login', async function(request, response) {
    const username = request.body.Username;
    const password = request.body.Password;

    try {
        const getUserResponse = await userModel.getUserByUsername(username);
        if (!getUserResponse) {
            response.status(400);
            return response.send('There is no such user found.');
        }



        if (password !== getUserResponse.Password) {
            response.status(400);
            return response.send('Your password is incorrect.')
        }

        response.cookie('Username', username);
        return response.send('Logged in!')
    } catch (error) {
        response.status(400);
        return response.send('Failed to login: ', error)

    }
})


router.get('/loggedIn', function(request, response) {
    const username = request.cookies.Username


    if(username) {
        return response.send({
            username: username,
        });

    } else {
        response.status(400);
        return response.send('Not logged in.')
    }
})


router.post('/logout', function(request, response) {
    
    response.clearCookie('Username');
    return response.send('Logged out');
})

module.exports = router;
