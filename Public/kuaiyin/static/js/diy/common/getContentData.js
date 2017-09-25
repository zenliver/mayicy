/**
 * 获取作品保存后的数据
 * @author by liuwencheng
 * @date 14-4-23
 */
define(function(require,exports) {
    "use strict"
    var objs = require("zz/utils/objs")

    /**
     * @param {Array} 画布数组
      */
    function getContentData(canvasArr) {
        global.content.pages.forEach(function(item,index){
            objs.extend(item, canvasArr[index].getDiyAllData())
        })
        return JSON.stringify(global.content)
    }

    return getContentData
})