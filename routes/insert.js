/**
 * Created by Mars on 2016/9/7.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Welcome to insert page!');
})

router.get('/user', function (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var department = req.query.department;

    var User = global.dao.User;
    var user = new User({userName: username, passWord: password, deparment: department});
    user.save(function (err, result) {
        if (err) {
            console.error(err)
            res.redirect('/failure')
        } else {
            console.log(result)
            res.redirect('/success')
        }
    })
})
module.exports = router;