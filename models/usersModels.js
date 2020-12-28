let db = require("../db");
let validator = require("email-validator");
let functions = require("./functions/functions")
let bcrypt = require('bcrypt');
let moment = require('moment');

let usersModels = {
    getAllUsers: () => {
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM users', function (error, result) {
                if (error) resolve({"error": error.code});
                resolve(result)
            });
        })
    },
    createUser: (object) => {
        return new Promise(function(resolve, reject){
            //checking if all fields are there
            if(object.email == null || object.fullName == null || object.phoneNumber == null || object.password == null){
                resolve({"error": "fill all the fields"});
                return;
            }
            // validating the email
            if(!validator.validate(object.email)){
                resolve({"error": "email is not valid"});
                return;
            }
            // validating phone number
            if(!functions.isNumber){
                resolve({"error": "phone number is not valid"});
                return;
            }
            // hasing the password
            bcrypt.hash(object.password, 10).then(function(hash) {
                db.query(`INSERT INTO 7anut.users (email, fullName, password, phoneNumber) VALUES (${db.escape(object.email)}, ${db.escape(object.fullName)}, ${db.escape(hash)}, ${db.escape(object.phoneNumber)})`, (error, result) => {
                    if (error){
                        resolve({"error": error.code});
                        return;
                    }
                    functions.userSessionGiver(object.email).then((theSession) =>{
                        resolve({"message": "account created successfully", "session": theSession});
                    })
                })
            });
        })
    },
    signIn: (object) => {
        return new Promise(function(resolve, reject){
            //checking if all fields are there
            if(object.email == null || object.password == null){
                resolve({"error": "fill all the fields"});
                return;
            }
            // looking for the requested sign in
            db.query(`SELECT * FROM users WHERE email = '${object.email}'`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                if(result[0] == null){
                    resolve({"error": "email does not exist"})
                    return;
                }
                bcrypt.compare(object.password, result[0].password).then((isTheSame) => {
                    if(!isTheSame){
                        resolve({"error": "password is wrong"})
                        return;
                    }
                    functions.userSessionGiver(result[0].email).then((theSession) =>{
                        resolve({"message": "logged in successfully", "session": theSession});
                    })
                })
            });
        })
    },
    forgetPassword: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = '${object.email}'`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                if(result[0] == null){
                    resolve({"error": "email does not exist"})
                    return;
                }
                /////////////////////
                // send email here //
                /////////////////////
                resolve({"message": "check your email for password"})
            });
        })
    },
    checkUserSession: functions.checkUserSession,
}

module.exports = usersModels;