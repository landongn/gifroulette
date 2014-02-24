App.ApplicationRoute = Ember.Route.extend({
	beforeModel: function () {
		this.transitionTo('play');
	},
	model: function () {
		return {};
	}
});