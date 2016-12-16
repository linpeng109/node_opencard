/**
 * Created by miteno on 2016/8/12.
 */
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;
var config = require('../lib/config');
var winston = require('winston');

/**
 * 数据库连接的事件处理
 */
mongoose.connection.once('open', function () {
    winston.info('MongoDB event open');
    winston.debug('MongoDB connected [%s]', config.databaseUrl);
});
mongoose.connection.on('connected', function () {
    winston.info('MongoDB event connected');
});
mongoose.connection.on('disconnected', function () {
    winston.warn('MongoDB event disconnected');
});
mongoose.connection.on('reconnected', function () {
    winston.info('MongoDB event reconnected');
});
mongoose.connection.on('error', function (err) {
    winston.error('MongoDB event error: ' + err);
});

/**
 * 创建数据库连接
 */
mongoose.connect(config.databaseUrl);

module.exports = mongoose;