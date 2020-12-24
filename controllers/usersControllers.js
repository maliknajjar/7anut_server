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
    },
}

module.exports = controllers;