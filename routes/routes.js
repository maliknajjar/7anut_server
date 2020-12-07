var express = require('express');
var router = express.Router();

var products = require("../controller/products")

router.get('/', function (req, res) {
    res.render("index", {data: "this is 7anut website"});
})

router.get('/products', function (req, res) {
    products.showProducts().then(function(result){
        res.render("products", {results: result});
    });
})

module.exports = router;