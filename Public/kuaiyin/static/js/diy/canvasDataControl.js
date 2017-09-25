/**
 * 控制画布数据的加载，初始化，修改，保存，提交
 *
 * @author by liuwencheng
 * @date 2013-12-4
 * @update by liuwencheng at 2014-7-31 添加扶持活动"?fc＝"判断
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery')
    var alert = require('zz/ui/alert')
    var Dialog = require('zz/ui/Dialog')
    var info = require('zz/ui/info')
    var confirm = require('zz/ui/confirm')
    /**
     * @private
     */
    var TYPE_SPLIT = "_"
    var _canvasData = require('./config/canvasStaticData')._canvasData
    //var _meanAutoTexts = require('./config/canvasStaticData')._meanAutoTexts
    var template_id = global.template_id || global.user_template_id
    var isCreated = template_id ? true : false //是否已经创建了
    var mm2px = require('zz/utils/utils').mm2px
    var auditDialog
    /**
     * 保存数据
     * @param {Object}
     * @param {Function} 保存之后的回调
     * @param {Boolean} 是否为自动保存, 是的话错误不给提示
     */
    exports.save = function (canvasJsonData, cb, isAutoSave) {
        var saveUrl = isCreated ? '/design/api/edit' : '/design/api/create'
        var data = {
            "content": JSON.stringify(canvasJsonData),
            width: canvasJsonData.pages[0].canvas.width,
            height: canvasJsonData.pages[0].canvas.height,
            "category_id": global.category_id ,
            //"industry_id": global.industry_id,
            "product_id": global.product_id ,
            "csrf_token": $("#csrf_token").val(),
            version: 1
        }
        var fc = require("zz/utils/utils").getUrlData("fc")
        if (fc && !isCreated) {
            //为扶持活动且为第一次创建的时候需要传入fc
            data.fc = fc
        }
        if (template_id) data.template_id = template_id
        $.post(saveUrl, data)
            .done(function(json){
                if(json.code == 200) {
                    isCreated = true
                    if(json.data && json.data.id)
                        template_id = json.data.id
                    !isAutoSave && info('保存成功')
                    console.log('saved template: ' + template_id)
                    cb && cb(true)
                    //跳转页面
                } else if (json.code == 403) {
                    !isAutoSave && alert(json.msg)
                    cb && cb(false)
                } else{
                    !isAutoSave && alert('系统出错了！！')
                    cb && cb(false)
                }
            })
            .fail(function(){
                cb && cb(false)
            })
    }
    /**
     * 提交审核
     */
    exports.audit = function (cb) {
        if (!auditDialog) {
            auditDialog = require('common/submitDesignDialog').init({
                id: template_id,
                name: global.name,
                url: '/design/api/audit',
                cb: cb,
                done: function(data){
                    if(data.code == 200){
                        require('zz/utils/beforeUnload').unbind();
                        auditDialog.close();
                        confirm('<p style="color:#c8101c;font-size:16px"><i></i>提交审核成功, 还想再做一张吗？</p>', function(){
                            location.href = 'http://www.mayicy.cn/design/'+global.category_id+'/'+global.product_id+'/create';
                        }, function(){
                            location.href = 'http://www.mayicy.cn/myky/design';
                        },["好的, 我还有战斗力 ^_^", "不做了"]);
                    }else if(data.code == 403){
                        alert(data.msg);
                    }else{
                        alert('系统出错了！！');
                    }
                }
            });
        }
        if (template_id) {
            auditDialog.open()
        } else {
            alert('你还没有保存模版哦~~')
            cb && cb()
        }

    }
    /**
     * @param {String}
     * @return {Array}
     */
    exports.getSizeArr = function (type) {
        return _canvasData[type].sizeArr || []
    },
    /**
     * 获取演示数据
     * @param {String}
     * @return {Array}
     */
    exports.getDemoArr = function (type) {
        var demoArr = _canvasData[type].demoArr || []
        demoArr.forEach(function(item){
            item.pages.forEach(function(item){
                delete item.background  //删除演示模板中的背景图
            })
        })
        return demoArr
    },
    /**
     * 可以直接传一个参数
     * @param {String}
     * @param {String || Ignore}
     * @retrn {Object}
     */
    exports.getMeanList = function (categoryName, productName) {
        var typeName
        if (productName) {
            typeName = exports.getTypeName(categoryName, productName)
        } else {
            typeName = categoryName
        }
        return _canvasData[typeName].meanList
    },
    /**
     *  @param {String}
     *  @return {Boolean}
     */
    exports.hasRadius = function (type) {
        return _canvasData[type].hasRadius
    }
    /**
     *  @param {String}
     *  @return {Boolean}
     */
    exports.hasSplitLine = function (type) {
        return _canvasData[type].hasSplitLine
    }
    exports.getCanvasData = function (type) {
        return _canvasData[type]
    }
    /**
     *  @parama {String}
     *  @return {Number}
     */
    exports.defaultPageCount = function (type) {
        return _canvasData[type].defaultPageCount
    }
    exports.getPageArr = function (type) {
        return _canvasData[type].pageArr
    }
    /**
     *  @param {String}
     *  @return {Boolean}
     */
    exports.canAddPage = function (type) {
        return _canvasData[type].canAddPage
    }
    /**
     *  @param {String}
     *  @param {String}
     *  @return {Boolean}
    */
    exports.hasType = function (categoryName, productName) {
        var typeName = exports.getTypeName(categoryName, productName)
        if (_canvasData[typeName]) {
            return true
        } else {
            return false
        }
    },
    /**
     * @param {String} 分类名
     * @param {String} 生产名
     * @return {String}
     */
    exports.getTypeName = function (categoryName, productName) {
        return categoryName + TYPE_SPLIT + productName
    }
    /**
     *  转化为画布详细数据
     *  @param {Array}  画布数据数组, [宽,高,出血线,限制线] (单位毫米)
     *  @return {Object}
     */
    exports.toSizeDetailData = function (sizeData) {
        var mm2px = require('zz/utils/utils').mm2px
          , mmWidth = sizeData[0] + sizeData[2] * 2
          , mmHeight = sizeData[1] + sizeData[2] * 2
          , width = mm2px(mmWidth, 300)
          , height = mm2px(mmHeight, 300)
          , blood = mm2px(sizeData[2], 300)
          , limit =  mm2px(sizeData[3], 300)
        return {
            mmWidth: mmWidth,
            mmHeight: mmHeight,
            pxWidth: Math.round(width),
            pxHeight: Math.round(height),
            mmBlood: sizeData[2],
            mmLimit: sizeData[3],
            pxLimit: Math.round(limit),
            pxBlood: Math.round(blood)
        }
    }
    exports.getBianmaData = function (type) {
        var data = _canvasData[type].bianma
        var blood = _canvasData[type].sizeArr[0][2] //选择第一个尺寸的出血线
        if (!data) return null
        else return {
            mmLeft: data.left + blood,
            mmTop: data.top + blood,
            mmWidth: data.width,
            mmHeight: data.height,
            pxLeft: mm2px(data.left + blood, 300), //加上出血
            pxTop: mm2px(data.top + blood, 300),
            pxWidth: mm2px(data.width, 300),
            pxHeight: mm2px(data.height, 300),
            cmyk: "0,0,0,100", //默认cmyk颜色
            color: "0,0,0" //默认rgb颜色
        }
    },
    exports.getCitiaoData = function (type) {
        var data = _canvasData[type].citiao
        var blood = _canvasData[type].sizeArr[0][2] //选择第一个尺寸的出血线
        if (!data) return null
        else return {
            cmyk: data.cmyk,
            color: data.color,
            mmTop: data.top + blood,
            mmHeight: data.height,
            pxTop: mm2px(data.top + blood, 300), //加上出血
            pxHeight: mm2px(data.height, 300)
        }
    }
})