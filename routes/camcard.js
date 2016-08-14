/**
 * Created by ceres on 16-8-14.
 */
/**
 * Created by jupiter on 16-7-22.
 */
var needle = require('needle');
var fs = require('fs');

var data = {
    upfile: {
        file: '/home/jupiter/workset/workspace/node_ocr/20160722_110056.jpg',
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

needle.post('http://bcr2.intsig.net/BCRService/BCR_VCF2?user=lin.peng@all-pay.com.cn&pass=HFD6RGWPSRN59MD6&lang=524287', data, options, function (err, resp, body) {
    if (err) {
        console.error.bind(console, err);
    }
})
    .on('readable', function () {
        var node;
        while (node = this.read()) {
            console.log('got data: ', node.toString());
        }
    });
