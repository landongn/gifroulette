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

App.SocketClient = Ember.Object.extend({

	connected: false,

	init: function () {
		this._super();
		this._socket = io.connect('http://gifroulette.tv');

		this._socket.on('connect', function () {
			this.set('connected', true);
		}.bind(this));

		models.user = {
			username: 'guest' + Math.floor(Math.Random * 1000)
		};

	},

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
		if (this.get('connected')) {
			this._socket.on('gif', self.gif);
			this._socket.on('ident', self.ident);
			this._socket.on('request', self.request);
			this._socket.on('upvote', self.upvote);
			this._socket.on('loadAsset', self.loadAsset);
			this._socket.on('displayAsset', self.displayAsset);
		}
	}.observes('connected'),

	gif: function (packet) {
		var model = models.gifs;
		model.pushObject(packet);
		if (model.length >= 10) {
			model.removeObject(model[model.length - 3]);
		}

		App.__container__.lookup('controller:play').send('updateGifs', packet);
	},
	ident: function (packet) {
		console.log('asking for ident');
		this.emit('packet', {type: 'ident', username: models.user.username});
	},
	request: function (packet) {},
	upvote: function (packet) {},
	loadAsset: function (packet) {},
	displayAsset: function (packet) {}
});
