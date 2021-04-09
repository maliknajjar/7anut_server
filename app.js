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
let productsModels = require("./models/productsModels")
let theFunctions = require("./models/functions/functions");

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    let isAuthorized = false;
    let userEmail;
    ws.isAlive = true;

    setTimeout(() => {
        if(isAuthorized == false) ws.close()
    }, 1000 * 20)

    ws.on("message", (msg) => {
        let object = JSON.parse(msg)
        ws.email = object.email
        userEmail = object.email
        theFunctions.checkUserSession(object)
        .then((result) => {
            if(result["error"] == null){
                wss.clients.forEach((client) => {
                    if(client.email = ws.email && client != ws) client.close()
                })
                ws.send("connected successfully")
                isAuthorized = true;
            }else{
                ws.close()
            }
        })
    })

    ws.on('pong', (e) => {
        console.log("client is still alive")
        ws.isAlive = true;
    });

    ws.on("close", (e) => {
        console.log("connection is closed: " + e)
        productsModels.returneverything(userEmail)
    })
    
    ws.on("error", () => {
        console.log("error from server")
    })
});

setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if(ws.isAlive == false){
            console.log("client is dead")
            return ws.terminate()
        }
        ws.isAlive = false;
        ws.ping()
    });
}, 30000);

module.exports = server;