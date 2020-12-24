let db = require("../db");
var validator = require("email-validator");
const bcrypt = require('bcrypt');

let users = {
    getAllUsers: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM users', function (error, result) {
                if (error) reject(error.code);
                resolve(result);
            });
        })
    },
    createUser: function(object){
        // Store hash in your password DB.
        return new Promise(function(resolve, reject){
            bcrypt.hash(object.password, 10).then(function(hash) {
                db.query(`INSERT INTO 7anut.users (email, fullName, password, phoneNumber) VALUES (${db.escape(object.email)}, ${db.escape(object.fullName)}, ${db.escape(hash)}, ${db.escape(object.phoneNumber)})`, (error, result) => {
                    if (error) reject(error.code);
                    resolve(result);
                })
            });
        })
    },
    loginUser: function(object){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, (error, result) => {
                if(!result[0]){
                    reject("email does not exist")
                    return;
                }
                bcrypt.compare(object.password, result[0].password).then(function(hashResult) {
                    // result == true
                    if (error){
                        reject(error.code);
                        return;
                    }
                    if(!hashResult){ // making sure the password equals the hashed password
                        reject("password is wrong");
                        return;
                    }
                    resolve("successfully loged in");
                });
            })
        })
    },
    forgotPassword: function(object){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, (error, result) => {
                if (error){
                    reject(error.code);
                    return;
                }
                if(!result[0]){
                    reject("email does not exist")
                    return;
                }
                /////////////////////////////////////
                // send password to the email here //
                /////////////////////////////////////
                resolve("check your email for password");
            })
        })
    },

    /////////////////////////////////////////////////////
    // validating and filtering informations functions //
    /////////////////////////////////////////////////////

    validateAndFilterRegister: function(object){
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
        // return object if everything is fine
        return object;
    }
}

module.exports = users;