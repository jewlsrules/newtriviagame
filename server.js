//----------------------
//Dependencies
//----------------------
const express = require('express');
const app = express();
const methodOverride = require('method-override') //convert strings in forms
const mongoose = require('mongoose') //for database
const session = require('express-session') //for cookies
const bcrypt = require('bcrypt') //for password encryption
const base_url = 'https://crowdsommphp.herokuapp.com/api/'

const db = mongoose.connection
require('dotenv').config()

//----------------------
//PORT
//----------------------
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//----------------------
// Database
//----------------------
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// ----------------------
// Middleware
// ----------------------

//setting up cookies
app.use(session({
  //random string
  secret:'onetwofreddyscomingforyou',
  //dont worry about why this is false, just set it false
  resave:false,
  //dont worry about why this is false, just set it false
  saveUninitialized:false
}))

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON  - THIS IS FOR APIS

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


// //----------------------
// // Controllers
// //----------------------

// // Sessions controller
// const sessionsController = require('./controllers/sessions.js');
// app.use('/sessions', sessionsController)
//
// Users controller
// const usersController = require('./controllers/users.js');
// app.use('/users', usersController)
//
// //restaurants
// const restaurantsController = require('./controllers/restaurants.js');
// app.use('/restaurants', restaurantsController)

 //----------------------
 // Routes
 //----------------------
let startGame = false;
let count = 15
//every second, countdown by one
let countdown = () =>{
  setInterval(function() {
    count--
  }, 1000)
}

app.get('/' , (req, res) => {
  countdown();
  res.render('home.ejs', {
    startGame: startGame,
    count: count
  })
});
//
// //test for toggle view
// app.get('/content2', function (req, res) {
//     res.render('partials/content2.ejs');
// });

//----------------------
// Listener
//----------------------
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
