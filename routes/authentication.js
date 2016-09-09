/**
 * Created by Mars on 2016/8/30.
 */
var express = require('express');
var router = express.Router();
var config = require('../lib/config');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
    res.send('Welcome to Authentication with Token');
});

router.get('/login', function (req, res) {
    var username = req.query.username || req.body.username;
    var password = req.query.password || req.body.password;

    var User = global.dao.User;
    User.findOne({
        userName: username
    }, function (err, user) {
        if (err) throw err;
        if (user === null) {
            res.jsonp({
                success: false,
                message: 'Authentication failed. User not found.'
            })
        } else if (user) {
            if (!user.passWord === req.query.password) {
                res.jsonp({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                })
            } else {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: config.expiresIn
                });
                res.jsonp({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                })
            }
        }

    });
})

router.get('/checkToken', function (req, res, next) {
    // res.setType('application/json');
    var token = req.query.token || req.body.token || req.headers['x-access-token'];
    if (token) {
        console.log('token=' + token);
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                return res.jsonp({
                    success: false,
                    message: 'Failed to authenticate token,'
                })
            } else {
                req.decode = decode;
                console.log(decode)
                res.jsonp({
                    success: true,
                    message: 'Enjoy your token',
                    decode: decode,
                    token: token
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'Not token provided.'
        })
    }
})

module.exports = router;