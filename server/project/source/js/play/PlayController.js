App.PlayController = Ember.ArrayController.extend({
	currentGif: null,

	isEmpty: function () {
		if (this.length) {
			return true;
		} else {
			return false;
		}
	}.property(),
	getRandomGif: function () {
		return this.objectAt(Math.floor(Math.random() * this.get('content').length - 1));
	},

	actions: {
		updateGifs: function (gifs) {
			this.addObject(gifs);
		},
		newGif: function () {
			this.set('hasStatic', true);
			Em.run.later(function () {
				this.set('hasStatic', false);
				var g = this.getRandomGif();
				if (g && g.asset_url && g.asset_url.match(/\.gif/)) {
					this.set('currentGif', g.asset_url);
				}
			}.bind(this), 350);
		}
	}

});
