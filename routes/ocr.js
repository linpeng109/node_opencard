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
    const result = path.join(os.tmpdir(), "/ocr_image_" + "_" + getUUID() + ".png");
    return result;
}

const url = 'http://oap63jhn1.bkt.clouddn.com/ee_20160720154323.png';

var wget = function (callback) {
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

var ocr = function (file, callback) {
    const options = {
        l: 'chi_sim',
        psm: 6
    }
    tesseract.process(file, options, function (err, text) {
        if (err) {
            callback(err, null);
            return;
        } else {
            callback(null, file, text);
        }
    });
}
//const imageFile = 'ocr_image__8629f8c3-e3e2-4ef6-9042-21cd11d94ba4.png';
//ocr_image__6ffb72f7-9144-4d94-b843-efcce9828078.png
//ocr_image__8629f8c3-e3e2-4ef6-9042-21cd11d94ba4.png
//ocr_image__a314e818-daab-452e-9a17-c938abdfd820.png
//ocr_image__a9afcf04-3467-4eaf-b7be-10d80100e631.png
// wget(function (err, file) {
//     if (err) {
//         console.error.bind(console, err);
//         return;
//     }
//
//
// })

// ocr('/tmp/ocr_image__4423c4b6-8a2a-4c22-89e4-c60a5561ec67.png', function (err, file, text) {
//     if (err) {
//         console.error.bind(console, err)
//     }
//     console.log(text);
// })
router.get('/',function (req, res) {
    async.waterfall([wget, ocr], function (err, file, text) {
        if (err) {
            console.error.bind(console, err);
        }
        console.log(text)
        res.send(text);
    })

})

module.exports = router;