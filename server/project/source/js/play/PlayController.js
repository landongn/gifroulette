App.PlayController = Ember.ArrayController.extend({
	isEmpty: function () {
		if (this.length) {
			return true;
		} else {
			return false;
		}
	}.property()
});
