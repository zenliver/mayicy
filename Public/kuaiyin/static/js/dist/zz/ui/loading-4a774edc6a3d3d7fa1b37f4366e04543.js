define("zz/ui/loading",["./Dialog","http://www.mayicy.cn/Public/kuaiyin/static/js/dist/zz/ui/jquery.tmpl","jquery.easing","zz/utils/objs","zz/utils/types","zz/core/Class","zz/utils/asserts","zz/ui/base/Panel","zz/plugins/actionMap","jquery/jquery/1.7.2/jquery","./Mask"],function(a){"use strict";var b=a("./Dialog");return function(a){var c=new b({hasTitle:!1,hasClose:!1,hasFoot:!1,hasMask:!0,innerHTML:"<p class='ui-loading-msg'><i></i>"+a+"</p>",className:"ui-loading",isAnim:!1});return c.open(),c}});