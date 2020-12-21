let db = require("../db");
var validator = require("email-validator");

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
        return new Promise(function(resolve, reject){
            db.query(`INSERT INTO \`7anut\`.\`users\` (\`email\`, \`fullName\`, \`password\`, \`phoneNumber\`) VALUES ('${db.escape(object.email)}', '${db.escape(object.fullName)}', '${db.escape(object.password)}', '${db.escape(object.phoneNumber)}')`, (error, result) => {
                if (error) reject(error.code);
                resolve(result);
            })
        })
    },
    loginUser: function(object){
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
                if(result[0].password != object.password){
                    reject("password is wrong");
                    return;
                }
                resolve("successfully loged in");
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
                resolve("password was successfully sent");
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