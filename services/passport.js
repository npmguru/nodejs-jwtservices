const passport       = require('passport');
const User           = require('../models/user');
const config         = require('../config');
const JwtStrategy    = require('passport-jwt').Strategy;
const ExtractJwt     = require('passport-jwt').ExtractJwt;
const LocalStrategy  = require('passport-local');


const localOption    = {usernameField : 'email'};
const localLogin     = new LocalStrategy(localOption, function(email,password,done){

    User.findOne({email: email}, function(err,user){
        if(err) {
            return done(err,false);
        }else if(!user){
           return done(null,false);
        }else{
            user.comparePassword(password, function(err,user){
                if(err){ 
                    return done(err); 
                }else if(err){ 
                    return done(null,false); 
                }else{
                    return done(null,user); 
                }

            });

        }   
    });
});

const jwtoption = {
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtoption, function(payload,done){
     
        User.findById(payload.sub, function(err,user){
             if(err) {
                 return done(err,false);
             }else if(user){
                return done(null,user);
             }else{
                return done(null,false);
             }      
        });

});

passport.use(jwtLogin);
passport.use(localLogin);















