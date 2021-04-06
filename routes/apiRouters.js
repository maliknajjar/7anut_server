var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controllers/productsControllers");
let categoriesController = require("../controllers/categoriesControllers");
let usersController = require("../controllers/usersControllers");
let propertiesController = require("../controllers/propertiesController");
let ordersController = require("../controllers/ordersControllers");
let addressesController = require("../controllers/addressesControllers");

// routes that does not need Authorization
router.get("/", (req, res) => {res.send("this is the api page")})
router.get('/minimumversion', (req, res) => {res.send("1.0.1.1")})
router.get('/initialcameraposition', (req, res) => {res.json([36.796073, 10.16149, 10])})
router.get('/fee', propertiesController.getFeePrices)
router.get('/stores', propertiesController.getCities)
router.get('/products/:store', productsController.getProducts)
router.get('/categories', categoriesController.getCategories)
router.get('/users', usersController.getAllUsers)
router.post('/createuser', usersController.createUser)
router.post('/signin', usersController.CheckIsBanned, usersController.signIn)
router.post('/forgetpassword', usersController.forgetPassword)
router.post('/changeforgottenPassword', usersController.changeForgottenPassword)

// routes that needs session Authorization and check for ban
router.use(usersController.CheckIsBanned) // isBanned checker
router.use(usersController.checkUserSession) // Authorization checker
router.post('/checkUserSession', (req, res) => { res.json({"message": "Authorization is correct"})})
router.post('/editProfile', usersController.editProfile)
router.post('/addOrder', ordersController.addOrder)
router.post('/getuserorders', ordersController.getUserOrders)
router.post('/getuseraddreses', addressesController.getuseraddreses)
router.post('/removeuseraddress', addressesController.removeuseraddress)
router.post('/createuseraddress', addressesController.createuseraddress)
router.post('/swapuseraddresses', addressesController.swapuseraddresses)
router.post('/takeproduct', productsController.takeproduct)
router.post('/leaveproduct', productsController.leaveproduct)

module.exports = router;