/**
 * Created by Mars on 2016/8/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    function (username, password, done) {
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
                        message: 'login incorrect'
                    }
                    return done(null, false, result)
                }
                result = {
                    user: user,
                    message: 'login success'
                }
                return done(null, true, result);
            }
        );
    }
));

passport.auth = function (req, res, next) {
    var username = req.query.username;
    var password = res.query.password;


}

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