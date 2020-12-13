var express = require('express');
var router = express.Router();

//routes
let apiRouter = require("./apiRouter");
let productsRouter = require("./productsRouter");
let categoriesRouter = require("./categoriesRouter");

router.get('/', function (req, res) {
    res.render("index");
})

router.use('/api', apiRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;