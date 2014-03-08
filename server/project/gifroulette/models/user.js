var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	userId: String,
	signedUpOn: Number,
	username: String,
	accessToken: String,
	profile: Object
});

var User = mongoose.model('User', UserSchema);

module.exports = User;