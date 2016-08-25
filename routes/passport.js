var express = require('express');
var passportLocal = require('../lib/passportLocal');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.get('/login', passportLocal.authenticate('local'), function (req, res) {
    var result = "req.isAuthenticated = " + req.isAuthenticated()
    console.log("req.isAuthenticated = " + result)
    res.jsonp({result: result});
});

router.post('/login', passportLocal.authenticate('local'), function (req, res) {
    var result = "req.isAuthenticated = " + JSON.stringify(req.session.passport);
    console.log("req.isAuthenticated = " + result)
    res.jsonp({result: result});
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;