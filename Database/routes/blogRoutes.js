//import express module
const express = require('express');
//router
const router = express.Router();
//import database
const pool = require('../models/database');

//get all the blogs
router.get('/', (req, res) => 
    {
  //selects the blog from the data
  const query = 'SELECT * FROM blogs ORDER BY date_created DESC';
  //goes through the database
  pool.query(query, (err, result) => 
    {
    //renders the blog.ejs page
    res.render('blogs', { blogs: result.rows });
    });
});

//new blog creation
router.post('/create', (req, res) => 
    {
  //asks for title and body
  const { title, body } = req.body;
  //asks for name of creator
  const creatorName = req.session.userId;
  //puts the blog into a database
  const query = 'INSERT INTO blogs (creator_name, creator_user_id, title, body) VALUES ($1, $2, $3, $4)';
  pool.query(query, [creatorName, req.session.userId, title, body], (err, result) => {
    res.redirect('/blogs');
  });
});

//allows use across app
module.exports = router;