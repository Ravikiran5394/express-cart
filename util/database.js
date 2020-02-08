const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/express-cart')
            .then(result =>{
                console.log('connected!');
            })
            .catch(err =>{
                console.log(err);
            });