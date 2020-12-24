let usersModels = require("../models/usersModels")

let controllers = {
    getAllUsers: (req, res) => {
        usersModels.getAllUsers()
        .then((users) => {
            res.json(users);
        })
    },
    createUser: (req, res) => {
        usersModels.createUser(req.body)
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;