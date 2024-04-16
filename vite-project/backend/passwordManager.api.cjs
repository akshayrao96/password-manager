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
router.get('/', function(req, res) {
    return res.send(personalPasswords);
})

router.delete('/:passwordId', function(req, res) {
    const passwordURL = req.params.passwordId;

    personalPasswords = personalPasswords.filter((password) => {
        return password.URL !== passwordURL;
    })

    return res.send("Success :)");
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
    }

    // you need to know that whenever you add data into a database, you get a Promise
    personalPasswords.push(newPassword);

    try {
        const response = PasswordModel.insertPassword(newPassword)
    } catch(e)
    

    res.send("Password for the website " + requestBody.URL + " successfully added!")

})

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


router.put('/:passwordId', async function(req, res) {
    const passwordURL = req.params.passwordId;
    const passwordData = req.body;

    if (!passwordData.URL || !passwordData.Password) {
        res.status(400).send("You need to include the password URL and password password in your request");
    }


    for(let i = 0; i < personalPasswords.length; i++) {
        const passwordRow = personalPasswords[i];
        if (passwordRow.URL === passwordURL) {
            passwordRow.URL = passwordData.URL;
            passwordRow.Password = passwordData.Password;
            return res.send('The URL of ' + passwordURL + " is " + passwordRow.URL)
        }
    }

    res.status(404);
    return res.send("Password with the URL " + passwordURL + " not found :(");

    // try {
    //     const passwordUpdateResponse = await PokemonModel.updatePokemon(pokemonId, pokemonData);
    //     return res.send('Successfully updated pokemon ID ' + pokemonId)
    // } catch (error) {
    //     res.status(400);
    //     return res.send(error);
    // }
})



// router.put('/:passwordId', function(req, res) {
//     const originalPasswordURL = req.params.passwordId;
//     const updatedData = req.body;

//     if (!updatedData.Password) {
//         return res.status(400).send("You need to include the new password in your request");
//     }

//     let found = false;
//     for(let i = 0; i < personalPasswords.length; i++) {
//         if (personalPasswords[i].URL === originalPasswordURL) {
//             personalPasswords[i].Password = updatedData.Password;  // Only update the password
//             found = true;
//             break;
//         }
//     }

//     if (!found) {
//         return res.status(404).send("Password with the URL " + originalPasswordURL + " not found");
//     }

//     return res.send('Password updated successfully for ' + originalPasswordURL);
// });
module.exports = router;