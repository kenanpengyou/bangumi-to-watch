/*
* bangumi.js
* by liangzhu (http://acgtofe.com)
* date 2015-04-22
*/

var Backbone = require("backbone");
var $ = require('jquery');

Backbone.$ = $;

;(function(){
    $(".subscription-edit").click(function(event){
       $(".subscription-collection").toggleClass("is-editing");
    });
}());