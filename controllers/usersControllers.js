let usersModels = require("../models/usersModels")
let dictionairy = require("../dictionairy")

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
    },
    CheckIsBanned: (req, res, next) => {
        usersModels.CheckIsBanned(req.body)
        .then((result) => {
            if (result["error"] != null) return res.json(result)
            else next()
        })
    },
    renderIndexPage: (req, res) => {
        let defaultLang = "en";
        var farFuture = new Date(new Date().getTime() + (1000*60*60*24*365*10)); // ~10y
        if (req.query.lang) {
            req.cookies.lang = req.query.lang
            res.cookie('lang', req.query.lang, { expires: farFuture });
        }
        if (!req.cookies.lang){
            req.cookies.lang = defaultLang
            res.cookie('lang', req.cookies.lang, { expires: farFuture });
        }
        res.render("index", {words: dictionairy, lang: req.cookies.lang});
    }
}