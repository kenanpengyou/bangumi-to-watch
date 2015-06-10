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

var AppLayerView = Backbone.View.extend({
    el: "#app_layer",

    initialize: function(){
        dispatcher.on("layer:confirm", function(args){
           this.display("confirm", args);
        }, this);
        dispatcher.on("layer:alert", function(args){
            this.display("alert", args);
        }, this);
    },
    templateConfirm: _.template(layerConfirmTemplate),
    templatePrompt: _.template(layerPromptTemplate),
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
        "click .submit-yes": "submitYes",
        "click .submit-no": "submitNo"
    },
    submitNo: function(event){
        this.$el.empty().hide();
    },
    submitYes: function(event){
        this.handlerFn();
        this.$el.empty().hide();
    },

    // ------- custom below -------

    // The 3 types are "confirm", "alert" and "prompt".
    // "confirm": textMain, textSub, fn, context
    // "alert": textMain, fn
    display: function(type, options){

        // Context could be taken along.
        var context = options.context,
            fn = options.fn;

        if(typeof fn === "function"){
            this.handlerFn = function(){
                options.fn.apply(context);
            };
        }else{
            this.handleFn = function(){};
        }

        this.render(type, options).$el.addClass(".is-gradual").show();
    }
});

module.exports = AppLayerView;