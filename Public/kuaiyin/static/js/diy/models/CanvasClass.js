/**
 *  diy画布
 *  v0.2
 *
 * @update by liuwencheng  at 2013-5-20 对diy编辑器进行整理
 * @update by liuwencheng  at 2013-5-30 重新制作历史记录  diy默认只监听del和add历史记录, edit需要在画布改变时手动自己加上历史记录
 * @update by liuwencheng at 2013-6-7 加上onChangeClone 监听container副本, 用于缩略图, 可以创建多个
 * @update by liuwencheng at 2013-6-29 添加多元素操作, 包括添加, 删除, 克隆监听
 * @update by liuwencheng at 2013-9-11 添加缩放方法，zoom
 * @update by liuwencheng at 2013-9-12 将onChangeClone移植到历史记录
 * @update by liuwencheng at 2013-9-16 添加emitChange方法
 * @update by liuwencheng at 2013-9-17 add text mean
 * @update by liuwencheng at 2013-9-26 添加UP_ENABLE, DOWN_ENABLE事件，添加checkIndexj
 * @update by liuwencheng at 2013-10-9 添加centerX水平居中对齐
 * @update by liuwencheng at 2013-11-14 添加canvas size
 * @update by liuwencheng at 2013-11-14 添加setLimitRect
 *
 * @update by liuwencheng at 2013-11-27 将出血线整合进画布
 * @update by liuwencheng at 2014-6-3 添加TECH_LOADED事件
 *
 * */
