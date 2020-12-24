let db = require("../db");
var validator = require("email-validator");
const bcrypt = require('bcrypt');

let models = {
    getAllUsers: () => {
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM users', function (error, result) {
                if (error) throw error;
                resolve(result)
            });
        })
    },
    createUser: (object) => {
        // validating the email
        if(!validator.validate(object.email)){
            object.error = "email is not valid";
            return object;
        }
        // validating phone number
        let isnum = /^\d+$/.test(object.phoneNumber);
        if(!isnum){
            object.error = "phone number is not valid";
            return object;
        }
        // database part
        return new Promise(function(resolve, reject){
            bcrypt.hash(object.password, 10).then(function(hash) {
                db.query(`INSERT INTO 7anut.users (email, fullName, password, phoneNumber) VALUES (${db.escape(object.email)}, ${db.escape(object.fullName)}, ${db.escape(hash)}, ${db.escape(object.phoneNumber)})`, (error, result) => {
                    if (error) reject(error.code);
                    resolve(result);
                })
            });
        })
    },
}

module.exports = models;