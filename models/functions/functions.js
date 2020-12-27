let db = require("../../db");
let generator = require('generate-password');

module.exports = {
    isNumber: (number) => {
        return /^\d+$/.test(number);
    },
    userSessionGiver: (email) => {
        return new Promise((resolve, reject) => {
            let theDate = new Date();
            let sessionID = generator.generate({length: 15, numbers: true, symbols: true, uppercase: true, lowercase: true})
            let expireDate = theDate.getUTCFullYear() + "" + theDate.getUTCMonth() + "" + theDate.getUTCDate() + "" + theDate.getUTCHours() + 1;
            db.query(`SELECT * FROM sessions WHERE email = '${email}'`, function (error, result) {
                if(result[0] != null){
                    db.query(`UPDATE 7anut.sessions SET ID = '${sessionID}', expire_date = '${expireDate}' WHERE (email = '${email}')`, (error, result) => {
                        if(error) throw error;
                        resolve(sessionID);
                    })
                }else{
                    db.query(`INSERT INTO 7anut.sessions (ID, expire_date, email) VALUES ('${sessionID}', '${expireDate}', '${email}')`, function (error, result) {
                        if(error) throw error;
                        resolve(sessionID);
                    })
                }
            })
        })
    },
}