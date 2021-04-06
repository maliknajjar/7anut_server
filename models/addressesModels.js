let db = require("../db");

let models = {
    getuseraddreses: function(object){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM addresses WHERE userEmail=${db.escape(object.email)}`, function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
    removeuseraddress: function(object){
        return new Promise(function(resolve, reject){
            db.query(`DELETE FROM addresses WHERE userEmail = ${db.escape(object.email)} AND ID = ${db.escape(object.addressID)}`, function (error, result) {
                if (error) throw error;
                resolve({"message": "success"})
            });
        })
    },
    createuseraddress: function(object){
        return new Promise(function(resolve, reject){
            db.query(`INSERT INTO addresses (userEmail, addresse) VALUES (${db.escape(object.email)}, ${db.escape(object.address)})`, function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
    swapuseraddresses: function(object){
        return new Promise(function(resolve, reject){
            if(object.top == object.bottom){
                resolve(result)
                return;
            }
            db.query(`SELECT * FROM addresses WHERE ID = ${db.escape(object.top)} OR ID = ${db.escape(object.bottom)}`, function (error, result) {
                if (error) throw error;
                if(result[0].userEmail != object.email){
                    resolve("the address is not yours")
                    return;
                }
                if(result[1].userEmail != object.email){
                    resolve("the address is not yours")
                    return;
                }
                db.query(`UPDATE addresses t1 INNER JOIN addresses t2 ON (t1.ID, t2.ID) IN ((${db.escape(object.top)},${db.escape(object.bottom)}),(${db.escape(object.bottom)},${db.escape(object.top)})) SET t1.addresse = t2.addresse`, function (error, result) {
                    if (error) throw error;
                    resolve(result)
                });
            });
        })
    },
}

module.exports = models;