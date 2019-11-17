var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/users');

var md5 = require('md5');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user[0].id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err,user);
		});
	});
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {
			process.nextTick(function() {
				User.getUserByEmail(email, function(err, user) {
					if (err)
						return done(err);
					if (user.length >= 1) {
						return done(null, false);
					} else {
						var newUser = new Object();
						var encryptedPassword = md5(password);
						newUser.email = email;
						newUser.password = password;
						newUser.name = req.body.name;
						User.createUser({email:email,name:req.body.name,password:encryptedPassword},function(error,rows){
							if(error)
								return done(null,false);
							if(rows){
								User.findById(rows.insertId, function(err, user){
									if(!err){
										return done(null,user);
									}
								});
							}
						});
					}
				});
			});
		}));

	 passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
    	User.getUserByEmail(email, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false,req.flash('signinErrorMessage', 'User Email is incorrect.'));
            if (md5(password) != user[0].password)
                return done(null, false, req.flash('signinErrorMessage', 'Password is incorrect.'));
            return done(null, user);
        });

    }));
};