define(function (require, exports) {
    "use strict"
    require('jquery.transform')
    console.log('class...')
    var objs = require('zz/utils/objs')
      , Class = require('zz/core/Class')
      , $ = require('jquery')
      , types = require('zz/utils/types')
      , confirm = require('zz/ui/confirm')
      , utils = require('zz/utils/utils')

    var History = require('./HistoryClass')
        ,canvasJsonWrap = require('./canvasJsonWrap') //数据处理
        ,math = require('zz/utils/math')
        ,ratioImg = require('zz/utils/utils').ratioImg
    var cutter = require('../common/cutter')
    //添加类型需要在这里定义好
    var TYPE_LIST = [ 'diy_photo',
                    'diy_text',
                    'diy_model',
                    'diy_qianming'
                    ]
    var DiyCanvas = Class()
        .defState("UP_ENABLE","DOWN_ENABLE")
        .attr({
            _ENTER_: "_**_",     //文本换行替换符
            _REG_ENTER_: /\_\*\*\_/g,  //文本换行正则替换符
            DEFAULT_OPTS: {
                MAX_ZOOM: 1,        //默认最大缩放比例
                MIN_ZOOM: 0.04,       //默认最小缩放比例
                type: "card",           //类型，用于获取尺寸大小, 默认card
                index: 0,               //canvas的索引, 每一页会对应一个canvas实例
                overflowShow: false,    //超过画布边界是否显示
                showLimitRect: true,
                hasCutter: false,       //是否有剪刀
                isPreLoad: false,      //画布创建时候是否预加载模块
                hasRadius: false,        //是否有圆角
                radiusSize: 10,          //圆角大小
                canvasSize: null,        //画布详细尺寸数据
                hasSplitLine: false,     //是否有对折线
                bgRatio: "50%",         //背景图片精度缩放参数,该参数用于控制前台图片显示的精度,不是控制图片大小,目前只支持50%和20%
                photoRatio: "50%",       //图片和logo缩放参数, 同上
                citiao: null,           //磁条数据，默认没有
                bianma: null            //条码数据，默认没有
            }
        })
        /**
         * @param {$}
         * @param {Object} 配置，参考DEFAULT_OPTS
        */
        .init(function ($container, opts) {
            this.container = $container         //画布
            this.opts                           //配置
            this.$cutter                        //剪刀
            this.canvasSize                     //画布详细尺寸数据对象(pxHeight...)
            this.type                           //画布类型
            this._configOpts(opts)
            /** 子元素 **/
            this.bgElem = null                  //背景元素, 只有一个
            this.childElems = []                //子元素数组
            this.history = new History(this)
            this.zoomRatio = 1                  //当前缩放比例,初始值为1表示不缩放
            this._createDiyBg()                 //一开始就创建一张背景
            this._updateLimitRect()             //添加限制框
            if (this.opts.hasCutter) {
                this._createCutter()            //添加出血线剪刀
            }
            this.techs = {}  //附加工艺存放出，包含$citiao, $bianma 没有的话为null
        })
        .method({
            /**
             * 配置
             */
            _configOpts: function (opts) {
                this.opts = objs.extend({},this.DEFAULT_OPTS,opts)
                this.minZoom = this.opts.MIN_ZOOM //使用undefined防止0无效
                this.maxZoom = this.opts.MAX_ZOOM
                this.type = this.opts.type
                this.index = this.opts.index
                /** 画布详细数据 **/
                if (opts.canvasSize) {
                    this.canvasSize = opts.canvasSize
                    this.container.parent()
                        .width(this.canvasSize.pxWidth)
                        .height(this.canvasSize.pxHeight)
                        .attr('data-index', this.index)
                }
                //是否越边界显示
                if (!this.opts.overflowShow) {
                    this.container.css("overflow", "hidden")
                }
                //this.containerData  = $container.data()//画布数据
                //对着线
                if (this.opts.hasSplitLine) {
                    this.splitLine()
                }
            },
            /**
             *  添加元素, 可以添加多个
             *  @param {$...}
            */
            addDiyElements: function () {
                var childElems = this.childElems
                var self = this
                var args = $.makeArray(arguments)
                    ,redoCb
                    ,undoCb
                    ,newChildElems
                    ,oldChildElems = childElems.slice()
                    ,historyId
                args.forEach((function($ele) {
                    this.container.append($ele) //加入
                    this.childElems.push($ele)
                    $ele.css({
                        'left': $ele.attr('data-left') * self.zoomRatio,
                        'top': $ele.attr('data-top') * self.zoomRatio
                    })
                    $ele.attr('data-index',this.childElems.length - 1)
                    $ele.css('zIndex', this.childElems.length + 20 - 1)
                }).bind(this))
                newChildElems = childElems.slice()
                //重新添加时候的回调, 用于历史记录
                redoCb = (function() {
                    this.childElems = newChildElems
                }).bind(this)
                //撤销添加时候的回调, 用于历史记录
                undoCb = (function() {
                    this.childElems = oldChildElems
                }).bind(this)
                //添加历史记录
                historyId = this.history.add('add', args, redoCb, undoCb)
                //this.triggerState("CONTAINER_CHANGE")
                return {
                    "curElemArr": args, //返回元素数组
                    "historyId": historyId
                }
            },
            /**
             * 添加签名条
             * @param {Object | Ignore}
             */
            addDiyQianming: function(data) {
                var $dragger = $("<div>")
                data = data || {
                    left: 400,
                    top: 200,
                    width: 295,
                    height: 50
                }
                $dragger.attr({
                    "data-type": "diy_qianming",
                    "data-origin_width": data.width,
                    "data-origin_height": data.height,
                    //注：这里是模拟拖拽的dragger
                    //   dragger的data-left和data-top为缩放后的位置
                    "data-left":  data.left * this.zoomRatio,
                    "data-top":  data.top * this.zoomRatio
                })
                $dragger = this._createDiyElem($dragger)
                $dragger.addClass('diy-qianming')
                $dragger.css({
                    width: data.width * this.zoomRatio,
                    height: data.height * this.zoomRatio
                })
                return this.addDiyElements($dragger)
            },
            /**
             * 删除指定diy元素, 可以多个
             * @param {$...}
             */
            delDiyElements: function () {
                var childElems = this.childElems
                var args = $.makeArray(arguments)
                var that = this
                    ,redoCb
                    ,undoCb
                    ,newChildElems = []
                    ,oldChildElems = childElems.slice()
                //删除元素
                args.forEach(function($arg){
                    oldChildElems.forEach(function($item,index){
                        if($item[0] == $arg[0]) {
                            $arg.remove()
                            childElems[index] = undefined
                        }
                    })
                })
                //去除childElems中的undefined
                childElems.forEach(function(item){
                    if(item) newChildElems.push(item)
                })
                this.childElems = newChildElems.slice()
                this._sortDiyElements()
                //重新删除时候的回调
                var redoCb = function() {
                    //console.log('del redoCb callback')
                    that.childElems = newChildElems
                    that._sortDiyElements()
                }
                //撤销删除时候的回调
                var undoCb = function() {
                    //console.log('del undoCb callback')
                    that.childElems = oldChildElems
                    that._sortDiyElements()
                }
                that.history.add("del", args, redoCb, undoCb)
                return args
            },
            /**
             * 对画布所有元素按childElems数组的顺序进行z-index重新排序, 并删除undefined
             */
            _sortDiyElements: function (){
                this.childElems.forEach(function($item, index){
                    $item.attr('data-index', index)
                    $item.css('zIndex', index + 20)
                })
            },
            //清空
            clear: function(){
                this.container.empty()
                this.bgElem = null
                this.childElems = []
                this.history.clear()
                //console.log('container clear')
            },
            /*
             * 创建不同类型的diy元素
             * @param {$}
             * diy元素需要提供: data-type, data-src, data-origin_width, data-origin_height 属性
             *      默认left和top取子$dragger的样式left和top，但若指定data-left和data-top则将取自该两值
             * @param {String} "div" "p" ...
             */
            _createDiyElem: function( $dragger,elemTag) {
                var self = this
                var $elem
                var fatherOffset = this.container.offset()
                var rotate
                var left = $dragger.attr('data-left') || (parseInt($dragger.css("left")) - fatherOffset.left)
                var top = $dragger.attr('data-top') || (parseInt($dragger.css("top")) - fatherOffset.top)
                elemTag = elemTag || "div"
                $elem = $("<"+elemTag+" class='diy-elem' style='position:absolute;z-index:10'></"+elemTag+">")
                $elem.attr({
                    'data-type': $dragger.attr('data-type'),
                    'data-src': $dragger.attr('data-src') || "",
                    'data-origin_width': $dragger.attr('data-origin_width'),
                    'data-origin_height': $dragger.attr('data-origin_height'),
                    'data-rotate': 0,
                    'data-left': left / self.zoomRatio,
                    'data-top': top / self.zoomRatio
                })
                if (rotate = $dragger.attr('data-rotate')) {
                    $elem.attr('data-rotate', rotate)
                    if (rotate !== '0') {
                        $elem.transform({
                            rotate: rotate + 'deg' //对0旋转在ie8下会出现锯齿
                        })
                    }
                }
                return $elem
            },
            _updateDiyPhotoByData: function ($img, data){
                var src = data.mode === "CMYK" ? data.rgb_url : data.url
                var newSize
                /** 缩放为不超过元素原来大小 **/
                if ($img.attr('data-width')) {
                    newSize = require('zz/utils/utils').ratioImg(data.width, data.height, $img.attr('data-width'), $img.attr('data-height'))
                    $img.attr({
                    })
                } else {
                    newSize = [data.width, data.height]
                }
                /*****/
                $img.attr({
                    "src": src,
                    "data-src": src,
                    "data-origin_height": data.height,
                    "data-origin_width": data.width,
                    "data-key": data.key,
                    "data-dpiX": data.dpi ? data.dpi[0] : 0,
                    "data-dpiY": data.dpi ? data.dpi[1] : 0,
                    "data-type": "diy_photo",
                    "data-width": newSize[0],
                    "data-height": newSize[1]
                })
                .css({
                    "width": newSize[0] * this.zoomRatio,
                    "height": newSize[1] * this.zoomRatio
                })
                return $img
            },
            /**
             * @param {Object} 服务器上传图片返回值
             */
            addDiyPhotoByData: function (data) {
                var $img = this._updateDiyPhotoByData($("<img>"), data)
                $img.attr({
                    "data-left": 100,
                    "data-top": 100
                })
                var $elem = this.addDiyPhoto($img)['curElemArr'][0]
                return $elem
            },
            /**
             *  @param {Number} 当前元素索引
             *  @param {Object} 图片数据
             */
            replaceDiyPhoto: function (index, data) {
                var $elem = this.childElems[index]
                this._updateDiyPhotoByData($elem, data)
                $elem.attr('data-type','diy_photo') //防止diy_logo改变
                $elem.find('img').attr("src", this._getImgSmallSrc($elem.attr('data-src')))
                this.emitChange($elem)
                return $elem
            },
            /**
             * 拖拽替换图片
             */
            replaceDiyPhotoFromDragger: function ($curElem, $dragger) {
                var data = $dragger.data()
                //data.width = data['origin_width']
                //data.height = data['origin_height']
                //this._updateDiyPhotoByData($curElem, data)
                $curElem.attr({
                    'data-type': "diy_photo",
                    'data-img_type': data.type.slice(4),
                    "data-src": data.src,
                    "data-origin_height": data['origin_height'],
                    "data-origin_width": data['origin_width'],
                    'data-key': data.key
                })
                $curElem.find('img').attr("src", this._getImgSmallSrc(data.src))
                this.emitChange($curElem)
                return $curElem
            },
            /**
             * 使用缩放失真后的图片
             * @param {String} 图片src
             * @param {Boolean} 是否是背景地址
             */
            _getImgSmallSrc: function (imgSrc, isBackground) {
                var smallKey
                  , ratio = isBackground ? this.opts.bgRatio : this.opts.photoRatio //普通图和背景缩放参数
                switch (ratio) {
                    case "50%":
                        smallKey = "" ;break;
                    case "20%":
                        smallKey = "!mlog" ;break;
                    default:
                        throw new Error("不支持缩放比例: " + ratio) ;break;
                }
                //如果不是本地图片则缩放img图片
                // "../../../../../../diy/img/a.jpg"/*tpa=http://www.mayicy.cn/diy/img/a.jpg*/ "http://kywcdn.com/a.jpg"这两种图不进行处理，已经加过后缀的图也不进行处理
                if(/^\//.test(imgSrc)
                    || new RegExp("^"+global.s_domain).test(imgSrc)
                    || /xmlog$|mlog$/.test(imgSrc)) {
                    return imgSrc
                } else {
                    return imgSrc + smallKey //使用又拍云图片参数缩放图片
                }
            },
            //添加图片
            addDiyPhoto: function ( $dragger, photoType) {
                console.log('addDiyPhoto')
                var $elem = this._createDiyElem($dragger, "div")
                var $img
                //缩放比例
                var imgSize = ratioImg($dragger.attr('data-origin_width') * 0.95
                                            ,$dragger.attr('data-origin_height') * 0.95 //缩放一点点以免检测像素不足
                                            ,this.canvasSize.pxWidth / 3
                                            ,this.canvasSize.pxHeight / 3) //不能超过画布的三分之一
                //设置宽高
                $elem.css({
                        width: imgSize[0] * this.zoomRatio, //取整防止四舍五入溢出导致检测出像素不足
                        height: imgSize[1] * this.zoomRatio
                        //overflow: "hidden"
                    })
                    .attr({
                        "data-width": imgSize[0],
                        "data-height": imgSize[1],
                        "data-key": $dragger.attr('data-key'),
                        "data-img_type": photoType
                    })
                $elem.attr('data-ratio', $dragger.width()/$dragger.height())//长宽比
                //添加img
                $img = $('<img>')
                $img.attr('src',  this._getImgSmallSrc($dragger.attr('data-src'))) //显示的图片采用失真图
                $img.width('100%')
                $img.height('100%')
                $elem.append($img)
                photoType = photoType || "photo"
                $elem.addClass("diy-" + photoType) //className用于添加边框图片时使用
                if ($dragger.attr('data-key') == "") {
                    $elem.addClass('diy-model') //todo
                }
                return this.addDiyElements($elem);
            },
            /*
             * 添加文本
             * @param {$}
             */
            addDiyText: function ($dragger) {
                console.log('addDiyText')
                var $elem = this._createDiyElem($dragger, "p")
                $elem.addClass('diy-text')
/*                $elem.css({
                    //visibility:"hidden",
                    overflow:"visible"
                })*/
                $elem.html("<img style='border-width:0;width:100%;height:100%;display:block'><i class='diy-text-warn iconfont none' title='未选择文本所属类别'></i>")
                $elem.attr("data-type", "diy_text");
                $elem.attr("data-content", "双击编辑文字")
                $elem.attr("data-size", 9)     // 默认9号字
                $elem.attr('data-mean', "-1")
                $elem.attr('data-family', $dragger.attr('data-family') || "http://www.mayicy.cn/Public/kuaiyin/static/js/diy/models/heiti.ttf")
                $elem.attr('data-bold',0)
                $elem.attr('data-italic',0)
                $elem.attr('data-underline',0)
                $elem.attr('data-align', 'left')
                $elem.attr('data-color','0,0,0')
                $elem.attr('data-cmyk','0,0,0,100')
                //$elem.css('font-eFamily', $dragger.attr('data-eFamily'))
                $elem.css({
                    "width": 5,
                    "height": 5
                })
                return this.addDiyElements($elem);
            },
            // 添加logo
            addDiyLogo: function ( $dragger, logoType) {
                $dragger.attr('data-type',"diy_photo")
                return this.addDiyPhoto( $dragger, logoType || "logo"); // 调用添加图片一样的方法
            },
            // 添加边框
            addDiyFrame: function ( $dragger) {
                var $frame =  this.addDiyPhoto( $dragger, "diy-frame"); // 调用添加图片一样的方法
                //添加可视区域矩形
                var $wrap = $('<div class="diy-frame-visual-wrap"></div>')
                var infoData = $.parseJSON($frame.attr("data-info"));
                $wrap.css({
                    "left" : infoData.x / infoData.sw * 100 + "%",
                    "top" : infoData.y / infoData.sh * 100 + "%",
                    "width" : infoData.w / infoData.sw * 100 + "%",
                    "height" : infoData.h / infoData.sh * 100 + "%"
                })
                $frame.append($wrap)
                return $frame
            },
            _createDiyBg: function() {
                var $bgElem = $('<div class="diy-background" style="width:100%;height:100%;background-color:#FFFFFF;"><img class="diy-bg-img none" style="width:100%;height:100%"/></div>')
                $bgElem.css({
                    top:0,
                    left:0,
                    zIndex: 10, //背景放在第一个
                    overflow: "hidden" //背景圆角时候不能凸出
                })
                    .attr('data-index', -1) //背景为-1
                    .attr('data-type', "diy_background")
                    .attr('data-color', "#FFFFFF")
                    .appendTo(this.container)
                /** 是否有圆角 **/
                if (this.opts.hasRadius) {
                    $bgElem.css({
                        borderRadius: this.opts.radiusSize + "px"
                    })
                }
                this.bgElem = $bgElem
                this.history.addInitData($bgElem) //将背景添加到历史记录原始数据
            },
            /*
             * 添加背景图片
             * @param {$ || String}
             */
            addDiyBackground: function ($dragger) {
                console.log('add diy background !!')
                var $bgElem = this.bgElem
                  , bgColor
                //添加背景图
                if (types.isObject($dragger)) {
                    if($bgElem.attr('data-src') === $dragger.attr('data-src')) {
                        return {
                            "curElemArr": [$bgElem]
                        }
                    }
                    $bgElem.attr({
                        "data-type": $dragger.attr("data-type"),
                        "data-src": $dragger.attr("data-src"),
                        "data-key": $dragger.attr('data-key'),
                        "data-dpiX": $dragger.attr('data-dpiX') || 300,
                        "data-dpiY": $dragger.attr('data-dpiY') || 300
                    })
                    $bgElem.children('img').attr('src', this._getImgSmallSrc($dragger.attr('data-src'))).show()
                }
                //添加背景色
                else {
                    //todo
                    bgColor = $dragger
                    if ($bgElem.data('color') === bgColor) return $bgElem
                    $bgElem.attr({
                        "data-color": bgColor,
                        "data-src": "",
                        "data-key": ""
                    })
                    .css("backgroundColor", bgColor)
                    .children('img').hide()
                }
                var historyId = this.history.add('edit', [$bgElem])
                return {
                    "curElemArr": [$bgElem], //返回元素数组
                    "historyId": historyId
                }
            },
            // 添加边框图片
            addDiyFramePhoto: function ($dragger, $frame) {
/*                var $wrap = $frame.find('.diy-frame-visual-wrap')
                    ,$img
                //替换原来的图片
                $wrap.html("<img class='diy-frame-photo' />")
                $img = $wrap.find('.diy-frame-photo')
                //设置图片
                $img.attr({
                    'src': $dragger.attr('src'),
                    'data-info': $dragger.attr('data-info'),
                    'data-src-ratio': $dragger.width() / $dragger.height(),
                    'data-origin_width': $dragger.width(),
                    'data-origin_height': $dragger.height()
                });
                //$img.attr('data-info', $dragger.attr("data-info"))
                this._initFramePhoto($frame) //初始化图片
                this.history.add("edit", [$frame]);
                return $frame*/
            },
            // 添加模板占位
            addDiyModel: function ($dragger){
                $dragger.attr({
                    "data-type": "diy_photo", //转化为photo
                    "data-width": 100,
                    "data-height": 100,
                    "data-key": ""
                })
                return this.addDiyPhoto($dragger, "model")
            },
/*            addDiyLine: function(x,y){
                var $line = $('<div class="diy-elem diy-line">').attr({
                    'data-type': 'diy_line'
                }).css({
                    left:x,
                    top:y,
                    width:15,
                    height:15
                }).append($('<div>').css({
                    borderTop:'5px solid black',
                    borderLeft:'5px solid black',
                    width:0,
                    height:0,
                    lineHeight:0,
                    fontSize:0
                }));

                this.addDiyElements($line);
                return $line;
            },*/
            //初始化框架内图片位置,保证适应并居中
            _initFramePhoto: function($frame) {
                var $img = $frame.find('.diy-frame-photo')
                var curW = $frame.width()
                    ,curH = $frame.height()
                    ,infoData = $.parseJSON($frame.attr("data-info"))
                    ,ratio = curW / infoData.sw // 当前边框被缩放的比例
                    ,curInW = infoData.w * ratio //当前边框内可视区宽
                    ,curInH = infoData.h * ratio // 当前边框内图片可视区域高
                    ,imgSrcRatio = +$img.attr("data-src-ratio")
                    ,frameRatio = infoData.w / infoData.h // 边框可视区域的宽高比
                //记录下当前图片适应的框架宽高,便于计算比例
                $img.attr('data-frame-width', curW)
                $img.attr('data-frame-height', curH)
                //保证图片适应边框并居中
                if (imgSrcRatio > frameRatio) {
                    $img.css({
                        width: curInH*imgSrcRatio,
                        height: curInH,
                        left: (curInH * imgSrcRatio - curInW) / 2, //居中
                        top: 0
                    })
                } else {
                    $img.css({
                        width: curInW,
                        height: curInW/imgSrcRatio,
                        left:0,
                        top: (curInH / imgSrcRatio - curInW) / 2 //居中
                    })
                }
            },
            //重绘框架宽高时,计算里边图片大小,保证图片按框架变化缩放
            resizeDiyFrame: function($frame) {
                var $img = $frame.find('.diy-frame-photo')
                var curW = $frame.width()
                    ,curH = $frame.height()
                    ,changeScaleW = curW/parseInt($img.attr('data-frame-width')) //变化率
                    ,changeScaleH = curH/parseInt($img.attr('data-frame-height'))
                if (changeScaleW == 1 && changeScaleH == 1) {
                    //框架大小未改变直接返回
                    return
                }else {
                    //根据被水平或竖直缩放的比例重新计算图片位置及宽高
                    $img.css({
                        width: $img.width()*changeScaleW,
                        height: $img.height()*changeScaleH,
                        left: parseInt($img.css('left'))*changeScaleW,
                        top: parseInt($img.css('top'))*changeScaleH
                    })
                    //重新记录下框架新的宽高
                    $img.attr('data-frame-width', curW)  //记录下当前图片适应的框架宽高,便于计算比例
                    $img.attr('data-frame-height', curH)
                }
            },
            // 缩放框架内图片的大小
            scaleDiyFramePhoto: function (scale, $frame) {
                var $img = $frame.find('.diy-frame-photo')
                if (!$img[0]) return
                $img.css({
                    width: $img.width()*scale,
                    height: $img.height()*scale,
                    left: parseInt($img.css('left'))*scale,
                    top: parseInt($img.css('top'))*scale
                })
            },
            //图层上下移动
            _moveIndex: function(step,$target) {
                var index = +$target.attr('data-index') //最小0
                    ,childElems = this.childElems //diy元素数组
                    ,$temp
                    ,moveIndex = index+step //要移动的位置
                console.log('moveIndex ' + moveIndex)
                if (moveIndex>=childElems.length || moveIndex < 0) return  //超出数组范围直接返回
                $temp = childElems[moveIndex]
                function _redoCb() {
                    //交换
                    childElems[moveIndex] = $target
                    childElems[index] = $temp
                    //设置index
                    $target.css('zIndex', moveIndex+20)
                    $temp.css('zIndex', index+20)
                    $target.attr('data-index', moveIndex)
                    $temp.attr('data-index', index)
                }
                _redoCb() //执行交换
                function _undoCb() {
                    childElems[moveIndex] = $temp
                    childElems[index] = $target
                    $temp.css('zIndex', moveIndex+20)
                    $target.css('zIndex', index+20)
                    $temp.attr('data-index', moveIndex)
                    $target.attr('data-index', index)
                }
                this.history.add('edit',[$target,$temp], _redoCb, _undoCb)
                //判断是否移动到尽头
                this.checkIndex($target)
                return moveIndex
            },
            moveUp: function($target){
                return this._moveIndex(1,$target)
            },
            moveDown: function($target) {
                return this._moveIndex(-1,$target)
            },
            checkIndex: function($elem) {
                var index = $elem.attr('data-index')
                if (index == this.childElems.length-1) {
                    this.triggerState('UP_ENABLE', false)
                } else {
                    this.triggerState('UP_ENABLE', true)
                }
                if (index == 0) {
                    this.triggerState('DOWN_ENABLE', false)
                } else {
                    this.triggerState('DOWN_ENABLE', true)
                }
            },
            /**
             * 获取吸附数组, 用于将子元素拖拽的时候和其他元素对齐
             *
             * @param 要忽略的的jquery节点, 可以传入多个
             */
            getSnapArr: function() {
                var snapArrX = []
                    ,snapArrY= []
                    ,ignoreArr = arguments
                function pushSnap(item) {
                    for(var i= 0,len=ignoreArr.length;i!=len; i++) {
                        if(item.is(ignoreArr[i])) return
                    }
                    var offset = item.offset()
                        ,angle = parseFloat(item.attr("data-rotate") || 0) //有角度重新计算拖动范围
                        //旋转后的外围矩形
                        ,angleRect =  math.getRotateRect(item.width(),item.height(),angle) //目标旋转之后的外围矩形
                    if(offset) {
                        //左边
                        snapArrX.push(offset.left)
                        snapArrY.push(offset.top)
                        //右边
                        snapArrX.push(offset.left+angleRect[0])
                        snapArrY.push(offset.top+angleRect[1])
/*                        //中间
                        snapArrX.push(offset.left+angleRect[0]/2)
                        snapArrY.push(offset.top+angleRect[1]/2)*/
                    }
                }
                function pushHelperSnap(){
                    var $line = $(this),
                        pos = $line.offset(),
                        isVertical = $line.attr('data-is-vertical')*1;

                    if(pos){
                        if(isVertical){
                            snapArrX.push(pos.left+parseInt($line.children().css('marginLeft')));
                        }else{
                            snapArrY.push(pos.top+parseInt($line.children().css('marginTop')));
                        }
                    }
                }
                //pushSnap(this.container)
                pushSnap(this.bgElem)
                this.childElems.forEach(pushSnap)
                this.container.siblings('.diy-r-helper-line').each(pushHelperSnap);
                return [snapArrX,snapArrY]
            },
            /**
             *  按指定比例缩放画布
             *  @param {Number}
             *  @param {Function}
             *  @param {Boolean}
             */
            zoom: function(newRatio, cb, isForce) {
                var $workArea = $('#diyWorkArea')
                    ,zoomWidth, zoomHeight
                //newRatio = Math.round(newRatio * 10) / 10
                //限制缩放空间
                if (newRatio < this.minZoom )  {
                    newRatio = this.minZoom
                } else if (newRatio > this.maxZoom) {
                    newRatio = this.maxZoom
                }
                //如果没变直接返回
                if (!isForce && this.zoomRatio === newRatio) return this
                //保存新的ratio
                this.zoomRatio = newRatio
                this.container.data('zoomRatio', newRatio) //保存到parent上以便于计算
                //this.container.data('blood', this.container.data('blood'))
                //缩放画布元素
                this.childElems.forEach((function($elem){
                    this.zoomElem($elem, newRatio)
                }).bind(this))
                //缩放父节点画布
                this.container.parent().css({
                    "width": zoomWidth = this.canvasSize.pxWidth * newRatio,
                    "height": zoomHeight = this.canvasSize.pxHeight * newRatio
                })
                //更新限制矩形
                this._updateLimitRect()
                //更新剪刀矩形
                this._updateCutter()
                //更新磁条/编码
                this._updateCitiao()
                this.updateBianma()
                //回调
                cb && cb()
                if($workArea.length === 0) return this
                //设置scroll
                if (zoomWidth >= $workArea.width()) {
                    $workArea.css('overflow-x', 'scroll')
                } else {
                    $workArea.css('overflow-x', '')
                    $workArea.scrollTop(0)
                }
                if (zoomHeight >= $workArea.height()) {
                    $workArea.css('overflow-y', 'scroll')
                } else {
                    $workArea.css('overflow-y', '')
                    $workArea.scrollLeft(0)
                }
                return this
            },
            /**
             *  缩放元素
             *  缩放包括width, height, left, top, fontSize,line-height
             *  @param {$}
             *  @param {Number}
             */
            zoomElem: function ($elem, newRatio) {
                this.history.zoomElem($elem, newRatio)
            },
            /**
             *  封装历史记录
             *  @param {Array || $}
             */
            emitChange: function ($elems) {
                if (!types.isArray($elems)) $elems = [$elems]
                this.history.add('edit', $elems)
            },
            /**
             * 监听canvas变化
             */
            onChange: function (cb) {
                this.history.onState('CHANGE', cb)
            },
            /**
             * 监听container副本,并使之改变, 可以创建多个
             */
            onChangeClone: function($clone, cloneRatio) {
                //添加到历史记录change事件
                this.history.onChangeToClone($clone, cloneRatio)
            },
            /**
             * 测试所有文本元素mean是否合法, 并不合法的对象返回
             */
            checkTextMean: function () {
                var ret
                this.childElems.forEach(function($elem){
                    if($elem.data('type') === "diy_text" && $elem.attr('data-mean') == "-1") {
                        ret =  $elem
                    }
                })
                return ret
            },
            /**
             * 检测logo是否合法
             */
            isLogoCorrect: function () {
                var isCorrect = false
                this.childElems.forEach(function($elem){
                    if($elem.attr("data-img_type") === "logo" || $elem.attr('data-img_type') === "user_logo") {
                        return true
                    }
                })
                return false
            },
            /**
             * 基于画布水平居中对齐
             */
            centerX: function ($elem) {
                $elem.attr('data-align','center')
                this.emitChange($elem)
            },
            centerY: function ($elem) {
                $elem.attr('data-alignY','center')
                this.emitChange($elem)
            },
            /**
             * 设定并更新限制矩形框
             */
            _updateLimitRect: function () {
                if (! this.canvasSize) return
                var originLimit = this.canvasSize.pxLimit
                var pxLimit = originLimit * this.zoomRatio
                if (!this.$limitRect) {
                    this.$limitRect =
                        $("<div class='diy-limitrect'></div>")
                            .appendTo(this.container)
                            .css({
                                "border":"1px dotted rgba(0,0,0,0.2)",
                                "position": "absolute",
                                "z-index": 11
                            })
                    if (! this.opts.showLimitRect) this.$limitRect.hide()
                }
                this.$limitRect.css({
                    left: pxLimit - 1,
                    top: pxLimit - 1,
                    width: this.canvasSize.pxWidth * this.zoomRatio  - pxLimit * 2,
                    height: this.canvasSize.pxHeight * this.zoomRatio  - pxLimit * 2
                })
            },
            getLimitRect: function () {
                var originLimit = this.canvasSize.pxLimit
                return {
                    "left": originLimit,
                    "top": originLimit,
                    width: this.canvasSize.pxWidth - originLimit * 2,
                    height: this.canvasSize.pxHeight - originLimit * 2
                }
            },
            /**
             * 创建出血线
             */
            _createCutter: function () {
                this.$cutter = cutter.createCutter(this.container.parent())
                return this
            },
            /**
             * 更新剪刀
             */
            _updateCutter: function () {
                this.$cutter && cutter.updateCutter(this.$cutter, this)
                return this
            },
            /**
             * 更新剪刀并使用动画
             */
            updateCutterByAnim: function () {
                this.$cutter && cutter.updateCutterByAnim(this.$cutter, this) //显示剪刀
            },
            getType: function () {
                return this.type
            },
            splitLine: function () {
                var $line = $("<div></div>").css({
                    "border":"1px dotted rgba(0,0,0,0.2)",
                    "position": "absolute",
                    "z-index": 1000,
                    height: "100%",
                    left: "50%",
                    width: "2px",
                    marginLeft: "1px"

                })
                this.container.append($line)
            },
/*            addDiyBianma: function () {
                var _config = this.opts.bianma
                var $bianma
                console.log(_config)
                if (!_config) return
                $bianma = $("<div style='position:absolute;"
                        +"z-index:10;font-weight:bold'>NO.000001</div>")
                $bianma.attr({
                    "data-type": "diy_bianma",
                    "data-origin_width": _config.pxWidth,
                    "data-origin_height": _config.pxHeight,
                    "data-left": _config.pxLeft,
                    "data-top": _config.pxTop
                })
                //这里的$bianma和之前的不同
                $bianma = this._createDiyElem($bianma)
                $bianma.attr({
                    "data-color": _config.color,
                    "data-cmyk": _config.cmyk,
                    "data-mm-top": _config.mmTop,
                    "data-mm-left": _config.mmLeft,
                    "data-mm-height": _config.mmHeight,
                    "data-mm-width": _config.mmWidth
                })
                    .css({
                        "font-weight": "bold"
                    })
                    .text("NO.000001")
                return this.addDiyElements($bianma)
            },*/
            /**
             * @param {Boolean}
             */
            toggleBianma: function (isAdd) {
                var _config = this.opts.bianma
                //编码条可能没有被删除
                var $bianma = this.techs.$bianma || this.container.children("[data-type=diy_bianma]")
                if (!_config) return
                if (isAdd) {
                    //创建新的磁条
                    if (!$bianma || $bianma.length === 0 ) {
                        $bianma = this.createBianma(_config)
                    }
                    this.techs.$bianma = $bianma.show()
                    this.updateBianma()
                    //触发历史记录变更
                    this.history.triggerState('CHANGE')
                    return $bianma
                } else {
                    $bianma.hide() //不删除编码条
                    this.techs.$bianma = null
                    this.history.execCloneChange(function($clone){
                        $clone.children('[data-type=diy_bianma]').hide()
                    })
                    //触发历史记录变更
                    this.history.triggerState('CHANGE')
                }
            },
            /**
             * 创建编码
             * @param _config
             */
            createBianma: function(_config) {
                if (this.techs.$bianma) return this.techs.$bianma
                var $bianma = this.techs.$bianma = $("<div class='diy-bianma' style='position:absolute;"
                    +"z-index:1010;text-align:left'><img style='width:100%;height:100%;display:block'/></div>")
                $bianma
                    //.text(_config.content || "NO.000001")
                    .appendTo(this.container)
                    /*                        .css({
                     "hover": "1px solid red"
                     })*/
                    .attr({
                        "data-type": "diy_bianma",
                        "data-color": _config.color,
                        "data-cmyk": _config.cmyk,
                        "data-mm-top": _config.mmTop,
                        "data-mm-left": _config.mmLeft,
                        "data-mm-height": _config.mmHeight,
                        "data-mm-width": _config.mmWidth,
                        "data-px-width": _config.pxWidth,
                        "data-px-height": _config.pxHeight,
                        "data-px-left": _config.pxLeft,
                        "data-px-top": _config.pxTop,
                        "data-start": _config.start || "000001",
                        "data-content": _config.content || "NO.000001"
                    })
                return $bianma
            },
            /**
             * 刷新编码，将编码数据变成css样式并刷新缩略图
             */
            updateBianma: function () {
                var $bianma = this.techs.$bianma
                var zoomRatio = this.zoomRatio
                if (!$bianma) return
                var $img = $bianma.find('img')
                var height = $bianma.attr('data-px-height')
                    ,left = $bianma.attr('data-px-left')
                    ,top =  $bianma.attr('data-px-top')
                    ,width = $bianma.attr('data-px-width')
                $bianma.css({
                    //"color": "rgb(" + $bianma.attr('data-color') + ")",
                    "left":  left * zoomRatio,
                    "top": top * zoomRatio,
                    "width": width * zoomRatio,
                    "height": height * zoomRatio,
                    "font-size": height * zoomRatio,
                    "line-height": height * zoomRatio + "px"
                })
                //更新图片
                $img.get(0).src = "/app/api/technic/png?type=diy_bianma" +
                    "&w=" + $bianma.attr('data-mm-width') +
                    "&h=" + $bianma.attr('data-mm-height') +
                    "&content=" + $bianma.attr('data-content') +
                    "&color=" + $bianma.attr('data-color')
                //执行克隆对象变化
                this.history.execCloneChange(function($clone, cloneRatio){
                    var $cloneBianma = $clone.children("[data-type=diy_bianma]")
                    if ($cloneBianma.length === 0) {
                        $cloneBianma = $bianma.clone().appendTo($clone)
                    }
                    $cloneBianma.css({
                        "left": left * cloneRatio,
                        "top": top * cloneRatio,
                        "width": width * cloneRatio,
                        "height": height * cloneRatio,
                        "font-size": height * cloneRatio,
                        "line-height": height * cloneRatio + "px",
                        "background-color": "rgb(" + $bianma.attr('data-color') + ")"
                    })
                        .show()
                })
            },
            /**
             * 添加、删除PVC等磁条, 不添加到历史记录
             * @param {Boolean}
             */
            toggleCitiao: function (isAdd) {
                var _config = this.opts.citiao
                var $citiao = this.techs.$citiao
                if (!_config) return
                //console.log("citiao config: ",_config)
                if (isAdd) {
                    this.createCitiao(_config)
                    this._updateCitiao() //更新数据
                    //触发历史记录变更
                    this.history.triggerState('CHANGE')
                } else {
                    $citiao.remove()
                    this.techs.$citiao = null
                    this.history.execCloneChange(function($clone){
                        $clone.children('[data-type=diy_citiao]').remove()
                    })
                    //触发历史记录变更
                    this.history.triggerState('CHANGE')
                }
            },
            /**
             * 创建磁条
             * @param _config
             */
            createCitiao: function(_config) {
                if (this.techs.$citiao) return this.techs.$citiao
                var $citiao = this.techs.$citiao = $("<div class='diy-citiao' style='position:absolute;left:0;top:0;width:100%;z-index:1000'></div>")
                $citiao
                    .appendTo(this.container)
                    .css({
                        "background-color": "rgb("+_config.color+")"
                    })
                    .attr({
                        "data-type": "diy_citiao",
                        "data-color": _config.color,
                        "data-cmyk": _config.cmyk,
                        "data-mm-top": _config.mmTop,
                        "data-mm-height": _config.mmHeight,
                        "data-px-top": _config.pxTop,
                        "data-px-height": _config.pxHeight
                    })
                return $citiao
            },
            /**
             * 刷新磁条，将磁条数据变成css并刷新缩略图
             * @private
             */
            _updateCitiao: function () {
                var $citiao = this.techs.$citiao
                if (! $citiao) return
                var pxTop = $citiao.attr('data-px-top')
                var pxHeight = $citiao.attr('data-px-height')
                var color = $citiao.attr("data-color")
                $citiao.css({
                    "top":  pxTop * this.zoomRatio,
                    "height":  pxHeight * this.zoomRatio
                })
                //执行克隆对象
                this.history.execCloneChange(function($clone, cloneRatio){
                    var $cloneCitiao = $clone.children("[data-type=diy_citiao]")
                    if ($cloneCitiao.length === 0) {
                        $cloneCitiao = $citiao.clone().appendTo($clone)
                    }
                    $cloneCitiao.css({
                        top: pxTop * cloneRatio,
                        height: pxHeight * cloneRatio,
                        "background-color": "rgb("+color+")"
                    })
                })
            },
            /**
             * 旋转画布
             */
            revertCanvas: function (revertType) {
                var canvasSize = this.canvasSize
                var mmHeightCache = canvasSize.mmHeight
                    ,pxHeightCache = canvasSize.pxHeight
                        ,isRevert = false
                //选择旋转类型
                switch (revertType) {
                    case 'h':
                        if (canvasSize.mmHeight > canvasSize.mmWidth) {
                            isRevert = true
                        }
                        break;
                    case 'v':
                        if (canvasSize.mmHeight < canvasSize.mmWidth) {
                            isRevert = true
                        }
                        break;
                }
                //旋转尺寸
                if (isRevert) {
                    canvasSize.mmHeight = canvasSize.mmWidth
                    canvasSize.mmWidth = mmHeightCache
                    canvasSize.pxHeight = canvasSize.pxWidth
                    canvasSize.pxWidth = pxHeightCache
                    //去除元素
                    this.delDiyElements.apply(this, this.childElems)
                    //去除背景
                    this.addDiyBackground("<img>")
                    //进行缩放
                    //this.zoom(this.zoomRatio, $.noop, true)
                    this.history.lock()
                    this._updateLimitRect() //更新限制矩形
                }
            }
        })
        .wrap(canvasJsonWrap)

    //return new DiyCanvas("#diyCanvas") //单例
    DiyCanvas.TYPE_LIST = TYPE_LIST
    return DiyCanvas
})
