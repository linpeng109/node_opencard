/**
 * Created by ceres on 16-8-14.
 */

var express = require('express');
var router = express.Router();

var needle = require('needle');
var fs = require('fs');
var debug = require('debug')('aaa')
var asycn = require('async');
var path = require('path');
var os = require('os');
var uuid = require('node-uuid');
var url = 'http://oap63jhn1.bkt.clouddn.com/20160722_110056.jpg';

var getUUID = function () {
    var result = uuid.v4();
    return result;
}

var getDownload = function () {
    var result = path.join(os.tmpdir(), "/camcard_image_" + getUUID() + ".png");

    return result;
}

var wget = function (callback) {
    var options = {
        output: getDownload()
    }
    needle.get(url, options, function (err, url, response, body) {
        if (err) {
            callback(err, null);
            return
        }
        console.log(options.output)
        callback(null, options.output);

    })
}

/**
 * ?user=lin.peng@all-pay.com.cn&pass=HFD6RGWPSRN59MD6&lang=524287
 *
 user: 'lin.peng@all-pay.com.cn',
 pass: 'HFD6RGWPSRN59MD6',
 lang: '524287',
 */
var getCamcardImageText = function (imageFile, callback) {
    var data = {
        upfile: {
            file: imageFile,
            type: 'file',
            content_type: 'image/png'
        }
    }
    var options = {
        multipart: true
    }
    needle.post('http://bcr2.intsig.net/BCRService/BCR_VCF2?user=lin.peng@all-pay.com.cn&pass=HFD6RGWPSRN59MD6&lang=524287', data, options, function (err, resp, body) {
        if (err) {
            console.error(err);
            callback(err, null);
        }
    }).on('readable', function () {
        var node;
        while (node = this.read()) {
            callback(null, node.toString());
        }
    });
};
router.get('/', function (req, res) {
    asycn.waterfall([wget, getCamcardImageText], function (err, result) {
        if (err) {
            console.error.bind(console, err);
        }
        console.log(result);
        res.jsonp(result);
    })
});
module.exports = router;