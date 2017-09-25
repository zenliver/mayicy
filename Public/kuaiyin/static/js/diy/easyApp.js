/**
 *  app360应用对外接口
 *  @author liuwencheng
 *  @date 14-4-2
 */
define(function(require, exports) {
    "use strict"
    var Dialog = require('zz/ui/Dialog')
    var $ = require('jquery')
    var getContentData = require('./common/getContentData')
    var editDlg
    var info = require('zz/ui/info')
    var alert = require('zz/ui/alert')
    var loading = require('zz/ui/loading')
    var confirm = require('zz/ui/confirm')
    var templateUserId = global.user_template_id

    function _createEditDlg() {
        editDlg = new Dialog({
            append: $("#designForm").show(),
            closeToDispose: false,           //关闭时候是否销毁
            hasTitle: false,
            hasClose: true,
            hasFoot: false,
            isCenter: false,
            left: "50%",
            top: 0
        })
    }

    exports.appSave = function(canvasArr) {
        var contentData = getContentData(canvasArr)
        var saveLoading = loading("保存中")
        var url, data
        //已经有用户作品
        if (templateUserId) {
            url = "/app/update/passers/template"
        } else {
            url = "/app/create/passers/template"
        }
        data = {
            template_id: templateUserId || global.template_id,
            content: contentData,
            product_id: global.product_id
        }
        require('zz/net/ajax')({
            url: url ,
            type: "post",
            data: data,
            done: function(json) {
                json.data.id && (templateUserId = json.data.id)
                require('zz/utils/beforeUnload').unbind()
                info("保存成功")
            },
            fail: function(json) {
                alert(json.msg)
            },
            always: function() {
                saveLoading.close()
            }
        })
    }

    exports.appEdit = function(photoActions) {
        if (!editDlg) {
            _createEditDlg()
            editDlg.$target.css({
                marginLeft: "-200px"
            })
            $('#formList').actionMap(photoActions) //重新绑定
        }
        editDlg.open()
        $("#designForm").css({
            "max-height": $(window).height() - 50,
            "overflow-y": "scroll"
        })
    }

})
