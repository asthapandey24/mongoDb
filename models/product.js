// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId){
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id): null ;
    this.userId = userId;
  }
  save(){
   const db = getDb();
   let dbOp;
   if(this._id){
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set : this}) // $set is a reserved keyword in mongoDb
   }else{
      dbOp = db.collection('products').insertOne(this);
   }
  //   return db.collection('products')
  //  .insertOne(this)   // for multiple insertion we can write InsertMany() and it takes array of javascript objects
   return dbOp
  .then(result=>{
    console.log(result);
   })   
   .catch(err=>{
    console.log(err);
   })                                         
  }


   static fetchAll(){
    const db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then(products =>{
      console.log(products);
      return products;
    })
    .catch(err =>{
      console.log(err);
    })
   }

   static findById(prodId){
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId) }).next().then(product =>{
      console.log(product);
      return product;
    }).catch(err =>{
      console.log(err);
    })
   }

   static deleteById(prodId){
    const db = getDb();
     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
     .then(result =>{
      console.log('Deleted');
     })
     .catch(err =>{
      console.log(err)
     })
   }






}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
