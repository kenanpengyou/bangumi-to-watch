/*
* app_header_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var i18n = require("../i18n/translation");
var dispatcher = require("../events/dispatcher");
var helpTemplate = require("../templates/help_template");

var HelpLayerView = Backbone.View.extend({
    el: "#help_layer",

    initialize: function(){
        this.status = "reminders";

        dispatcher.on("switch:reminders", this.changeToReminders, this);
        dispatcher.on("switch:program", this.changeToProgram, this);
        dispatcher.on("help", this.display, this);
    },
    template: _.template(helpTemplate),
    render: function(){
        var i18nKey = this.status,
            articleContent = i18n.help[i18nKey],
            html = this.template({
                content: articleContent
            });

        this.$el.html(html);
        return this;
    },
    events: {
        "pointerup .help-close": "closeHelp"
    },
    changeToReminders: function(event){
        this.status = "reminders";
    },
    changeToProgram: function(event){
        this.status = "program";
    },
    closeHelp: function(){
        this.$el.removeClass("is-visible").empty();
    },

    // ------- custom below -------

    display: function(){
        this.render().$el.addClass("is-visible");
    }

});

module.exports = HelpLayerView;