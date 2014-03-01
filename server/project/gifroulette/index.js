/*
parent module for all of the websocket server and mongodb interactions.
 */

var mongoose = require('mongoose');
var Agreppa = require('../../../utils/agreppa/start.js');
var Lobby = require('./lobby.js');

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


function Server (io) {
	this.io = io;
	var self = this;
	this.agreppa = new Agreppa(this);
	this.io.on('connection', function (socket) {
		self.on_connection(socket);
		socket.on('packet', function (payload) {
			self.onPacket(socket, payload);
		});
		socket.on('disconnect', function () {
			self.on_disconnect(socket);
		});
	});
}

Server.prototype = {
	totalConnections: 0,
	lobbies: {},
	clients: [],

	incomingTweet: function (payload) {
		this.broadcastGif('all', payload);
	},

	generateLobbies: function () {
		for (var i = 0; i < 10; i++) {
			this.lobbies[new Date().getTime()] = new Lobby();
		}
	},

	listLobbies: function (socket) {
		socket.emit('listLobbies', Object.keys(this.lobbies));
	},

	listUsersForLobby: function (socket, lobby) {
		socket.emit('roster', this.lobbies[lobby]);
	},

	broadcastGif: function (lobby, payload) {
		this.io.sockets.emit('gif', payload);
	},

	on_connection: function (socket) {
		this.totalConnections++;
		socket.emit('ident');
	},

	onPacket: function (socket, payload) {
		try	{
			this['on_' + payload.type](socket, payload);
		} catch (er) {
			return;
		}
	},

	on_ident: function (socket, payload) {},

	on_disconnect: function (socket, payload) {},

	on_join: function (socket, payload) {},

	on_play: function (socket, payload) {
		Tweet.find({})
	},

	on_chat: function (socket, payload) {
		console.log(payload);
		this.io.sockets.emit('chat', payload);
	}



};

module.exports = Server;