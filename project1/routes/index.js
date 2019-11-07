module.exports = function(app,passport){
	app.get('/', function(req,res){
		res.render('index.ejs');
	});
	app.get('/login',function(request,response){
		response.render('auth/login');
	});
	app.post('/login', function(request,response){
		console.log(request.body);
	});
	app.get('/signup',function(request,response){
		response.render('auth/register');
	});
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup'
    }));
    app.get('/profile', isLoggedIn, function(req, res){
    	console.log(req.user);
		// res.render('profile.ejs', {
		// 	user: req.user
		// });
	});
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}


