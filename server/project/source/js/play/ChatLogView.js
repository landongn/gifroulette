App.ChatlogView = Ember.ContainerView.extend({
	init: function () {
		this._super();
		console.log("chatlog ready");
	},
	messages: [],

	newMessage: function (message) {
		this.messages.pushObject(message);
	}
});