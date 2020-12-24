let productsModels = require("../models/productsModels");

let controllers = {
    getProducts: function(req, res){
        productsModels.getProducts()
        .then((products) => {
            if(req.baseUrl == "/api"){
                res.json(products);
            }else{
                res.render("products", {results: products});
            }
        })
    },
}

module.exports = controllers;