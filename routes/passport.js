/**
 * Created by Mars on 2016/8/15.
 */
const express = require('express');
const router = express.Router();

const User = global.dao.User;
router.get('/', function (req, res) {
    const my = User.findOneByName('c5ce0a0a-3337-43ed-852c-1015baecc092', function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result.userName);
        console.log(result.passWord);
    })

});

module.exports = router;