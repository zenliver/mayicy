/**
 * 工具管理
 * @update by liuwencheng
 * @date 2013-5-18
 *
 */
define(function(require,exports) {
    require("zz/plugins/actionMap")
    require('jquery.mousewheel')

    var $ = require("jquery")
    var diyControl = require('diy/canvasControl')
    var canvasArr = diyControl.getCanvasArr()
    var selector = diyControl.getSelector()
    var canvasDataControl = require("./canvasDataControl")
    var cookie = require('cookie')
    var Dialog = require('zz/ui/Dialog')
    var Panel = require('zz/ui/base/Panel')
    var keyCode = require('zz/utils/keyCode')
    var loadImgs = require('zz/utils/loadImgs')
    var alert = require('zz/ui/alert')
    var utils = require('zz/utils/utils')
    var loading = require('zz/ui/loading')
    var userActions = require("./common/userActions")
    var confirm = require('zz/ui/confirm')

    var $tool = $('#diyToolPanel')
    var actions = {
        "redo": function() {
            var $elemArr = selector.canvas.history.redo()
            if($elemArr) selector.seleMoreElems($elemArr)
        },
        "undo": function() {
            //console.log(selector.canvas.history._undoArr)
            var $elemArr = selector.canvas.history.undo()
            selector.seleMoreElems($elemArr)
        },
        "del": function() {
            selector.del()
        },
        //工具栏 -- 预览
        preview:function(){
            require("./common/preview").open(canvasArr, selector.canvas.index)
        },
        //工具栏 -- 保存
        save: function(e){
            save()
        },
        fangzhi_save: function(){
            var $save = $(this)
            $save.addClass('disabled')
            userActions.fangzhiSave({
                canvasArr: canvasArr,
                alwaysCb: function(){
                    $save.removeClass('disabled')
                }
            })
        },
        fangzhi_pdf: function(){
            confirm("生成pdf比较慢，需要一分多钟，您确定要生成吗? ", function () {
                var loadingPanel = loading('正在生成pdf, 请耐心等待。。。')
                var $buy = $(this).addClass('disabled')
                userActions.fangzhiSave({
                    canvasArr:canvasArr,
                    doneCb: function () {
                        userActions.fangzhiPdf(function(){
                            loadingPanel.close()
                            $buy.removeClass('disabled')
                        })
                    },
                    noInfo: true
                })
            })
        },
        user_save: function() {
            var $save = $(this)
            $save.addClass('disabled')
            if (! global.isService) {
                userActions.save({
                    canvasArr: canvasArr,
                    alwaysCb: function () {
                        $save.removeClass('disabled')
                    }
                })
            } else {
                global.service_save(_saveDiyContent(), _unLoad) //调用服务宝接口
            }
            function _unLoad() {
                $save.removeClass('disabled')
            }
        },
        user_buy: function () {
            //require("./common/preview").open(selector, canvasArr, true, function () {
            var loadingPanel = loading('正在下单，请耐心等待。。。')
            var $buy = $(this).addClass('disabled')
            if (! global.isService) {
                userActions.save({
                    canvasArr:canvasArr,
                    doneCb: function () {
                        userActions.buy(function(){
                            loadingPanel.close()
                            $buy.removeClass('disabled')
                        })
                    },
                    noInfo: true
                })
            } else {
                global.service_audit(_saveDiyContent(), _unLoad) //调用服务宝接口
            }
            function _unLoad() {
                loadingPanel.close()
                $buy.removeClass('disabled')
            }
            //}, "请确保您填写的内容无误，点击确定下单印刷!! ")
        },
        //
        addModel: function(){
            var $model = selector.canvas.addDiyModel();
            selector.seleElem($model);
        },
        audit: function() {
            var $this = $(this)
            //require("./common/preview").open(selector, canvasArr, true, function () {
                save(false, function() { //提交之前先保存
                    $this.addClass('disabled')
                    canvasDataControl.audit(function(){$this.removeClass('disabled')})
                })
            //}, "请确保您设计的模板无误，点击确定提交审核!!")
        },
        drawLine: function(e){
            e.stopPropagation();

            var $this = $(this),
                menu = new Panel({
                    append:$('<div><a href="javascript:;" class="diy-tb-item">水平线段</a></div><div><a href="javascript:;" class="diy-tb-item">垂直线段</a></div>'),
                    blankToClose:true,
                    closeToDispose:true
                })
                .onState('CLOSE',function(){
                    $this.removeClass('select');
                })
                .open();

            menu.$target.css({
                left:$this.offset().left,
                top:$this.offset().top+$(this).outerHeight()
            }).children().click(function(){
                var isVertical = $(this).index(),
                    notVertical = !isVertical,
                    $container = selector.canvas.container,

                $line = selector.canvas.addDiyLine().attr({
                    'data-is-vertical':isVertical||''
                }).css({
                    width:isVertical?15:100,
                    height:isVertical?100:15
                });
                $line.css({
                    left:($container.width()-$line.width())/2,
                    top:($container.height()-$line.height())/2
                });
                $line.children().css({
                    borderLeft:isVertical&&'5px solid black',
                    borderTop:notVertical&&'5px solid black',
                    marginLeft:isVertical*5,
                    marginTop:notVertical*5,
                    width:notVertical&&'100%',
                    height:isVertical&&'100%'
                });
                selector.seleElem($line);
                menu.close();
            });

            $(this).addClass('select');
        }
    }

    /**
     * 保存diy所有画布数据 */
    function _saveDiyContent () {
        global.content.pages.forEach(function(item,index){
            $.extend(item,canvasArr[index].getDiyAllData())
        })
        return global.content
    }
/*
    $('#diyRulerX,#diyRulerY').on('mousedown.ruler',function(e){
        e.stopPropagation();
        e.preventDefault();

        var isVertical = $(this).is('#diyRulerY')*1,
            $lineContainer = selector.canvas.container.parent(),
            $line = $(this).is('#diyRulerX,#diyRulerY') ? $('<div class="diy-r-helper-line"></div>').attr({
                'data-is-vertical':isVertical||''
            }).css({
                position:'absolute',
                left:isVertical && 'auto',
                top:(!isVertical*1) && 'auto',
                width:(!isVertical) ? '100%':'11px',
                height:(isVertical) ? '100%':'11px',
                cursor:isVertical?'e-resize':'n-resize',
                zIndex:1000
            }).append($('<div></div>').css({
                width:(!isVertical) && '100%',
                height:(isVertical) && '100%',
                borderLeft:(isVertical) && '1px dashed black',
                borderTop:(!isVertical) && '1px dashed black',
                marginTop:(!isVertical) && '5px',
                marginLeft:(isVertical) && '5px'
            })).appendTo($lineContainer).on({
                'mousedown.ruler':arguments.callee
            }):$(this);

        $(document).on({
            'mousemove.ruler':function(e){
                e.stopPropagation();
                e.preventDefault();

                var isVertical = $line.attr('data-is-vertical')*1;

                $line.css({
                    left:isVertical && e.pageX-$lineContainer.offset().left,
                    top:(!isVertical*1) && e.pageY-$lineContainer.offset().top
                });
            },
            'mouseup.ruler':function(e){
                $(document).off('.ruler');

                var pos = $line.position();
                if(pos.left<0 || pos.left>=$lineContainer.width() ||
                    pos.top<0 || pos.top>=$lineContainer.height()){
                    $line.remove();
                }
            },
            'contextmenu.ruler':function(e){
                $line.remove();
            }
        });
    });

    $('#photoTool').find('input[type=range]').on('change',function(e){
        var filter = selector.$sele.css('-webkit-filter'),
            filterName = $(this).attr('data-filter'),
            filterValue = this.value+(filterName=='hue-rotate'?'deg':(filterName=='blur'?'px':''));

        filter = filter.replace(new RegExp(filterName+'\\([^\)]+\\)|none'),'');
        filter += ' '+filterName+'('+filterValue+')';
        selector.$sele.css('-webkit-filter',filter);
    });
*/

    /**
     * 绑定history事件,用于处理判断按钮是否可点击
     * @param {$}
     */
    function bindHistoryEvents () {
        //绑定history事件
        var unDisableCb = function(){ $(this).removeClass('disabled') }
        var disableCb = function(){ $(this).addClass('disabled') }
        canvasArr.forEach(function(canvas){
            canvas.history
                .unState("UNDO_NO_EMPTY")
                .unState("REDO_NO_EMPTY")
                .unState("UNDO_EMPTY")
                .unState("REDO_EMPTY")
                .onState("UNDO_NO_EMPTY", unDisableCb, $tool.find('[data-action=undo]'))
                .onState("REDO_NO_EMPTY", unDisableCb, $tool.find('[data-action=redo]'))
                .onState("UNDO_EMPTY", disableCb, $tool.find('[data-action=undo]'))
                .onState("REDO_EMPTY", disableCb, $tool.find('[data-action=redo]'))
                .triggerState('UNDO_EMPTY')//一开始直接触发为空 todo: 初始化加载模版时候可能不为空
                .triggerState('REDO_EMPTY')
        })
    }

    /**
     * 初始化放大缩小
      */
    function initRange () {
        var range = new (require('zz/ui/Range'))({
            "appendTo": $tool,
            "css": {
                right: "86px",
                top: "8px"
            },
            changeFn: function(rangeVal){
                var canvas = selector.canvas
                canvas.zoom(rangeVal, function(){
                    selector.updateRect()
                })
            },
            scope: [selector.canvas.minZoom, selector.canvas.maxZoom]
        })
        range.open()
        range.setRange(selector.canvas.zoomRatio)
        //设置滚轮
        $(document).mousewheel(function(e, delta){
            if(e.altKey || e.ctrlKey) {  //按住alt才能滚动
                if (delta > 0) { //上滚
                    range.bigger()
                } else {
                    range.smaller()
                }
                e.preventDefault()
                e.stopPropagation()
            }
            selector.updateRect()
        })
        range.$range.attr('title', "alt+滚轮")
        $tool.data('rangeObj',range) //保存
    }


    /**
     * 自动保存
     * @param {Number}
      */
    function initAutoSave (delay) {
        //setTimeout()
        var $this = $tool.find('[data-action=save]')
        var _timeout
        canvasArr.forEach(function(canvas){
           //canvas.history.unState('CHANGE')
           canvas.history.onState('CHANGE', function(){
               $this.removeClass('disabled');
               $this.html('<i class="i-btn save"></i>保存')
               var newTime = (new Date()).getTime()
                   ,oldTime = $this.attr('save-time') || 0
               if (_timeout) clearTimeout(_timeout)
               if (newTime - oldTime >= delay ) {
                   _timeout = null
                   save(true) //自动保存
               } else {
                   _timeout = setTimeout(function() {
                       save(true)
                   }, delay)
               }
           })
        })
    }

    /**
     * 保存
     * @param {Boolean}
     * @param {Function} 保存成功之后的回调
     */
    function save(isAutoSave, cb) {
        var $this = $tool.find('[data-action=save]').addClass('disabled')
        //创建json数据流
        var pagesData = []
        var canvasJsonData
        var isCorrect = true
        var $text                   //当前不合法text
        var $text_canvas_index     //当前不合法text元素所属canvas
        //var noElems = false
        canvasArr.forEach(function(canvas){
            //console.log(canvas.checkTextMean())
            var _$text
            if(_$text = canvas.checkTextMean()) {
                isCorrect = false
                $text = _$text
                $text_canvas_index = canvas.index
                return
            }
            if (!canvas.bgElem.attr('data-key')) {
                isCorrect = false
                return
            }
            pagesData.push(canvas.getDiyAllData())
        })
        canvasJsonData = {
            type: canvasArr[0].getType(),
            pages: pagesData,
            "extends": {}
        }
        //判断是否圆角
        if (canvasArr[0].opts.hasRadius) {
            canvasJsonData.extends.rotate = true
        }
        /*            if(!cookie.get('user_id')) {
         return
         }*/
        if (isCorrect) {
            $this.attr('save-time', (new Date()).getTime())
            canvasDataControl.save(canvasJsonData, function(isCorrect){
                        if (isCorrect) cb && cb()
                        if (isAutoSave && isCorrect)  {
                            var time = new Date()
                            $this.html('<i class="i-btn save"></i>自动保存(' + time.getHours() + ":" + time.getMinutes() + ":"+time.getSeconds()+")")
                            $this.addClass('disabled');
                            //$this.addClass('autosaved')
                        } else {
                            $this.removeClass('disabled');
                            $this.html('<i class="i-btn save"></i>保存')
                        }
                    }
                    , isAutoSave)
            return
        }
        if (!isAutoSave) {
            if ($text) {
                diyControl.seleCanvas($text_canvas_index)
                selector.seleElem($text)
                alert('请为指定文本选择文本所属类别！！')
                $this.removeClass('disabled')
                $this.html('<i class="i-btn save"></i>保存')
            }
            else {
                alert('正反面都需要添加背景图片哦！！')
                $this.removeClass('disabled')
                $this.html('<i class="i-btn save"></i>保存')
            }
        } else {
            $this.removeClass('disabled')
            $this.html('<i class="i-btn save"></i>保存')
        }
    }

    function init() {
        // 键盘操作
        $(document).on('keydown.diyshotcut', function(e){
            if (selector.isEdit()) return   //处于编辑状态不能使用快捷键
            if(e.keyCode == keyCode.get('delete')){ actions.del() } //删除元素
            if(e.keyCode == keyCode.get('left')){selector.moveElem(-1,0);e.preventDefault();return} //左方向键
            if(e.keyCode == keyCode.get('right')){selector.moveElem(1,0);e.preventDefault();return} //右方向键
            if(e.keyCode == keyCode.get('up')){selector.moveElem(0,-1);e.preventDefault();return} //上方向键
            if(e.keyCode == keyCode.get('down')){selector.moveElem(0,1);e.preventDefault();return} //下方向键
            if(e.ctrlKey && e.keyCode == keyCode.get('c')) {selector.copy();e.preventDefault();return}
            if(e.ctrlKey && e.keyCode == keyCode.get('x')) {selector.cut();e.preventDefault();return}
            if(e.ctrlKey && e.keyCode == keyCode.get('v')) {selector.paste();e.preventDefault();return}
            if(e.ctrlKey && e.keyCode == keyCode.get('s')) {save();e.preventDefault();return}
            if(e.ctrlKey && !e.shiftKey &&e.keyCode == keyCode.get('z')){actions.undo()}; //撤销操作
            if((e.ctrlKey && e.shiftKey && e.keyCode == keyCode.get('z')) || (e.ctrlKey && e.keyCode == keyCode.get('y'))){actions.redo()}; //恢复操作

            //if(e.keyCode == 61){diyCanvas.scaleDiyFramePhoto(6/5)} // 加号
            //if(e.keyCode == 173){diyCanvas.scaleDiyFramePhoto(5/6)} // 减号
        })
        $tool.actionMap(actions,null,{disabled: true})
        //初始化缩放事件
        initRange()
        //绑定history事件
        bindHistoryEvents()
        //自动保存
        if (!global.isUser) {
            initAutoSave(10 * 1000) //10秒自动保存
        }
    }
    init()
    exports.reBind = function () {
        //绑定history事件
        bindHistoryEvents()
        //自动保存
        if (!global.isUser) {
            initAutoSave(10 * 1000) //10秒自动保存
        }
    }
})
