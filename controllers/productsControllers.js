let productsModels = require("../models/productsModels");
let functions = require("../models/functions/functions");

let controllers = {
    getProducts: function(req, res){
        productsModels.getProducts(req.params.store)
        .then((products) => {
            res.json(products);
        })
    },
    takeproduct: function(req, res){
        productsModels.takeproduct(req.body)
        .then((products) => {
            res.json(products);
        })
    },
    leaveproduct: function(req, res){
        productsModels.leaveproduct(req.body)
        .then((products) => {
            res.json(products);
        })
    },
    returnEverything: function(req, res){
        functions.returnEverything(req.body.email)
        .then((result) => {
            res.json({"message": "done"})
        })
    },
    clearuserbasket: function(req, res){
        functions.clearuserbasket(req.body.email)
        .then((result) => {
            res.json({"message": "done"})
        })
    },
}

module.exports = controllers;