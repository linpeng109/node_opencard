var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',
    function (req, res, next) {
        req.aaa = 'aaa';
        next();
    },
    function (req, res, next) {
        console.log(req.aaa)
        res.send('This is a security page');
    });

module.exports = router;
