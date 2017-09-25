/**
 *  剪刀 animation
 *   
 *  @author by liuwencheng
 *  @update 2013-11-27 添加透明这该矩形
 */
define(function(require,exports) {
    var $ = require("jquery")
    require('jquery.easing')
    var ANIM_TYPE = 'slow'

    /**
     * 获取远距离
     */
    function _getFarPos($cutter) {
        var $canvasWrap = $cutter.parent()
        //获取远距离
        var left = -($('#diyRight').width()/2 - $canvasWrap.width()/2 + 33 + 16)
            ,right = left
            ,top = -($canvasWrap.offset().top + 33 + 16)
            ,bottom = -($(window).height() - $canvasWrap.height() - $canvasWrap.offset().top + 33 + 16)
        return {left: left, right: right, top: top, bottom: bottom }
    }

    /**
     * 设置剪刀的位置
     * @param {$}
     * @param {Object}
     *      {
     *          left: 左边条的宽度值， 下同
     *          top:
     *          right:
     *          bottom:
     *      }
     * @param {Boolean | Ignore} 是否为滚动条
     * @param {Function | Ignore} 回调函数
     * @param {String | Ignore} 动画类型
     */
    function _setCutPos($cutter,obj, isAnim, cb, animType) {
        $cutter.children().each(function() {
            var type = $(this).attr('data-type')
                ,setCss = {}
            //设置类型
            setCss[type]  = obj[type] - 23
            //是否动画
            if (isAnim) {
                $(this).animate(setCss, animType || ANIM_TYPE, cb)
            } else {
                $(this).css(setCss)
            }
        })
        _updateHoverRect($cutter, obj)
    }
    /**
     * 更新剪刀内的透明遮盖矩形
     */
    function _updateHoverRect($cutter, obj) {
        $cutter.children().each(function(){
            var type = $(this).attr('data-type')
            var $rect = $(this).find('div')
            var width = obj[type]
            var height
            switch (type) {
                case 'left':
                    $rect.css({
                        'width': width
                        //'height': $rect.height() - 23 * 2,
                        //'top': 23
                    })
                    break;
                case 'right':
                    $rect.width(width)
                    break;
                case 'top':
                    $rect.height(width)
                    break;
                case 'bottom':
                    $rect.height(width)
                    break;
            }
        })
    }
    /**
     * @param {$} 要添加到的父类节点
     */
    exports.createCutter = function ($wrap) {
        var tpl = "<ul class=\"diy-r-canvas-cut-list\">\n    <li data-type=\"left\" class=\"diy-r-canvas-cut cut-left\"><div></div><span></span></li>\n    <li data-type=\"right\" class=\"diy-r-canvas-cut cut-right\"><div></div><span></span></li>\n    <li data-type=\"top\" class=\"diy-r-canvas-cut cut-top\"><div></div><span></span></li>\n    <li data-type=\"bottom\" class=\"diy-r-canvas-cut cut-bottom\"><div></div><span></span></li>\n</ul>\n"
        return $(tpl).appendTo($wrap)
    },
    /**
     * @param {$}
     * @param {Object} canvas
     */
    exports.updateCutter = function ($cutter, canvas) {
        var ratio = canvas.zoomRatio
        var cutWidth = canvas.canvasSize.pxBlood * ratio
        _setCutPos($cutter, { left: cutWidth, top: cutWidth, right: cutWidth, bottom: cutWidth})
    }
    exports.updateCutterByAnim = function ($cutter, canvas, cb) {
        var farPos = _getFarPos($cutter)
            ,ratio = canvas.zoomRatio
            ,cutWidth = canvas.canvasSize.pxBlood * ratio
        $cutter
            .show()
            .css({opacity:'0.3'})
        /*            .animate({opacity: '0.3'}, ANIM_TYPE, function(){
         $(this).children().addClass('cut-border')
         })*/
            .animate({opacity: '1'}, ANIM_TYPE)
        //.children().addClass('cut-border')
        //先设置到最远
        _setCutPos($cutter, farPos)
        //执行动画
        _setCutPos($cutter, { left: cutWidth, top: cutWidth, right: cutWidth, bottom: cutWidth}, true, function(){
            exports.updateCutter($cutter, canvas) //再更新一次，以免画布缩放之后做了变动
            cb && cb()
        })
    }
    exports.hideCutter = function ($cutter, cb) {
        var farPos = _getFarPos($cutter)
        _setCutPos($cutter, farPos, true, cb,"fast")
    }
})

