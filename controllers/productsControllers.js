let productsModels = require("../models/productsModels");

let controllers = {
    getProducts: function(req, res){
        productsModels.getProducts(req.params.store)
        .then((products) => {
            res.json(products);
        })
    },
}

module.exports = controllers;