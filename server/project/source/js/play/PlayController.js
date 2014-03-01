App.PlayController = Ember.ArrayController.extend(App.SocketClient, {
	currentGif: null,
	needs: ['chatlog'],
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
			this.send('newGif');
		},
		newGif: function () {
			this.set('hasStatic', true);
			Em.run.later(function () {
				this.set('hasStatic', false);
				var g = this.getRandomGif();
				if (g && g.asset_url && g.asset_url.match(/\.gif/)) {
					this.set('currentGif', g);
				}
			}.bind(this), 350);
		},

		newMessage: function (message) {
			this.get('controllers.chatlog').send('newMessage', message);
		},

		sendDownvote: function () {},
		sendUpvote: function () {}
	},
	emitChatMessage: function (message) {
		var p = {
			message: message,
			channel: this.get('profile.channel'),
			type: 'chat',
			username: this.get('profile.username')
		};

		this.emit('packet', p);
	}

});
