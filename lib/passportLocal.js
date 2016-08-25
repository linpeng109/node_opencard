/**
 * Created by Mars on 2016/8/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    var User = global.dao.User;
    var user = new User({
        userName: username,
        passWord: password
    })
    User.findOne(user, function (err, result) {
        if (err) {
            console.error(err);
            done(err, false);
        } else {
            if (result) {
                done(null, false);
            } else {
                done(null, user)
            }
        }
    });
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