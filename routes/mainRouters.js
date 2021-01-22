var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers")

//routes
router.get('/', function (req, res) {res.render("index");})
router.get("/products", productsController.getProducts)

module.exports = router;