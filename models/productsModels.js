let db = require("../db");

let models = {
    getProducts: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM products', function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
}

module.exports = models;