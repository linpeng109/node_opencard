/**
 * Created by ceres on 16-8-14.
 */
var passportLocalMongoose = require('passport-local-mongoose');
module.exports = function (mongoose) {
    var userSchema = mongoose.Schema({
        userName: {type: String, unique: true},
        passWord: String,
        department: String,
        eMail: String,
        Mobile: String,
        WeiXing: String
    });
    userSchema.plugin(passportLocalMongoose);

    var User = mongoose.model('User', userSchema);
    return {User: User};
};