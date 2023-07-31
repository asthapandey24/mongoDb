 const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
 const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://astha24:Astha@24@cluster0.7z9y5j7.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
 };

 const getDb = ()=>{
  if(_db){
    return _db;
  }
  throw 'no database found';
 }
 exports.mongoConnect = mongoConnect;
 exports.getDb = getDb;

