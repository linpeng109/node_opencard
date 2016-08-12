/**
 * Created by miteno on 2016/8/12.
 */
var express = require('express');
var router = express.Router();

var  mongoose = require('mongoose');
mongoose.connect('mongodb://yunweiadmin:adminMiteno1@114.215.92.95:29017/admin');
const db = mongoose.connection;
db.on('open',function () {
    console.log('The database is opened successfully !');
})

module.exports = router;