/**
 * Created by ceres on 16-8-14.
 */
/**
 * Created by jupiter on 16-7-22.
 */
var needle = require('needle');
var fs = require('fs');
var debug = require('debug')('aaa')
var asycn = require('async');
var path = require('path');
var os = require('os');
var uuid = require('node-uuid');

const getUUID = function () {
    const result = uuid.v4();
    return result;
}

const getDownload = function () {
    const result = path.join(os.tmpdir(), "/camcard_image_" + "_" + getUUID() + ".png");
    return result;
}

const url = 'http://oap63jhn1.bkt.clouddn.com/20160722_110056.jpg';

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


var data = {
    upfile: {
        file: getDownload(),
        type: 'file',
        content_type: 'image/png'
    }
}

const options = {
    multipart: true
}
/**
 * ?user=lin.peng@all-pay.com.cn&pass=HFD6RGWPSRN59MD6&lang=524287
 *
 user: 'lin.peng@all-pay.com.cn',
 pass: 'HFD6RGWPSRN59MD6',
 lang: '524287',
 */
const getCamcardImageText = function (callback) {
    needle.post('http://bcr2.intsig.net/BCRService/BCR_VCF2?user=lin.peng@all-pay.com.cn&pass=HFD6RGWPSRN59MD6&lang=524287', data, options, function (err, resp, body) {
        if (err) {
            console.error.bind(console, err);
            callback(err, null);
        }
    }).on('readable', function () {
        var node;
        while (node = this.read()) {
            console.log('got data: ', node.toString());
            callback(null, node.toString())
        }
    });

}

asycn.waterfall([wget, getCamcardImageText], function (err, result) {
    if (err) {
        console.error.bind(console, err);

    }
    console.log(result);

})
