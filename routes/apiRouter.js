var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controller/productsController")
let categoriesController = require("../controller/categoriesController")

router.get("/", (req, res) => {
    res.send("this is the api page");
})

router.get('/products', function (req, res) {
    if(req.query.category == null){
        productsController.getProducts().then((result) => {
            res.json(result);
        });
    }else if(req.query.category != null){
        productsController.getProductsByCategory(req.query.category).then((result) => {
            res.json(result);
        })
    }
})

router.get('/categories', function (req, res) {
    categoriesController.getProducts().then(function(result){
        res.json(result);
    });
})

module.exports = router;