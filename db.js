const app = require('./app');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://malik:google44644@cluster0.3uo0s.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client){
    if(err){
        console.log(err)
    }else{
        console.log("the database is connected")
        module.exports = client.db("test")
        const app = require('./app')
        app.listen(5000, () => {
            console.log("server is listening at port 5000")
        })
    }
})