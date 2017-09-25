define("zz/ui/plugins/selectable",["zz/ui/plugins/state","jquery/jquery/1.7.2/jquery","zz/utils/objs","zz/utils/types","zz/utils/math","zz/ui/base/Effect","zz/core/Class","zz/utils/asserts"],function(a){"use strict";a("zz/ui/plugins/state");var b=a("jquery/jquery/1.7.2/jquery"),c=(a("zz/utils/objs"),a("zz/utils/types"),a("zz/utils/math"),a("zz/ui/base/Effect")),d=a("zz/core/Class"),e=d(c).attr({DEFAULT_OPTS:{addClass:"ui-selected",seleClass:"",ignoreClass:"",startFn:b.noop,scopeElem:null,endFn:b.noop,stepFn:b.noop,isCancel:!1},TYPE:"selectable",SELECT_BOX_TMPL:"<div class='ui-selectable-box none'></div>"}).init(function(a,c){this.superInit(a,c),this.$seleBox=b(this.SELECT_BOX_TMPL),a.append(this.$seleBox),this.$seleArr=[],this.originX=0,this.originY=0}).method({bindEffect:function(){var a=this.$target,c=this._opts,d=this.$seleBox,e=this;return this.superClass.bindEffect.call(this),a.on("mousedown.select",function(f,g){f.preventDefault(),f.stopPropagation(),e._opts.isCancel||(g&&(f.pageX=g.pageX,f.pageY=g.pageY),e.$seleArr=[],e.originX=f.pageX,e.originY=f.pageY,d.show().offset({left:e.originX,top:e.originY}).width(0).height(0),e._seleChildren(),c.startFn&&c.startFn.call(e,f,c),b(document).on({"mousemove.select":function(a){e._setSeleBox(a.pageX,a.pageY),e._seleChildren(),c.stepFn&&c.stepFn.call(e,a,c),a.preventDefault()},"mouseup.select":function(f){e._opts.scopeElem&&(a=e._opts.scopeElem),a.children().removeClass(e._opts.addClass),c.endFn&&c.endFn.call(e,f,c),b(document).off(".select"),d.hide(),f.preventDefault()}}))}),this},unBindEffect:function(){return this.superClass.unBindEffect.call(this),this.$target.off("mousedown.select"),this.$seleBox.remove(),this},getSeleArr:function(){return this.$seleArr},_seleChildren:function(){var a=this.$seleBox,c=this,d=this._opts.scopeElem||this.$target;this.$seleArr.length=0,d.children("."+this._opts.seleClass).each(function(){var d=b(this);if(!d.is(a)&&!d.hasClass(c._opts.ignoreClass)){var e=d.offset(),f={left:e.left+d.width(),top:e.top+d.height()},g=a.offset(),h={left:g.left+a.width(),top:g.top+a.height()};g.left<f.left&&g.top<f.top&&h.left>e.left&&h.top>e.top?(d.addClass(c._opts.addClass),c.$seleArr.push(d)):d.removeClass(c._opts.addClass)}})},_setSeleBox:function(a,b){var c=this.originX,d=this.originY,e=this.$seleBox;a>=c?e.width(a-c):e.offset({left:a}).width(c-a),b>=d?e.height(b-d):e.offset({top:b}).height(d-b)}});return b.fn.extend({selectable2:function(a){if(this.isState("selectable")){var b=this.data("selectableEffectObj");return b.updateOpts(a),this}var b=new e(this,a);return b.bindEffect(),this},unSelectabel2:function(){if(this.isState("selectable")){var a=this.data("selectableEffectObj");a.unBindEffect().destroy()}return this},triggerSelect2:function(a){if(!this.isState("selectable"))throw new Error("未注册选择");return this.trigger("mousedown.select",a),this}}),e});