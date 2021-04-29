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
    edituseraddress: function(req, res){
        addressesModel.edituseraddress(req.body)
        .then((result) => {
            res.json(result);
        })
    },
    swapuseraddresses: function(req, res){
        addressesModel.swapuseraddresses(req.body)
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;