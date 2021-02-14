let usersModels = require("../models/usersModels")

module.exports = {
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
    signIn: (req, res) => {
        usersModels.signIn(req.body)
        .then((result) => {
            res.json(result);
        })
    },
    forgetPassword: (req, res) => {
        usersModels.forgetPassword(req.body)
        .then((result) => {
            res.json(result)
        })
    },
    changeForgottenPassword: (req, res) => {
        usersModels.changeForgottenPassword(req.body)
        .then((result) => {
            res.json(result)
        })
    },
    checkUserSession: (req, res, next) => {
        usersModels.checkUserSession(req.body)
        .then((result) => {
            if(result.error == null){
                // res.json(result)
                next()
                return
            }
            res.json(result)
        })
    },
    editProfile: (req, res) => {
        usersModels.editProfile(req.body)
        .then((result) => {
            res.json(result)
        })
    }
}