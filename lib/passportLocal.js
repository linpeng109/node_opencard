/**
 * Created by Mars on 2016/8/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    console.log('localstrategy');
    if(username==='abc'){
        done(null,username);
    }else{
        done('not a user');
    }
}));

passport.serializeUser(function (user, callback) {
    callback(null, user.userName);
});

passport.deserializeUser(function (id, cb) {
    var User = global.User;
    User.findOne({userName: id}, function (err, user) {
        if (err) {
            console.error(err);
            cb(err, null);
        }
        cb(null, user);
    });
});

module.exports = passport;