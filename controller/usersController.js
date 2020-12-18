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
    createUsers: function(email, fullName, password, phoneNumber){
        return new Promise(function(){
            db.query(`INSERT INTO \`7anut\`.\`users\` (\`email\`, \`fullName\`, \`password\`, \`phoneNumber\`) VALUES ('${email}', '${fullName}', '${password}', '${phoneNumber}')`, (error, result) => {
                if (error) throw error;
                resolve(result);
            })
        })
    }
}

module.exports = users;