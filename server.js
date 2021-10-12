const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');
const port = process.env.PORT || 8888;
const app = express();

//  Add middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Set view engine
app.set('view engine', 'ejs');

//  Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/blogdb');

const BlogPost = require('./models/BlogPost');

//  Start creating routes
app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/posts', (req, res) => {
    res.render('post');
});

app.get('/post/:id', async(req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/posts/new', (req, res) => {
    res.render('create');
    createPost: true;
});

app.post('/posts/store', async (req, res) => {
    //console.log(req.body);
    await BlogPost.create(req.body, (err, blogpost) => {
        res.redirect("/")
    });
});

app.listen(port, () => {
    console.log(`App up and running on port ${port}`);
});