const mysql = require('mysql');

let connection;

const db_config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '7anut'
}

let isListening = false;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log('database is Connected!');
    if(!isListening){
      require('./app').listen(8000, ()=>{
          console.log("listening on port 8000")
      });
      isListening = true;
    }
  });
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {                                      
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;