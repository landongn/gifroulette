/*
	socket interface.
	attached to App.socket when instantiated.

 */

 var models = {
	rosters: [],
	users: [],
	chatlog: [],
	user: {},
	gifs: []
 };

App.SocketClient = Ember.Mixin.create({

	connected: false,

	init: function () {
		this._super();
		this._socket = io.connect();
		var self = this;
		this._socket.on('connect', function () {
			self.setupEvents();
		});

		models.user = {
			username: 'guest' + Math.floor(Math.Random * 1000)
		};

	},

	profile: {},
	lobbies: [],
	currentChannel: '',

	totalConnections: 0,

	getRoster: function () {
		return models.rosters;
	},

	getLog: function () {
		return models.chatlog;
	},
	getUsers: function () {
		return models.users;
	},
	getGifs: function () {
		return models.gifs;
	},

	emit: function (name, payload) {
		this._socket.emit(name, payload);
	},

	models: {
		gifs: models.gifs
	},

	setupEvents: function () {
		var self = this;

		this._socket.on('gif', function (d) {
			self.gif(d);
		});
		this._socket.on('ident', function (data) {
			self.ident(data);
		});

		this._socket.on('listLobbies', function (data) {
			self.onLobbies(data);
		});

		this._socket.on('roster', function (data) {
			self.onRoster(data);
		});

		this._socket.on('joinLobby', function (data) {
			self.onJoin(data);
		});

		this._socket.on('upvote', self.upvote);
		this._socket.on('downvote', self.downvote);

		this._socket.on('loadAsset', self.loadAsset);
		this._socket.on('displayAsset', self.displayAsset);

		this._socket.on('chat', function (data) {
			self.chatMessage(data);
		});

		this._socket.on('profile', function (data) {
			self.onProfile(data);
		});

		this._socket.on('totalConnections', function (data) {
			self.updateTotalConnections(data);
		});

	},


	gif: function (packet) {
		var model = models.gifs;
		model.pushObject(packet);
		if (model.length >= 10) {
			model.removeObject(model[model.length - 3]);
		}
		this.send('updateGifs', packet);
	},
	ident: function (packet) {
		/*global prompt*/
		var userChoice = prompt('choose a username');
		this.emit('ident', {userData: {username: userChoice}});
	},
	onLobbies: function (packet) {
		this.get('lobbies').pushObjects(packet);
	},
	onRoster: function (packet) {
		this.get('users').pushObjects(packet);
	},
	onJoin: function (packet) {
		this.set('currentChannel', packet);
	},
	updateTotalConnections: function (packet) {
		this.set('totalConnections', packet);
	},
	onProfile: function (packet) {
		this.set('profile', packet);
	},
	upvote: function (packet) {},
	downvote: function (packet) {},
	loadAsset: function (packet) {},
	displayAsset: function (packet) {},
	chatMessage: function (packet) {
		this.send('newMessage', packet);
	}
});
