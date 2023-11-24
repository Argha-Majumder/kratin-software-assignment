const User = require('../models/user');

module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Register yourself"
    });
}

module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Log In"
    });
}