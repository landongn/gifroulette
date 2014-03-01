/*
parent module for all of the websocket server and mongodb interactions.
 */

var mongoose = require('mongoose');
var Agreppa = require('../../../utils/agreppa/start.js');
var Lobby = require('./lobby.js');
var TweetModel = require('./models/tweet.js');

function Server (io) {
	this.io = io;
	var self = this;
	this.agreppa = new Agreppa(this);
	this.generateLobbies();
	this.io.on('connection', function (socket) {

		self.userDidConnect(socket);
		socket.on('packet', function (payload) {
			this.onPacket(socket, payload);
		}.bind(self));

		socket.on('disconnect', function () {
			self.on_disconnect(socket);
		});

		socket.on('ident', function (payload) {
			self.on_ident(socket, payload);
		});
	});
}

Server.prototype = {
	totalConnections: 0,
	roster: {},
	lobbies: [],
	clients: {},
	activeGifs: {},

	userDidConnect: function (connection) {
		if (!this.clients[connection.id]) {
			this.clients[connection.id] = connection;
		}
		this.on_connection(connection);
	},

	on_connection: function (socket) {
		this.totalConnections++;
		socket.emit('ident');
		socket.emit('totalConnections', this.totalConnections);
	},

	on_ident: function (socket, payload) {
		payload.userData.channel = this.lobbies[0];
		var user = {socket: socket, data: payload.userData};
		this.addUserToLobby(user, this.roster[this.lobbies[0]]);
	},

	addUserToLobby: function (user, lobby) {
		lobby.users.push(user);
		this.emitLobbySelection(user, user.data.channel);
		this.emitProfile(user);
		this.listLobbies(user);
	},

	emitProfile: function (user) {
		user.socket.emit('profile', user.data);
	},

	listLobbies: function (user) {
		console.log("listing Lobbies");
		user.socket.emit('listLobbies', this.lobbies);
	},

	listUsersForLobby: function (user, lobby) {
		console.log('emitting roster');
		user.socket.emit('roster', this.roster[lobby]);
	},

	emitLobbySelection: function (user, lobby) {
		user.socket.emit('joinLobby', lobby);
	},


	incomingTweet: function (tweet) {
		this.broadcastGif(tweet);
	},

	

	removeUserFromLobby: function (user, lobby) {
		lobby.users.slice(lobby.users.indexOf(user), 0);
	},

	generateLobbies: function () {
		for (var i = 0; i < 25; i++) {
			// returns a valid hex color
			var roster_id = '#'+Math.floor(Math.random()*16777215).toString(16);
			if (!this.roster[roster_id]) {
				this.roster[roster_id] = new Lobby({
					max_users: 20,
					min_users: 1,
					name: roster_id
				});
			}
			this.lobbies.push(roster_id);
		}
	},

	

	broadcastGif: function (payload) {
		this.io.sockets.emit('gif', payload);
	},

	onPacket: function (socket, payload) {
		console.log("packet from user: ", payload);
		try	{
			this['on_' + payload.type](socket, payload);
		} catch (er) {
			return;
		}
	},

	on_disconnect: function (socket, payload) {
		if (this.clients[socket.id]) {
			this.clients[socket.id] = null;
			this.totalConnections--;
		}
	},

	on_play: function (socket, payload) {

	},

	on_chat: function (socket, payload) {
		var roster = this.roster[payload.channel].users.length;
		console.log(roster);
		for (var i = 0; i < roster; i++) {
			var u = this.roster[payload.channel].users[i];
			console.log(u);
			this.roster[payload.channel].users[i].socket.emit('chat', payload);
		}
	},

	on_upvote: function (socket, payload) {
		TweetModel.update({gif_id: payload.gif_id}, {'$inc': {'upvotes': 1}});
		for (var i = 0; i < this.roster[payload.channel].users.length; i++) {
			this.roster[payload.channel].users[i].socket.emit('upvote', payload);
		}
	},
	on_downvote: function (socket, payload) {
		TweetModel.update({gif_id: payload.gif_id}, {'$inc': {'downvotes': 1}});
		for (var i = 0; i < this.roster[payload.channel].users.length; i++) {
			this.roster[payload.channel].users[i].socket.emit('downvote', payload);
		}
	},

};

module.exports = Server;