const jwt = require("jsonwebtoken");

const orderModel = require("../models/ordersModels")

let controllers = {
    getLoginPage: (req, res) => {
        jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return res.render("adminLoginPage")
            return res.redirect("/admin")
        })
    },
    adminLogin: (req, res) => {
        if(req.body.username == process.env.THEUSERNAME && req.body.password == process.env.PASSWORD){
            // generate token
            res.cookie("token", jwt.sign({username: req.body.username}, process.env.TOKEN_SECRET, { expiresIn: '24h' }))
            res.redirect("/admin")
        }else{
            res.redirect("/adminlogin")
        }
    },
    checkAdminToken: function(req, res, next){
        if(req.cookies.token == null){
            res.redirect("/adminlogin")
        }else{
            // verify jwt token here
            jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) return res.redirect("/adminlogin")
                next() // pass the execution off to whatever request the client intended
            })
        }
    },
    renderAdminHomePage: (req, res) => {
        orderModel.getAllOrders()
        .then((result) => {
            res.render("adminHomePage", {orders: result})
        })
    },
    changeOrdersStatus: (req, res) => {
        console.log(req.body)
    },
}

module.exports = controllers;