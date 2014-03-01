App.ChatInputView = Ember.TextField.extend(Ember.TargetActionSupport, {
	keyPress: function (e) {
		if (e.keyCode === 13 && this.get('value').length >= 'lol'.length) {
			this.container.lookup('controller:play').emitChatMessage(this.get('value'));
			this.set('value', '');
		}
	},
	type:"text",
	class: "chatbox",
	placeholder: "say something"
});

App.ChatInputController = Ember.Controller.extend({
	needs: ['play']
});