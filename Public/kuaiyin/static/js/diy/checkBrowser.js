/**
 * 检测浏览器
 * @author by liuwencheng
 * @date 2013-9-26
 */
define(function(require,exports) {
    "use strict"
    var alert = require('zz/ui/alert')
    var $ = require('jquery')


    function init () {
        if ($.browser.msie && $.browser.version < 8) {
            alert('亲，您的IE浏览器版本太低请升级或者使用谷歌火狐等非ie浏览器!! 如果使用360浏览器或者搜狗浏览器请切换到极速模式！！')
            global.diyLoading && global.diyLoading.close() //关闭loading
            return false
/*        } else if (!global.isUser && $.browser.msie && $.browser.version == 8){
            alert('您的IE浏览器版本为ie8, 如果想有更好的体验建议升级浏览器，或者使用谷歌火狐等非ie浏览器')
            //global.diyLoading && global.diyLoading.close() //关闭loading
            return true*/
        } else {
            return true
        }
    }
    return init()
})