const mysql = require('mysql');

//ading envirement variables
require('dotenv').config();

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

pool.getConnection((err, connection) => {
	if (err) throw err;
	console.log('database is Connected!');
	// listening after making sure database is connected
	require('./app').listen(process.env.PORT, ()=>{
		console.log("listening on port 8000")
	});
});

module.exports = pool;