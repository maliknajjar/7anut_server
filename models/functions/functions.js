let db = require("../../db");
let generator = require('generate-password');
let moment = require('moment');

// define the maximum age of session's validity
let sessionAgeInHours = process.env.APPUSERSESSIONEXP; 

module.exports = {
    isNumber: (number) => {
        return /^\d+$/.test(number);
    },
    userSessionGiver: (email, deviceID) => {
        return new Promise((resolve, reject) => {
            let sessionID = generator.generate({length: 16, numbers: true, symbols: true, uppercase: true, lowercase: true})
            let expireDate = moment().utc(1).add(sessionAgeInHours, "hours").format('YYYYMMDDHH');
            db.query(`SELECT * FROM sessions WHERE email = ${db.escape(email)} AND device_id = ${db.escape(deviceID)}`, function (error, result) {
                if(result[0] != null){
                    db.query(`UPDATE 7anut.sessions SET ID = ${db.escape(sessionID)}, expire_date = ${db.escape(expireDate)} WHERE (device_id = ${db.escape(deviceID)})`, (error, result) => {
                        if(error) throw error;
                        resolve(sessionID);
                    })
                }else{
                    db.query(`INSERT INTO 7anut.sessions (ID, device_id, expire_date, email) VALUES (${db.escape(sessionID)}, ${db.escape(deviceID)}, ${db.escape(expireDate)}, ${db.escape(email)})`, function (error, result) {
                        if(error) throw error;
                        resolve(sessionID);
                    })
                }
            })
        })
    },
    checkUserSession: (object) => {
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM sessions WHERE ID = ${db.escape(object.sessionID)}`, function (error, result) {
                if (error){
                    resolve({"error": error});
                    return;
                }
                if(result[0] == null){
                    resolve({"error": "session does not exist"})
                    return;
                }
                if(result[0].email != object.email){
                    resolve({"error": "this is not your session"})
                    return;
                }
                if(Number(result[0].expire_date) < Number(moment().utc(1).format('YYYYMMDDHH'))){
                    resolve({"error": "session has expired"})
                    return;
                }
                // resetting the time to count from the beggining
                let expireDate = moment().utc(1).add(sessionAgeInHours, "hours").format('YYYYMMDDHH');
                db.query(`UPDATE 7anut.sessions SET expire_date = ${db.escape(expireDate)} WHERE (ID = ${db.escape(object.sessionID)})`, function (theerror, result) {
                    if (theerror){
                        resolve({"error": theerror});
                        return;
                    }
                    resolve({"message": "session is very valid"})
                })
            });
        })
    },
    leaveEverything: (email) => {
        db.query(`SELECT * FROM users WHERE email = ${db.escape(email)}`, function (error, result) {
            if (error) throw error;
            console.log(JSON.parse(result[0].basket)["17"])
        })
    }
}