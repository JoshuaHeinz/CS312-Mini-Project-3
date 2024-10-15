//import express module
const express = require('express');
//import body parser
const bodyParser = require('body-parser');
//import session
const session = require('express-session');
//import path for file handling
const path = require('path');

//initialize express app
const app = express();

//sets the engine to view EJS files
app.set('view engine', 'ejs');
//allows app to use things in "public" folder aka stylesheet
app.use(express.static(path.join(__dirname, 'public')));
//allows forms to be submitted
app.use(bodyParser.urlencoded({ extended: true }));

//configures the session to allow for logins
app.use(session(
    {
  //sessions secret key
  secret: 'secret-key',
  //Do not save the session unless modified
  resave: false,
  //Do not save uninitialized sessions
  saveUninitialized: false,
    }
    ));

//import blog route
const blogRoutes = require('./routes/blogRoutes');
//import user route
const userRoutes = require('./routes/userRoutes');

//use blog route
app.use('/blogs', blogRoutes);
//use user route
app.use('/users', userRoutes);

//start the server
app.listen(8000, () => 
    {
  console.log('Server is running on port 8000');
    }
);