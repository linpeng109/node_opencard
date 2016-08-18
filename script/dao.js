/**
 * Created by ceres on 16-8-14.
 */
module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        userName: {type: String, unique: true},
        passWord: String,
        department: String,
        eMail: String,
        Mobile: String,
        WeiXing: String
    });

    var User = mongoose.model('User', userSchema);

    User.insert = function (user, callback) {
        user.save(callback);
    };
    User.update = function (user, callback) {

    };
    User.delete = function (user, callback) {

    };
    User.findAll = function (callback) {
        var query = User.find({});
        query.exec(callback);
    };
    User.findByDepartment = function (department, callback) {
        var query = User.find({});
        query.where('department').gte(department);
        query.exec(callback);
    };
    User.findById = function (id, callback) {
        var query = User.find({});
        query.find(Id)
    }
    User.findOneByName = function (userName, callback) {
        var query = User.find({});
        query.findOne({userName: userName})
        query.exec(callback)

    }
    return {User: User};
};