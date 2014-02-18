App.Router.map(function () {
	this.resource('inbox', function () {
		this.route('tag', {path: '/:tweet_id/tag'});
	});
});
