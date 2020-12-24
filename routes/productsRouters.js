var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers")

router.get("/", productsController.getProducts)

module.exports = router;