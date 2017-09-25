/**
 * diy历史管理器
 *          1 处理历史记录的add，undo，redo方法
 *          2 监听画布变化并做相应历史记录数据变化
 *          3 历史记录触发时候更新缩略图
 *
 * @author by liuwencheng
 * @date 2013-5-29
 *
 * @update by liuwencheng 2013-6-6 添加"onChange"方法 用于缩略图监听
 * @update by liuwencheng 2013-6-28 添加历史记录可以一次修改多个元素
 * @update by liuwencheng 2013-9-9 添加changeData, getLength方法 用于加载文本图片前预处理历史记录
 * @update by liuwencheng 2013-9-12 重构onChange方法为onChangeToClone,该方法移植至CanvasClass:onChangeClone
 * @update by liuwencheng 2013-9-13
 *                  简化历史记录部分方法，加入this.container
 *                  添加historyId标记为历史记录唯一
 *                  添加textImg方法，移植至selectorClass
 * @update by liuwencheng 2013-9-18 去除更新历史记录方法，简化历史记录，添加状态“TEXT_IMG_LOADED”
 * @update by liuwencheng 2013-9-22 重新处理缩略图，增加比例为1时候的原始文字图片
 * @update by liuwencheng 2013-9-26 添加事件UNDO_EMPTY, REDO_EMPTY,UNDO_NO_EMPTY,REDO_NO_EMPTY
 * @update by liuwencheng 2013-10-23 重做history:CHANGE
 * @update by iuwencheng 2013-10-28 添加lock
 *
 */
