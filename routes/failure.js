/**
 * Created by Venus on 2016/8/18.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('failure');
});

module.exports = router;