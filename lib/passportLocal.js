/**
 * Created by Mars on 2016/8/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    var User = global.dao.User;
    var condition = {
        userName: username,
        passWord: password
    }
    var result = {};
    User.findOne(condition, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user === null) {
                result = {
                    message: 'user or password is error!'
                }
                return done(null, result)
            }
            result = {
                user: user,
                message: 'success!'
            }
            return done(null, result);
        }
    );
}));

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    var User = global.User;
    User.findOne({_id: id}, function (err, user) {
        if (err) {
            console.error(err);
            cb(err, null);
        }
        cb(null, user);
    });
});


module.exports = passport;