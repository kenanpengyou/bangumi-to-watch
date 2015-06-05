/*
* control_switch_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var switchCardTemplate = require("../templates/switch_card_template");

var ControlSwitchView = Backbone.View.extend({
    el: "#control_switch",

    initialize: function(){
        this.isFlipped = this.$el.hasClass("is-flipped");

        this.render();
    },
    template: _.template(switchCardTemplate),
    render: function(){
        var html = this.template();
        this.$el.html(html);

        return this;
    },
    events: {
        "click": "switchView"
    },
    switchView: function(event){
        var flag = "",
        eventFlag = "";

        this.isFlipped = !this.isFlipped;
        this.$el.toggleClass("is-flipped");

        if(this.isFlipped){
            flag = "program";
        }else{
            flag = "reminders";
        }

        eventFlag = "switch:" + flag;
        dispatcher.trigger(eventFlag);
    }

    // ------- custom below -------

});

module.exports = ControlSwitchView;