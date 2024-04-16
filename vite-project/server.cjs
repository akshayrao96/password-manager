const express = require('express');
const pokemon = require('./backend/pokemon.api.cjs');
const users = require('./backend/user.api.cjs')
const passwordManager = require('./backend/passwordManager.api.cjs');
const mongoose = require('mongoose');

const app = express();

// after i copy and paste the code from MongoDB seems like we need to put it in quotes
// this whole code block is needed to get mongoDB started
const mongoDBEndpoint = 'mongodb+srv://nathanjy212:banana1234@passwordmanagerwebdev.mo8ek7l.mongodb.net/?retryWrites=true&w=majority&appName=PasswordManagerWebDev'
mongoose.connect(mongoDBEndpoint, {
    useNewUrlParser: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind('Error connecting to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/passwordManager', passwordManager);
app.use('/api/pokemon', pokemon);
app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send("This is the FIRST GET request")
});

app.get('/', function(req, res) {
    res.send("This is SECOND GET request");
})

app.put('/', function(req, res) {
    res.send("This is a PUT request")
})



app.listen(8000, function() {
    console.log("Starting app now...")
})