const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect; // by doing this we can connect with databse as well as can do insert or other operation
//const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//    User.findById('64c8af67a5732937071564c8')
//      .then(user => {
//        req.user = new User (user.name, user.email, user.cart, user._id);
//        next();
//      })
//      .catch(err => console.log(err));
//    // next();
// });

app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect(
  'mongodb+srv://astha24:Astha%4024@cluster0.7z9y5j7.mongodb.net/'
  ).then(result =>{
  app.listen(3000);
}).catch(err =>{
  console.log(err);
})






