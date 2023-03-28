const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//!Database configration
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});



app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

//add the route class
const UserRoute = require('./routes/user')

app.use('/user',UserRoute)




app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});