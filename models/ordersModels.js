let db = require("../db");
let moment = require('moment');
let uniqid = require('uniqid');
const { json } = require("express");

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
                    ${db.escape(JSON.stringify({status: "Pending", color: {r: 255, g: 200, b: 0}, message: null}))}, 
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
            db.query(`Select * FROM orders WHERE userEmail=${db.escape(object.email)} LIMIT 25`, (error, result) => {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve(result);
            })
        })
    },
    getAllOrders: function(object){
        let sql = `Select orders.ID, orders.orderID, orders.status, orders.userEmail, orders.orders, orders.transportFee, orders.totalPrice, orders.address, orders.paymentType, orders.orderTime, orders.recieveDate, users.phoneNumber, users.isReal from orders inner join users on orders.userEmail = users.email WHERE JSON_VALUE(status, '$.status') LIKE ${db.escape(object.status ? object.status : "Pending")} order by recieveDate desc;`
        let sql2 = `Select orders.ID, orders.orderID, orders.status, orders.userEmail, orders.orders, orders.transportFee, orders.totalPrice, orders.address, orders.paymentType, orders.orderTime, orders.recieveDate, users.phoneNumber, users.isReal from orders inner join users on orders.userEmail = users.email order by recieveDate desc;`
        return new Promise(function(resolve, reject){
            db.query(object.status == "All" ? sql2 : sql, (error, result) => {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve(result);
            })
        })
    },
    changeOrdersStatus: function(object){
        return new Promise(function(resolve, reject){
            let sql = "";
            if (object.ID == null){
                resolve({"error": "no order selected"})
                return
            }
            if (Array.isArray(object.ID)){
                sql = `UPDATE orders SET status = ${db.escape(object["status"])} WHERE ID IN (${db.escape(object.ID)});`
            }else{
                sql = `UPDATE orders SET status = ${db.escape(object["status"])} WHERE ID = ${db.escape(object.ID)};`
            }
            db.query(sql, (error, result) => {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve({"message": "orders status changed"});
            })
        })
    },
}

module.exports = models;