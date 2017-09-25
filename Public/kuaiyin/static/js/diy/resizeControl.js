/**
 * 管理页面窗口重绘
 * @author by liuwencheng
 * @date 2013-10-8
 */
define(function(require,exports) {
    "use strict"
    require('zz/plugins/actionMap')
    var selector = require('diy/canvasControl').getSelector()
    var utils = require('zz/utils/utils')
    var $ = require("jquery")
    var range = $('#diyToolPanel').data('rangeObj')

    /**
     * 窗口重绘回调
     */
    function resizeCb() {
        var winHeight = $(window).height()
        var winWidth = $(window).width()
        var fixSizeX = 240
        var fixSizeY = 200
        var $diyPageList
        /** 更新左侧高度 **/
        $('#diyLeftContent').height(winHeight - 70)
        /** 更新右侧高度 **/
        $('#diyCanvasList') //用于设定画布居中
            .height(winHeight - fixSizeY)
            .width(winWidth - fixSizeX)
        $('#diyWorkArea')
            .height(winHeight - fixSizeY)
            .width(winWidth - fixSizeX)
        $diyPageList = $('#diyPageList')
            .width(winWidth - fixSizeX)
        if ($diyPageList.children('ul').width() < winWidth - fixSizeX) {
            $diyPageList.children('ul').width(winWidth - fixSizeX)
        }

        /** 更新选择框 **/
        //selector.updateRect()
        /** 自动缩放 **/
        var canvasSize = selector.canvas.canvasSize
        var newRatio = utils.ratioImg(canvasSize.pxWidth, canvasSize.pxHeight, winWidth - fixSizeX - 20, winHeight - fixSizeY - 20)[2]
        //if (range.getRangeVal() > newRatio*100) {
            range.setRange(newRatio)
        //}
    }

    function init() {
        resizeCb() //初始化的时候执行一次
        $(window).resize(resizeCb);
    }
    init()
 })