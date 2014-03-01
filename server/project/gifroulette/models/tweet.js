var mongoose = require('mongoose');

var TweetSchema = mongoose.Schema({
	from_user: String,
	from_userId: String,
	asset_url: String,
	added: Number,
	retweets: Number,
	favorites: Number,
	status: String,
	hashtags: String
});

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;