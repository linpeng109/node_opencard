/**
 * Created by Mars on 2016/8/15.
 */
var express = require('express');
var router = express.Router();

var passportLocal = require('./passportLocal');

router.get('/', function (req, res) {
    res.send('welcom to passportlocal page')
});

router.get('/login', function (req, res) {
    var userName = req.query.userName;
    var passWord = req.query.passWord;

})

module.exports = router;