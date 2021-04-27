let db = require("../db");

let models = {
    getCategories: function(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM categories ORDER BY `Arrangement`', function (error, result) {
                if (error) throw error;
                resolve(result);
            });
        })
    },
}

module.exports = models;