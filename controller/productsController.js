let db = require("../db");

let products = {
    getProducts: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM products', function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    },
    getProductsByCategory: function(cat){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM products WHERE category="${cat}"`, function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    },
}

module.exports = products;