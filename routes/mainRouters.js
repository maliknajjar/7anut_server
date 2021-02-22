var express = require('express');
var router = express.Router();

// controllers
let adminController = require("../controllers/adminControllers")

//main route
router.get('/', function (req, res) { res.render("index"); })

// admin routes
router.get("/adminlogin", adminController.getLoginPage)
router.post("/adminlogin", adminController.adminLogin)
router.get("/admin", adminController.checkAdminToken, adminController.renderAdminHomePage)
router.post("/admin/changeOrdersStatus", adminController.checkAdminToken, adminController.changeOrdersStatus)
router.post("/admin/activate", adminController.checkAdminToken, adminController.activateUser)

module.exports = router;