const express = require('express');
const router = express.Router();

// With MongoBD
const PasswordModel = require('./db/passwordManager.model.cjs')


// This will be the list of passwords first shown
let personalPasswords = [
    {URL: "www.Facebook.com", Password: "abcd"},
    {URL: "www.Gmail.com", Password: "1234"},
];



function generatePassword(length, options) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numerals = '0123456789';
    const symbols = '!@#$%^&*()_+=-[]{}|;:",.<>?';

    let validChars = '';
    if (options.alphabet) {
        validChars += alphabet;
    }
    if (options.numerals) {
        validChars += numerals;
    }
    if (options.symbols) {
        validChars += symbols;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    return password;
}




// We need to get the passwords
router.get('/', async function(req, res) {
    // const owner = req.cookies.passwordOwner;
    const owner = req.cookies.Username;



    
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
})


router.post('/', async function(req, res) {
    const requestBody = req.body;
    const username = req.cookies.Username


    if (!requestBody.URL) {
        res.status(400).send("Please insert a valid URL.");
        return;
    }


    // note you can technically comment this out because MongoDB can help do the checks
    // if (!requestBody.URL || !requestBody.Password) {
    //     res.status(401);
    //     return res.send("Please inset a valid URL website and Password!");
    // }

    // if (requestBody.URL && !requestBody.Password) {

    // }

    const newPassword = {
        URL: requestBody.URL,
        Password: requestBody.Password,
        owner: username,
    }

    if (!newPassword.Password) {
        newPassword.Password = generatePassword(12, requestBody.Options)
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
    const owner = req.cookies.Username;

    if (!passwordData.URL || !passwordData.Password) {
        res.status(400).send("You need to include the password URL and password password in your request");
    }

    try {

        const getPasswordResponse = await PasswordModel.getPasswordById(passwordId)
        // Don't understand this why is owner a property of getPassword response?
        if(getPasswordResponse !== null && getPasswordResponse.owner !== owner) {
            res.status(400);
            return res.send("You do not own this Password");
        }


        // why is this a const? Are we going to reuse this?
        const passwordUpdateResponse = await PasswordModel.updatePassword(passwordId, passwordData);
        return res.send('Successfully updated password ID ' + passwordId);
    } catch (error) {
        res.status(400);
        return res.send("Error updating the password Information");
    }

})



router.delete('/:passwordId', async function(req, res) {
    const passwordId = req.params.passwordId;
    const owner = req.cookies.Username;


    try {
        const deletePasswordResponse = await PasswordModel.deletePassword(passwordId);

        if(deletePasswordResponse !== null && deletePasswordResponse.owner !== owner) {
            res.status(400);
            return res.send("You do not own this Password");
        }

        return res.send(deletePasswordResponse);
    } catch (error) {
        res.status(400);
        return res.send(error);
    }

})

module.exports = router;
