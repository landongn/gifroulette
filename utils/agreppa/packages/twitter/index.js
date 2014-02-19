var util = require('util'),
	twitter = require('twitter'),
	mongoose = require('mongoose');
var LanguageDetect = require('languagedetect');
var lngDetector = new LanguageDetect();

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

function TwitterParser (config, server) {
	console.log(server);
	this.server = server;
	this._parser = new twitter({
		consumer_key: config.consumer_key,
		consumer_secret: config.consumer_secret,
		access_token_key: config.access_token,
		access_token_secret: config.access_secret
	});
}

TwitterParser.prototype = {

	/*
	Property Definitions
	*/
	isStreaming: false,
	isConnected: false,

	server: null,

	startStream: function () {
		if (this.isStreaming) {
			return;
		}
		console.info('Starting TwitterParser'.green);
		var self = this;

		this._parser.stream('filter', {track:'gif'}, function(stream) {
			self.isStreaming = true;
			stream.on('data', function(data) {
				// var lang = lngDetector.detect(data.text, 1);
				// if (lang.length && lang[0] && lang[0][0] === 'english') {
					if (data.entities.urls.length) {

						for (var i = data.entities.urls.length - 1; i >= 0; i--) {
							var tw = data.entities.urls[i];
							var t = new Tweet({
								from_user: data.user.screen_name,
								from_userId: data.user.id_str,
								asset_url: tw.expanded_url,
								added: new Date().getTime()/1000,
								retweets: data.retweet_count,
								favorites: data.favorite_count,
								status: data.text,
								hashtags: data.entities.hashtags.join('|')
							});

							//t.save();
							self.server.incomingTweet(t);
						}
					}
				// }

			});
			// Disconnect stream after fifteen seconds
			// setTimeout(function () { stream.destroy(); self.isStreaming = false;}, 15000);
		});


	}
};

module.exports = TwitterParser;
