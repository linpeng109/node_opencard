var express = require('express');
var passportLocal = require('../lib/passportLocal');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.get('/login',
    passportLocal.authenticate('local',
        function (err, isAuth, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("isAuth = " + JSON.stringify(isAuth));
                console.log("result = " + JSON.stringify(result));
            }
        })
);

router.get('/check', require('connect-ensure-login').ensureLoggedIn, function (req, res) {
    res.redirect('/success');

})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

var auth = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/failure');
    }
}

router.get('/ping', auth, function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;