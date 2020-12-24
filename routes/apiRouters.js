var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers");
let categoriesController = require("../controllers/categoriesControllers");
let usersController = require("../controllers/usersControllers");

// routes
router.get("/", (req, res) => { res.send("this is the api page") })
router.get('/products', productsController.getProducts)
router.get('/categories', categoriesController.getCategories)
router.get('/users', usersController.getAllUsers)
router.post('/createUser', usersController.createUser)

module.exports = router;