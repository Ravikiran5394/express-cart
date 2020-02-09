const getDb = require('../util/database').getDb;

class Product {
    constructor(title,price,description,imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    // Methods =>
    save(){
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result.insertedCount + " Product inserted!");
            })
            .catch(err =>{
                console.log(err);
            });
    }
    static fetchAll(){

    }
}
module.exports = Product