let db = require("../db");

let models = {
    getProducts: function(store){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM products WHERE store_name = ${db.escape(store)}`, function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
    takeproduct: function(object){
        return new Promise(function(resolve, reject){
            db.query(`UPDATE products SET amount = amount + 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
    leaveproduct: function(object){
        return new Promise(function(resolve, reject){
            db.query(`UPDATE products SET amount = amount - 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result){
                if (error) throw error;
                resolve(result)
            });
        })
    },
}

module.exports = models;