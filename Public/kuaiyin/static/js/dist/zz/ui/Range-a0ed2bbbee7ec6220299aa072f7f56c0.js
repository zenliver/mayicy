define("zz/ui/Range",["./plugins/draggable2","zz/ui/plugins/state","jquery/jquery/1.7.2/jquery","zz/utils/objs","zz/utils/types","zz/utils/math","zz/ui/base/Effect","zz/core/Class","zz/utils/asserts","./base/Panel","http://www.mayicy.cn/Public/kuaiyin/static/js/dist/zz/ui/jquery.tmpl","zz/plugins/actionMap"],function(a){"use strict";a("./plugins/draggable2");var b=a("zz/core/Class"),c=a("./base/Panel"),d=b(c).defState("RANGE_CHANGE").attr({DEFAULT_OPTS:{changeFn:function(){},css:{},stepLen:5,scope:[0,100],action:{smaller:function(){console.log("smaller")}}},TMPL:"<div class=\"ui-range ui-panel\">\n    <a class='ui-range-smaller'>-</a>\n    <a class='ui-range-btn'></a>\n    <a class='ui-range-bigger'>+</a>\n</div>\n"}).init(function(a){this.superInit(a),this._opts,this.$target,this.$range,this.$bigger,this.$smaller,this.rangeVal=0,this._create()}).method({_create:function(){this.superMethod("_create"),this.onState("RANGE_CHANGE",this._opts.changeFn),this.$range=this.$target.children(".ui-range-btn"),this.$bigger=this.$target.children(".ui-range-bigger"),this.$smaller=this.$target.children(".ui-range-smaller")},open:function(){this.superMethod("open")},close:function(){this.superMethod("close")},setRange:function(a){this._setRange(this._toRangeVal(a))},getRangeVal:function(){return this._toScopeVal(this.rangeVal)},_setRangeVal:function(a){this.rangeVal=a,this.$target.attr("data-value",a),this.triggerState("RANGE_CHANGE",this._toScopeVal(a))},_setRange:function(a){this.$range.css("left",a),this._setRangeVal(a)},bigger:function(){var a=this.rangeVal+this._opts.stepLen;a>100&&(a=100),this._setRange(a)},smaller:function(){var a=this.rangeVal-this._opts.stepLen;0>a&&(a=0),this._setRange(a)},_toRangeVal:function(a){var b=this._opts.scope[0],c=this._opts.scope[1];return(a-b)/(c-b)*100},_toScopeVal:function(a){var b=this._opts.scope[0],c=this._opts.scope[1];return a/100*(c-b)+b},_bindEvent:function(){var a,b=this;this.superMethod("_bindEvent"),a=this.$range.position().left,this.$range.draggable2({dragScopeX:[0,100],stepFn:function(){var c=b.$range.position().left-a;b._setRangeVal(c)},noMoveY:!0,cursor:"pointer"}),this.$bigger.on("mousedown",function(a){return b.bigger(),a.preventDefault(),a.stopPropagation(),!1}),this.$smaller.on("mousedown",function(a){return b.smaller(),a.preventDefault(),a.stopPropagation(),!1})},_unBindEvent:function(){this.superMethod("_unBindEvent"),this.$range.unDraggable2(),this.$bigger.off("mousedown"),this.$smaller.off("mousedown")}});return d});