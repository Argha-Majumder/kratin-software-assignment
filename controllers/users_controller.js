const User = require('../models/user');
console.log("user controller ");

module.exports.profile = (req, res) => {
    console.log(req.params);
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile', {
            title: "Profile Page",
            user: user
        })
    }).catch((err)=>console.log(err));
}

module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Register yourself"
    });
}

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/home');
    }
    return res.render('user_sign_in', {
        title: "Log In"
    });
}

module.exports.create = (req, res) => {
    //console.log(req);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    //console.log('in create user controller');
    User.findOne({email: req.body.email}).then((user)=> {
        if (!user) {
            User.create(req.body).catch((err)=>console.log("Error in signing up user"));
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    }).catch(err=>console.log("Error in finding user signing up"));
}

module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    return res.redirect('/');
}