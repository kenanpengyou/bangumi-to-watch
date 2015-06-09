/*
* app_header_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var i18n = require("../i18n/translation");
var dispatcher = require("../events/dispatcher");
var appHeaderTemplate = require("../templates/app_header_template");

var AppHeaderView = Backbone.View.extend({
    el: "#app_header",

    initialize: function(options){
        this.title = options.title;
        this.render();
    },
    template: _.template(appHeaderTemplate),
    render: function(){
        var html = this.template({
            title: this.title
        });
        this.$el.html(html);

        return this;
    },
    events: {
        "dblclick .header-title": "modifyTitle",
        "click .control-reset": "appReset",
        "click .control-help": "appHelp"
    },
    modifyTitle: function(event){
        console.log("[AppHeaderView:modifyTitle]");
    },
    appReset: function(event){
        dispatcher.trigger("layer:confirm", {
            textMain: i18n.control.resetMain,
            textSub: i18n.control.resetSub,
            fn: function(){
                this.executeReset();
            },
            context: this
        });
    },
    appHelp: function(event){
        console.log("[AppHeaderView:appHelp]");
    },

    // ------- custom below -------

    executeReset: function(){
        dispatcher.trigger("app:reset");
    }

});

module.exports = AppHeaderView;