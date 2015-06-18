/*
* dispatcher.js
*/

var Backbone = require("backbone");
var _ = require("underscore");


var dispatcher = _.clone(Backbone.Events);
module.exports = dispatcher;