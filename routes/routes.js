var express = require('express');
var router = express.Router();

var products = require("../controller/products")

router.get('/', function (req, res) {
    res.render("index");
})

router.get('/products', function (req, res) {
    if(req.query.json != null){
        products.getProducts().then(function(result){
            res.json(result);
        });
    }else{
        products.getProducts().then(function(result){
            res.render("products", {results: result});
        });
    }
})

module.exports = router;