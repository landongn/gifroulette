App.PostView = Ember.View.extend({
	classNames: ['post'],

	didInsertElement: function () {
		Em.run.later(function () {
			this.$().addClass("active");
		}.bind(this), 2000);
	}
});