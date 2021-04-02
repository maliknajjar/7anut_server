var http = require('http');
const express = require("express");
const WebSocket = require('ws');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const path = require("path");

const router = require("./routes/mainRouters")
const apiRouter = require("./routes/apiRouters");

///////////////////////////////
//          express          //
///////////////////////////////

const app = express();

//creating the http server and add express in it
let server = http.createServer(app);

// adding template engine
app.set('view engine', 'ejs');

// parse cookies
app.use(cookieParser());

//adding static files
app.use(express.static(path.join(__dirname, 'public')));

// parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// allowing access from all origins (remove this when this app is relesed)
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes
app.use("/", router)
app.use('/api', apiRouter);

/////////////////////////////////
//          websocket          //
/////////////////////////////////

const wss = new WebSocket.Server({ server });

// setInterval(() => {
//     console.log(wss.clients.size)
// }, 2500)

wss.on('connection', function connection(ws) {
    ws.on("message", (data) => {
        ws.send("from server: recieved message")
    })
});


module.exports = server;