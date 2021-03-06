const express = require("express");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require("path");

const router = require("./routes/mainRouters")
const apiRouter = require("./routes/apiRouters");

const app = express();

// parse cookies
app.use(cookieParser())

//adding static files
app.use(express.static(path.join(__dirname, 'public')));

// adding template engine
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

// parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allowing access from all origins (remove this when this app is relesed)
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.use("/", router)
app.use('/api', apiRouter);

module.exports = app;