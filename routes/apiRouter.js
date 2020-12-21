var express = require('express');
var router = express.Router();

// controllers
let productsController = require("../controller/productsController");
let categoriesController = require("../controller/categoriesController");
let usersController = require("../controller/usersController");

router.get("/", (req, res) => {
    res.send("this is the api page");
})

router.get('/products', function (req, res) {
    productsController.getProducts().then((result) => {
        res.json(result);
    });
})

router.get('/categories', function (req, res) {
    categoriesController.getProducts().then(function(result){
        res.json(result);
    });
})

router.get('/users', function (req, res) {
    usersController.getAllUsers().then(function(result){
        res.json(result);
    });
})

router.post('/createUser', function (req, res) {
    // filtering and validating before submiting to the database
    let object = usersController.validateAndFilterRegister(req.body);
    if(object.error){
        res.send(object.error);
        return;
    }
    // submiting data to the database (be carefull)
    usersController.createUser(object)
    .then(function(result, err){
        res.send("account was successfully created");
    })
    .catch(err => res.send(err));
})

router.post('/loginUser', function (req, res) {
    usersController.loginUser(req.body).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    });
})

router.post('/forgotPassword', function (req, res) {
    usersController.forgotPassword(req.body).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    });
})

module.exports = router;