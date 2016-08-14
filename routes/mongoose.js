/**
 * Created by miteno on 2016/8/12.
 */


var mongoose = require('mongoose');
mongoose.connect('mongodb://yunweiadmin:adminMiteno1@114.215.92.95:29017/admin');
const db = mongoose.connection;
db.on('error', function (err) {
    console.error(err);
})
db.once('open', function () {
    console.log('The database is opened successfully !');


})
module.exports = mongoose;