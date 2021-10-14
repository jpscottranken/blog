const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8888;
const app = express();
const validationMiddleware = require('./middleware/validationMiddleware');

//  Add middleware
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));
app.use('/posts/store', validationMiddleware);

//  Set view engine
app.set('view engine', 'ejs');

//  Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/blogdb');

//  Start creating routes
const homeController        = require('./controllers/homeController');
const postController        = require('./controllers/postController');
const showOnePostController = require('./controllers/showOnePostController');
const newPostController     = require('./controllers/newPostController');
const storePostController   = require('./controllers/storePostController');

app.get('/post', postController);
app.get('/', homeController);
app.get('/post/:id', showOnePostController);
app.get('/posts/new', newPostController);
app.post('/posts/store', storePostController);

app.listen(port, () => {
    console.log(`App up and running on port ${port}`);
});