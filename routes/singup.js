const express = require('express');
const routs = express.Router();
const { home } = require('../controllers/controller');
var knex = require('../database/db')                  // set up database connection
var app = express();
routs.use(express.json())

routs.post('/singup', (req, res) => {
    if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined) {
        console.log({ message: "username and password is undefinded" });
        res.send({ message: "username and password is undefinded" })
    }else {
        console.log(req.body);
        knex('users').insert({ name: req.body.name, email: req.body.email, password: req.body.password }).then(data => {
            res.send({ message: 'singup is succesfully' });
        }).catch(err => {
            console.log(err);
            res.send("There are some issue in code")
        })
    }
});

module.exports=routs;