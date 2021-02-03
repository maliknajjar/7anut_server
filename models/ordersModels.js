let db = require("../db");
let moment = require('moment');
let uniqid = require('uniqid');

let models = {
    addOrder: function(object){
        return new Promise(function(resolve, reject){
            db.query(`INSERT INTO 7anut.orders (
                    orderID,
                    status,
                    userEmail, 
                    orders, 
                    transportFee, 
                    totalPrice, 
                    address, 
                    paymentType, 
                    orderTime,
                    recieveDate
                ) 
                VALUES (
                    ${db.escape(uniqid())}, 
                    ${db.escape("Active")}, 
                    ${db.escape(object.email)}, 
                    ${db.escape(object.orders)}, 
                    ${db.escape(object.transportFee)}, 
                    ${db.escape(object.totalPrice)}, 
                    ${db.escape(object.address)}, 
                    ${db.escape(object.paymentType)}, 
                    ${db.escape(moment().utc(1).format('YYYY-MM-DD HH:mm'))}, 
                    ${db.escape(object.recieveDate)}
                )`, (error, result) => {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve({"message": "order created successfully"});
            })
        })
    },
    getUserOrders: function(object){
        return new Promise(function(resolve, reject){
            db.query(`Select * FROM orders WHERE userEmail=${db.escape(object.email)}`, (error, result) => {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve(result);
            })
        })
    },
}

module.exports = models;