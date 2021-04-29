let db = require("../db");
let mail = require("../mailer");
let validator = require("email-validator");
let functions = require("./functions/functions")
let bcrypt = require('bcrypt');
var generator = require('generate-password');
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

            //removeing white space from email
            object.email = object.email.replace(/\s/g,'')

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
                db.query(`INSERT INTO 7anut.users (email, fullName, password, phoneNumber, favourite) VALUES (${db.escape(object.email)}, ${db.escape(object.fullName)}, ${db.escape(hash)}, ${db.escape(object.phoneNumber)}, "")`, (error, result) => {
                    if (error){
                        resolve({"error": error.code});
                        return;
                    }
                    functions.userSessionGiver(object.email, object.deviceID).then((theSession) =>{
                        resolve({"message": "account created successfully", "session": theSession, "fullName": object.fullName, "phoneNumber": object.phoneNumber, "email": object.email});
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
            
            //removeing white space from email
            object.email = object.email.replace(/\s/g,'')

            // looking for the requested sign in
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, function (error, result) {
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
                    functions.userSessionGiver(result[0].email, object.deviceID).then((theSession) =>{
                        resolve({"message": "logged in successfully", "session": theSession, "fullName": result[0].fullName, "phoneNumber": result[0].phoneNumber, "email": result[0].email});
                    })
                })
            });
        })
    },
    forgetPassword: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                if(result[0] == null){
                    resolve({"error": "email does not exist"})
                    return;
                }
                // generate password
                let pin = generator.generate({length: 6, numbers: true});
                let html = `<!DOCTYPE html>
                <html lang="en" style="height: 100%;">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body style="display: flex; justify-content: center; align-items: center; padding: 25px; background-color: #fffcdc; height: 100%;">
                    <div class="container" style="max-width: 500px; width: 100%; border-radius: 15px; overflow: hidden;">
                        <div class="title" style="display: flex; justify-content: center; padding: 15px; background-color: #fff385;"><img style="height: 30px;" src="https://7anut.app/images/logo-01.png" alt=""></div>
                        <div class="pin" style="background-color: #FFF7AE; padding: 25px; justify-content: center; display: flex; font-size: x-large;">Your pin code is:&nbsp;<span style="font-weight: bold;">${pin}</span></div>
                    </div>
                </body>
                <style>
                    *{
                        box-sizing: border-box;
                    }
                    .title{
                        position: relative;
                        box-shadow: 2px 1px 22px -2px rgba(0,0,0,0.19);
                        -webkit-box-shadow: 2px 1px 22px -2px rgba(0,0,0,0.19);
                        -moz-box-shadow: 2px 1px 22px -2px rgba(0,0,0,0.19);
                    }
                    .container{
                        position: relative;
                        box-shadow: 2px 1px 30px -5px rgba(0,0,0,0.25);
                        -webkit-box-shadow: 2px 1px 30px -5px rgba(0,0,0,0.25);
                        -moz-box-shadow: 2px 1px 30px -5px rgba(0,0,0,0.25);
                    }
                </style>
                </html>`
                let timeout = moment().utc(1).add(15, "minutes").format('YYYYMMDDHHmm')
                // add it to the database with a timeoutfield
                db.query(`UPDATE 7anut.users SET pin = ${db.escape(JSON.stringify({pin: pin, timeout: timeout}))} WHERE (email = ${db.escape(object.email)});`, function (error, result) {
                    if (error){
                        resolve({"error": error});
                        return;
                    }
                    mail(object.email, "forgot password pin", html)
                    resolve({"message": "Check your email for pin"})
                });
            });
        })
    },
    changeForgottenPassword: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                if(result[0] == null){
                    resolve({"error": "email does not exist"})
                    return;
                }
                // check if the pin is not timed out
                if(JSON.parse(result[0].pin)["timeout"] < moment().utc(1).format('YYYYMMDDHHmm')){
                    resolve({"error": "the pin is not valid anymore"})
                    return;
                }
                // check if the pin is correct
                if (object.pin != JSON.parse(result[0].pin)["pin"]){
                    resolve({"error": "pin is not correct"})
                    return;
                }
                // change the password here
                bcrypt.hash(object.newPassword, 10).then(function(hash) {
                    db.query(`UPDATE 7anut.users SET password = ${db.escape(hash)} WHERE (email = ${db.escape(object.email)});`, function (error, result) {
                        if (error){
                            resolve({"error": error});
                            return;
                        }
                        // delete all sessions from the database
                        db.query(`DELETE FROM sessions WHERE email = ${db.escape(object.email)};`, function (error, result) {
                            if(error) throw error;
                        });
                        // closing any open connection with the same email
                        require("../app").wss.clients.forEach((client) => {
                            if(client.email == object.email){
                                client.close()
                            }
                        })
                        resolve({"message": "Successfully Changed Password"})
                    });
                });
            });
        })
    },
    editProfile: (object) => {
        return new Promise(function(resolve, reject){
            // changing the name
            if(object.type == "full name"){
                db.query(`UPDATE 7anut.users SET fullName = ${db.escape(object["inputs"]["new name"])} WHERE (email = ${db.escape(object.email)});`, function (error, result) {
                    if (error){
                        resolve({"error": error});
                        return;
                    }
                    resolve({"message": `${object.type} changed successfully`, "value": object["inputs"]["new name"]})
                });
            }
            else if(object.type == "phone number"){
                db.query(`UPDATE 7anut.users SET phoneNumber = ${db.escape(object["inputs"]["new phone Number"])} WHERE (email = ${db.escape(object.email)});`, function (error, result) {
                    if (error){
                        resolve({"error": error});
                        return;
                    }
                    resolve({"message": `${object.type} changed successfully`, "value": object["inputs"]["new phone Number"]})
                });
            }
            else if(object.type == "password"){
                db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, function (error, result) {
                    if (error){
                        resolve({"error": error});
                        return;
                    }
                    bcrypt.compare(object["inputs"]["old password"], result[0].password).then((boolean) => {
                        if(!boolean){
                            resolve({"error": "old password is wrong"});
                            return;
                        }
                        bcrypt.hash(object["inputs"]["new password"], 10).then((hash) => {
                            db.query(`UPDATE 7anut.users SET password = ${db.escape(hash)} WHERE (email = ${db.escape(object.email)});`, function (error, result) {
                                if (error){
                                    resolve({"error": error});
                                    return;
                                }
                                // delete all sessions from the database
                                db.query(`DELETE FROM sessions WHERE email = ${db.escape(object.email)} AND ID NOT IN(${db.escape(object.sessionID)});`, function (error, result) {
                                    if(error) throw error;
                                });
                                resolve({"message": `${object.type} changed successfully`}) 
                            });
                        })
                    })
                });
            }
            else{
                resolve({"error": "didnt recieve the correct type"})
                return
            }
        })
    },
    activateUser: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`UPDATE users SET isReal=1 WHERE email = ${db.escape(object.email)}`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                resolve({"message": "success"})
            });
        })
    },
    CheckIsBanned: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM users WHERE email = ${db.escape(object.email)}`, function (error, result) {
                if (error){
                    throw error
                    return;
                }
                if(result[0] != undefined){
                    if (result[0].isBanned){
                        resolve({"error": "this account was banned"});
                        return;
                    }
                }
                resolve({"message": "success"})
            });
        })
    },
    checkUserSession: functions.checkUserSession
}

module.exports = usersModels;