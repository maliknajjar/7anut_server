let db = require("../db");

let models = {
    getFeePrices: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM fee', function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
}

module.exports = models;