define(function (require, exports) {
    "use strict"
    var objs = require('zz/utils/objs')
    var Class = require('zz/core/Class')
    var $ = require('jquery')
    var loadImgs = require('zz/utils/loadImgs')

    var DiyHistory = Class()
        .defState('CHANGE','TEXT_IMG_LOADED','UNDO_EMPTY','REDO_EMPTY', 'UNDO_NO_EMPTY','REDO_NO_EMPTY')
        .init(function (canvas) {
            this._initArr = []  //一些元素的原始数据,
            this._redoArr = [] //恢复数组
            this._undoArr = [] //撤销数组
            this._undoLockArr = []   //锁定的历史记录数组
            this.HISTORY_MAX_COUNT = 100 //历史记录最多条数
            this.addedCount = 0 //添加历史记录次数，用于保证唯一并计算历史记录id
            this.container = canvas.container   //所有元素加入的节点
            this.canvas = canvas
            this.$cloneArr = [] //缩略图等克隆对象更新时候调用的方法
        })
        .method({
            /**
             * 初始化一些元素的开始数据, 如背景等
             */
            addInitData: function($elem) {
                this._initArr.push({
                    "$elem": $elem,
                    'data': this.getElemData($elem)
                })
            },
            /**
             * 添加历史记录
             * @param {String} action  //add del edit三种
             * @param {Array} $elemArr  //元素数组
             * @param {Function || Ignore} redoCb 恢复时候的回调
             *              目前用于处理diy添加删除元素回调删除diy内部数组属性childElems相应元素
             *              下同
             * @param {Function || Ignore} undoCb 撤销回调
             *
             * @return {Number} id 当前历史记录的id，id唯一
            */
            add: function (action, $elemArr, redoCb, undoCb) {
                var newHistoryId = ++ this.addedCount
                //获取元素数据
                var dataArr = []
                var that = this
                $elemArr.forEach(function($elem){
                    //保存比例为1时候的数据
                    that.setOriginElemData($elem, function() {
                        //添加数据
                        dataArr.push(that.getElemData($elem))
                        that.zoomElem($elem) //还得缩放
                    })
                })
                //选择历史记录类型
                switch(action) {
                    case "add":
                    case "del":
                    case "edit":
                        this._undoArr.push({
                            "action": action,
                            "$elemArr": $elemArr.slice(), //副本,
                            "dataArr": dataArr, //当前数据
                            "redoCb": redoCb, //被恢复执行的回调
                            "undoCb": undoCb, //被撤销执行的回调
                            "id": newHistoryId
                        })
                        //限制历史记录数目
                        if(this._undoArr.length > this.HISTORY_MAX_COUNT) {
                            this._undoArr.shift() //把第一个剔除
                        }
                        //每重新添加历史记录清空redo
                        this._redoArr.length = 0
                        this.triggerState('REDO_EMPTY')
                        this.triggerState('UNDO_NO_EMPTY')
                        this.triggerState('CHANGE', action, $elemArr)
                        //返回id
                        return newHistoryId
                    default:
                        throw new Error("无法添加历史记录: " + action) //索引不到相应类型报错,防止写错
                }
            },
            /**
             * @return {Array} 返回要被恢复的元素
             */
            undo: function() {
                if(this._undoArr.length === 0)  return []
                var that = this
                var item = this._undoArr.pop()
                var $elemArr = item.$elemArr
                var $retArr = []//返回的元素数组
                var changeType = ""
                switch(item.action) {
                    case "add":
                        changeType = "del";break;
                    case "del":
                        changeType = "add";break;
                    case "edit":
                        changeType = "edit";break;
                }
                $elemArr.forEach(function($elem){
                    switch(item.action) {
                        case "add":
                            $elem.remove()
                            $retArr = that._getEditNearElemArr()
                            break;
                        case "del":
                            that.container.append($elem)
                        case "edit":
                            //获得上次编辑节点时节点数据
                            var oldData = that._getEditNearData($elem)
                            that.setElemData($elem, oldData)
                            $retArr.push($elem)
                            that.zoomElem($elem) //缩放到画布现有缩放比例
                    }
                })
                this._redoArr.push(item)
                this.triggerState('REDO_NO_EMPTY')
                item.undoCb && item.undoCb()
                //this.triggerState('CHANGE','undoChange') //最后一条
                this.triggerState("CHANGE", changeType, $elemArr)
                if(this._undoArr.length === 0)  this.triggerState('UNDO_EMPTY')
                return $retArr
            },
            /**
             * @return {Array || Boolean} 返回要被恢复的元素, 返回false表示操作失败
            */
            redo: function() {
                if (this._redoArr.length === 0)  { return false }
                var that = this
                var item = this._redoArr.pop()
                var $elemArr = item.$elemArr
                var $retArr = []
                /** changeType **/
                var changeType = ""
                switch(item.action) {
                    case "add":
                        changeType = "add";break;
                    case "del":
                        changeType = "del";break;
                    case "edit":
                        changeType = "edit";break;
                }
                //是否执行默认
                $elemArr.forEach(function($elem,key){
                    switch (item.action) {
                        case "del":
                            $elem.remove()
                            $retArr = that._getEditNearElemArr()
                            break;
                        case "add":
                            that.container.append($elem)
                        case "edit":
                            that.setElemData($elem,item.dataArr[key])
                            $retArr.push($elem)
                            that.zoomElem($elem) //缩放到画布现有缩放比例
                            break;
                    }
                })
                this._undoArr.push(item)
                this.triggerState('UNDO_NO_EMPTY')
                item.redoCb && item.redoCb()
                //this.triggerState('CHANGE','redoChange')
                this.triggerState('CHANGE',changeType,$elemArr)
                if (this._redoArr.length === 0)  {  this.triggerState('REDO_EMPTY') }
                return $retArr
            },
            //最近操作的元素数组
            _getEditNearElemArr: function() {
                var len = this._undoArr.length
                    ,$elemArr
                    ,arr = this._undoLockArr.concat(this._undoArr)
                while(len>0) {
                    $elemArr = arr[len-1].$elemArr
                    if ($elemArr[0].parent().length) { //不显示被删除的元素, 被删除的元素没有parent
                        return $elemArr.slice() //注意要小心
                    } else {
                        len--
                    }
                }
                return [] //返回空数组
            },
            //获得最近编辑节点的数据
            _getEditNearData: function($elem) {
                var unArr = this._undoLockArr.concat(this._undoArr)
                  , retData
                //倒叙,
                for (var i= unArr.length-1; i>=0; i--) {
                    unArr[i].$elemArr.forEach(function(item,key){
                        if(item[0] == $elem[0]) {
                            retData = unArr[i].dataArr[key]
                        }
                    })
                    if(retData) return retData
                }
                this._initArr.forEach(function(item){
                    if(item.$elem[0] == $elem[0]) {
                        retData = item.data
                    }
                })
                return retData
                //return false
            },
            clear: function () {
                this._redoArr.length = 0
                this._undoArr.length = 0
                this._initArr.length = 0
                this._undoLockArr.length = 0
                this.addedCount = 0
            },
            /**
             *  获取缩放比例为1时候的元素数据, 包括他的html和attributes数组
             */
            getElemData: function($elem) {
                var html
                    ,attrs
                    ,attrCache = {}
                //获取内容
                html = $elem.html()
                attrs = $elem[0].attributes
                //获取属性
                for (var i=0, len=attrs.length;i!=len;i++) {
                    attrCache[attrs[i].name] = attrs[i].value
                }
                return [html,attrCache]
            },
            /**
             * 保存比例为1时候的节点数据,并做检测
            */
            setOriginElemData: function ($elem, cb) {
                var that = this
                var $limit
                var limitData
                if ($elem.data("type") === "diy_text") {
                    //保存文字数据
                    this.loadTextImg($elem, function(isChange){
                        var zoomRatio = that.container.data('zoomRatio') || 1 //bug 异步调用zoomratio必须实时获得
                        $elem.attr({
                            "data-left": getOrignVal('left', zoomRatio),
                            "data-top": getOrignVal('top', zoomRatio)
                        })
                        if (isChange) {
                            $elem.attr({
                                "data-width": $elem.width(),
                                "data-height": $elem.height()
                            })
                        }
                        //居中对齐
                        if ($elem.attr('data-align') === "center") {
                            var newLeft = that.canvas.canvasSize.pxWidth / 2 - $elem.attr('data-width') / 2
                            $elem.attr("data-left", newLeft)
                            $elem.css('left', newLeft * zoomRatio)
                        }
                        //超出限制框自动缩进
                        if ($limit = that.canvas.$limitRect) {
                            var showLimitTip = false
                            limitData = that.canvas.getLimitRect()
                            if ($elem.attr('data-left') < limitData['left']) {
                                $elem.attr('data-left', limitData['left'])
                                $elem.css("left", limitData['left'] * zoomRatio)
                                showLimitTip = true
                            }
                            if ($elem.attr('data-top') < limitData['top']) {
                                $elem.attr('data-top', limitData['top'])
                                $elem.css("top", limitData['top'] * zoomRatio)
                                showLimitTip = true
                            }
                            if (Math.round($elem.attr('data-width')) + Math.round($elem.attr('data-left'))
                                    > limitData['left'] + limitData['width']) {
                                var left = limitData['left'] + limitData['width'] - Math.round($elem.attr('data-width'))
                                $elem.attr('data-left',left)
                                $elem.css("left", left * zoomRatio)
                                showLimitTip = true
                            }
                            if (Math.round($elem.attr('data-height')) + Math.round($elem.attr('data-top'))
                                    > limitData['top'] + limitData['height']) {
                                var top = limitData['top'] + limitData['height'] - Math.round($elem.attr('data-height'))
                                $elem.attr('data-top', top)
                                $elem.css("top", top * zoomRatio)
                                showLimitTip = true
                            }
                            if (showLimitTip) {
                                var $tip = $("#diyTip")
                                $tip.find("em")
                                    .text("亲，文字和内容不要超出虚线框哦！以免裁切误差，影响美观~").end()
                                    .fadeIn( function(){
                                        setTimeout(function(){
                                            $tip.css('opacity', 0)
                                        }, 30 * 1000)
                                    })
                                    .data("old-top", $tip.css("top"))
                                    .offset({"top":$elem.offset().top})
                                    .css('opacity', 0)
                                    .animate({
                                        top: $tip.data('old-top'),
                                        opacity: 1
                                    }, 500)
                                }
                        }
                        cb && cb()
                        that.triggerState('CHANGE', 'edit', [$elem]) //在触发一次
                    })
                } else if ($elem.data("type") === "diy_background"){
                    cb && cb() //背景图片
                } else {
                    //异步调用zoomratio必须实时获得
                    var zoomRatio = that.container.data('zoomRatio') || 1
                    $elem.attr({
                        "data-left": getOrignVal('left', zoomRatio),
                        "data-top": getOrignVal('top', zoomRatio),
                        "data-width": getOrignVal('width', zoomRatio),
                        "data-height": getOrignVal('height', zoomRatio)
                    })
                    //水平居中对齐
                    if ($elem.attr('data-align') === "center") {
                        var newLeft = that.canvas.canvasSize.pxWidth / 2 - $elem.attr('data-width') / 2
                        $elem.attr("data-left", newLeft)
                        $elem.css('left', newLeft * zoomRatio)
                    }
                    //垂直居中对齐
                    if ($elem.attr('data-alignY') === "center") {
                        var newTop = that.canvas.canvasSize.pxHeight / 2 - $elem.attr('data-height') / 2
                        $elem.attr("data-top", newTop)
                        $elem.css('top', newTop * zoomRatio)
                    }
                    cb && cb()
                }
                function getOrignVal (cssItem, zoomRatio) {
                    return ($elem.css(cssItem).slice(0,-2)) / zoomRatio * 1
                }
            },
            /**
             *  缩放元素
             *  缩放包括width, height, left, top, fontSize,
             *  @param {$}
             *  @param {Number || Ignore}
             *  @param {Function || Ignore}
             */
            zoomElem: function ($elem, newRatio, cb) {
/*                var isCanvas = (this.container[0] === $elem.parent()[0])
                if (isCanvas) {*/
                newRatio = newRatio || this.container.data('zoomRatio') || 1
/*                } else {
                    newRatio = 1 //如果非画布缩放比例固定为1
                }*/
                $elem.css({
                    "width": getNewVal('width'),
                    "height": getNewVal('height'),
                    "left": getNewVal('left'),
                    "top": getNewVal('top')
                })
                cb && cb()
                function getNewVal (type) {
                    return ($elem.attr("data-"+type) * newRatio + "px")
                    //return Math.round(parseInt($elem.attr("data-"+type)) * newRatio) + "px" //通过原始比例缩放
                }
            },
            /**
             *  使用相应数据设置元素数据, 包括他的html和attributes数组
             *  @param {$}
             *  @param {Array} data数组
             *  @param {Number || Ignore}
             */
            setElemData: function($elem, data, newRatio) {
                if(!data) return
                var attrs = data[1]
                //设置html
                if($elem.attr('data-type') == 'diy_text' && $elem.attr('data-src') && $elem.attr('data-src') == attrs['data-src']) {
                } else {
                    $elem.html(data[0])
                }
                //设置属性
                objs.forEach(attrs,function(item,key){
                    $elem.attr(key,item)
                })
                this.zoomElem($elem, newRatio)//监听onchange时候也会调用这个函数，默认比例为1
                return $elem
            },
            /**
             * 加载文本图片
             * 如果background已经加载过了不会重复加载
             * @param {$}
             * @param {Function || Ignore}
             * @param {Number || Ignore}  ratio缩放比例
            */
            loadTextImg: function($target, cb, ratio) {
                if($target && $target.data('type') === 'diy_text') {
                    var that = this
                        ,newSrc = this._getTextImgSrc($target, ratio)
                        ,oldSrc = ($target.attr('data-src') || "" ).split("&ctime=")[0]//旧的参数
                        ,curId
                    //判断src是否变化，不变化不加载
                    if (newSrc === oldSrc) {
                        cb && cb(false)
                        that.triggerState('TEXT_IMG_LOADED')
                        return this
                    }
                    //加上时间戳cookie
                    newSrc = newSrc + "&ctime=" + (new Date()).getTime()
                    //当前的图片id
                    curId = ($target.data('loadingImgCount') || 0) + 1
                    $target.data('loadingImgCount', curId)
                    //加载图片
                    loadImgs({
                        "imgs": [encodeURI(newSrc)],
                        "done": function(imgObj){
                            //是否是最新加载的一张
                            if($target.data('loadingImgCount') == curId) {
                                $target.width(imgObj.width)
                                $target.height(imgObj.height)
                                //$target.css('line-height',imgObj.height + "px")
                                //$target.css("text-indent", "-9999px")
                                //$target.css("background", "url("+imgObj.src+") no-repeat 0 0")
                                $target.attr('data-src', newSrc)
                                $target.find('img').attr('src', imgObj.src)
                                cb && cb(true)
                                that.triggerState('TEXT_IMG_LOADED')
                                //that.triggerState('CHANGE', $target)
                                $target.data('loadingImgCount', 0) //清0
                            }
                        }
                    })
                    return this
                }
            },
            /**
             *  获取文本图片的src地址
             *  @param {$}
             *  @param {Number}
             */
            _getTextImgSrc: function($target, ratio) {
                var fontFamily = $target.attr('data-family')
                    ,fontSize =  $target.attr('data-size')
                    ,fontColor = $target.attr('data-color')
                    ,fontContent = $target.attr('data-content').replace( /\n/g, this.canvas._ENTER_)
                    ,fontBold = $target.attr('data-bold')
                    ,fontItalic = $target.attr('data-italic')
                    ,fontUnderline =$target.attr('data-underline')
                    ,fontAlign = $target.attr('data-text_align') || "left"
                    ,ratio = ratio || 1
                    ,imgParams
                //获取src
                imgParams = "size=" + fontSize
                        + "&content=" + fontContent
                        + "&family=" + fontFamily
                        + "&bold=" + fontBold
                        + "&color=" + fontColor
                        + "&italic=" + fontItalic
                        + "&underline=" + fontUnderline
                        + "&ratio=" + ratio
                        + "&text_align=" + fontAlign
                return (global.DIY_TEXT_PATH || "../../../../app/api/text_png.php.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/app/api/text_png.php*/) + "?" + imgParams
            },
            /**
             * 监听历史记录变化并克隆子元素到指定父元素
             * @param {$} $clone, $clone必须提供thumScale比例
             **/
            onChangeToClone: function($clone){
                var that = this
                //注册初始的元素到$clone
                this._initArr.forEach(function(item){cloneElem(item.$elem)})
                this.$cloneArr.push($clone)
                //绑定change
                /**
                 * change回调
                 * @param {String} type 可能为："edit","add","del"
                 * @param {Array} [$,$,$...]
                 */
                this.onState('CHANGE', function(type, $elemArr){
                    var cloneRatio = $clone.data('thumbScale')
                    //其他地方也可能触发此次变更
                    if (!type) return
                    //调用克隆指定方法
                    switch(type) {
                        case "add":
                            //console.log('change add')
                            $elemArr.forEach(function($elem){cloneElem($elem, cloneRatio)})
                            break;
                        case "edit":
                            //console.log('change edit')
                            $elemArr.forEach(function($elem){
                                var index = $elem.attr('data-index')
                                that.setElemData($clone.children('[data-index='+index+']'), that.getElemData($elem), cloneRatio)

                            })
                            break;
                        case "del":
                            //console.log('change del')
                            $elemArr.forEach(function($elem){
                                var index = $elem.attr('data-index')
                                $clone.children('[data-index='+index+']').remove() //移除对应的元素
                            })
                            break;
                    }
                })
                function cloneElem(_$elem, cloneRatio) {
                    var $elem = $("<div></div>")
                    var data = that.getElemData(_$elem)
                    $clone.append($elem)
                    that.setElemData($elem, data, cloneRatio)
                }
            },
            unChange: function() {
                this.unState('CHANGE')
            },
            /**
             * 获取当前历史记录条数
             */
            getLength: function() {
                return this._undoArr.length
            },
            /**
             * 锁定历史记录
             */
             lock: function() {
                var lockArr = this._undoLockArr
                this._undoArr.slice().forEach(function(item){
                    lockArr.push(item)
                })
                this._undoArr.length = 0
                return this
            },
            /**
             * 手动调用克隆的画布并执行响应函数
             * @param {Function}
             */
            execCloneChange: function (fn) {
                this.$cloneArr.forEach(function($clone){
                    fn($clone, $clone.data('thumbScale'))
                })
            }
        })

    return DiyHistory
})