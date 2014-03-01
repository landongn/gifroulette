/*global window*/
var App = window.App = Ember.Application.create();

require("js/socket/SocketClient");
require('js/application/*');
require('js/join/*');
require('js/lobby/*');
require('js/play/*');
require('js/router');

