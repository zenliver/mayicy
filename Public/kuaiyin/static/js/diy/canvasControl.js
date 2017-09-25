/**
 * diy编辑器初始化
 * v0.2
 *
 * @author by liuwencheng
 * @date 2013-5-25
 *
 * @update by liuwencheng 2013-6-7 以类的方式呈现, 并加入pagelist缩放
 * @update by liuwencheng 2013-12-4 整体重构代码，添加多页功能, 添加画布大小动态修改，添加布局弹窗
 *
 *
 *
 */
define(function(require,exports) {
    "use strict"
    require('http://www.mayicy.cn/Public/kuaiyin/static/js/diy/jquery.tmpl')
    require('zz/ui/plugins/selectable')
    var Class = require('zz/core/Class')
       , objs = require('zz/utils/objs')
       , confirm = require('zz/ui/confirm')
    var Selector = require("./models/SelectorClass")
       , Canvas = require('./models/CanvasClass')
       , $ = require('jquery')
       , color2Picker = new (require('zz/ui/Color2Picker'))()
    var dataControl = require('./canvasDataControl')

    var CanvasControl = Class()
        .defState('CHANGE_CANVAS')
        .attr({
            "THUMB_MAX_HEIGHT": 45,//66 //缩略图最大高度,
            "THUMB_MIN_WIDTH": 55  //缩略图最小宽度
        })
        .init(function () {
            this._type = dataControl.getTypeName(global.category_en_name, global.product_en_name) //当前画布所属类型
            this._canvasArr = []                //canvas数组, 每个画布有一个独立的canvas
            this._selector    //选择器, 选择器全局唯一
            this._$thumbList = $('<ul class="fn-clear"></ul>').appendTo($('#diyPageList'))    //缩略图
            this._$canvasList = $('#diyCanvasList')  //画布
            this._curIndex      //当前选择的模板
            /** 创建选择器 **/
            this._createSelector()
            /** 创建 **/
            this._createPageList()
            /** 选择第一张画布 **/
            this.seleCanvas(0)  //选择第一张画布
            /** 监听事件 **/
            this._listenEvents()
            /** 监听鼠标多选画布 **/
            this._listenCanvasMultiSele()
            /** 加载已有的模板数据 **/
            this._loadTemplate()
        })
        .method({
            _createSelector: function () {
                var opts = {
                    isMultiInput: this._type === "card_commerce" ? false : true //名片不允许多行
                }
                this._selector = new Selector(opts)
            },
            /**
             * 初始化画布，极其事件
             * @param {Number || Ignore} 页面数目，不传则使用默认
             */
            _createPageList: function (pageNum) {
                var defaultPage         //默认画布页数
                var defaultSizeData =  dataControl.getSizeArr(this._type)[0]//默认采用第一个样式
                var canvasObj
                /** 设置初始值 **/
                this._$thumbList.width(20) //先设置为20

                /** 已经有模板数据 **/
                // 设置页面数量
                if (global.content) {
                    // 从已有的模板
                    defaultPage = global.content.pages.length
                } else {
                    // 默认设置
                    defaultPage = dataControl.defaultPageCount(this._type)
                }
                // 从传入的参数
                pageNum = pageNum || defaultPage

                // 创建画布、缩略图
                for (var i= 0; i<pageNum; i++) {
                    canvasObj = this._createCanvas(i, defaultSizeData)
                    this._createThumb(i, canvasObj, pageNum)
                }

                /** 设置缩略图的水平滚动条是否显示 **/
                if (pageNum === 2) {
                    $('#diyPageList').css('overflow','hidden')
                    this._$thumbList.css('width','100%')
                } else {
                    $('#diyPageList').css('overflow-x','scroll')
                }
            },
            /**
             *  监听事件
            */
            _listenEvents: function () {
                var that = this
                /** 监听画布编辑 **/
                this._canvasArr.forEach(function(canvas,index) {
                    var $clone = that._$thumbList.children().eq(index).children('.page-container')
                    canvas.onChangeClone($clone) //监听
                })
                /** 监听点击缩略图 **/
                this._$thumbList.actionMap({
                    'selePage': function(){
                        var index = +$(this).attr('data-index')
                        that.seleCanvas(index)
                        $(window).trigger('resize') //触发resize
                    }
                })
            },
            /**
             * 创建画布及其缩略图
             * @param {Number} 当前画布
            */
            _createCanvas: function (index, sizeData) {
                // 画布 DOM 容器
                var $canvasWrap = $('#canvasTemplate').tmpl()
                  , canvasObj
                /** 画布配置 **/
                var canvasOpts = {
                    type: this._type,
                    index: index,
                    showLimitRect: false,
                    overflowShow: global.isUser ? false : true,
                    hasCutter: true,
                    hasRadius: dataControl.hasRadius(this._type),
                    canvasSize: dataControl.toSizeDetailData(sizeData),
                    hasSplitLine: dataControl.hasSplitLine(this._type),
                    bianma: dataControl.getBianmaData(this._type),
                    citiao: dataControl.getCitiaoData(this._type)
                }
                /** 添加到页面 **/
                this._$canvasList.append($canvasWrap)
                // 新的画布对象
                canvasObj = new Canvas($canvasWrap.children('.diy-r-canvas'), canvasOpts)
                //canvasObj.addTiaoma()
                // 添加到画布数组
                this._canvasArr.push(canvasObj)
                return canvasObj
            },
            /**
             * @param {Number}
             * @param {Object}  画布对象
             * @param {Number} 总页数
             * todo 是否加页面判断
            */
            _createThumb: function (index, canvasObj, pageCount) {
                var $thumbTemp = $('#pageTemplate')
                  , $thumb, thumbScale, $thumbContainer
                var canvasSize = canvasObj.canvasSize
                   ,hasRadius = canvasObj.opts.hasRadius
                   , cacheSize = 0   //缩略图间距差值
                /** 创建缩略图 **/
                // 只有一页（正反两面）
                if (pageCount === 2) {
                    index === 0 && ($thumb = $thumbTemp.tmpl({'pageIndex': '正面'}))
                    index === 1 && ($thumb = $thumbTemp.tmpl({'pageIndex': '反面'}))
                // 多页，页码
                } else {
                    //if ((index + 1) % 2)
                    var curPageIndex = Math.round((index + 1) / 2)
                    var curPageText = index % 2  === 0 ? "正面" : "反面"
                    $thumb = $thumbTemp.tmpl({'pageIndex': "第" + curPageIndex + "页" + curPageText})
                    if (index % 2 !== 0) {
                        $thumb.css('margin-right', 25)
                        cacheSize = 20
                    }
                }
                this._$thumbList.append($thumb)
                /** 定义缩放比例 **/
                thumbScale = this.THUMB_MAX_HEIGHT / canvasSize.pxHeight
                $thumb.width(canvasSize.pxWidth * thumbScale < this.THUMB_MIN_WIDTH
                            ? this.THUMB_MIN_WIDTH
                            : canvasSize.pxWidth * thumbScale) //宽度太小会导致说明文字看不清
                      .height(canvasSize.pxHeight * thumbScale)
                      .attr('data-index', index)
                $thumbContainer = $thumb.children('.page-container')
                $thumbContainer.width(canvasSize.pxWidth * thumbScale)
                        .height(canvasSize.pxHeight * thumbScale)
                        .data("thumbScale",thumbScale) //用于控制监听画布变化
                if (hasRadius) {
                    $thumb.css('border-radius','14px')
                }
                /** 添加长度 **/
                this._$thumbList.width(this._$thumbList.width() + canvasSize.pxWidth * thumbScale + 12 + cacheSize)
            },
            /**
             * 获取当前被选中的画布
             */
            getSeleCanvas: function () {
                return this._canvasArr[this._curIndex]
            },
            /**
             * 选择画布
             * @param {Number}
             */
            seleCanvas: function (index) {
                var canvas
                if (index < 0 || index >= this._canvasArr.length) return
                if (this._curIndex === index) return  //已经选择了
                canvas = this._canvasArr[index]
                this._curIndex = index
                /** 选择画布 **/
                this._$canvasList.find('.diy-r-canvas').each(function(i){
                    if(i === index) {
                        $(this).parent().addClass('select')
                    }else {
                        $(this).parent().removeClass('select')
                    }
                })
                this._selector.seleCanvas(canvas)
                var curZoom = $('#diyToolPanel').children('.ui-range').attr('data-value')/100
                canvas.zoom(curZoom || 0.6) //默认放大0.6倍数
                /** 选择缩略图 **/
                this._$thumbList.children().removeClass('select')
                        .eq(index).addClass('select')
                canvas.updateCutterByAnim() //更新剪刀并使用动画效果
                if (this._isCreateDom) {
                    this._updateDomData()
                } else {
                    this._createDomData()
                }
                this.triggerState("CHANGE_CANVAS")
            },
            /**
             * 设置dom节点提示
            */
            _createDomData: function () {
                var canvasSize = this.getSeleCanvas().canvasSize
                    ,mmWidth = canvasSize.mmWidth
                    ,mmHeight = canvasSize.mmHeight
                    ,mmBlood = canvasSize.mmBlood
                    ,$info
                    ,tpl = "<a data-hover='category' data-name='${category_en_name}'>${category_cn_name}</a> <span>&gt;</span> "
                            +"<a data-hover='product' data-parent-name='${category_en_name}' data-name='${product_en_name}'>${product_cn_name}</a> <span>&gt;</span> <span id='diyHeadSize'>${size}毫米</span>"
                $("#diyBgData").html("尺寸："+ mmWidth+"*"+ mmHeight+"毫米")
                mmWidth = mmWidth - 2 * mmBlood
                mmHeight = mmHeight - 2 * mmBlood
                $info = $.tmpl(tpl,{
                    "category_cn_name": global.category_cn_name,
                    "product_cn_name": global.product_cn_name,
                    "category_en_name": global.category_en_name,
                    "product_en_name": global.product_en_name,
                    "size": mmWidth + "*" + mmHeight
                })
                $('#diyTypeData').html($info)
                this._isCreateDom = true
            },
            _updateDomData: function () {
                var canvasSize = this.getSeleCanvas().canvasSize
                        ,mmWidth = canvasSize.mmWidth
                        ,mmHeight = canvasSize.mmHeight
                        ,mmBlood = canvasSize.mmBlood
                $("#diyBgData").html("尺寸："+ mmWidth+"*"+ mmHeight+"毫米")
                mmWidth = mmWidth - 2 * mmBlood
                mmHeight = mmHeight - 2 * mmBlood
                $('#diyHeadSize').html(mmWidth + "*" + mmHeight + "毫米")
            },
            /**
             * 监听鼠标多选画布
            */
            _listenCanvasMultiSele: function () {
                var that = this
                        , $workArea = $('#diyWorkArea')
                $workArea.find('.diy-r-canvas')
                        .each(function(){
                            $(this)
                            .on('mousedown.canvasSelect', function (event) {
                                var $target = $(event.target)
                                        ,type = $target.data('type') //attr('data-type')
                                        ,type1
                                        ,type2
                                //获取data-type
                                if(!type && (type1 = $target.parent().data('type'))) {
                                    type = type1
                                    $target = $target.parent()
                                }else if(!type && (type2 = $target.parent().parent().data('type'))) {
                                    type = type2
                                    $target = $target.parent().parent()
                                }
                                //控制选择
                                if(type && ~Canvas.TYPE_LIST.indexOf(type)) {
                                    that._selector.seleElem($target,event,true)//true表示选择时候直接触发拖拽
                                    $(this).selectable2({
                                        "isCancel" : true //暂时取消
                                    })
                                }else {
                                    //没有选择任何东西
                                    that._selector.cancelSele();
                                    $(this).selectable2({
                                        isCancel: false
                                    })
                                }
                                //ie firefox bug
                                //当颜色选择弃打开的时候执行关闭
                                color2Picker.close()
                                event.stopPropagation()
                                event.preventDefault()
                            })
                            //监听画布选框
                            .selectable2({
                                ignoreClass: "diy-background",
                                seleClass: "diy-elem",
                                endFn: function(){
                                    that._selector.seleMoreElems(this.getSeleArr()) //选择多个
                                }
                            })
                        })
                //监听工作区选择框
                $workArea.selectable2({
                    ignoreClass: "diy-background",
                    seleClass: "diy-elem",
                    scopeElem: $workArea.find('.diy-r-canvas'),
                    startFn: function() {
                        color2Picker.close()
                    },
                    endFn: function(){
                        that._selector.seleMoreElems(this.getSeleArr()) //选择多个
                    }
                })

            },
            /**
             * @return {Object}
            */
            getSelector: function () {
                return this._selector
            },
            /**
             *  @return {Array}
             */
            getCanvasArr: function () {
                return this._canvasArr
            },
            /**
             * 加载模板
            */
            _loadTemplate: function () {
                var that = this
                //若是有模版数据，加载模版
                //if(global.template_id || global.user_template_id) {
                if(global.content) {
                        that._canvasArr.forEach(function(canvas, index){
                            canvas.loadCanvasData(global.content.pages[index])
                            that._revertThumb(index)
                        })
                } else {
                //添加演示模板
                    var demoData = dataControl.getDemoArr(this._type)[0] //默认采用第一个
                    if (demoData) {
                        that._canvasArr.forEach(function(canvas, index){
                            if (demoData.pages[index])
                                canvas.loadCanvasData(demoData.pages[index])
                        })
                    }
                }
            },
            /**
             *  清空画布及其缩略图
            */
            _clear: function () {
                this._$canvasList.empty()
                this._$thumbList.empty()
                this._canvasArr.length = 0
                this._$thumbList.unActionMap()
                this._curIndex = null //清除curIndex
            },
            /**
             * 创建布局弹窗
             * @param {Number} 页数
             * @param {function} 成功的回调
             */
            changePage: function (pageNum, cb) {
                if (pageNum === this._canvasArr.length) return false
                confirm ('改变画布页数之后画布上的所有数据将丢失!!', (function () {
                    this._clear()
                    this._createPageList(pageNum)
                    this.seleCanvas(0)
                    this._listenEvents()
                    this._listenCanvasMultiSele()
                    cb && cb()
                }).bind(this))
            },
            /**
             * 旋转画布
             * @param {String}
             */
            revertCanvas:  function (type) {
                var index1, index2 //要旋转的正反面
                if (this._curIndex % 2 === 0) {
                    index1 = this._curIndex
                    index2 = this._curIndex + 1
                } else {
                    index1 = this._curIndex - 1
                    index2 = this._curIndex
                }
                confirm ('旋转画布之后将丢失画布上已有的数据！！', (function(){
                    this._canvasArr[index1].revertCanvas(type)
                    this._canvasArr[index2].revertCanvas(type)
                    this._revertThumb(index1)
                    this._revertThumb(index2)
                    this._updateDomData()
                    $(window).resize()
                }).bind(this))
            },
            /**
             * 旋转更新缩略图
             * @param {Number}
             */
            _revertThumb: function (index) {
                var canvasSize = this._canvasArr[index].canvasSize
                var $thumb = this._$thumbList.children().eq(index)
                    ,thumbScale = this.THUMB_MAX_HEIGHT / canvasSize.pxHeight
                    ,oldWidth = $thumb.width()
                    ,newWidth = canvasSize.pxWidth * thumbScale
                    ,newHeight = canvasSize.pxHeight * thumbScale
                //宽度太小会导致文字看不清
                $thumb.width(newWidth > this.THUMB_MIN_WIDTH ? newWidth : this.THUMB_MIN_WIDTH)
                    .height(newHeight)
                $thumb.children('.page-container')
                    .width(newWidth)
                    .height(newHeight)
                    .data("thumbScale",thumbScale) //用于控制监听画布变化
                this._$thumbList.width(this._$thumbList.width() + $thumb.width() - oldWidth)
            },
            getType: function () {
                return this._type
            }
        })

    return new CanvasControl()
})
