var express = require('express');
var passportLocal = require('../lib/passportLocal');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

router.get('/login', passportLocal.authenticate('local',
    function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        else {
            console.log("result = " + JSON.stringify(result));
            return result;
        }
    }),
    function (req, res) {
        console.log("a=" + req.isAuthenticated());
        var result = JSON.stringify(req.session.passport);
        console.log("result =" + JSON.stringify(result))
        res.jsonp({result: result});
    });
//
// router.post('/login', passportLocal.authenticate('local'), function (req, res) {
//     var result = JSON.stringify(req.session.passport);
//     console.log("result =" + result)
//     res.jsonp({result: result});
// });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;