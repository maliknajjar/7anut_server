const mysql = require('mysql');

//ading envirement variables
require('dotenv').config();

const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.DATABASEPORT
});

pool.getConnection((err, connection) => {
	if (err) throw err;
	console.log('database is Connected!');
	// listening after making sure database is connected
	require('./app').server.listen(process.env.PORT, ()=>{
		console.log("listening on port: " + process.env.PORT)
	});
});


/////////////////////////////////////
//          exit clean up          //
/////////////////////////////////////
function clean(){
    console.log("cleaned!!! woooooooooooooooooow")
    process.exit()
}

//do something when app is closing
process.on('exit', clean);

// //catches ctrl+c event
process.on('SIGINT', clean);
process.on('SIGTERM', clean);

// // catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', clean);
process.on('SIGUSR2', clean);

// //catches uncaught exceptions
process.on('uncaughtException', clean);

module.exports = pool;