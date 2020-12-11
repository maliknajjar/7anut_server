var express = require('express');
var router = express.Router();

var products = require("../controller/products")
var categories = require("../controller/categories")

router.get('/', function (req, res) {
    res.render("index");
})

router.get('/products', function (req, res) {
    if(req.query.json != null && req.query.category == null){
        products.getProducts().then((result) => {
            res.json(result);
        });
    }else if(req.query.json != null && req.query.category != null){
        products.getProductsByCategory(req.query.category).then((result) => {
            res.json(result);
        })
    }else{
        products.getProducts().then(function(result){
            res.render("products", {results: result});
        });
    }
})

router.get('/categories', function (req, res) {
    categories.getProducts().then(function(result){
        res.json(result);
    });
})

module.exports = router;