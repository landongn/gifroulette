App.ChatlogmessageView = Ember.View.extend({
	classNames: ['pre', 'bar'],
	transitionIn: function () {
		Ember.run.later(function () {
			this.$().removeClass('pre');
		}.bind(this));
	}.on('didInsertElement')
});