/**
 * Created by ceres on 16-8-14.
 */
var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
    var User = global.dao.User;
    var result={}
    User.findAll(function (err,result) {
        if(err){
            console.error.bind(console,err);
        }
        res.jsonp(result)
    })
})

module.exports = router;