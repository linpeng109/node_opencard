/**
 * Created by miteno on 2016/8/12.
 */
var mongoose = require('mongoose');
var config = require('../lib/config');
mongoose.connect(config.databaseUrl);
var db = mongoose.connection;
db.on('error', function (err) {
    console.error(err);
})
db.once('open', function () {
    console.log('The database is opened successfully !');


})
module.exports = mongoose;