/**
 * Created by ceres on 16-8-14.
 * 参考资料
 * http://note.youdao.com/yws/public/redirect/share?id=d6c1f6afcb84c1ac13d1a3b4925e9725&type=false
 */
var express = require('express');
var router = express.Router();

/**
 * 分页查询
 */
router.get('/findByPage', function (req, res, next) {
    var User = global.dao.User
    var pageSize = req.query.pageSize;
    var pageNum = req.query.pageNum;
    User.find({})
        .skip(pageSize * (pageNum - 1))
        .limit(pageSize)
        .exec(function (err, docs) {
            if (err) {
                console.error(err);
                res.redirect('/failure')
                return;
            }
            res.jsonp(docs);
        })
});

/**
 * 全部查询
 */
router.get('/findAll', function (req, res, next) {
    var User = global.dao.User
    User.find({})
        .select('_id userName passWord department')
        .skip(0)
        .limit(200)
        .exec(function (err, docs) {
            if (err) {
                console.error(err);
            }
            res.jsonp(docs)
        })
});

/**
 * 计数查询
 */
router.get('/count', function (req, res, next) {
    var User = global.dao.User;
    User.count({}, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            res.jsonp(result);
        }
    })
});

/**
 * 删除
 */
router.get('/del', function (req, res, next) {
    var User = global.dao.User
    User.remove({_id: '578330f39f4e1a689da4e0fc'}, function (err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/success');
        }
    })
});
module.exports = router;