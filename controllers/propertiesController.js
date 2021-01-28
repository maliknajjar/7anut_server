const { json } = require("body-parser");
let propertiesModel = require("../models/propertiesModel");

let controllers = {
    getFeePrices: function(req, res){
        propertiesModel.getFeePrices()
        .then((result) => {
            res.json(result);
        })
    },
    getCities: function(req, res){
        propertiesModel.getCities()
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;