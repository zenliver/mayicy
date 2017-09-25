/**
 *  登出
 *  @author liuwencheng
 *  @date 14-4-14
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery')


    //url: "https://login."+global.zbj_domain+"/login/dologin",
    exports.logout = function (){
        //$.get("https://login."+global.zbj_domain + "/login/dologout")
/*        $.get("https://login.t6.zbj.com/login/dologout")
        .done(function(data){
            console.log(data)
        })*/
        $.get("/ajax/logout").done(function(json){
            if (json && json.code === 200){
                location.href = "https://login."+global.zbj_domain+"/login/DoLogout?fromurl=http://kuaiyin."+global.zbj_domain
            }
        })
    }
})