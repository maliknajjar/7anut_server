var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers");
let categoriesController = require("../controllers/categoriesControllers");
let usersController = require("../controllers/usersControllers");
let propertiesController = require("../controllers/propertiesController");
let ordersController = require("../controllers/ordersControllers");

// routes that does not need Authorization
router.get("/", (req, res) => { res.send("this is the api page")})
router.get('/fee', propertiesController.getFeePrices)
router.get('/cities', propertiesController.getCities)
router.get('/products', productsController.getProducts)
router.get('/categories', categoriesController.getCategories)
router.get('/users', usersController.getAllUsers)
router.post('/createuser', usersController.createUser)
router.post('/signin', usersController.signIn)
router.post('/forgetpassword', usersController.forgetPassword)
router.post('/changeforgottenPassword', usersController.changeForgottenPassword)

// routes that needs session Authorization
router.use(usersController.checkUserSession) // Authorization checker
router.post('/checkUserSession', (req, res) => { res.json({"message": "Authorization is correct"})})
router.post('/editProfile', usersController.editProfile)
router.post('/addOrder', ordersController.addOrder)
router.post('/getuserorders', ordersController.getUserOrders)

module.exports = router;