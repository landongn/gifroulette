App.PlayRoute = Em.Route.extend({
	model: function () {
		return [];
	},
	setupController: function (controller, model) {
		this.set('content', model);
	},
	gifCount : 0,

	renderTemplate: function() {
		this.render();

		this.render('chatlog', {
			into: 'play',
			outlet: 'chatlog'
		});

	}
});
