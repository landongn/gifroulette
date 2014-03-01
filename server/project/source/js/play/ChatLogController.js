App.ChatlogController = Ember.ArrayController.extend(Ember.SortableMixin, {
	sortAscending: true,
	needs: ['play'],
	actions: {
		newMessage: function (message) {
			this.get("content").addObject(message);
			if (this.get('content').length === 20) {
				this.removeAt(this.get('content').length - 1);
			}
		}
	}
});