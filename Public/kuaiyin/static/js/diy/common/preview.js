/**
 * 预览
 * @author by liuwencheng
 * @date 2013-10-31
 *
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery')
    var loadImgs = require('zz/utils/loadImgs')
    var Dialog = require('zz/ui/Dialog')
    var utils = require('zz/utils/utils')
    var loading = require('zz/ui/loading')
    var alert = require('zz/ui/alert')
    var loadingDlg
    var PREVIEW_RATIO = 0.5
    var SIZE_LIMIT = 500 //预览图大小限制
    var SIZE_BLANK = 40  //距离边界的距离
    var PREVIEW_PREPARE = global.DIY_PREVIEW || "/Goods/design"///design/preview/prepare"
    var PREVIEW_IMG = global.DIY_PREVIEW_IMG || "/Goods/preview"//'/design/preview'

    /**
     * 发送预览图请求
     * @param {Object} canvas对象
     * @param {Function}
     *          cb(imgWidth, imgHeight, jsonData) //jsonData为返回的数据
     */
    function postPreview (canvas, cb) {
        if (!canvas.bgElem.attr('data-key')) {
            alert('你还没有添加背景图片哦！')
            return
        }
        var data = canvas.getDiyAllData()
        var canvasSize = canvas.canvasSize
        data = JSON.stringify(data)
        //data = encodeURI(data)
        loadingDlg = loading("正在打开预览图...")
        $.post(PREVIEW_PREPARE, {content:data, zoom_size: canvasSize.mmWidth + "x" + canvasSize.mmHeight})
                .done(function(json){
                    var width = canvasSize.pxWidth * PREVIEW_RATIO
                    var height = canvasSize.pxHeight * PREVIEW_RATIO
                    var newSizeArr = utils.ratioImg(width,height,SIZE_LIMIT,SIZE_LIMIT) //图片大小不超过限制
                    //图片大小不超过windows窗口
                    newSizeArr = utils.ratioImg(newSizeArr[0],newSizeArr[1],$(window).width() - SIZE_BLANK*2,$(window).height() - SIZE_BLANK*2)
                    cb(newSizeArr[0], newSizeArr[1], json)
                })
                .fail(function(){
                    alert('系统出错了！！')
                    loadingDlg.close()
                })

    }

    /**
     * @param {Array}
     * @param {Number} 当前的画布的index
     * @param {Boolean} 是否有提示警告说明
     * @param {Function} 警告之后的回调
     * @param {String}
      */
    exports.open = function (canvasArr, curIndex, isConfirm , confirmCb, confirmText) {
        var loadedArr = []      //已经加载的画布预览
        loadedArr.push(curIndex)
        postPreview(canvasArr[curIndex], function(width, height, json){
            loadImgs({
                imgs: [_getImgSrc(json)],
                done: function(imgObj){
                    //location.href="http://www.mayicy.cn/design/preview"
                    loadingDlg.close()
                    var dialog
                    var confirmClass = isConfirm ? "confirm-wrap" : "confirm-wrap none"
                    dialog = new Dialog({
                        hasTitle: false,
                        hasFoot: false,
                        append: "<div class='"+confirmClass+"'>"+confirmText+"<a class=\"ui-dialog-btn\" data-action=\"confirm\">确定</a><a class=\"ui-dialog-btn\" data-action=\"close\">取消</a></div>\n<div class=\'img-wrap\' style=\'padding:1px;\'>\n<a class=\"next-btn left\" data-type=\"left\" data-action=\"next\" title=\"上一页\"><i class=\"iconfont\"></i></a>\n<a class=\"next-btn right\" data-type=\"right\" data-action=\"next\" title=\"下一页\"><i class=\"iconfont\"></i></a>\n<img style=\'display:block\' data-index="+curIndex+" src="+imgObj.src+" width='"+width+"' height='"+height+"'></div>",
                        maskZindex: 10000+500,
                        closeToDispose:true,
                        className: "diy-preview-dialog",
                        actions: {
                            confirm: function () {
                                confirmCb && confirmCb()
                                this.close()
                            },
                            next: function(e){
                                switch($(e.currentTarget).attr('data-type')) {
                                    case "left":
                                        var newIndex = this.curIndex - 1
                                        if (newIndex < 0) newIndex = canvasArr.length - 1
                                        break;
                                    case "right":
                                        var newIndex = this.curIndex + 1
                                        if (newIndex >= canvasArr.length) newIndex = 0
                                        break;
                                }
                                this.curIndex = newIndex
                                if (loadedArr.indexOf(newIndex) === -1) {
                                    if (!canvasArr[newIndex].bgElem.attr('data-key')) {
                                        alert('你还没有添加背景图片哦！！')
                                        return
                                    }
                                    loadedArr.push(newIndex)
                                    postPreview(canvasArr[newIndex], function(width, height,json){
                                        loadingDlg.close()
                                        var imgSrc = _getImgSrc(json)
                                        if(!$('.global-iframe').size()){
                                            dialog.css({
                                                "margin-left": "-" + (width/2) + "px",
                                                "margin-top": "-" + (height/2) + "px"
                                            })
                                        }
                                        dialog.$target.find("img").hide().parent().append('<img src="'+imgSrc+'" data-index="'+newIndex+'" width="'+width+'" height="'+height+'"/>')
                                    })
                                } else {
                                    var $img = this.$target.find('img').hide().filter("[data-index="+newIndex+"]")
                                    $img.show()
                                    var width = $img.width()
                                    var height = $img.height()
                                    if(!$('.global-iframe').size()){
                                        dialog.css({
                                            "margin-left": "-" + (width/2) + "px",
                                            "margin-top": "-" + (height/2) + "px"
                                        })
                                    }
                                }
                            }
                        }
                    })
                    dialog.curIndex = curIndex
                    dialog.open()
                }
            })
        })


        function _getImgSrc(json) {
            var key = "", time = "", src
            src = PREVIEW_IMG +"?ratio="+ PREVIEW_RATIO + "&ctime=" + (new Date()).getTime()
            if (json && json.code === 200 ) { //&& global.isService
                key = json.data.key
                time = json.data.time
                src = src + "&key=" + key + "&time=" + time
            }
            return src
        }
    }

})
