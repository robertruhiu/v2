var User = require('./models/user');
var flash = require('connect-flash');
var Profile = require('./models/profile');

module.exports = function (app, passport) {




    app.get('/', function (req, res) {
        var messages = req.flash('error');
        res.render('users/signin', {layout: 'users',message: messages, hasErrors: messages.length >0 });
    });


    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {
        var messages = req.flash('error');
        res.render('users/signup', {layout: 'users',message: messages, hasErrors: messages.length >0 });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',
        failureRedirect: '/signup',
        failureFlash: true
    }));

   app.post('/profile', function (req,res) {

        var profile =new Profile({

            username:req.body.username,
            company:req.body.company
        });
        profile.save(function (err,result) {


            res.redirect('/index')

        })


    });


    app.get('/add-to-cart/:id', function (req, res) {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        Ofinterest.findById(productId, function (err, product) {
            if (err) {
                return res.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            req.flash('cartadd', 'added to cart');
            console.log(cart);
            res.redirect('/');
        });

    });



    app.get('/index',function (req, res, next) {
        res.render('cto/index');
    });

    app.get('/createproject',isLoggedIn, function (req, res, next) {
        res.render('cto/createproject');
    });

    app.get('/project',isLoggedIn, function (req, res, next) {
        res.render('cto/project');
    });

    app.get('/fullreport',isLoggedIn, function (req, res, next) {
        res.render('cto/fullreport');
    });

    app.get('/candidate', isLoggedIn,function (req, res, next) {
        res.render('candidate/candidate', {layout: 'candidatelayout'});
    });

    app.get('/details',isLoggedIn, function (req, res, next) {
        res.render('candidate/detailsproject', {layout: 'candidatelayout'});
    });


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/index');
}