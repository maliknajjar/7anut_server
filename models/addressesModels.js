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
}

module.exports = models;