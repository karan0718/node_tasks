const bCrypt = require('bcrypt-nodejs');
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');

module.exports = function(passport) {
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            request = req.body;
            const generateHash = function(){
                return bCrypt.hashSync(password,bCrypt.genSaltSync(8),null);
            }
            connection.query(userModel.findUserByEmail(email),(err,result) => {
                if(err)
                    return done(null, false, "Database error while checking user email.");
                if(result.length > 0){
                    return done(null, false, "Email is already used");
                }else{
                    const userPassword = generateHash(password);
                    let user = new userModel(request.name,request.email,userPassword,request.type);
                    user = connection.query(user.addUser(), (err,result) => {
                        if(err)
                            return done(null, false, "Database error while adding user.");
                        if(result.insertId > 0){
                            connection.query(userModel.findUserById(result.insertId),(err,result) => {
                                if(err)
                                    return done(null, false, "Database error while checking user email.");
                                if(result.length > 0){
                                    req.session.isLoggedIn = true;
                                    req.session.user = result[0];
                                    return done(null, result[0]);
                                }
                                else{
                                    return done(null,false);
                                }
                            })
                        }else{
                            return done(null,false);
                        }

                    })
                }
            });
        }

    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback    
        },
        function(req,email,password, done) {
            const isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(userpass,password)
            }
            request = req.body;
            connection.query(userModel.findUserByEmail(email), (err,response) => {
                if(err)
                    done(null, false, "Databse connectivity isuue");
                if(!response.length > 0 || response.length == 0){
                    done(null,false, "No user found with matching email id");
                }else{
                    const user = response[0];
                    if(!isValidPassword(password,user.password)){
                        done(null,false,"Password is incorrect");
                    }
                    else{
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        done(null,user);
                    }
                }
            });
        }
    ))

    passport.serializeUser(function(user,done){
        done(null,user.id)
    });

    passport.deserializeUser(function(id, done) {
        connection.query(userModel.findUserById(id), (err,response) => {
            if(err)
                throw err;
            if(response.length > 0){
                done(null, response[0]);
            }else{
                done('error', null)
            }
        });
    });
}