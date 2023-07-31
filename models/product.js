// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
  save(){
   const db = getDb();
    return db.collection('products')
   .insertOne(this)   // for multiple insertion we can write InsertMany() and it takes array of javascript objects
   .then(result=>{
    console.log(result);
   })   
   .catch(err=>{
    console.log(err);
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
