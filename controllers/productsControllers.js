let productsModels = require("../models/productsModels");

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
}

module.exports = controllers;