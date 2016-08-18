/**
 * Created by ceres on 16-8-14.
 */
var express = require('express');
var router = express.Router();

var uuid = require('node-uuid');
var os = require('os');
var path = require('path');
var needle = require('needle');
var tesseract = require('node-tesseract');
var async = require('async');


var getUUID = function () {
    var result = uuid.v4();
    return result;
}

var getDownload = function () {
    var result = path.join(os.tmpdir(), "/ocr_image_" + getUUID() + ".png");
    return result;
}

var url = 'http://oap63jhn1.bkt.clouddn.com/ee_20160720154323.png';

var wget = function (callback) {
    var options = {
        output: getDownload()
    }
    needle.get(url, options, function (err, url, response, body) {
        if (err) {
            callback(err, null);
            return
        }
        console.log("output=" + options.output)
        callback(null, options.output);

    })
}

var ocr = function (file, callback) {
    var options = {
        l: 'chi_sim',
        psm: 6
    }
    tesseract.process(file, options, function (err, text) {
        if (err) {
            callback(err, null);
            return;
        } else {
            callback(null, text);
        }
    });
}

router.get('/', function (req, res) {
    async.waterfall([wget, ocr], function (err, text) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(text)
        res.jsonp(text);
    })

})

module.exports = router;