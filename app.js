const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const errorController = require('./controllers/error')

const User = require('./models/user');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/bikeBooking';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection:'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const customerRoutes = require('./routes/customer');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash());

app.use(customerRoutes);
app.use('/admin',adminRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
    console.log('Connected!');
  })
  .catch(err => {
    console.log(err);
  });