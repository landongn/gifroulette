App.InboxRoute = Ember.Route.extend({
	model: function () {
		return Em.$.getJSON('http://localhost:9292/inbox/tweets/');
	}
});