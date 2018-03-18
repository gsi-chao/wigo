var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
require('./role');
var Role = mongoose.model('Role')
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    first_name: {type:String, required:true},
    last_name:  {type:String, required:true},
    birth_date: {type:Date, required:true},
    gender : {type:String, enum: ['male', 'female']},
    username: {type:String, unique: true, required:true},
    password: {type:String, required:true},
    role: {type: Schema.ObjectId, ref: "Role" },
    active: Boolean,
    email: {type: mongoose.SchemaTypes.Email, required: true,unique: true},
    f_url_profile: String,
    f_url_pic: String,
    f_url_token: String
});

userSchema.pre('save',function (next) {
    this.password = this.encryptPassword(this.password);
    next();
});


userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
}
userSchema.methods.encryptPassword = function (password) {
   return bcrypt.hashSync(password);
}

userSchema.methods.isActive = function () {
    return this.active;
}

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
