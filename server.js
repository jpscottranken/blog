const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { reset } = require('nodemon');
const port = process.env.PORT || 8888;
const app = express();

//  Add middleware
app.use(express.static('public'));

//  Set view engine
app.set('view engine', 'ejs');

//  Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/blogdb');

const BlogPost = require('./models/BlogPost');

//  Start creating routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/posts', (req, res) => {
    res.render('post');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`App up and running on port ${port}`);
});