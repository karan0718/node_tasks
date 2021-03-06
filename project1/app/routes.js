module.exports = function(app, passport){
	app.get('/', function(req,res){
	res.render('index.ejs');
	});

	app.get('/login', function(req, res){
		res.render('auth/login', {message: req.flash('signinErrorMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true
    }));

	app.get('/signup', function(req,res){
		res.render('auth/register.ejs');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureFlash : true,
		failureRedirect : '/signup'
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', {
			user: req.user
		});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	app.get('/post/add', function(req,res){
		res.render('posts/add');
	});

};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}