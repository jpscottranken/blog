const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8888;
const app = express();
const validationMiddleware = require('./middleware/validationMiddleware');
const authUserMiddleware = require('./middleware/authUserMiddleware');
const userNotAuthenticatedMiddleware = require('./middleware/userNotAuthenticatedMiddleware');
const expressSession = require('express-session');
const flash = require('connect-flash');

//  Add middleware
app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));
app.use('/posts/store', validationMiddleware);
app.use(expressSession({
     secret: 'secretkey2'
}));

app.use(flash());

global.loggedIn = null;
global.errors = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

//  Set view engine
app.set('view engine', 'ejs');

//  Connect to Mongoose
mongoose.connect('mongodb+srv://user1:iFL4mA4jRSGGYWHg@sandbox.xd2pm.mongodb.net/blog');

//  Start creating routes
const homeController        = require('./controllers/homeController');
const postController        = require('./controllers/postController');
const showOnePostController = require('./controllers/showOnePostController');
const newPostController     = require('./controllers/newPostController');
const storePostController   = require('./controllers/storePostController');
const newUserController     = require('./controllers/newUserController');
const storeUserController   = require('./controllers/storeUserController');
const loginController       = require('./controllers/loginController');
const loginUserController   = require('./controllers/loginUserController');
const logoutController      = require('./controllers/logoutController');

app.get('/', homeController);
app.get('/post', postController);
app.get('/post/:id', showOnePostController);
app.get('/posts/new', authUserMiddleware, newPostController);
app.post('/posts/store', authUserMiddleware, storePostController);
app.get('/auth/register', userNotAuthenticatedMiddleware, newUserController);
app.post('/users/register', userNotAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', userNotAuthenticatedMiddleware, loginController);
app.post('/users/login', userNotAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);

app.use((req, res) => {
    res.render('notfound');
});

app.listen(port, () => {
    console.log(`App up and running on port ${port}`);
});