/**
 * 类型切换
 * @author by liuwencheng
 * @date 2013-12-16
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery')
    var tree = require('./filterCategoryTree')
    /**
     * 显示
    */
    function showTip ($target, hoverTip) {
        var $tip = $("<div class='diy-cat-tip'></div>").appendTo($target)
        var tpl = "<a href='{{href}}' target='_blank'>{{cn_name}}</a>"
        switch (hoverTip) {
            case "category":
                tree.forEach(function(cat){
                    var $nextTip, nextHtml = "", $a
                    if (cat.en_name === $target.attr('data-name')) return
                    $a = $(tpl
                        .replace('{{cn_name}}', cat.cn_name)
                        .replace("{{href}}","javascript:;"))
                    $a.appendTo($tip)
                    //子标签
                    if (cat.childrens && cat.childrens.length !== 0) {
                        $nextTip = $('<div class="diy-cat-tip-next"></div>').appendTo($a)
                        cat.childrens.forEach(function(child){
                            var href = "http://www.mayicy.cn/design/"+cat.id+"/"+child.id+"/create"
                            nextHtml += tpl.replace('{{cn_name}}', child.cn_name).replace("{{href}}", href)
                            $nextTip.html(nextHtml)
                        })
                    }
                })
                break
            case "product":
                tree.forEach(function(cat){
                    var cat_en_name = $target.attr('data-parent-name')
                    var html = ""
                    if (cat_en_name === cat.en_name && cat.childrens && cat.childrens.length !== 0) {
                        cat.childrens.forEach(function(child){
                            if (child.en_name === $target.attr('data-name'))  return
                            var href = "http://www.mayicy.cn/design/"+cat.id+"/"+child.id+"/create"
                            html += tpl.replace('{{cn_name}}', child.cn_name).replace("{{href}}", href)
                            $tip.html(html)
                        })
                    }
                })
                break
        }
        if ($tip.html() !== "") {
            $tip.show()
                .css("left", $target.position().left - $tip.width() / 2 + $target.width() / 2) //居中
        } else {
            $tip.hide()
        }
    }
    /**
     * 隐藏
     */
    function hideTip ($target) {
        $target.find('.diy-cat-tip').remove()
    }

    function init() {
        //showTip($("#diyTypeData").find('[data-hover=category]'), 'category')
        //显示类别下拉框
        $("#diyTypeData").find('[data-hover=category]').hover(function () {
            showTip($(this), "category")
        }, function(){
            hideTip($(this))
        }).end()
        //显示产品下拉框
        .find('[data-hover=product]').hover(function(){
            showTip($(this), "product")
        }, function(){
            hideTip($(this))
        })
    }
    init()
})