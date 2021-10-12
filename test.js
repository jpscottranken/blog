const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost:27017/blogdb');

// BlogPost.create({
//         title: "JPS - Title Of My First BLog Post",
//         body: "JPS - Body of my first blog post"
//     }, (err, blogpost) => {
//         console.log(err, blogpost);
// });

// BlogPost.create({
//     title: "JPS - Title Of My Second BLog Post",
//     body: "JPS - Body of my second blog post"
// }, (err, blogpost) => {
//     console.log(err, blogpost);
// });

// BlogPost.create({
//     title: "",
//     body: ""
// }, (err, blogpost) => {
//     console.log(err, blogpost);
// });

// BlogPost.find({}, (err, blogpost) => {
//     console.log(err, blogpost);
// });

// BlogPost.find({title: /Second/}, (err, blogpost) => {
//     console.log(err, blogpost);
// });

// BlogPost.find({body: /first/}, (err, blogpost) => {
//     console.log(err, blogpost);
// });

const id = "6165c95c19fe885294751ada";

// BlogPost.findById(id, (err, blogpost) => {
//     console.log(err, blogpost);
// });

// BlogPost.findByIdAndUpdate(id, 
//     {
//         title: "My New Updated Title",
//         body: "My New Updated Body"
//     },
//     (err, blogpost) => {
//         console.log(err, blogpost);
// })

BlogPost.findByIdAndDelete(id,(err, blogpost) => {
        console.log(err, blogpost);
})

