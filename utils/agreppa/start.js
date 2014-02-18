require('colors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inbox');
var db = mongoose.connection;

var conf = {
	twitter: {
		consumer_key: 'j0xzEFPt02DiK9WSPhZtQQ',
		consumer_secret: 'rUDv5b7PFCBzwYDO6uwLE5nNiiqD4qx7LFZmkNXy4',
		access_token: '15181396-haICVjSd9ftbjkDekfho8AoPkCKyXOC149kyLBCGS',
		access_secret: 'HwEBjEZt5dvE8jVHBOcInAytZT0Qftu1KJTzN6Ux34Tnw'
	}
};

function Agreppa (server) {
	this.server = server;
	this.VERSION = '0.0.0';
	var self = this;
	db.once('open', function () {
		console.log('system running...'.blue);
		self.start();
	});
}

Agreppa.prototype = {
	start: function () {
		var TwitterParser = require('./packages/twitter');
		var twitterParser = new TwitterParser(conf.twitter, this.server);
		twitterParser.startStream();
	}
};

module.exports = Agreppa;



