let categoriesModels = require("../models/categoriesModels");

let controllers = {
    getCategories: function(req, res){
        categoriesModels.getCategories()
        .then((categories) => {
            res.json(categories);
        })
    },
}

module.exports = controllers;