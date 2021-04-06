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
            db.query(`UPDATE products SET amount = amount - 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result) {
                if (error) throw error;
                // edit user basket also
                db.query(`UPDATE users SET basket = ${db.escape(Object.keys(object.basket).length === 0 ? "null" : object.basket)} WHERE email = ${db.escape(object.email)}`, function (error, theresult) {
                    if (error) throw error;
                    resolve(theresult)
                });
            });
        })
    },
    leaveproduct: function(object){
        return new Promise(function(resolve, reject){
            db.query(`UPDATE products SET amount = amount + 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result){
                if (error) throw error;
                // edit user basket also
                db.query(`UPDATE users SET basket = ${db.escape(Object.keys(object.basket).length === 0 ? "null" : object.basket)} WHERE email = ${db.escape(object.email)}`, function (error, theresult) {
                    if (error) throw error;
                    resolve(theresult)
                });
            });
        })
    },
}

module.exports = models;