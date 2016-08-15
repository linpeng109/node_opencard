/**
 * Created by ceres on 16-8-14.
 */

var express = require('express');
var router = express.Router();

const needle = require('needle');
const fs = require('fs');
const debug = require('debug')('aaa')
const asycn = require('async');
const path = require('path');
const os = require('os');
const uuid = require('node-uuid');
const url = 'http://oap63jhn1.bkt.clouddn.com/20160722_110056.jpg';

const getUUID = function () {
    const result = uuid.v4();
    return result;
}

const getDownload = function () {
    const result = path.join(os.tmpdir(), "/camcard_image_" + getUUID() + ".png");

    return result;
}

const wget = function (callback) {
    const options = {
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
const getCamcardImageText = function (imageFile, callback) {
    const data = {
        upfile: {
            file: imageFile,
            type: 'file',
            content_type: 'image/png'
        }
    }
    const options = {
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
            callback(null, node.toString())
        }
    });
};
router.get('/', function (req, res) {
    asycn.waterfall([wget, getCamcardImageText], function (err, result) {
        if (err) {
            console.error.bind(console, err);
        }
        console.log(result);
        res.send(result);
    })
});
module.exports = router;