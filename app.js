const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const router = require("./routes/mainRouters")

const app = express();

// adding template engine
app.set('view engine', 'ejs');

//adding static files
app.use(express.static(path.join(__dirname, 'public')));

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
});
app.use("/", router)

module.exports = app;