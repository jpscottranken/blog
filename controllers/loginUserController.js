const bcrypt = require('bcrypt');
const User   = require('../models/User');

module.exports = (req, res) => {
    //  Extract the username and the password from req.body
    const {username, password} = req.body;

    User.findOne({username: username}, (error, user) => {
        if (user) { //  This username was found
            bcrypt.compare(password, user.password, (error, match) => {
                if (match) {
                    //  Assign userID to the session
                    req.session.userId = user._id;
                    res.redirect('/');
                }
                else {
                    res.redirect('/auth/login');
                }
            });
        }
        else {
            res.redirect('/auth/login');
        }
    });
};