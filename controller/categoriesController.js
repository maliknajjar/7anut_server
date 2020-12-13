let db = require("../db");

let categories = {
    getProducts: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM categories', function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    },
}

module.exports = categories;