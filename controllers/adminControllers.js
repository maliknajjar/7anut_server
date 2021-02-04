let productsModels = require("../models/productsModels");

let controllers = {
    renderAdminPage: function(req, res){
        res.render("adminLoginPage")
    },
    grantToken: (req, res) => {
        
    }
}

module.exports = controllers;