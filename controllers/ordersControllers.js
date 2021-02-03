let ordersModels = require("../models/ordersModels");

let controllers = {
    addOrder: function(req, res){
        ordersModels.addOrder(req.body)
        .then((result) => {
            res.json(result);
        })
    },
    getUserOrders: function(req, res){
        ordersModels.getUserOrders(req.body)
        .then((result) => {
            res.json(result);
        })
    },
}

module.exports = controllers;