const express = require('express');
const routs = express.Router();
const { home } = require('../controllers/controller');
var knex = require('../database/db')                  // set up database connection
var app = express();
routs.use(express.json())

routs.get('/get', (req, res) => {
    knex('users').then(data => {
        res.send(data);
        console.log(data);
    }).catch(err => {
        console.log(err);
        res.send("err")
    })
})

routs.get('/login', (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) {
        console.log({ message: "username and password is undefinded" });
        res.send({ message: "username and password is undefinded" })
    } else {
        knex.select("*").from("users").where({ email: req.body.email, password: req.body.password })
            .then((data) => {
                if (data.length > 0) {
                    if (data[0].password === req.body.password) {
                        if (data[0].email === req.body.email) {
                            res.send({ message: "User login successfully..." })
                            console.log({ message: "User login successfully..." });
                        }
                    } else {
                        res.send({ message: "user email or password invalid" })
                    }
                } else {
                    res.send({ message: "please signup then login......" })
                }

            })
    }
})

module.exports = routs;