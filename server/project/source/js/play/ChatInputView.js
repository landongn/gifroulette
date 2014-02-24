App.ChatInputView = Ember.TextField.extend({
	keyPress: function (e) {
		if (e.keyCode === 13) {
			console.log('sending', this.get('value'));
			App.socket.sendMessage(this.get('value'));
			this.set('value', '');
		}
	},
	type:"text",
	class: "chatbox",
	placeholder: "say something"
});