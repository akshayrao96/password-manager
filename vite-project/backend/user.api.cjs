
const express = require('express');
const router = express.Router();

const userModel = require('./db/user.model.cjs')

// localhost:8000/users/?startOfUsername=h
router.post('/register', async function(request, response) {
    const requestBody = request.body

    const username = requestBody.Username
    const password = requestBody.Password

    const newUser = {
        Username: username,
        Password: password
    }

    try {
        const createUserResponse = await userModel.insertUser(newUser);
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
            return response.send('No user found.');
        }



        if (password !== getUserResponse.Password) {
            response.status(400);
            return response.send('Passwords do not match.')
        }

        return response.send('Logged in!')
    } catch (error) {
        response.status(400);
        return response.send('Failed to login: ', error)

    }
})


// router.post('/', function(request, response) {
//     const body = request.body;

//     const username = body.username;

//     if(!username) {
//         response.status(401);
//         return response.send("Missing username")
//     }

//     const trainerId = Math.floor(Math.random() * 1000);

//     users.push({
//         username: username,
//         trainerId: trainerId,
//     })

//     response.json("Successfully created user with trainer ID " + trainerId)
// })

module.exports = router;


// localhost:8000/users/123
// localhost:8000/users/123/pokemon/pikachu1
// router.get('/:userId', function(request, response) {
    
//     const userId = request.params.userId
//     const pokemonId = request.params.pokemonId

//     for(let i = 0; i < users.length; i++) {
//         const user = users[i];
//         if(user.trainerId === Number(userId)) {
//             return response.send(user);
//         }

//     }

//     response.status(404);
//     response.send("No user found for trainerID " + userId);
// });