const fs = require('fs');
const path = require('path')

const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductFromFile = callback =>{

    fs.readFile(p,(err,fileContent)=>{
        if(err){
            callback([]);
        }else{
            callback(JSON.parse(fileContent));
        }
        
    });
}
module.exports = class Product {
    constructor(id,title,imageUrl,description,price){
        this.id = id,
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){
        getProductFromFile(products =>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts =[...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts), (err) =>{
                    if(err)
                        console.log(err);
                })
            } else{
                this.id = Date.now().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products), (err) =>{
                if(err)
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id){
        getProductFromFile(products =>{
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }

    static fetchAll(callback){
        getProductFromFile(callback);
    }

    static findById(id,callback){
        getProductFromFile(products =>{
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}