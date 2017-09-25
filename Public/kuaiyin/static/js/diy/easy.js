/**
  * 简单版diy
  * @author by liuwencheng
  * @date 2013-7-16
  */
define(function(require,exports) {
    "use strict"
    require('zz/plugins/input')
    var $ = require('jquery')
        ,objs = require('zz/utils/objs')
        ,Canvas = require('./models/CanvasClass')
        ,alert = require('zz/ui/alert')
        ,info = require('zz/ui/info')
        ,confirm = require('zz/ui/confirm')
    var meanList = require("./canvasDataControl").getMeanList(global.content.type)
    var Selector = require('./models/SelectorClass')
    var ColorPicker = require('zz/ui/Color2Picker')
    var colorPicker = new ColorPicker()
    var userActions = require("./common/userActions")
    var cutter = require('./common/cutter')

    /**
     * @private
     */
    var canvasArr = []
        ,loadingPanel       //加载提示窗
        ,isFormInput = false    //表单是否处于编辑状态
    var maxWidth = 500//685 //右侧画布最大宽度
    var easySelector = new Selector({
            "isEasy": true,
            "isMultiInput": false, //不允许多行输入
            isTextType: false
        })
    var oldInputDatas = []

    /**
     * 监听表单变化
     * @param {$} 当前canvas对应的$form表单
     */
    function _listenFormInput($form) {
        //添加
        var $inputs = $form.find('input')
            ,$texts = $('#canvasList').find('[data-type=diy_text]')
        $inputs.onInput(function(e){
            var $cookie = $("#cookieLabel").find("input")[0]
            if ($cookie) $cookie.checked = false
            _changeElemText($(this))
            e.preventDefault()
            e.stopPropagation()
        })
        .focusin(function(e){
            var mean = $(this).data('mean')
                ,index = $(this).data('index')
                ,canvasIndex = $(this).parent().data('index')
                    ,$sele
            isFormInput = true  //表单处于编辑状态
            //$texts.removeClass('diy-text-select')
            $sele = canvasArr[canvasIndex].childElems[index] //.addClass('diy-text-select')
            easySelector.seleElem($sele)
            e.preventDefault()
            e.stopPropagation()
        })
        .focusout(function(e){
            isFormInput = false
            //$texts.removeClass('diy-text-select')
            //easySelector.cancelSele()
            e.preventDefault()
            e.stopPropagation()
        })
    }

    /**
     * @param {$} 指定的输入元素
      */
    function _changeElemText($input, noEmit) {
        var mean = $input.data('mean')
            ,val = $input.val()
            ,index = $input.data('index')
            ,canvasIndex = $input.parent().data('index')
            ,curCanvas = canvasArr[canvasIndex]
            ,$elem = curCanvas.childElems[index].attr('data-content',val)
        !noEmit && curCanvas.emitChange($elem)
        return $elem
    }

    /**
     * canvasChange
     * @param {Number} canvas索引
     * @param {String} "edit" || "add" || "del"
     * @param {Array} 改变的数组
     */
    function onCanvasChange (index, type, $arr) {
        if (! isFormInput) {
            updateFormList(index)  //todo效率低下
        }
    }

    /**
     * 监听tab
     */
    function listenTab() {
        var $cookieLabel
        $('#easyDiyTab').children('li').on("mousedown", function(e){
            var index = $(this).data('tabIndex')
            selectCanvas(index)
        })
        /** 选中元素 **/
        $('#canvasList').children().css("cursor","pointer").on('mousedown.seleCanvas', function(e){
            var $target = getCanvasTarget(e)
            selectCanvas($(this).data('index'))
            if ($target) {
                //selectCanvas($target.parent().data('index'))
                easySelector.seleElem($target, e, true)//true表示选择时候直接触发拖拽
            } else {
                easySelector.cancelSele()
            }
            console.log('canvas click')
            e.stopPropagation()
            e.preventDefault()
        })
        //点击空白地方关闭
        var $workArea = $(".design-right")
        var workLeft = $workArea.offset().left + 50
        var workRight = workLeft + $workArea.width() - 50
        $(document.body).on("mousedown", function(e){
            console.log('document click')
            if (colorPicker.isOpen()) return
            //没有选择任何东西
            if (e.target.tagName.toLowerCase() !== "input"
                && (e.clientX < workLeft || e.clientX >= workRight)
            ) easySelector.cancelSele();
        })
        $("#diyToolBox").on("mousedown", function(e){
            e.stopPropagation() //阻止触发body
        })
        //添加自动填写功能
        if (userActions.getCookie().length !== 0) {
            $cookieLabel = "<label id='cookieLabel'><input type='checkbox' class='mr5'>自动填写</label>"
            $(".design-editor-form").append($cookieLabel)
            $("#cookieLabel").find("input").change(function(){
                if($(this)[0].checked) {
                    loadCookie()
                } else {
                    unLoadCookie()
                }
            })
        }
    }

    /**
     * 获取鼠标点击时候的元素,若是没有返回false
     * @param {Object} jquery event 事件
     */
    function getCanvasTarget (e) {
        var $target = $(e.target)
        var type = $target.data('type')
                ,type1,type2
        //获取$target
        if (!type && (type1 = $target.parent().data('type'))) {
            type = type1
            $target = $target.parent()
        } else if(!type && (type2 = $target.parent().parent().data('type'))) {
            type = type2
            $target = $target.parent().parent()
        }
        //控制选择
        if(type && ([
            'diy_photo',
            'diy_frame',
            'diy_text',
            'diy_decorate',
            'diy_model',
            'diy_line'
        ].indexOf(type)+1)) {
            return $target
        } else {
            return false
        }

    }
    /**
     * 加载模版
      */
    function loadTemplate () {
        var tpl = "<li class='pr design-rc-item'><div class='diy-canvas'></div></li>"
        var content = global.content
        var type = content.type
        content.pages.forEach(function(item,index) {
            var $wrap,canvas,$form, zoomRatio
            $wrap = $(tpl).attr('data-index', index)
            $form = $('<li data-index='+index+'></li>')
            $('#canvasList').append($wrap)
            $('#formList').append($form)
            if(index === 0) $form.addClass('select')
            //var $cutter = cutter.createCutter($wrap)
            canvas = new Canvas($wrap.children('.diy-canvas'),
                                {
                                    type:type,
                                    index:index,
                                    showLimitRect: true,
                                    hasCutter: true
                                }) //创建
            canvas.loadCanvasData(item, index)
            zoomRatio = maxWidth / canvas.canvasSize.pxWidth
            canvas.zoom(zoomRatio) //缩放
            //cutter.updateCutter($cutter,canvas)
            canvas.onChange(function(type, $arr){
                onCanvasChange(index, type, $arr)
            })
            canvasArr.push(canvas)
            updateFormList(index)
        })
        selectCanvas(0) //选择第一张
    }

    /**
     * 选择画布
     */
    function selectCanvas (index) {
        $('#canvasList').children().removeClass('select').eq(index).addClass('select')
        $('#easyDiyTab').children().removeClass('select').eq(index).addClass('select')
        $('#formList').children().removeClass('select').eq(index).addClass('select')
        easySelector.seleCanvas(canvasArr[index])
    }

    /**
     * 为表单添加input元素, 并对齐进行从上到下排序(根据元素top值)
     * @param {param} canvas索引
      */
    function updateFormList(index) {
        var sortElems //排序之后的节点数组
        var canvas = canvasArr[index]
        var $form = $('#formList').children().eq(index)
        var $photoWrap
        //-排序
/*        sortElems = canvas.childElems.slice().sort(function(e1,e2){
            return e1.attr('data-top') - e2.attr('data-top')
        })*/
        sortElems = canvas.childElems.slice() //不排序
        $form.html("<p>Logo 或 图片 ：</p><div class='design-form-photos-wrap fn-clear'></div>")
        $photoWrap = $form.find('.design-form-photos-wrap')

        //-创建input
        sortElems.forEach(function($elem){
            var type = $elem.attr('data-type')
            var index = $elem.attr('data-index')
            if(type === "diy_text") {
                var mean = $elem.attr('data-mean')
                var mean_ch = meanList[mean]
                $form.append("<p>"+mean_ch+"：</p><input type='text' data-mean="+mean+" data-top="+$elem.attr('data-top') + " data-index="+index+" value='"+$elem.attr('data-content')+"'>")
            } else if (type === "diy_photo" || type === "diy_logo") {
                var $imgWrap = $("<div class='pr'><div class=\'actions\'><a data-action=\"photo-replace\"  data-index=\""+index+"\">替换</a><a data-action=\"photo-del\" data-index=\""+index+"\">删除</a></div><img src=\'"+$elem.find('img').attr('src')+"'/></div>")
                $photoWrap.append($imgWrap)
                var width = $elem.attr('data-width')
                var height = $elem.attr('data-height')
                var newSize = require("zz/utils/utils").ratioImg(width, height, $imgWrap.width(), $imgWrap.height())
                //设置居中
                $imgWrap.find('img').css({
                    position: "absolute",
                    width: newSize[0],
                    height: newSize[1],
                    top: "50%",
                    left: "50%",
                    marginTop: - newSize[1] / 2,
                    marginLeft: - newSize[0] / 2

                })
            }
        })
        $photoWrap.append("<div class='add-wrap'><a title='添加图片'data-action='photo-add'>+</a></div>")
        $form.append("<div class='mt15'><a class='ui-button ui-button-lorange' data-action='text-add'>添加文字</a></div>")
        _listenFormInput($form)
        //console.log(meanList)
    }

    /**
     * 保存之前页面的数据
     */
    function _saveOldInputData () {
        oldInputDatas = []
        $('#formList').children().each(function(index){
            var arr = oldInputDatas[index] = []
            $(this).children('input').each(function(i){
                arr[i] = $(this).val()
            })
        })
    }

    /**
     * 不加载cookie值
     */
    function unLoadCookie() {
        $('#formList').children().each(function(index){
            var arr = oldInputDatas[index]
            var $elemArr = []
            $(this).children('input').each(function(i){
                $(this).setInputVal(arr[i])
                $elemArr.push(_changeElemText($(this), true))
            })
            canvasArr[index].emitChange($elemArr) //触发所有元素， 注：不能单个触发
            easySelector.cancelSele()
        })
    }

    /**
     * 加载cookie中的用户数据
     */
    function loadCookie() {
        var diyCookieData = userActions.getCookie()
        console.log(diyCookieData)
        var $formList = $('#formList').children()
        _saveOldInputData()
        addInputData(diyCookieData.slice().reverse()) //先逆向加载数据, 保证背面也能读取正面数据
        addInputData(diyCookieData)
        function addInputData(arr) {
            arr.forEach(function(item,index){
                var $elemArr = []
                $formList.eq(index).children('input').each(function(){
                    var mean = $(this).attr('data-mean')
                    if(item[mean]) {
                        $(this).setInputVal(item[mean])
                        $elemArr.push(_changeElemText($(this), true))
                    }
                })
                canvasArr[index].emitChange($elemArr) //触发所有元素，注：不能单个触发
                easySelector.cancelSele()
            })
        }
    }

    /**
     * 保存数据
     */
    function save (e, doneCb, noInfo) {
        var $save = $('#easySave')
        if ($save.hasClass('ui-button-ldisable')) return
        $save.addClass('ui-button-ldisable').text('保存中..')
        userActions.save({
            canvasArr: canvasArr,
            doneCb: doneCb,
            alwaysCb: function(){
                $save.removeClass('ui-button-ldisable').text('保存')
            },
            noInfo: noInfo
        })
    }

    function _buy(){
        userActions.buy(function(){
            $('#easyBuy').removeClass('ui-button-ldisable').text('下单印刷')
            loadingPanel.close()
        })
    }
    /**
     * 购买
     */
    function buy (e) {
        loadingPanel = require('zz/ui/loading')('正在下单，请耐心等待。。。')
        var $buy = $('#easyBuy')
        if($buy.hasClass('ui-button-ldisable')) return
        $buy.addClass('ui-button-ldisable').text('下单中..')
        save(e, _buy, true)
    }
    function initSomeClick() {
        var loginDialog = require('common/login-dialog').loginDialog,
            isLogin = require('common/utils/utils').isLogin;
        //loadCookie()
        //unLoadCookie()
        $('#easySave').click(function(e){
            if(!isLogin()){
                return loginDialog();
            }
            return save.call(this, e);
        });
        $('#easyBuy').click(function(e){
            //confirm("请确定您填写的内容无误，并保证重要内容在虚线以内！！", function(){ buy(e) })
            if(!isLogin()){
                return loginDialog();
            }
            require('./common/preview').open(canvasArr, easySelector.canvas.index, true, function () {
                buy(e)
            }, "请确保您填写的内容无误，点击确定下单印刷!! ")
        })
        if(!/[?&]iframe=1(&|$)/.test(location.href)){
            $('.design-right').append('<div class="diy-design-room"><a id="designRoom" class="ui-button ui-button-lred">进入设计专业版</a></div>')
        }
        $('#designRoom').click(function(e){
            $(this).addClass('ui-button-ldisable')
            save(null, function(){
                var product_value = global.product_id ? '/id/' + global.product_id : '';
                var template_value = global.user_template_id ? '/design_id/' + global.user_template_id : '';
                var generic_value = global.generic_id ? '/generic_id/' + global.generic_id : '';
                location.href = "../../../../../Goods/major.htm"/*tpa=http://www.mayicy.cn/Goods/major*/ + product_value + template_value + generic_value;
            },true)
            e.stopPropagation()
            e.preventDefault()
        })
    }

    exports.init = function() {
        $('.design-editor').prepend("<p id='easyEditorTip' style='color:#aaa;padding:0 0 15px'>友情提示：套用模板和印刷实物可能会因为屏幕显示关系有轻微色差。</p>")
        loadTemplate()
        listenTab()
        if( ! global.is_preview) {
            initSomeClick()
        }
        require('./easyTools').init(easySelector, canvasArr)
    }

})
