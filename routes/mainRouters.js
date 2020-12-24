var express = require('express');
var router = express.Router();

//routes
let apiRouter = require("./apiRouters");
let productsRouter = require("./productsRouters");
let categoriesRouter = require("./categoriesRouters");

router.get('/', function (req, res) {
    res.render("index");
})

router.use('/api', apiRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;