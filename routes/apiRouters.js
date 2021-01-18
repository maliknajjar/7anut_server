var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers");
let categoriesController = require("../controllers/categoriesControllers");
let usersController = require("../controllers/usersControllers");

// routes that does not need Authorization
router.get("/", (req, res) => { res.send("this is the api page")})
router.get('/products', productsController.getProducts)
router.get('/categories', categoriesController.getCategories)
router.get('/users', usersController.getAllUsers)
router.post('/createuser', usersController.createUser)
router.post('/signin', usersController.signIn)
router.post('/forgetpassword', usersController.forgetPassword)

//check for session Authorization
router.use(usersController.checkUserSession)

// routes that needs session Authorization
router.post('/checkUserSession', (req, res) => { res.json({"message": "Authorization is correct"})})
router.post('/editProfile', usersController.editProfile)

module.exports = router;