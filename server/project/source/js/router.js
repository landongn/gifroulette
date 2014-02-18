App.Router.map(function() {
	this.resource('join', function () {
		this.route('list');
	});

	this.resource('lobby', {path: '/lobby'}, function () {});

	this.resource('play', {path: '/play'}, function () {
		this.route('setup');
		this.route('persist');
		this.route('tag');
	});
});
