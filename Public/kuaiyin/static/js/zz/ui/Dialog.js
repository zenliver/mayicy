/**
 *  对话框组件
 *
 * @version 0.1.1
 *
 * @author by liuwencheng
 * @date 2013-6-18
 *
 * @update 0.1.1 by liuwencheng on 2013-7-25
 *      增加bodyWidth, bodyHeight, 增加actions
 *      处理actions到Panel
 */
define(function (require, exports, module) {
    "use strict"
    require('http://www.mayicy.cn/Public/kuaiyin/static/js/zz/ui/jquery.tmpl')
    require('jquery.easing')

    var objs = require('zz/utils/objs')
        ,types = require('zz/utils/types')
    var Class = require('zz/core/Class')
        ,Panel = require('zz/ui/base/Panel')
        ,$ = require('jquery')
    //var DIALOG_TMPL = require('./dialog.tpl')
    var Mask = require('./Mask')
    var Dialog = Class(Panel)
        .attr({
            DEFAULT_OPTS: {
                innerHTML: "",
                footHTML: "",
                titleHTML: "",                  //title部分内容
                className: "",                  //样式名字，可以多个，如 "class1 class2 class3"
                append: null,                   //jquery对象, 添加到对话框body上
                appendTo: document.body,        //要添加到的父类对象
                title: "对话框",
                hasMask: true,                  //是否开启遮盖层
                hasTitle: true,
                hasClose: true,
                hasFoot: true,
                width: 'auto',
                height: 'auto',
                bodyWidth: 'auto',              //针对内部ui-dialog-body
                bodyHeight: 'auto',
                left: null,                     //isCenter为false时可用
                top: null,                      //isCenter为false时可用
                isCenter: true,                 //是否居中
                isAnim: true,
                animTime: 300,
                animType: '',                   //'easeOutCubic',
                zIndex: 100000,
                maskZindex: 10000,
                blankToClose: false,            //点击空白地方是否关闭
                closeToDispose: true,           //关闭时候是否销毁
                maskOpacity : 0.7,
                actions: {                      //actionMap, 默认有close
                    'close': function(e){        //注：重新制定actions若没有close，默认的close不会被覆盖，若有close将覆盖默认
                        this.close()            //这里的this只想dialog本身，若要获取触发节点，请使用e.currentTarget
                    }
                },
                footBtns: {"close":"关闭"}                //例：{"close":"关闭","submit":"提交"} 和actions对应
            },
            TMPL: '<div class="ui-dialog pr ${className}">' +
                      '{{if hasClose}}' +
                      '<a href="javascript:;" data-action="close" class="ui-close-btn">×</a>'+
                      '{{/if}}' +
                      '{{if hasTitle}}' +
                      '<div class="ui-dialog-head">${title}</div> {{html titleHTML}}' +
                      '{{/if}}' +
                      '<div class="ui-dialog-body">{{html innerHTML}}</div>' +
                      '{{if hasFoot}}' +
                      '<div class="ui-dialog-foot">' + '{{html footHTML}}' + '</div>' +
                      '{{/if}}' +
                  '</div>'
        })
        .init(function (opts) {
            this.superInit(opts)
            this._mask = null
            this._create()
        })
        .method({
            _create: function(){
                this.$target = $.tmpl(this.TMPL, this._opts)       //渲染模版
                this.$target.css({
                    zIndex: this._opts.zIndex,
                    position: 'fixed',
                    width: this._opts.width,
                    height: this._opts.height,
                    left: '50%',
                    top: '50%',
                    backgroundColor: 'white'
                })
                .children('.ui-dialog-body').css({
                    width: this._opts.bodyWidth,
                    height: this._opts.bodyHeight
                })
                if(this._opts.append) {
                    this.$target.children('.ui-dialog-body').append(this._opts.append)
                }
                //添加遮盖层
                if(this._opts.hasMask) {
                    this._mask = new Mask({
                        closeToDispose: this._opts.closeToDispose,
                        opacity: this._opts.maskOpacity,
                        zIndex: this._opts.maskZindex
                    })
                }
                //footBtns
                if(this._opts.hasFoot && this._opts.footBtns) {
                    var $foot = this.$target.find('.ui-dialog-foot')
                        ,textObj = this._opts.footBtns
                    for(var i in textObj) {
                        $foot.append("<button class='ml10 ui-dialog-btn' data-action='"+i+"'>"+textObj[i]+"</button>")
                    }
                }
                this.triggerState('CREATE')
                return this
            },
            open: function() {
                if (!this.$target) this._create()
                //打开遮盖层
                this._mask && this._mask.open()
                this.$target
                    .appendTo(this._opts.appendTo)
                /** 是否居中 **/
                if (this._opts.isCenter) {
                    this.$target.css({
                            //使得居中
                            marginLeft: -this.$target.width()/2,
                            marginTop: -this.$target.height()/2
                    })
                } else {
                    this.$target.css({
                        left: this._opts.left || 0,
                        top: this._opts.top || 0
                    })
                }

                function getIframeDialogPosition(dlg){
                    var scrollTop, parentHeight, dialogHeight, frameTop, ret;
                    try{
                        scrollTop = $(parent.document.body).scrollTop();
                        parentHeight = $(parent.window).height();
                        dialogHeight = dlg.$target.height();
                        frameTop = $(window.frameElement).offset().top;

                        ret = scrollTop+parentHeight/2-dialogHeight/2-frameTop;
                        return ret<0 ? 0 : ret;
                    }catch(e){
                        return 100;
                    }
                }
                // iframe 修正
                if(/[?&]iframe=1/.test(location.href)){
                    this.$target.css({marginTop: 0, top: getIframeDialogPosition(this)});
                    this._opts.isAnim = false;
                }
                //动画
                if(this._opts.isAnim) {
                    this.$target
                        .css('top', -this.$target.height())
                        .show()
                        .animate({
                            'top': this._opts.isCenter ? '50%' : (this._opts.top || 0)
                        }
                        ,this._opts.animTime
                        ,this._opts.animType
                        ,(function(){
                            this._bindEvent()
                            this.triggerState('OPEN')
                        }).bind(this))
                } else {
                    this.$target.show()
                    this._bindEvent()
                    this.triggerState('OPEN')
                }
                return this
            },
            close: function() {
                if (this._opts.isAnim) {
                    this.$target
                        .animate({
                            //'marginTop': 0,
                            'top': -this.$target.height()//'100%'
                        }
                        ,this._opts.animTime
                        ,this._opts.animType
                        //关闭之后的函数回调
                        , (function(){
                            this._mask && this._mask.close()
                            this.superMethod('close')
                        }).bind(this))
                } else {
                    this._mask && this._mask.close()
                    this.superMethod('close')
                }
                return this
            }
            /**
            _bindEvent: function() {
                this.superMethod('_bindEvent')
            },
            _unBindEvent: function() {
                this.superMethod('_unBindEvent')
            }
            **/
        })
        //.toggleOnce('open','close')
    return Dialog
})


