/**
 *
 *
 * @author by liuwencheng
 * @date 2013-5-20
 *
 * @update by liuwencheng 2013-6-27 添加多选功能, 部分功能进行重构
 */
define(function (require, exports) {
    "use strict"
    require('zz/ui/plugins/draggable2')
    require('zz/ui/plugins/resizable2')
    require('zz/ui/plugins/rotable2')
    require('jquery.transform')
    require('zz/plugins/actionMap')
    require('jquery.color')

    var Class = require('zz/core/Class')
        //,setget = require('zz/extends/setget')
        ,single = require('zz/extends/single')
        ,$ = require('jquery')
        //,seleBoxTpl = require('./wrap/selectorBoxTpl.html')
        ,selectorToolWrap = require('./selectorToolWrap')
        //,color = require('zz/ui/utils/colorConvert')
        ,loadImgs = require('zz/utils/loadImgs.js'/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/models/zz/utils/loadImgs.js*/) //预加载图片
        ,types = require('zz/utils/types')
        ,alert = require('zz/ui/alert')
    var TEXTAREA_SIZE = 20
    var $areaTestWidth  //用于测试文本输入框的宽度
    var imgCheckIgnoreKeys = ["../../../../../../diy/logos/black.png"/*tpa=http://www.mayicy.cn/diy/logos/black.png*/,"../../../../../../diy/logos/white.png"/*tpa=http://www.mayicy.cn/diy/logos/white.png*/,"../../../../../../diy/logos/dragPhoto.jpg"/*tpa=http://www.mayicy.cn/diy/logos/dragPhoto.jpg*/] //图片检测大小忽略图
    var DiySelector = Class()
        .defState("SELECT_ELEM","SELECT_CANCEL")
        .attr({
            "DEFAULT_OPTS": {
                isEasy: false,      //是否是简单编辑器
                isMultiInput: true, //是否允许多行文本输入
                isTextType: true  //是否有文本类型选择框
            }
        })
        .init(function (opts) {
            this._opts = $.extend({}, this.DEFAULT_OPTS, opts)
            this.canvas
            this.container
            this._createSeleBox()                      //创建选择器
            this.$rect = $('#diySelector')              //选择器
            this.$toolBox = $('#diyToolBox')            //工具弹窗
            this.$sele = null                           //当前选择的节点
            this.$seleArr = []
            this._loadToolsData()
            this.isEasy = this._opts.isEasy   //是否为用户编辑器
            this.$textarea  //文本输入框
            this._initInputTextArea()
            //todo
            $("#textMean").before("<a href=\"javascript:;\" data-part=\"text\" data-action=\"textCenterX\" title=\"居中对齐\" class=\"diy-tb-item center-x\">文本块居中</a>\n")
        })
        .method({
            /**
             * 取消选择框选择
            */
            cancelSele: function() {
                //console.log('cancelSele')
                var $sele = this.$sele
                var that = this
                if($sele) {
                    switch($sele.data("type")) {
                        case "diy_text":
                            //$sele.width('auto')
                            //$sele.height('auto')
                            //
                            var $textarea = this.$textarea
                            if($textarea.data('isEdit')) {
                                $sele.attr('data-content', $textarea.val().trim())
                                if($sele.attr('data-old-val') !== $sele.attr('data-content')) {
                                    //内容改变
                                    this.canvas.emitChange($sele)
                                }
                                $textarea.data('isEdit',false)
                                $textarea.parent().hide()
                                return //假如是编辑文字 不取消
                            }
                            break
                        case "diy_frame":
                            this._hideController() //隐藏选择器内部控制器
                            break;
                    }
                }
                //隐藏选择器
                this.triggerState('SELECT_CANCEL')
                this.$sele = null //清空当前选择
                this.$seleArr.length = 0
                this.$rect.hide() //隐藏选择器
                this.$toolBox.hide() //隐藏选择器下部弹窗
            },
            /**
             * 加载工具数据
            */
            _loadToolsData: function () {
                this._loadMeans()
                this._loadFonts()
            },
            _loadMeans: function () {
                var optsHtml = []
                    ,means
                    ,optTpl = "<option value='{{key}}'>{{name}}</option>"
                    ,name
                if (global.category_en_name && global.product_en_name) {
                    means = require('../canvasDataControl').getMeanList(global.category_en_name, global.product_en_name)
                } else {
                    means = require('../canvasDataControl').getMeanList(global.content.type, global.product_en_name)
                }
                for (var key in means) {
                    if (key !== "-1") {
                        name = means[key]
                    } else {
                        name = "选择文本类别"
                    }
                    optsHtml.push(optTpl
                            .replace("{{name}}", name)
                            .replace("{{key}}", key))
                }
                $('#textMean').html(optsHtml.join(""))
            },
            _loadFonts: function () {
                var optsHtml = ""
                    ,optTpl = "<option value='{{key}}'>{{name}}</option>"
                    , fonts = require('../config/configStaticData').fonts
                for (var key in fonts) {
                    optsHtml += optTpl.replace("{{name}}",fonts[key]).replace("{{key}}",key)
                }
                //加载字体列表
                $("#textFontFamily").html(optsHtml)
            },
            /**
             * 判断diy是否处于编辑状态
             */
            isEdit: function() {
                return this.$textarea.data('isEdit')
            },
            /**
             * 改变画布
            */
            seleCanvas: function(canvas){
                this.cancelSele()
                this.canvas = canvas
                var $toolBox  = this.$toolBox
                //监听事件
                if (! this.canvas.isAddState) {
                    this.canvas.history.onState('TEXT_IMG_LOADED', (function(){
                        this.updateRect()
                    }).bind(this))
                    this.canvas.onState('UP_ENABLE', function(enable){
                        enable
                            ? $toolBox.find('[data-action=up]').removeClass('disabled')
                            : $toolBox.find('[data-action=up]').addClass('disabled')
                    })
                    this.canvas.onState('DOWN_ENABLE', function(enable){
                        enable
                            ? $toolBox.find('[data-action=down]').removeClass('disabled')
                            : $toolBox.find('[data-action=down]').addClass('disabled')
                    })
                    this.canvas.isAddState = true
                }
                this.container = canvas.container
            },
            /**
             * 设置矩形输入框
             */
            _setTextInput: function(event) {
                console.log('click')
                var $sele = this.$sele
                var $tip
                if($sele && $sele.data("type") === 'diy_text') {
                    var $textarea = this.$textarea
                    var content = $sele.attr('data-content').trim()
                    var offset = $sele.offset()
                    $sele.attr('data-old-val', content)
                    //$textarea.width($sele.width() + 100)
                    //$textarea.height($sele.height())
                    $textarea.data('isEdit',true)
                    $textarea.parent()
                        .show()
                        .css({
                            'left': offset.left,
                            'top': offset.top
                        })
                    $tip = $textarea.next()
                    if ($tip.length !== 0) {
                        $tip
                        .css({
                            top: 0,
                            opacity:0
                        })
                        .animate({
                            top: $tip.data('top'), //移动到指定位置
                            opacity: 1
                        }, 500)
                        if (!$tip.data("isAddTimeOut")) {
                            setTimeout(function(){
                                $tip.remove()
                            }, 10000)
                            $tip.data('isAddTimeOut', true)
                        }
                    }
                    //设置textarea
                    $textarea
                        .attr({
                            "data-sele-width": $sele.width(),
                            "data-sele-height": $sele.height(),
                            "data-sele-left": offset.left,
                            "data-sele-top": offset.top
                        })
                        .width(this._getTextAreaWidth(content))
                        .height(this._getTextAreaHeight(content))
                        .val(content)
                        .focus()
                        .select()
                    //-文本块居中
                    if (this.$sele.attr('data-text_align') === "center") {
                        $textarea.css('text-align',"center")
                    } else {
                        $textarea.css('text-align',"left")
                    }
                    this.$rect.hide();this.$toolBox.hide()
                    return
                }
            },
            /**
             * 文本是否有多行
             */
            isTextMultiLine: function () {
                var $sele = this.$sele
                if($sele && $sele.data("type") === 'diy_text') {
                    var content = $sele.attr('data-content').trim()
                    if (content.split("\n").length !== 1) {
                        return true
                    } else {
                        return false
                    }
                }
            },
            /**
             * 输入文本时动态获取textarea的宽度
             */
            _getTextAreaWidth: function (_content) {
                var maxWidth = 0, temp
                var contentArr = _content.split("\n")
                var $textarea = this.$textarea
                var $parent = $textarea.parent()
                if (!$areaTestWidth) {
                    $areaTestWidth = $("<p>").appendTo(document.body)
                                .css({
                                    "position": "absolute",
                                    "left": 0,
                                    "top": 0,
                                    "font-size": "14px",
                                    "z-index": -100,
                                    "visibility": "hidden"
                                })
                }
                contentArr.forEach(function(item){
                    temp = $areaTestWidth.text(item.replace(/\s/g,"-")).width()
                    //temp = item.length * TEXTAREA_SIZE * 2
                    if (temp > maxWidth) maxWidth = temp
                })
                maxWidth =  maxWidth + 20
                //设定为this.$sele等同的大小
                if (maxWidth < $textarea.attr('data-sele-width')) maxWidth = Math.round($textarea.attr('data-sele-width'))
                //不超出windows
                if (maxWidth + parseInt($textarea.attr("data-sele-left")) + 15 > $(window).scrollLeft() + $(window).width()) {
                    $parent.css({"left": $(window).width() + $(window).scrollLeft() - maxWidth - 15})
                } else {
                    $parent.css({"left": $textarea.attr('data-sele-left') + "px"})
                }
                return maxWidth
            },
            /**
             * 获取文本输入框的高度
             */
            _getTextAreaHeight: function (_content) {
                var MAX_HEIGHT = 300
                var height = _content.split("\n").length * TEXTAREA_SIZE
                var $textarea = this.$textarea
                var $parent = this.$textarea.parent()
/*                //不超出大小
                if (height > MAX_HEIGHT) {
                    height = MAX_HEIGHT
                    $textarea.css("overflow-y", "scroll")
                } else {
                    $textarea.css("overflow-y", "hidden")
                }*/
                //设定和this.$sele等同的大小
                if (height < $textarea.attr('data-sele-height')) height = Math.round($textarea.attr('data-sele-height'))
                //不超出windows
                if (height + parseInt($textarea.attr('data-sele-top')) + 15 >= $(window).height() + $(window).scrollTop()) {
                    console.log($(document.body).scrollTop())
                    $parent.css({"top": $(window).height() + $(window).scrollTop() - height - 15})
                } else {
                    $parent.css({"top": $textarea.attr('data-sele-top') + "px"})
                }
                return height
            },
            /**
             * textarea 绑定事件
             * todo 测试ie
             */
            _initInputTextArea: function () {
                var tpl = "<div class=\"pa none\" style=\"z-index:10000;\">\n<textarea type=\"text\" style=\"position:absolute;left:0;top:0;background-color:#ddd;border:1px solid #aaa;padding:5px\"></textarea>\n<div class=\"diy-tip\" style=\"opacity: 0;color:red; background:#eee;width:245px;line-height:22px;text-align:left;height:48px;left:130px;top:0px\">\n    {{content}}\n</div>\n</div>\n"
                var that = this, $textarea, content
                //设置tip弹窗
                if (that._opts.isMultiInput) {
                    content = "<p>点击回车键可进行多行输入,点击esc 或 输入框外边可退出输入</p>\n"
                    $textarea = $(tpl.replace("{{content}}",content)).appendTo(document.body)
                    $textarea.find('.diy-tip').data('top', -49)
                } else {
                    content = "<p>点击esc 或 输入框外边可退出输入</p>"
                    $textarea = $(tpl.replace("{{content}}",content)).appendTo(document.body)
                    $textarea.find('.diy-tip').data('top', -23).css({ height: 22 })
                }
                $textarea = this.$textarea = $textarea.find('textarea')
                        .css({
                            "resize": "none",
                            "line-height":  "19px",
                            "overflow": "hidden"
                        })
                $(document).on('keydown.textedit', function(e){
                    //截断换行符
                    if (!that._opts.isMultiInput) {
                        if (e.keyCode == require('zz/utils/keyCode').get('enter')) {
                            //$textarea.val($textarea.val().replace(/\n/g,"")) //去除换行
                            that.cancelSele();
                            return
                        }
                    }
                })
                $(document).on("keyup.textedit", function(e){
                   if (e.keyCode == require('zz/utils/keyCode').get('esc')) {that.cancelSele();e.preventDefault();return}
                   if (that.isEdit()) {
                       var height = that._getTextAreaHeight($textarea.val())
                           ,width = that._getTextAreaWidth($textarea.val())
                       $textarea
                           .height(height)
                           .width(width)
                   }
/*                       console.log($textarea.scroll())
                       console.log($textarea[0].scrollHeight)
                       $textarea.width($textarea[0].scrollWidth)
                       $textarea[0].posHeight = $textarea[0].scrollHeight*/
                })
            },
            /**
             * 若选择的目标没变,更新矩形框, 已注册这里不再注册事件
             *
             */
            updateRect: function(){
                if(this.$sele) {
                    //显示, offset只对可见元素有效
                    this.$rect.show()
                    this.$toolBox.show()
                    var $target = this.$sele
                    //将选中的节点数据导给矩形选择框
                    this._setElemData(this.$rect,$target)
                    //设定弹框
                    this._setToolBox($target.width(),$target.height(),this.$rect.attr("data-rotate"))
                    return this
                } else if (this.$seleArr.length !== 0) {
                    //this.seleMoreElems(this.$seleArr)
                    this.$rect.show()
                    this.$toolBox.show()
                    this._setBiggerRect(this.$seleArr) //设置矩形选择框
                    this._setToolBox(this.$rect.width(),this.$rect.height(),0)
                    return this
                }
            },
            /**
             *
             *  选中目标, 并注册事件
             * @param $target 目标
             * @param event 鼠标点击时候的事件, 默认null, 用于矫正手动触发拖拽时候无鼠标offsetX, offsetY的问题
             * @param {Boolean} triggerDrag, 默认false, 是否选择时候直接触发拖拽,
             */
            seleElem: function($target,event,triggerDrag) {
                //先取消选择
                this.cancelSele()
                var $rect = this.$rect
                    ,that = this
                    ,startData
                    ,ratio
                if (!$target || $target == this.$sele) return
                this.$sele = $target
                this.$seleArr = [] //多选
                this.triggerState("SELECT_ELEM")
                //设定矩形框位置
                this.updateRect()
                //更新回调函数
                var updateOpts = {
                    startFn: function(e,opts) {
                        that.updateRect()
                        //that._setElemData(that.$rect,$target)
                        startData = that._getElemData(that.$rect) //获取矩形框数据
                        //动态修改长宽比例
                        opts.ratio = that.$rect.width()/that.$rect.height()
                        //动态修改snap匹配数组
                        opts.snapArr = that.canvas.getSnapArr(that.$sele)
                        if (!that.isEasy) {
                            opts.snapLen = 5
                        } else {
                            opts.snapLen = 3
                        }
                    },
                    stepFn: function(e){
                        that._setElemData(that.$sele,that.$rect) //将目标数据设置为矩形数据
/*                        if(that.$sele.data('type') === "diy_frame") {
                            that.canvas.resizeDiyFrame(that.$sele)
                        }*/
                        that._checkSize(that.$sele);
                        that._setToolBox(that.$sele.width(),that.$sele.height(),that.$rect.attr("data-rotate"))
                    },
                    endFn: function(e){
                        //如果目标数据改变了,则添加到历史记录
                        if(that._isChange(that.$rect, startData)) {
                            that.canvas.emitChange(that.$sele)
                            that.updateRect(false)
                            that._checkSize(that.$sele, true);
                        }
                    }
                }
                //监听矩形选择框变化,
                this.$rect
                    .draggable2(updateOpts)
                    .draggable2({
                        "dragScope": this.container,    //更新拖拽范围
                        "snapAppendTo": this.container.parent()  //吸附线存放处
                    })
                    .resizable2(updateOpts)
                    .resizable2({
                        handlers: ["ne","nw","se","sw","s","e","w","n"]

                        })
                    .rotable2(updateOpts)
                //按图片长宽比例缩放
                /**
                if(ratio = this.$sele.attr('data-ratio')) {
                    this.$rect.resizable2({
                        "ratio": +ratio
                    })
                }
                **/
                //选择
                if(this.$sele.data('type') === 'diy_text') {
                    this.$rect.resizable2({
                        handlers: []
                    }) //文本关闭resize
                }else if(this.$sele.data('type') === 'diy_frame') {
                    //若是框架内有图片显示控制器
                    this._showDiyFrameController()
                }else if(this.$sele.data('type') === 'diy_line'){
                    this.$rect.unRotable2();
                    this.$rect.resizable2({
                        handlers:this.$rect.width()<this.$rect.height()?
                            ['n','s']:['e','w']
                    });
                }
                //是否选择时候直接启动拖拽
                if(triggerDrag)
                    this.$rect.triggerDrag2(event) //直接触发拖拽
            },
            /**
             * 选择多个元素
             * @param {Array} 要选的数组
             */
            seleMoreElems: function($elemArr) {
                var that = this
                    ,oldOffsetArr = []
                //$elemArr = $elemArr.slice()
                //先取消选择
                this.cancelSele()
                //过滤
                $elemArr = $elemArr.filter(function(item){
                    if (item.hasClass("diy-elem") && !item.hasClass('diy-background') && item.parent().is(that.container))  {
                        return true
                    }
                })
                if($elemArr.length == 0) return this
                if($elemArr.length == 1) {
                    this.seleElem($elemArr[0])
                    return this
                }
                this.$seleArr = $elemArr
                //设置矩形框
                this.updateRect()
                //重新绑定矩形框事件
                this.$rect
                //this.$toolBox.show()
                    .unRotable2() //todo可以添加整体旋转
                    .resizable2({handlers:[]})
                    .draggable2({
                        "dragScope": this.container,    //更新拖拽范围
                        "snapAppendTo": this.container.parent(),  //吸附线存放处
                        startFn: function(e,opts) {
                            that.$seleArr.forEach(function(item,key){
                                //oldOffsetArr[key] = item.offset()
                                oldOffsetArr[key] = item.position()
                            })
                            //动态修改snap匹配数组, 过滤被选择的元素
                            if (!that.isEasy) opts.snapArr = that.canvas.getSnapArr.apply(that.canvas,that.$seleArr)
                        },
                        stepFn: function(e,opts) {
                            var dragLen = this.dragLen
                            that.$seleArr.forEach(function(item,key){
                                item.css({
                                    left: oldOffsetArr[key].left + dragLen[0],
                                    top: oldOffsetArr[key].top + dragLen[1]
                                })
                            })
                            //动态改变工具浮窗位置
                            that._setToolBox(that.$rect.width(),that.$rect.height(),0)
                        },
                        endFn: function(){
                            that.canvas.history.add("edit",$elemArr)
                        }
                    })
            },
            /**
             * 设置多选元素的外围选择矩形
             * @param {Array} 多选的数组
             */
            _setBiggerRect: function($elemArr) {
                var leftMin = 0
                    ,topMin = 0
                    ,leftMax = 0
                    ,topMax = 0
                    ,offsetCache,widthCache, heightCache
                $elemArr.forEach(function(item){
                    offsetCache = item.offset()
                    widthCache = item.width()
                    heightCache = item.height()
                    if(offsetCache.left < leftMin || leftMin == 0) {
                        leftMin = offsetCache.left
                    }
                    if(offsetCache.top < topMin || topMin == 0) {
                        topMin = offsetCache.top
                    }
                    if(offsetCache.left+widthCache > leftMax) {
                        leftMax = offsetCache.left + widthCache
                    }
                    if(offsetCache.top+heightCache > topMax) {
                        topMax = offsetCache.top + heightCache
                    }
                })
                this.$rect
                    .attr('data-rotate', 0)
                    .transform({
                        rotate: 0+'deg'
                    })
                    .offset({
                        left: leftMin,
                        top: topMin
                    })
                    .width(leftMax - leftMin)
                    .height(topMax - topMin)
            },
            moveElem: function(leftStep, topStep){
                if (this.$sele) {
                    this.$sele.css({
                        left: this.$sele.position().left + leftStep,
                        top: this.$sele.position().top + topStep
                    })
                    this.canvas.emitChange(this.$sele)
                    this.updateRect()
                }
                if (this.$seleArr) {
                    this.$seleArr.forEach(function(item){
                        item.css({
                            left: item.position().left +  leftStep,
                            top: item.position().top + topStep
                        })
                    })
                    this.canvas.emitChange(this.$seleArr)
                    this.updateRect()
                }
            },
            /**
             * 将指定节点的offset，宽高，旋转角度复制给目标节点
             */
            _setElemData: function($to,$from) {
                var angle = parseInt($from.attr('data-rotate') || 0)
                var diff
                //减去选择器边框
                diff = ($from==this.$rect || -1) *
                    (parseInt(this.$rect.css('borderLeftWidth'))||0);
                //var border = ($from == this.$rect) ? 0 : ($from.css('border-width') || 0)
                //border = parseInt(border)
                //offset 只对可见元素有效
                $from.show(); $to.show()
                $to.attr('data-rotate', angle)
/*                if (angle !== "0" || angle != 0) { //todo, ie8旋转会出现锯齿
                    $to.transform({             //注: 旋转要在left和top之前设置
                        rotate: angle+'deg'
                    })
                }*/
                //$from !== this.$rect && $from.css('line-height', $from.height())
                $to.width($from.width())// + border)
                $to.height($from.height())// + border)
                $to.offset({
                    left: $from.offset().left+diff,
                    top: $from.offset().top+diff
                })
                //$to.offset({left:30})
            },
            /**
             * 获取元素数据
             */
            _getElemData: function($elem) {
                return {
                    'rotate': parseInt($elem.attr('data-rotate') || 0),
                    'left': parseInt($elem.offset().left),
                    'top': parseInt($elem.offset().top),
                    'width': $elem.width(),
                    'height': $elem.height()
                }
            },
            /**
             * 检测元素数据是否改变
             */
            _isChange : function($elem, testData) {
                var data = this._getElemData($elem)
                for(var key in testData) {
                    if(data[key] !== testData[key]) {
                        return true
                    }
                }
                return false
            },
            /**
             * 隐藏选择器内部控制器, 如框架内部的图片拖动缩放控制器
              */
            _hideController: function() {
                this.$rect.find('.diy-selector-control').hide()
                return this
            },
            /**
             * 显示框架图片拖动缩放控制器
              */
            _showDiyFrameController: function() {
                var startX,startY //图片拖动前鼠标的初始位置
                    ,startLeft,startTop //图片拖动前的初始位置
                    ,that = this
                var $ctrl
                if(!($ctrl = this.$rect.find('.diy-selector-control'))[0]) {
                    $ctrl = $( '<div class="diy-selector-control">' +
                                '<a class="diy-frame-larger" data-action="frame-larger" title="放大" src="javascript:void(0);">放大</a>'+
                                '<a class="diy-frame-smaller" data-action="frame-smaller" title="缩小" src="javascript:void(0);">缩小</a>'+
                                '<a id="framePhotoMoveBtn"class="diy-frame-move" title="拖动边框内图片" src="javascript:void(0);">拖动</a></div>')
                    this.$rect.append($ctrl)
                }
                var $wrap = this.$sele.find('.diy-frame-visual-wrap') //框架
                var $p = this.$sele.find('.diy-frame-photo')
                //如果没有图片直接返回
                if(!$p[0]) return
                //显示控制器
                $ctrl.show()
                $ctrl.css({
                    width: $wrap[0].style.width,  //注: 使用百分比, 直接使用$wrap.width()会转换为px
                    height: $wrap[0].style.height,
                    left: $wrap[0].style.left,
                    top: $wrap[0].style.top
                })
                //添加move
                $('#framePhotoMoveBtn').draggable2({
                    dragTarget: "clone",
                    startFn: function(e){
                        this.$dragTarget.css({"visibility": "hidden"})
                        startX = e.clientX
                        startY = e.clientY
                        startLeft = parseInt($p.css('left')) //图片开始位置
                        startTop = parseInt($p.css('top'))
                    },
                    stepFn: function(e) {
                        $p.css({
                            left: startLeft + e.clientX - startX,
                            top: startTop + e.clientY - startY
                        })
                    },
                    endFn: function(){
                        that.canvas.history.add('edit', [that.$sele])
                    }
                })
                //添加放大缩小 todo 重复添加 影响性能
                this.$rect.actionMap({
                    'frame-larger': function(e) {
                        that.canvas.scaleDiyFramePhoto(11/10, that.$sele)
                        that.canvas.history.add('edit', [that.$sele])
                        that._checkSize(that.$sele);
                    },
                    'frame-smaller': function() {
                        that.canvas.scaleDiyFramePhoto(10/11,that.$sele)
                        that.canvas.history.add('edit', [that.$sele])
                        that._checkSize(that.$sele);
                    }
                })
            },
            /*
             * 检测图片大小，大于原始尺寸时显示提示
             */
            _checkSize: function($elem, isCheckDataSize) {
                var type = $elem.data('type');
                var zoomRatio = this.canvas.zoomRatio
                var photoKey
                // 边框只处理边框内的图片
                if(type === 'diy_frame'){
                    $elem = $elem.find('.diy-frame-photo');
                }
                photoKey = $elem.attr('data-key')
                //如果是黑色和白色占位图则不处理
                if (!photoKey || imgCheckIgnoreKeys.indexOf(photoKey) !== -1) {
                    this._showWarnBox(false)
                    return this
                }

                //检测类型
                if(!$elem.size() || !(['diy_photo','diy_frame','diy_decorate'].indexOf(type)+1)) {
                    this._showWarnBox(false)
                    return this
                }
                //检测大小
                if (
                    (!isCheckDataSize && ($elem.width() > $elem.data('origin_width') * zoomRatio + 1
                        || $elem.height() > $elem.data('origin_height') * zoomRatio + 1))
                    ||
                    (isCheckDataSize &&  ($elem.attr('data-width') > $elem.data('origin_width') ||    // 宽高不超过原始尺寸
                         $elem.attr('data-height') > $elem.data('origin_height')))
                ) {
                    this._showWarnBox(true)
                    return this
                } else {
                    this._showWarnBox(false)
                    return this
                }
            },
            /*
             * 显示警告图标，内容以 title 方式显示，没有传入 msg 时隐藏
             * @param {Boolean} 是否显示
             */
            _showWarnBox: function(isShow){
                var $warn = this.$rect.find('.diy-selector-warn');
                if(!$warn.size()){
                    $warn = $('<div class="diy-selector-warn"><img src="'+ global.s_domain +'/diy/imgs/warn.png"></div>')
                        .hide().appendTo(this.$rect);
                }

                if(isShow){
                    $warn.attr('title','像素不足，建议缩小图片，或换用更大图片！').show();
                }else{
                    $warn.hide();
                }

            },
            /**
             * 创建选择器矩形,并加入到body上
             */
            _createSeleBox: function() {
                var $rect
                    ,$box
                if(this.$rect) return //已经创建
                $("#diySelectorBox").show()     //添加模版
                $rect = $('#diySelector')
                $box = $('#diyToolBox')
                $rect.css('zIndex',"1000")
                if($.browser.msie) {
                    $rect.css('backgroundColor', "rgba(133,65,65,0.1)")
                    if($.browser.version == 8) { $rect.css('opacity',"0.5") }
                }
                $rect.dblclick(this._setTextInput.bind(this))
                $rect
                    .draggable2()//"dragScope": "diyCanvas"
                    .resizable2()
                    .rotable2()
                //注册矩形框点击
                //$rect.on('click.selector',this._setTextInput.bind(this))
                //隐藏
                $rect.hide()
                $box.hide()
            }
        })
        .wrap(selectorToolWrap)
        //.wrap(setget) //setget插件
        .wrap(single) //单例插件

    return DiySelector
})

