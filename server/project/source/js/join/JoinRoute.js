App.JoinRoute = Ember.Route.extend({
	beforeModel: function () {
		App.socket.emit('packet', {
			type: 'join',
			cmd: 'lobbies'
		});
	}
});