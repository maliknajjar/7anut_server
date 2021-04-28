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
        console.log(object.basket)
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM products WHERE ID = ${db.escape(object.ID)}`, function (error, r) {
                if (error) throw error;
                if(JSON.parse(object.basket)[object.ID] >= r[0].limit_amount_per_user) return resolve({"msg": "reached limit"})
                if (r[0].amount <= 0){
                    resolve({"msg": "product finished"})
                    return;
                }
                db.query(`UPDATE products SET amount = amount - 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result) {
                    if (error) throw error;
                    // edit user basket also
                    console.log(object.basket)
                    db.query(`UPDATE users SET basket = ${db.escape(object.basket)} WHERE email = ${db.escape(object.email)}`, function (error, theresult) {
                        if (error) throw error;
                        resolve(theresult)
                    });
                });
            });
        })
    },
    leaveproduct: function(object){ 
        return new Promise(function(resolve, reject){
            db.query(`UPDATE products SET amount = amount + 1 WHERE ID = ${db.escape(object.ID)}`, function (error, result){
                if (error) throw error;
                // edit user basket also
                db.query(`UPDATE users SET basket = ${db.escape(object.basket)} WHERE email = ${db.escape(object.email)}`, function (error, theresult) {
                    if (error) throw error;
                    resolve(theresult)
                });
            });
        })
    },
    clearuserbasket: (email) => {
        return new Promise(function(resolve, reject){
            // clear user's basket after all products are returned
            db.query(`UPDATE users SET basket = null WHERE email = ${db.escape(email)}`, function (error, result) { 
                if (error) throw error;
                resolve("done")
            })
        })
    },
    returneverything: (email) => {
        // get products in user's basket
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(email)}`, function (error, result) { 
                if (error) throw error;
                // return all product the user took to its place with a loop
                let ordersToReturn = JSON.parse(result[0].basket)
                for (const key in ordersToReturn) {
                    db.query(`UPDATE products SET amount = amount + ${db.escape(ordersToReturn[key])} WHERE ID = ${db.escape(key)}`, function (error, result) { 
                        if (error) throw error;
                    })
                }
                // clear user's basket after all products are returned
                models.clearuserbasket(email)
                resolve("done")
            })
        })
    },
}

module.exports = models;