App.ChatInputView = Ember.TextField.extend({
	keyPress: function (e) {
		if (e.keyCode === 13 && this.get('value').length >= 'lol'.length) {
			App.socket.sendMessage(this.get('value'));
			this.set('value', '');
		}
	},
	type:"text",
	class: "chatbox",
	placeholder: "say something"
});