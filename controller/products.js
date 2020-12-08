let db = require("../db");

let products = {
    showProducts: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM products', function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    }
}

module.exports = products;