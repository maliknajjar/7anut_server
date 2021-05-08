var express = require('express');
var router = express.Router();

// controllers
let adminController = require("../controllers/adminControllers")
let usersController = require("../controllers/usersControllers")

//main route
router.get('/', usersController.renderIndexPage)

module.exports = router;