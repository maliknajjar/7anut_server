var express = require('express');
var router = express.Router();

// controllers
let adminController = require("../controllers/adminControllers")

//main route
router.get('/', function (req, res) {res.render("index");})

// admin routes
router.get("/admin", adminController.renderAdminPage)
router.post("/admin", adminController.grantToken)

module.exports = router;