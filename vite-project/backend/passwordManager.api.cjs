const express = require('express');
const router = express.Router();

// With MongoBD
const PasswordModel = require('./db/passwordManager.model.cjs')


// This will be the list of passwords first shown
let personalPasswords = [
    {URL: "www.Facebook.com", Password: "abcd"},
    {URL: "www.Gmail.com", Password: "1234"},
];

// We need to get the passwords
router.get('/', async function(req, res) {
    const owner = req.cookies.passwordOwner;



    
    try {
        const allPasswordResponse = await PasswordModel.getPasswordByOwner(owner);
        return res.send(allPasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send("Error inserting password information into DB");
    }

})


router.get('/:passwordId', async function(req, res) {
    const passwordId = req.params.passwordId;
    // const trainer = req.params.trainer;


    try {
        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId);
        return res.send(getPasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

    // res.status(404);
    // return res.send("Pokemon with name " + pokemonName + " not found :(");
})


router.post('/', async function(req, res) {
    const requestBody = req.body;


    // note you can technically comment this out because MongoDB can help do the checks
    if (!requestBody.URL || !requestBody.Password) {
        res.status(401);
        return res.send("Please inset a valid URL website and Password!");
    }

    const newPassword = {
        URL: requestBody.URL,
        Password: requestBody.Password,
        owner: "nathan",
    }

    // you need to know that whenever you add data into a database, you get a Promise
    personalPasswords.push(newPassword);

    try {
        const response = await PasswordModel.insertPassword(newPassword)
        res.cookie('passwordOwner', "nathan");
        return res.send(response);
    } catch(error) {
        res.status(400);
        return res.send("Error inserting Password Information into DB D:");
    }
    

})


router.put('/:passwordId', async function(req, res) {
    // is this now an object?
    const passwordId = req.params.passwordId;
    const passwordData = req.body;

    if (!passwordData.URL || !passwordData.Password) {
        res.status(400).send("You need to include the password URL and password password in your request");
    }

    try {
        // why is this a const? Are we going to reuse this?
        const passwordUpdateResponse = await PasswordModel.updatePassword(passwordId, passwordData);
        return res.send('Successfully updated password ID ' + passwordId);
    } catch (error) {
        res.status(400);
        return res.send("Error updating the password Information");
    }


    // for(let i = 0; i < personalPasswords.length; i++) {
    //     const passwordRow = personalPasswords[i];
    //     if (passwordRow.URL === passwordURL) {
    //         passwordRow.URL = passwordData.URL;
    //         passwordRow.Password = passwordData.Password;
    //         return res.send('The URL of ' + passwordURL + " is " + passwordRow.URL)
    //     }
    // }

})



router.delete('/:passwordId', async function(req, res) {
    const passwordId = req.params.passwordId;


    try {
        const deletePasswordResponse = await PasswordModel.deletePassword(passwordId);
        return res.send(deletePasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

})













module.exports = router;




// Before MongoDB
// router.post('/', function(req, res) {
//     const requestBody = req.body;


//     // note you can technically comment this out because MongoDB can help do the checks
//     if (!requestBody.URL || !requestBody.Password) {
//         res.status(401);
//         return res.send("Please inset a valid URL website and Password!");
//     }

//     const newPassword = {
//         URL: requestBody.URL,
//         Password: requestBody.Password,
//     }

//     // you need to know that whenever you add data into a database, you get a Promise
//     personalPasswords.push(newPassword);

//     res.send("Password for the website " + requestBody.URL + " successfully added!")

// })

// Before MongoDB
// We need to get the passwords
// router.get('/', function(req, res) {
//     return res.send(personalPasswords);
// })

// router.delete('/:passwordId', function(req, res) {
//     const passwordURL = req.params.passwordId;

//     personalPasswords = personalPasswords.filter((password) => {
//         return password.URL !== passwordURL;
//     })

//     return res.send("Success :)");
// })

// Before MongoDB
// router.put('/:passwordId', async function(req, res) {
//     const passwordURL = req.params.passwordId;
//     const passwordData = req.body;

//     if (!passwordData.URL || !passwordData.Password) {
//         res.status(400).send("You need to include the password URL and password password in your request");
//     }


//     for(let i = 0; i < personalPasswords.length; i++) {
//         const passwordRow = personalPasswords[i];
//         if (passwordRow.URL === passwordURL) {
//             passwordRow.URL = passwordData.URL;
//             passwordRow.Password = passwordData.Password;
//             return res.send('The URL of ' + passwordURL + " is " + passwordRow.URL)
//         }
//     }

//     res.status(404);
//     return res.send("Password with the URL " + passwordURL + " not found :(");

//     // try {
//     //     const passwordUpdateResponse = await PokemonModel.updatePokemon(pokemonId, pokemonData);
//     //     return res.send('Successfully updated pokemon ID ' + pokemonId)
//     // } catch (error) {
//     //     res.status(400);
//     //     return res.send(error);
//     // }
// })


// router.delete('/:passwordId', function(req, res) {
//     const passwordURL = req.params.passwordId;

//     personalPasswords = personalPasswords.filter((password) => {
//         return password.URL !== passwordURL;
//     })

//     return res.send("Success :)");
// })