/**
 *
 * 编辑器 数据处理插件
 *
 * @author by liuwencheng
 * @date 2013-6-3
 *
 * @update by liuwencheng 2013-9-12 改变为中心点定位
 */
define(function(require,exports) {
    "use strict"
    var objs = require('zz/utils/objs')
    var types = require('zz/utils/types')
    var $ = require('jquery')
    var mm2px = require('zz/utils/utils').mm2px
    var px2mm = require('zz/utils/utils').px2mm

    return {
        // 获取指定元素数据
        getDiyElemData: function ($elem) {
            if ($elem && $elem[0]) {
                var info
                    //,type = $elem.attr('data-type')
                    //,cssText = $elem[0].style.cssText
                    ,framePhoto
                    ,photoCssText
                    ,photoInfo
                    ,retData     //要返回的数据
                //设置data
                //objs.extend(retData, $elem.data())
                retData = {
                    'type': $elem.data('type'),
                    //"cssText": $elem[0].style.cssText,
                    'index': $elem.attr('data-index'),
                    "align" : $elem.attr('data-align') || "left"
                }
                //设置位置及大小旋转
                if (retData.type !== "diy_background") {
                    var width = $elem.attr('data-width')
                      , height = $elem.attr('data-height')
                      , left = $elem.attr('data-left')
                      , top = $elem.attr('data-top')
                    retData.center_x = parseInt(left) + (width / 2)
                    retData.center_y = parseInt(top) + (height / 2)
                    retData.width = width
                    retData.height = height
                    retData.left = left
                    retData.top = top
                    retData.rotate = $elem.attr('data-rotate') || 0
                    if (width == "0" || height == "0") { //过滤掉没有宽和高的元素
                        console.log('no width or no height elem: ', retData)
                        return
                    }
                }
                //设置info
                //if (retData.type == 'diy_frame') {
/*                    //转化为JSON,适用于边框
                    retData.info = JSON.parse($elem.attr('data-info'))
                    //处理框内图片
                    framePhoto = $($elem).find('.diy-frame-photo')[0]
                    photoCssText = framePhoto && framePhoto.style.cssText || ""
                    photoInfo = framePhoto && framePhoto.getAttribute("data-info") || ""
                    //添加photo
                    retData.photo = {"cssText": photoCssText, "info": photoInfo}*/
                if (retData.type == "diy_text") {
                    retData.content = $elem.attr('data-content').replace( /\n/g, this._ENTER_) //替换换行符
                    retData.family = $elem.attr('data-family')
                    retData.size = $elem.attr('data-size')
                    retData.color = $elem.attr('data-color')
                    retData.cmyk = $elem.attr('data-cmyk')
                    retData.bold = $elem.attr('data-bold')
                    retData.italic = $elem.attr('data-italic')
                    retData.underline = $elem.attr('data-underline')
                    retData.mean = $elem.attr('data-mean')
                    retData.text_align = $elem.attr('data-text_align') || "left"
                    //retData.centered = $elem.attr('data-centered') || 0
                } else if (retData.type == 'diy_background') {
                    //retData.src = $elem.data('src')
                    retData.key = $elem.attr('data-key') || ""
                    retData.color = $elem.attr('data-color')
                    retData.src = $elem.attr('data-src').replace(/!mlog$|!xmlog$/, "") //去掉mlog,xmlog图片缩放后缀
                    retData.dpi = [$elem.attr('data-dpiX'),$elem.attr('data-dpiY')]
                } else if (retData.type == "diy_photo") {
                    retData.key = $elem.attr('data-key') || ""
                    retData.origin_width = $elem.attr('data-origin_width')
                    retData.origin_height = $elem.attr('data-origin_height')
                    retData.src = $elem.attr('data-src').replace(/!mlog$|!xmlog$/, "") //去掉mlog,xmlog图片缩放后缀
                    retData.dpi = [$elem.attr('data-dpiX') || 0,$elem.attr('data-dpiY') || 0]
                    retData.img_type = $elem.attr('data-img_type')
                    if (retData.img_type === "logo") {
                        retData.type = "diy_logo"
                    }
                }
                objs.forEach(retData, function(item, key){
                    if(key !== "content" && types.isNumber(Number(item)) && !!Number(item)) {
                        retData[key] = Math.round(item * 100) / 100 //保留两位有效数字
                    }
                })
                return retData
            }
        },
        getDiyTechsData: function() {
            var techsData = [], $bianma, $citiao
            if ($bianma = this.techs.$bianma) {
                techsData.push({
                    type: $bianma.attr("data-type"),
                    cmyk: $bianma.attr("data-cmyk"),
                    color: $bianma.attr("data-color"),
                    width: $bianma.attr("data-mm-width"),
                    height: $bianma.attr("data-mm-height"),
                    left: $bianma.attr("data-mm-left"),
                    top: $bianma.attr("data-mm-top"),
                    content: $bianma.attr('data-content') || "NO.000001",
                    locate: "right_bottom",
                    pre: "NO.",
                    step: 1,
                    start: $bianma.attr('data-start') || "000001"
                })
            }
            if ($citiao = this.techs.$citiao) {
                techsData.push({
                    type: $citiao.attr("data-type"),
                    cmyk: $citiao.attr("data-cmyk"),
                    color: $citiao.attr("data-color"),
                    top: $citiao.attr("data-mm-top"),
                    height: $citiao.attr("data-mm-height")
                })
            }
            techsData.forEach(function(tech) {
                objs.forEach(tech, function(item, key){
                    if(key !== "content" && key !== "start" && types.isNumber(Number(item)) && !!Number(item)) {
                        tech[key] = Math.round(item * 100) / 100 //保留两位有效数字
                    }
                })
            })

            return techsData
        },
        // 获取画布所有数据： 画布及各元素数据
        getDiyAllData: function () {
            var allData = {
                "canvas": {},
                "elements": [],
                "background": {}
            }
            var canvasSize = this.canvasSize
            var qianmingArr = []
            //画布数据
            console.log(canvasSize);
            allData.canvas = {
                width: canvasSize.mmWidth - canvasSize.mmBlood * 2, //减去出血线
                height: canvasSize.mmHeight - canvasSize.mmBlood * 2,
                hasRadius: this.opts.hasRadius,
                blood: this.canvasSize.mmBlood,
                limit: this.canvasSize.mmLimit
            }
            //背景
            if (this.bgElem) {
                //allData.elements.push(this.getDiyElemData(this.bgElem))
                allData.background = this.getDiyElemData(this.bgElem)
            }
            for (var childElems = this.childElems, i = 0, j = childElems.length; i < j; i++) {
                var data = this.getDiyElemData(childElems[i])
                if (data && data.type === "diy_qianming") {
                    qianmingArr.push({
                        type: "diy_qianming",
                        cmyk: "0,0,0,0",
                        color: "255,255,255",
                        left: toFixed(px2mm(data.left,300), 2),
                        top: toFixed(px2mm(data.top,300), 2),
                        width: toFixed(px2mm(data.width,300), 2),
                        height: toFixed(px2mm(data.height,300), 2)
                    })
                } else if (data) {
                    allData.elements.push(data)
                }
            }
            //附加工艺
            allData.techs = this.getDiyTechsData()
            allData.techs = allData.techs.concat(qianmingArr)
            return allData
        },
        /**
         * 加载canvas数据
         * @param {Object}  {background: ..., elements: ...}
         */
        loadCanvasData: function (data) {
            var that = this
            /** 更新数据，加入默认数据以兼容前面 **/
            var sizeData = [data.canvas.width || 520, data.canvas.height || 325, data.canvas.blood || 1, data.canvas.limit || 3]
            this.canvasSize = this.opts.canvasSize = require('diy/canvasDataControl').toSizeDetailData(sizeData)
            /**
             * 模拟dragger
             */
            var _createDragger = function(elemData) {
                var $elem = $('<img>')
                //保存为data数据
                objs.forEach(elemData, function(data,key){
                    if (key === "content") {
                        elemData[key] = data = data.replace(that._REG_ENTER_, "\n") //替换为换行符号
                    }
                    $elem.attr('data-' + key, data)
                })
                if(elemData !== "diy_background") {
                    $elem.css({
                        left: elemData.left + "px",
                        top: elemData.top + "px",
                        width: elemData.width + "px",
                        height: elemData.height + "px",
                        zIndex: elemData.index + 10 //todo
                    })
                }
                return $elem
            }
            //添加元素
            data.elements.concat(data.background).forEach(function(data){
                if (!data) return
                var $elem = _createDragger(data)
                switch($elem.attr('data-type')) {
                    case "diy_photo":
                        $elem = that.addDiyPhoto($elem)['curElemArr'][0]
                        break;
                    case "diy_frame":
/*                        $elem = that.addDiyFrame($elem)
                        that.addDiyFramePhoto(_createDragger(item.photo),$elem)
                        $elem.find('.diy-frame-photo').attr('style',item.photo.cssText)*/
                        break;
                    case "diy_logo":
                        $elem = that.addDiyLogo($elem)['curElemArr'][0]
                        break;
                    case "diy_text":
                        $elem = that.addDiyText($elem)['curElemArr'][0]
                        break;
                    case "diy_background":
                        $elem = that.addDiyBackground($elem)['curElemArr'][0]
                        break;
                }
                if ($elem.attr('data-type') !== "diy_background") {
                    //再次更新
                    objs.forEach(data, function(data,key) {
                        if (key!=="type") $elem.attr('data-' + key, data) //不修改type
                    })
                    $elem.css({
                        left: data.left * that.zoomRatio,
                        top: data.top * that.zoomRatio,
                        width: data.width * that.zoomRatio,
                        height: data.height * that.zoomRatio
                    })
                    that.emitChange($elem)
                }
            })
            //添加附加工艺
            if (data.techs) {
                data.techs.forEach(function(d) {
                    switch (d.type) {
                        case "diy_bianma":
                            that.createBianma({
                                color: d.color,
                                cmyk: d.cmyk,
                                content: d.content,
                                pre: "NO.",
                                step: 1,
                                start: d.start || "000001",
                                mmHeight: d.height,
                                mmWidth: d.width,
                                mmTop: d.top,
                                mmLeft: d.left,
                                pxHeight: mm2px(d.height,300),
                                pxWidth: mm2px(d.width,300),
                                pxLeft: mm2px(d.left,300),
                                pxTop: mm2px(d.top,300)
                            })
                            that.updateBianma()
                            break;
                        case "diy_citiao":
                            that.createCitiao({
                                color: d.color,
                                cmyk: d.cmyk,
                                mmTop: d.top,
                                mmHeight: d.height,
                                pxTop: mm2px(d.top, 300),
                                pxHeight: mm2px(d.height, 300)
                            })
                            that._updateCitiao()
                            break;
                        case "diy_qianming":
                            that.addDiyQianming({
                                left: mm2px(d.left, 300),
                                top: mm2px(d.top, 300),
                                width: mm2px(d.width, 300),
                                height: mm2px(d.height, 300)
                            })
                            break;
                    }
                })
            }
            this.history.lock() //锁定
        }

    }

    //返回整数
    function toFixed(item, num) {
        return parseFloat(item.toFixed(num))
    }
})

