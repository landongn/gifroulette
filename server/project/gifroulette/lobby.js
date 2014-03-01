
function Lobby (opts) {
	this.name = opts.name;
	this.users = [];
	this.userCount = 0;
	this.min_users = opts.min_users;
	this.max_users = opts.max_users;
}

Lobby.prototype = {
	name: null,
	users: [],
	userCount: 0,
	min_users: 0,
	max_users: 50

};

module.exports = Lobby;