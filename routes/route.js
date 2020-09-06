const express = require("express")

const router = express.Router()


router.get("/", (req, res) => {
    res.send("this works")
    console.log("\nGET is requested")
})

module.exports = router