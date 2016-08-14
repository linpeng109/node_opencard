/**
 * Created by ceres on 16-8-14.
 */
var express = require('express');
var router = express.Router();

var qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = 'ukoBmyYilY6szsAwM6ooe21Fa2w_XwFehpqITf1b';
qiniu.conf.SECRET_KEY = '2W4d4tqWhVyo4axbga01EZhxZRiXCWl9x3NO_oYV';

/**
 * 上传目录
 */
var bucket = 'opencard';

/**
 * 上传后的文件名
 */
key = 'my-cark-pic-name.png';

/**
 * Get token function
 */
var getToken = function (bucket, key) {
    console.log("bucket=" + bucket + ";key=" + key);
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    var token = putPolicy.token();
    return token;
}
/**
 * qiniu root
 */
router.get('/', function (req, res) {
    var bucket = req.query.bucket;
    var key = req.query.key;
    var token = getToken(bucket, key);
    console.log(token);
    res.send(token);
})

module.exports = router;