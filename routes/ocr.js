/**
 * Created by ceres on 16-8-14.
 */
var express = require('express');
var router = express.Router();

const uuid = require('node-uuid');
const os = require('os');
const path = require('path');
const needle = require('needle');
const tesseract = require('node-tesseract');
const async = require('async');


const getUUID = function () {
    const result = uuid.v4();
    return result;
}

const getDownload = function () {
    const result = path.join(os.tmpdir(), "/ocr_image_" + getUUID() + ".png");
    return result;
}

const url = 'http://oap63jhn1.bkt.clouddn.com/ee_20160720154323.png';

const wget = function (callback) {
    const options = {
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

const ocr = function (file, callback) {
    const options = {
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