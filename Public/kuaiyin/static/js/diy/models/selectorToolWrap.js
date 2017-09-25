/**
 *
 *  选择器的工具弹框, 依赖于选择器, 可以使用选择器属性及方法
 *
 * @author by liuwencheng
 * @date 2013-5-31
 *
 * @update by liuwencheng 2013-6-28 加入对齐, 分布
 */
define(function (require, exports) {
    "use strict"
    require('jquery.color')
    require('zz/plugins/focusRect')
    var $ = require('jquery')
        ,math = require("zz/utils/math")
        ,objs = require('zz/utils/objs')
        //,colorPicker = require('zz/ui/ColorPicker')
        ,color2Picker = new (require('zz/ui/Color2Picker'))() //单例

    var canvasStaticData = require("../config/canvasStaticData")
    return {
        /**
         * 工具注册
         */
        init: function () {
            this.$paste = $('#diyPasteBtn')
            this._pasteSaveArr = []//黏贴的保存地方, 剪贴板
            this._defToolActions()                      //注册工具栏事件
            this._bindToolEvents()                      //
        },
        /*
         * 设置工具框的位置及内容
         *  width,height,angle 用于计算工具浮窗的相对位置
         */
        _setToolBox: function (width, height, angle) {
            var $rect = this.$rect
                , winHeight = $(window).height()
                , centPos
                , roRect
                , $box = $('#diyToolBox')
            //设置box内容
            this._setToolBoxContent()
            //获取中心点
            centPos = [
                parseInt($rect.css('left')) + $rect.width() / 2,
                parseInt($rect.css('top')) + $rect.height() / 2
            ]
            //获取dom旋转后的外围矩形
            roRect = math.getRotateRect(width, height, angle)
            //设置box位置
            $box.css({
                'left': centPos[0] - $box.width() / 2,
                'top': centPos[1] + roRect[1] / 2 + 10
            })
            if (this.isEasy) return
            //保证在window上边
            if ($box.offset().top + $box.height() > winHeight) {
                $box.offset({'top': winHeight - $box.height()})
            }

        },
        /**
         *  设置工具菜单的内容
         */
        _setToolBoxContent: function () {
            var $toolUp = $('#diyToolUp')
            var $toolBottom = $('#diyToolBottom')
            if (this.$sele) {
                //检测上移和下移按钮的可用性
                var type = this.$sele.attr('data-type').slice(4)
                this.canvas.checkIndex(this.$sele)
            } else {
                var type = "multi" //多选
            }
            //默认partType使用photo
            var partType = ~['multi','text'].indexOf(type) ? type : "photo"
            $toolUp.show().children().hide().removeClass('select').filter("[data-part="+partType+"]").show() //显示选项
            $toolBottom.children().show().filter('[data-action=edit]').hide() //显示下部工具条
            switch(type) {
                case "text":
                    var color
                    var $textMean = $('#textMean')
                    //console.log(this.$sele.css('font-family'))
                    $('#textFontFamily').val(this.$sele.attr('data-family'))
                    $('#textFontSize').val(this.$sele.attr('data-size'))
                    //是否有文本类别选择框
                    if (this._opts.isTextType) {
                        $textMean = $textMean.val(this.$sele.attr('data-mean')).focusRect(true) //产生焦点动画
                        if (this.$sele.attr('data-mean') == "-1" && !this.isEasy) {
                            this.$sele.children('i').show()
                        } else {
                            this.$sele.children('i').hide()
                            $textMean.unFocusRect() //关闭焦点动画
                        }
                    } else {
                        $textMean.remove()
                    }
                    $('#textColor').children('i')
                        .css('backgroundColor','rgb(' + this.$sele.attr('data-color') + ')')
                    if (this.$sele.attr('data-bold') === "1") { //todo 代码重构
                        $('#textWeight').addClass('select')
                    }
                    if (this.$sele.attr('data-italic') === "1") {
                        $('#textItalic').addClass('select')
                    }
                    if (this.$sele.attr('data-underline') === "1") {
                        $('#textUnderline').addClass('select')
                    }
                    if (this.$sele.attr('data-align') === "center") {
                        $toolUp.find('[data-action=centerX]').addClass('select')
                    }
                    if (this.$sele.attr('data-text_align') === "center") {
                        $toolUp.find('[data-action=textCenterX]').addClass('select')
                    }
                    //-如果不是多行文本隐藏文本块居中按钮
                    if (!this.isTextMultiLine()) {
                        $toolUp.find('[data-action=textCenterX]').hide()
                    }
                    //显示编辑按钮
                    $toolBottom.children('[data-action=edit]').show()
                    break;
                case "qianming":
                case "photo":
                    if (this.$sele.attr('data-align') === "center") {
                        $toolUp.find('[data-action=centerX]').addClass('select')
                    }
                    if (this.$sele.attr('data-alignY') === "center") {
                        $toolUp.find('[data-action=centerY]').addClass('select')
                    }
                    break;
/*                case 'line':
                    var $elem = this.$sele,
                        $line = $elem.children(),
                        isVertical = $elem.attr('data-is-vertical');
                    $('#lineWidth').val($line.css(isVertical?'borderLeftWidth':'borderTopWidth'));
                    $('#lineStyle').val($line.css(isVertical?'borderLeftStyle':'borderTopStyle'));
                    $('#lineColor').children('i')
                        .css('backgroundColor',$line.css(isVertical?'borderLeftColor':'borderTopColor'));
                    break;*/
                case 'multi':
                    $('#diyAlign').val('null')
                    $toolBottom
                        .children("[data-action=down],[data-action=up]")
                        .hide()
            }
            if (this.isEasy) {
                var $diyEasyInfo = $toolUp.children('p[data-action=easy-info]')
                $('#diyToolBottom').hide()
                if ($diyEasyInfo.length == 0) {
                    $toolUp.append("<p data-action='easy-info' style='color:red'>注：使用上下左右键或鼠标拖动可移动该元素~~</p>")
                } else {
                    $diyEasyInfo.show()
                }
                $('#textMean').hide()
            }
        },
        /**
         * 绑定工具菜单事件
         */
        _bindToolEvents: function() {
            var that = this
            //文本字体
            $('#textFontFamily').change(function(){
                that.$sele.attr('data-family', $(this).val())
                that.canvas.emitChange(that.$sele)
            })
            //文本大小
            $('#textFontSize').change(function (e) {
                that.$sele.attr('data-size', $(this).val())
                that.canvas.emitChange(that.$sele)
            })
            //文本语义
            $('#textMean').change(function() {
                that.$sele.attr('data-mean', $(this).val())
                //that.canvas.
                //改变文字内容
                var curContent = $.trim(that.$sele.attr("data-content"))
                var isMineContent = true //是不是自己填的内容
                objs.forEach(canvasStaticData._meanAutoTexts, function(item){
                    if(item === curContent || curContent === "") {
                        isMineContent = false
                        return objs.breaker
                    }
                })
                !isMineContent && that.$sele.attr("data-content",canvasStaticData._meanAutoTexts[$(this).val()])
                if ($(this).val() === "-1") {
                    that.$sele.children('i').show()
                } else {
                    that.$sele.children('i').hide()
                }
                that.canvas.emitChange(that.$sele)
            })
            //画线宽度
            $('#lineWidth').change(function(e){
                var isVertical = that.$sele.attr('data-is-vertical');
                that.$sele.css({
                    width:  (isVertical) ? (parseInt($(this).val())+10):'+=0',
                    height:(!isVertical) ? (parseInt($(this).val())+10):'+=0'
                }).children().css({
                    borderTopWidth:(!isVertical) && $(this).val(),
                    borderLeftWidth:(isVertical) && $(this).val()
                });
                that.seleElem(that.$sele);
            });
            //画线样式
            $('#lineStyle').change(function(e){
                var isVertical = that.$sele.attr('data-is-vertical');
                that.$sele.children().css({
                    borderTopStyle:(!isVertical) ? $(this).val():'none',
                    borderLeftStyle:(isVertical) ? $(this).val():'none'
                });
            });
            //多选对齐
            $('#diyAlign').change(function(e){
                var $seleArr = that.$seleArr
                var rectOffset = that.$rect.offset()
                    ,leftMin = rectOffset.left
                    ,topMin = rectOffset.top
                    ,leftMax = rectOffset.left + that.$rect.width()
                    ,topMax = rectOffset.top + that.$rect.height()
                switch($(this).val()) {
                    case 'align-left':
                        $seleArr.forEach(function(item){
                            item.attr('data-align','left')
                            item.offset({'left': leftMin})
                        })
                        break;
                    case 'align-right':
                        $seleArr.forEach(function(item){
                            item.attr('data-align','right')
                            item.offset({'left': leftMax - item.width()})
                        })
                        break;
                    case 'align-top':
                        $seleArr.forEach(function(item){
                            item.offset({'top': topMin})
                        })
                        break;
                    case 'align-bottom':
                        $seleArr.forEach(function(item){
                            item.offset({'top': topMax - item.height()})
                        })
                        break;
                    case 'align-h-center':
                        $seleArr.forEach(function(item){
                            item.offset({'left': leftMin + (leftMax-leftMin)/2 - item.width()/2})
                        })
/*                        $seleArr.forEach(function(item){
                            item.attr('data-align','center')
                        })*/
                        break;
                    case 'align-v-center':
                        $seleArr.forEach(function(item){
                            item.offset({'top': topMin + (topMax-topMin)/2 - item.height()/2})
                        })
                        break;
                }
                that._setBiggerRect($seleArr) //更新矩形框
                that.canvas.emitChange($seleArr)
            })
        },
        /**
         *  定义工具菜单事件
         */
        _defToolActions: function () {
            var that = this
            this.$toolBox.actionMap({
                "up": function () {
                    that.canvas.moveUp(that.$sele)
                },
                "down": function () {
                    that.canvas.moveDown(that.$sele)
                },
                "edit": function() {
                    that._setTextInput()
                },
                "delete": function () {
                    that.del()
                },
                "copy": function () {
                    that.copy()
                },
                "cut": function () {
                    that.cut()
                },
                "color": function(e){
                    var $elem = that.$sele;
                    var $target = $(this).toggleClass('select')
                    //var curColor = "rgb(" + that.$sele.attr('data-color') + ")"
                    var curCMYK = $elem.attr("data-cmyk")
/*                    if($elem.attr('data-type')==='diy_line'){
                        curColor = $elem.css('borderBottomColor');
                    }*/
                    e.stopPropagation()
                    color2Picker
                        //打开回调
                        .onceState('OPEN', function(){
                            this.setCMYK(curCMYK)
                        })
                        //关闭回调
                        .onceState('SELECT',function(){
                            if(!$elem){
                            }else if($elem.attr('data-type')==='diy_text'){
                                if (that.$sele) {
                                    that.$sele.attr('data-color', getStrColor(this.getRGB()))
                                    that.$sele.attr('data-cmyk', this.getStrCMYK())
                                }
                                $('#textColor').children('i').css('backgroundColor', this.getRGB())
                                $target.removeClass('select')
                                that.canvas.emitChange(that.$sele)
                            }else if($elem.attr('data-type')==='diy_line'){
/*                                $elem.children().css({
                                    'borderColor':this.getColor()
                                });
                                $('#lineColor').children('i').css('backgroundColor', this.getColor())
                                $target.removeClass('select')*/
                            }
                            //清除事件
                            //this.unState('CLOSE')
                            //this.unState('OPEN')
                        })
                        .open($(this))
                },
                "stylus": function(){
                    var $btn = $(this)
                        ,type = $btn.attr('data-type')
                    $btn.toggleClass('select')

                    if($btn.hasClass('select')) {
                        that.$sele.attr('data-' + type, 1)
                    }else {
                        that.$sele.attr('data-' + type, 0)
                    }
                    that.canvas.emitChange(that.$sele)
                },
                //水平平均分布
                "distribute-h": function() {
                    var $seleArr = that.$seleArr
                        ,spaceArr = [] //间距数组
                        ,disSpace //平局间距
                    //排序
                    $seleArr = $seleArr.sort(function(item1, item2){
                        return item1.offset().left - item2.offset().left
                    })
                    //获取间距数组
                    $seleArr.forEach(function(item, key, arr){
                        if(key !== arr.length -1) { //不是最后一个
                            spaceArr.push(arr[key+1].offset().left - item.offset().left - item.width())
                        }
                    })
                    //console.log(spaceArr)
                    //获取平均间距
                    disSpace = spaceArr.reduce(function(a,b){ return a+b}) / spaceArr.length
                    //console.log('平均水平距离: ' + disSpace)
                    $seleArr.forEach(function(item, key, arr){
                        if(key !== 0) { //排除第一个
                            item.offset({left: arr[key-1].offset().left + arr[key-1].width() + disSpace})
                        }
                    })
                    that.canvas.history.add('edit', $seleArr)
                },
                //垂直平均分布
                "distribute-v": function() {
                    var $seleArr = that.$seleArr
                        ,spaceArr = [] //间距数组
                        ,disSpace //平局间距
                    //排序
                    $seleArr = $seleArr.sort(function(item1, item2){
                        return item1.offset().top - item2.offset().top
                    })
                    //获取间距数组
                    $seleArr.forEach(function(item, key, arr){
                        if(key !== arr.length -1) { //不是最后一个
                            spaceArr.push(arr[key+1].offset().top - item.offset().top - item.height())
                        }
                    })
                    //console.log(spaceArr)
                    //获取垂直间距
                    disSpace = spaceArr.reduce(function(a,b){ return a+b}) / spaceArr.length
                    //console.log('平均垂直距离: ' + disSpace)
                    $seleArr.forEach(function(item, key, arr){
                        if(key !== 0) { //排除第一个
                            item.offset({top: arr[key-1].offset().top + arr[key-1].height() + disSpace})
                        }
                    })
                    that.canvas.history.add('edit', $seleArr)
                },
                filter: function(){
                    $(this).parent().hide().nextAll(':lt(3)').show();
                },
                "centerX": function() {
                    if(that.$sele.attr('data-align') === "center") {
                        that.$sele.attr('data-align','left')
/*                        //如果是文本就触发多行
                        if (that.$sele.attr('data-type') === "diy_text") {
                            that.canvas.emitChange(that.$sele)
                        }*/
                        $(this).removeClass('select')
                    } else {
                        $(this).addClass('select')
                        that.canvas.centerX(that.$sele)
                        that.updateRect()
                    }
                },
                "textCenterX": function() {
                    if(that.$sele.attr('data-text_align') === "center") {
                        that.$sele.attr("data-text_align","left")
                        $(this).removeClass('select')
                        that.canvas.emitChange(that.$sele)
                    } else {
                        that.$sele.attr("data-text_align","center")
                        $(this).addClass('select')
                        that.canvas.emitChange(that.$sele)
                    }
                },
                "centerY": function() {
                    if(that.$sele.attr('data-alignY') === "center") {
                        that.$sele.attr('data-alignY','left')
                        $(this).removeClass('select')
                    } else {
                        $(this).addClass('select')
                        that.canvas.centerY(that.$sele)
                        that.updateRect()
                    }
                },
                /**
                 * 替换图片
                 */
                "replace": function () {
                }
                /**
                 "transparent": function() {
                                        },
                 **/
            },null,{
                disabled: true
            })
            //黏贴器
            this.$paste.actionMap({
                "paste": function() {
                    that.paste()
                },
                "paste-cancel": function() {
                    that._pasteSaveArr = []
                    that.$paste.hide()
                }
            })
        },
        copy: function() {
            var that = this
            var $seleArr = that.$sele ? [that.$sele] : that.$seleArr
            if ($seleArr.length === 0 ) return this
            that._pasteSaveArr.length = 0
            that._pasteSaveArr = $seleArr.slice()   //copy
            that.$paste.show()
        },
        cut: function() {
            this.copy()
            this.canvas.delDiyElements.apply(this.canvas, this._pasteSaveArr)
            this.cancelSele()
        },
        paste: function() {
            var $seleArr = []
            var that = this
            this._pasteSaveArr.forEach(function($elem){
                $elem = $elem.clone()
                $elem.attr({
                    'data-left': $elem.attr('data-left') * that.canvas.zoomRatio + 10,
                    'data-top': $elem.attr('data-top') * that.canvas.zoomRatio + 10
                })
                $seleArr.push($elem)
            })
            var curArr = this.canvas.addDiyElements.apply(this.canvas, $seleArr).curElemArr
            this.seleMoreElems(curArr)
            this._pasteSaveArr.length = 0
            this.$paste.hide()
        },
        del: function() {
            var $seleArr = this.$sele ? [this.$sele] : this.$seleArr
            this.canvas.delDiyElements.apply(this.canvas, $seleArr)
            this.cancelSele()
        }
    }

    /**
     * 获取格式为"102，102，102"的颜色
     *
     * @return {String}
     */
    function getStrColor(color){
        var colorObj = $.Color(color)
        return "" + colorObj.red() + "," + colorObj.green() + "," + colorObj.blue()
    }
})


