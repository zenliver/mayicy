define("diy/checkBrowser",["zz/ui/alert","zz/ui/Dialog","jquery/jquery/1.7.2/jquery"],function(a){"use strict";function b(){return d.browser.msie&&d.browser.version<8?(c("亲，您的IE浏览器版本太低请升级或者使用谷歌火狐等非ie浏览器!! 如果使用360浏览器或者搜狗浏览器请切换到极速模式！！"),global.diyLoading&&global.diyLoading.close(),!1):!0}var c=a("zz/ui/alert"),d=a("jquery/jquery/1.7.2/jquery");return b()});