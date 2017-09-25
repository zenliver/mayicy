/**
 * 所有页面都要运行的js文件
 *  目前从config.js中加在
 * @author by liuwencheng
 * @date 14-4-16
 */
define(function(require,exports) {
    "use strict"
    /**
     * 检测主站登陆
     */
    function checkLoginZhubajie() {
        if (require('common/utils/utils').isOnlyLoginZhubajie()) {
           require("./login-kuaiyin")()
        }
    }

    function init() {
        checkLoginZhubajie()
    }
    init()
})
