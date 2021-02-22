const { json } = require("body-parser");
let addressesModel = require("../models/addressesModels");

let controllers = {
    getuseraddreses: function(req, res){
        addressesModel.getuseraddreses(req.body)
        .then((result) => {
            res.json(result);
        })
    },
    removeuseraddress: function(req, res){
        addressesModel.removeuseraddress(req.body)
        .then((result) => {
            res.json(result);
        })
    },
    createuseraddress: function(req, res){
        addressesModel.createuseraddress(req.body)
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;