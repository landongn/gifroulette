App.PlayRoute = Em.Route.extend({
	model: function () {
		return {};
	},
	setupController: function (controller, model) {
		this.set('content', model);
	},
	gifCount : 0,

	actions: {
		updateGifs: function (gif) {
			this.controllerFor('play').pushObject(gif);
			this.gifCount++;
			if (this.gifCount === 45) {
				this.controllerFor('play').clear();
				this.gifCount = 0;
			}
		}
	},
	truncate: function () {
		var self = this;
	}
});