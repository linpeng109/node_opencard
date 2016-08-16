/**
 * Created by Mars on 2016/8/15.
 */
const express = require('express');
const router = express.Router();

const passportLocal = require('../public/script/passportLocal');

router.get('/', passportLocal.authenticate('local', {}), function (req, res) {
    res.send('welcom to passportlocal page')
});

router.get('/login', function (req, res) {
    const userName = req.query.userName;
    const passWord = req.query.passWord;

})

module.exports = router;