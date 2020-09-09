const express = require("express")

const router = express.Router()

// global controller
router.get('/*',function(req,res,next){
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

router.get("/", (req, res) => {
    let db = require("../db")
    db.collection("users").find().toArray().then((i) => {
        res.send(i)
    })
    console.log("\nGET is requested")
})

module.exports = router