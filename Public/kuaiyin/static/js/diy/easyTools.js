/**
 * 用户编辑器工具栏
 * @author by liuwencheng
 * @date 2013-10-28
 */
define(function(require,exports) {
    "use strict"
    require('zz/plugins/actionMap')
    require('http://www.mayicy.cn/Public/kuaiyin/static/js/diy/plupload.full')
    var selector
      , canvasArr
      , $tools
      , $ = require('jquery')
      , confirm = require('zz/ui/confirm')
      , Dialog = require('zz/ui/Dialog')
      , easyApp = require("./easyApp")

    var uploadDlg
    /**
     * @param {String} 对话框title名字
     * @param {Function} 上传成功之后的回调 回调参数为返回的数据
     */
    function openUploadDlg(title, cb) {
        var $btn, uploader
        if (uploadDlg) {
            uploadDlg._cb = cb
            uploadDlg._title = title
            $("#easyUploadBtn").text(title)
            uploadDlg.open()
            return
        }
        uploadDlg = new Dialog({
            hasTitle: false,
            hasFoot: false,
            isAnim: true,
            closeToDispose: false,
            innerHTML: "<div class=\"easy-upload-content\">\n    <a id=\"easyUploadBtn\" class=\"ui-button ui-button-lblue\">"+title+"</a>    \n    <p>上传须知：目前只支持上传png,jpg格式图片,只有png图片支持透明哦</p>\n</div>"
        })
        uploadDlg.open()
        uploadDlg._cb = cb
        uploadDlg._title = title
        uploadDlg.$target.attr("id", "easyUploadDlg")
        $btn = $("#easyUploadBtn")
        uploader = new plupload.Uploader({
            runtimes : 'html5,flash,gears,silverlight,browserplus,html4',
            multi_selection: false,
            browse_button : "easyUploadBtn",
            container : 'easyUploadDlg',
            //max_file_size : '10mb',
            url : '/Goods/upload',
            flash_swf_url : '../../../../../sfr/plupload.flash.swf'/*tpa=http://www.mayicy.cn/sfr/plupload.flash.swf*/,
            silverlight_xap_url : 'http://www.mayicy.cn/sfr/plupload.silverlight.xap',
            filters : [
                {title : "Images files", extensions : "jpg,png,jpeg"}
                /*{title : "Zip files", extensions : "zip"}*/
            ]
            //resize : {width : 320, height : 240, quality : 90}
        });
        uploader.bind('Init', function(up, params) {
            console.log("upload runtime: " + params.runtime)
        });
        uploader.init();
        uploader.bind('FilesAdded', function(up){
            setTimeout(function(){up.start()},30) //开始上传
        })
        uploader.bind('FileUploaded', function(up, file, info) {
            //$('#' + file.id + " b").html("100%");
            var data = JSON.parse(info.response);
            if (data.code == 200) {
                console.log('upload success')
                uploadDlg._cb && uploadDlg._cb(data)
            } else {
                alert ("上传出错了，请重试!!")
            }
            up.refresh()
        });

        uploader.bind('UploadProgress', function(up, file) {
            $btn.text("已上传: " + file.percent + "%")
            if (file.percent == 100) {
                $btn.html(uploadDlg._title)
                uploadDlg.close()
            }
        });

        uploader.bind('Error', function(up, err) {
            console.error("Error: " + err.code +
                    ", Message: " + err.message +
                    (err.file ? ", File: " + err.file.name : "")
            );
            if (err.file) {
                alert("文件: " + err.file.name + "不符合规定哦！！")
            }
            $btn.html(uploadDlg._title)
            up.refresh(); // Reposition Flash/Silverlight
        });
/*        uploadDlg.onState('CLOSE', function(){
            uploader.destroy()
        })*/
    }

    var toolActions = {
        "undo": function(){
            var $elemArr = selector.canvas.history.undo()
            selector.seleMoreElems($elemArr)
        },
        "redo": function(){
            var $elemArr = selector.canvas.history.redo()
            if($elemArr) selector.seleMoreElems($elemArr)
        },
        "preview": function () {
            require('./common/preview').open(canvasArr, selector.canvas.index)
        },
        "del": function () {
            selector.del()
        },
        "copy": function () {
            selector.copy()
            $(this).siblings("[data-action=paste]").removeClass('disabled')
        },
        "paste": function () {
            selector.paste()
            $(this).addClass('disabled')
        },
        /**
         * 简单编辑器应用页保存接口
         */
        "app-save": function(){
            easyApp.appSave(canvasArr)
        },
        /**
         * 简单编辑器应用页编辑接口
         */
        "app-edit": function(){
            easyApp.appEdit(photoActions)
        }
    }
    var photoActions = {
        "photo-del": function (e, data) {
            confirm("确认要删除该图片吗??", function(){
                var canvas = selector.canvas
                canvas.delDiyElements(canvas.childElems[data.index])
                selector.cancelSele()
                //$(that).parent().parent().remove()
            })
        },
        "photo-add": function () {
            openUploadDlg("添加图片",function(imgData){
                var $elem = selector.canvas.addDiyPhotoByData(imgData)
                selector.seleElem($elem)
            })
        },
        "photo-replace": function (e, data) {
            openUploadDlg("替换图片", function(imgData){
                selector.canvas.replaceDiyPhoto(data.index, imgData)
            })
        },
        "text-add": function () {
            var $dragger = $("<img>")//.css({"left":10,"top":10})
            $dragger.attr({
                "data-left": 200,
                "data-top": 100
            })
            selector.seleMoreElems(selector.canvas.addDiyText($dragger).curElemArr)
        }
    }

    function initTools() {
        var tpl = "<a title=\'预览\' class=\"diy-tb-item\" data-action=\'preview\'><i class=\"i-btn preview\"></i>预览</a>\n<a title=\'撤销\' class=\"diy-tb-item\" data-action=\'undo\'><i class=\"i-btn undo\"></i>撤销</a>\n<a title=\'重做\' class=\"diy-tb-item\" data-action=\'redo\'><i class=\"i-btn redo\"></i>重做</a>\n<a title=\'删除\' class=\"diy-tb-item disabled\"  data-action=\'del\'><i class=\"i-btn delete\"></i>删除</a>\n<a title=\'复制\' class=\"diy-tb-item disabled\"  data-action=\'copy\'><i class=\"i-btn copy\"></i>复制</a>\n<a title=\'粘帖\' class=\"diy-tb-item disabled\"  data-action=\'paste\'><i class=\"i-btn save\"></i>粘帖</a>\n"
        $tools = $('.design-r-tools').append(tpl).show()
        $tools.actionMap(toolActions, null, {"disabled": true})
        //绑定history事件
        var unDisableCb = function(){ $(this).removeClass('disabled') }
        var disableCb = function(){ $(this).addClass('disabled') }
        canvasArr.forEach(function(canvas){
            canvas.history
                    .onState("UNDO_NO_EMPTY", unDisableCb, $tools.find('[data-action=undo]'))
                    .onState("REDO_NO_EMPTY", unDisableCb, $tools.find('[data-action=redo]'))
                    .onState("UNDO_EMPTY", disableCb, $tools.find('[data-action=undo]'))
                    .onState("REDO_EMPTY", disableCb, $tools.find('[data-action=redo]'))
                    .triggerState('UNDO_EMPTY')
                    .triggerState('REDO_EMPTY')
        })
        selector.onState('SELECT_ELEM', function(){
            $tools.find("[data-action=del],[data-action=copy]").removeClass('disabled')
        })
        selector.onState('SELECT_CANCEL', function(){
            $tools.find("[data-action=del],[data-action=copy]").addClass('disabled')
        })
    }

    function initKeyboards() {
        var keyCode = require('zz/utils/keyCode')
        $(document).on('keydown.diyshotcut', function(e){
            if (selector.isEdit()) return   //处于编辑状态不能使用快捷键
            if(e.keyCode == keyCode.get('delete')){ selector.del() } //删除元素
            if(e.keyCode == keyCode.get('left')){selector.moveElem(-1,0);e.preventDefault();return} //左方向键
            if(e.keyCode == keyCode.get('right')){selector.moveElem(1,0);e.preventDefault();return} //右方向键
            if(e.keyCode == keyCode.get('up')){selector.moveElem(0,-1);e.preventDefault();return} //上方向键
            if(e.keyCode == keyCode.get('down')){selector.moveElem(0,1);e.preventDefault();return} //下方向键
            //if(e.ctrlKey && e.keyCode == keyCode.get('c')) {selector.copy();e.preventDefault();return}
            //if(e.ctrlKey && e.keyCode == keyCode.get('x')) {selector.cut();e.preventDefault();return}
            //if(e.ctrlKey && e.keyCode == keyCode.get('v')) {selector.paste();e.preventDefault();return}
            if(e.ctrlKey && !e.shiftKey &&e.keyCode == keyCode.get('z')){toolActions.undo()}; //撤销操作
            if((e.ctrlKey && e.shiftKey && e.keyCode == keyCode.get('z')) || (e.ctrlKey && e.keyCode == keyCode.get('y'))){toolActions.redo()}; //恢复操作
        })
    }

    exports.init = function (_selector, _canvasArr) {
        selector = _selector
        canvasArr = _canvasArr
        if (!global.is_preview) initTools()
        initKeyboards()
        $('#formList').actionMap(photoActions)
/*        $(document.body).click(function(){
            selector.cancelSele()
        })*/
    }
})