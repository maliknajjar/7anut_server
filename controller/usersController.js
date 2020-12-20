let db = require("../db");

let users = {
    getAllUsers: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM users', function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    },
    createUser: function(object){
        return new Promise(function(resolve, reject){
            db.query(`INSERT INTO \`7anut\`.\`users\` (\`email\`, \`fullName\`, \`password\`, \`phoneNumber\`) VALUES ('${object.email}', '${object.fullName}', '${object.password}', '${object.phoneNumber}')`, (error, result) => {
                if (error) reject(error.code);
                resolve(result);
            })
        })
    },
    validateRegisterInformation: function(object){

    }
}

module.exports = users;