let productsModels = require("../models/productsModels");
let theFunctions = require("../models/functions/functions");

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
    returneverything: function(req, res){
        productsModels.returneverything(req.body.email)
        .then((result) => {
            res.json({"message": "done"})
        })
    },
    clearuserbasket: function(req, res){
        productsModels.clearuserbasket(req.body.email)
        .then((result) => {
            res.json({"message": "done"})
        })
    },
    addfavourite: function(req, res){
        productsModels.addfavourite(req.body)
        .then((result) => {
            res.json(result)
        })
    },
    favourite: function(req, res){
        productsModels.favourite(req.body)
        .then((result) => {
            res.send(result)
        })
    },
}

module.exports = controllers;