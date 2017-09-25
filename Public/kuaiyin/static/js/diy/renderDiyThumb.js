/**
 * 渲染diy-json格式为缩略图图片
 * @author by liuwencheng
 * @date 2013-10-22
 */
define(function(require, exports) {
    "use strict"
    var Canvas = require('diy/models/CanvasClass')
    var $ = require('jquery')

    /**
     * @param {$} 需要包含的div节点
     * @param {Object} json数据
     * @param {Boolean} isOnlyBg 只单单显示背景, 在我的作品调用该函数时只显示背景不显示文字
     */
    function renderDiyThumb($container, jsonData, isOnlyBg) {
        if (!jsonData) return
        /*            var sizeData = [jsonData..pages[0].canvas.width || 90, jsonData.canvas.height || 54, jsonData.canvas.blood || 1, jsonData.canvas.limit || 3]
         var canvasData = require('diy/canvasControl').toSizeDetailData(sizeData)
         var newImgSize = require('zz/utils/utils').ratioImg(canvasData.pxWidth, canvasData.pxHeight, $container.width(), $container.height())*/
        var opts = {
            minZoom   : 0,  //可缩放到最小比例
            type      : jsonData.type,
            bgRatio   : "20%",         //背景缩放参数,
            photoRatio: "20%"        //使用低的
        }
        var canvas = new Canvas($("<div style='overflow:hidden;position:relative;display:inline-block;width:100%;height:100%'></div>").appendTo($container), opts)
        jsonData = jsonData.pages[0]  //获取第一张图片
        if (isOnlyBg) {
            jsonData.elements = []
        }
        canvas.loadCanvasData(jsonData)
        var newImgSize = require('zz/utils/utils').ratioImg(canvas.canvasSize.pxWidth, canvas.canvasSize.pxHeight, $container.width(), $container.height())
        canvas.zoom(newImgSize[2]) //缩放比例
        return canvas
    }

    return renderDiyThumb
})