var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controller/productsController")

router.get("/", (req, res) => {
    productsController.getProducts().then(function(result){
        res.render("products", {results: result});
    });
})

module.exports = router;