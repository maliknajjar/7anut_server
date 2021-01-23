const { json } = require("body-parser");
let feeModel = require("../models/feeModel");

let controllers = {
    getFeePrices: function(req, res){
        feeModel.getFeePrices()
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;