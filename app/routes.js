var User = require('./models/user');
var flash = require('connect-flash');
var Profile = require('./models/profile');

module.exports = function (app, passport) {



    app.get('/', function (req,res) {
        res.render('landing/home',{layout: 'homelayout'})

    })

    app.get('/login', function (req, res) {
        var messages = req.flash('error');
        res.render('users/signin', {layout: 'users',message: messages, hasErrors: messages.length >0 });
    });


    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {
        var messages = req.flash('error');
        res.render('users/signup', {layout: 'users',message: messages, hasErrors: messages.length >0 });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', function (req, res) {
        var messages = req.flash('error');
        res.render('users/profile', {layout: 'users',message: messages, hasErrors: messages.length >0 });
    });

    app.post('/profile' ,function (req,res) {

        var profile =new Profile({

            username:req.body.username,
            company:req.body.company,
            position:req.body.position
        });
        profile.save(function (err,result) {
            res.redirect('/index')
        })

    });









    app.get('/index',function (req, res, next) {
        res.render('cto/index');
    });


    app.get('/library', function (req, res, next) {
        res.render('cto/library');
    });

    app.get('/custom', function (req, res, next) {
        res.render('cto/custom');
    });
    app.get('/requirements', function (req, res, next) {
        res.render('cto/require');
    });

    app.get('/invites', function (req, res, next) {
        res.render('cto/invites');
    });
    app.get('/invoice', function (req, res, next) {
        res.render('cto/payment');
    });



    app.get('/project', function (req, res, next) {
        res.render('cto/project');
    });

    app.get('/fullreport', function (req, res, next) {
        res.render('cto/fullreport' ,{layout: 'reportlayout'});
    });

    app.get('/candidate',function (req, res, next) {
        res.render('candidate/candidate', {layout: 'candidatelayout'});
    });

    app.get('/details', function (req, res, next) {
        res.render('candidate/detailsproject', {layout: 'candidatelayout'});
    });



};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}