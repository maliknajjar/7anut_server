let productsModels = require("../models/productsModels");

let controllers = {
    getProducts: function(req, res){
        productsModels.getProducts()
        .then((products) => {
            res.json(products);
        })
    },
}

module.exports = controllers;