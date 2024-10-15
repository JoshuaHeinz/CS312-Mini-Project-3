//import express module
const express = require('express');
//import router
const router = express.Router();
//import hashing
const bcrypt = require('bcryptjs');
//insert the database
const pool = require('../models/database');

//get the route for the register page
router.get('/register', (req, res) => {
  res.render('register');
});

//post the route
router.post('/register', async (req, res) => 
    {
  //extracts name and password
  const { name, password } = req.body;
  //hashes the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //checks if the username is taken
  const userCheckQuery = 'SELECT * FROM users WHERE name = $1';
  //puts the new user into the database
  const userInsertQuery = 'INSERT INTO users (name, password) VALUES ($1, $2)';

  //go through the database to find if the name already exists
  pool.query(userCheckQuery, [name], (err, result) => 
    {
    //goes through the rows
    if (result.rows.length > 0) 
        {
      //error message
      res.send('Username already taken!');
        } 
    else 
    {
      //allows user to login
      pool.query(userInsertQuery, [name, hashedPassword], (err, result) => {
        res.redirect('/users/login');
      });
    }
  });
 });

//Login route
router.get('/login', (req, res) => {
  res.render('login');
});

//route to handle logins
router.post('/login', (req, res) => 
    {
  const { name, password } = req.body;
  const userSelectQuery = 'SELECT * FROM users WHERE name = $1';

  //checks if user name exists
  pool.query(userSelectQuery, [name], async (err, result) => {
    if (result.rows.length === 0) 
      {
      //no user is found
      res.send('Invalid username or password!');
      } 
      else 
      {
      //checks the password 
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) 
      {
        //allows user into the blog
        req.session.userId = user.user_id;
        res.redirect('/blogs');
      } 
      //error message
      else 
      {
        res.send('Invalid username or password!');
      }
    }
  });
});

//allows use in app
module.exports = router;