/*global window*/
var App = window.App = Ember.Application.create();

require("js/socket/SocketClient");

Ember.Application.initializer({
	name: 'socket',

	initialize: function (container, application) {
		App.socket = App.SocketClient.create();
	}
});


require('js/application/*');
require('js/join/*');
require('js/lobby/*');
require('js/play/*');
require('js/router');

