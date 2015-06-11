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

    initialize: function(){
        this.recorders = this.collection;
        this.render();
        this.listenTo(this.recorders, "change", this.render);
    },
    template: _.template(appHeaderTemplate),
    render: function(){
        var html = this.template({
            title: this.recorders.getTitle()
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
        var confirmFn = function(input){
            if($.trim(input) !== ""){
                this.recorders.modifyTitle(input);
            }
        };

        dispatcher.trigger("layer:prompt",{
            textMain: i18n.control.modifyTitle,
            inputOrigin: this.recorders.getTitle(),
            fn: confirmFn,
            context: this
        });
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
        dispatcher.trigger("layer:alert", {
            textMain: "暂不提供帮助 = ="
        });
    },

    // ------- custom below -------

    executeReset: function(){
        dispatcher.trigger("app:reset");
    }

});

module.exports = AppHeaderView;