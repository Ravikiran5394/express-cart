const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/express-cart')
            .then(client =>{
                console.log('Database connected!');
                _db = client.db();
                callback();
            })
            .catch(err =>{
                console.log(err);
                throw err;
            });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw "Now database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// Testing Fetch command lets see if it works!!!!!!!!!!!!!
