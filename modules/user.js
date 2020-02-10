const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectID;
//  User class
class User {
  constructor(username, email,cart,id) {
    this.name = username;
    this.email = email;
    this.cart = cart;// {items:[]}
    this._id = id;
  }
  // Save method
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  // add to cart
  addToCart(product){
    // const cartProuct = this.cart.items.findIndex(cp => cp._id === product._id);
    const updatedCart = {items: [{...product,quantity:1}]};
    const db = getDb();
    db.collection('user').updateOne({_id: new ObjectId(this._id)},{$set:{cart:updatedCart}})
  }   
  // findById method
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
          return user;
      })
      .catch(err => {
          console.log(err)
      });
  }
}

// export User
module.exports = User;
