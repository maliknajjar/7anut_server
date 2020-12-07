const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '7anut'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('database is Connected!');
    // listening after making sure database is connected
    require('./app').listen(8000, ()=>{
        console.log("listening on port 8000")
    });
});

module.exports = connection;