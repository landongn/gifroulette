App.Router.map(function() {
	
	this.route('login');
	
	this.resource('lobby', {path: '/lobby'}, function () {
		this.route('list');
	});

	this.resource('profile');

	this.resource('play', {path: '/play'}, function () {
		this.route('setup');
		this.route('persist');
		this.route('tag');
	});
});
