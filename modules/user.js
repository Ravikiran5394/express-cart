const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectID;
//  User class
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items:[{product: xyz, quantity: num}], totalPrice: price}
    this._id = id;
  }
  // Save method
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  // add to cart
  addToCart(product) {
    const cartProuctIndex = this.cart.items.findIndex(
      cp => cp.productId.toString() === product._id.toString()//Treat both Ids as string for comparison
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProuctIndex >= 0){
      newQuantity = this.cart.items[cartProuctIndex].quantity + 1;
      updatedCartItems[cartProuctIndex].quantity = newQuantity;
    }else{
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity })
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
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
        console.log(err);
      });
  }
}

// export User
module.exports = User;
