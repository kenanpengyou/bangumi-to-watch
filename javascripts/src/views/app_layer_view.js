/*
* app_header_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var i18n = require("../i18n/translation");
var dispatcher = require("../events/dispatcher");
var layerConfirmTemplate = require("../templates/layer_confirm_template");
var layerPromptTemplate = require("../templates/layer_prompt_template");
var layerAlertTemplate = require("../templates/layer_alert_template");

var AppLayerView = Backbone.View.extend({
    el: "#app_layer",

    initialize: function(){
        dispatcher.on("layer:confirm", function(args){
           this.display("confirm", args);
        }, this);
        dispatcher.on("layer:alert", function(args){
            this.display("alert", args);
        }, this);
        dispatcher.on("layer:prompt", function(args){
            this.display("prompt", args);
        }, this);
    },
    templateConfirm: _.template(layerConfirmTemplate),
    templatePrompt: _.template(layerPromptTemplate),
    templateAlert: _.template(layerAlertTemplate),
    render: function(type, options){

        // "prompt" to "templatePrompt".
        var templateKey = "template" + type.charAt(0).toUpperCase() + type.slice(1),
            template = this[templateKey],
            data = $.extend({
               layer: i18n.layer,
               textSub: ""
            }, options);
            html = template(data);

        this.$el.html(html);
        return this;
    },
    events: {
        "pointerup .submit-yes": "submitYes",
        "pointerup .submit-no": "submitNo"
    },
    submitNo: function(event){
        this.$el.empty().removeClass("is-visible");
    },
    submitYes: function(event){

        if(this.inputEl){
            this.handlerFn(this.inputEl.val());
            this.inputEl = null;
        }else{
            this.handlerFn();
        }

        this.$el.empty().removeClass("is-visible");
    },

    // ------- custom below -------

    // The 3 types are "confirm", "alert" and "prompt".
    // "confirm": textMain, textSub, fn, context
    // "alert": textMain, fn, context
    // "prompt": textMain, inputOrigin, fn, context
    display: function(type, options){

        // Context could be taken along.
        var context = options.context,
            fn = options.fn;

        if(typeof fn === "function"){
            this.handlerFn = function(){
                options.fn.apply(context, arguments);
            };
        }else{
            this.handlerFn = function(){};
        }

        this.render(type, options).$el.addClass("is-visible");

        // Type "prompt" needs the input's value.
        if(type === "prompt"){
            this.inputEl = this.$(".layer-input").focus().select();
        }
    }
});

module.exports = AppLayerView;