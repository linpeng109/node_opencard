/**
 * Created by Mars on 2016/8/12.
 */

const mongoose = require('mongoose');
mongoose.connect('mongodb://yunweiadmin:adminMiteno1@114.215.92.95:29017/admin')
const connnection = mongoose.connection;
connnection.once('open',function () {
    console.log('The mongoseDB opened successfully !')
})

module.exports = mongoose;