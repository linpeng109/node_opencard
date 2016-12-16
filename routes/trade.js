/**
 * Created by Mars on 2016/9/9.
 */
var express = require('express');
var router = express.Router();
var Trade = global.tradeDao.Trade;

router.get('/', function (req, res) {
    res.send('Welcome to trade page');
})

router.get('/insert', function (req, res) {

})

router.get('/findAll', function (req, res) {
    Trade.find({})
        .skip(0)
        .limit(20000)
        .exec()
        .then(function (docs) {
            res.jsonp(docs);
        })
        .catch(function (err) {
            console.error(err);
        });
})

module.exports = router;