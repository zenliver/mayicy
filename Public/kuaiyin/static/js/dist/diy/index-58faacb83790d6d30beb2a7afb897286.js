define("diy/index", ["http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui", "jquery.transform", "jquery.easing", "jquery/jquery/1.7.2/jquery", "zz/ui/alert", "zz/ui/Dialog", "diy/canvasControl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "diy/toolControl", "zz/plugins/actionMap", "jquery.mousewheel", "arale/cookie/1.0.2/cookie", "zz/ui/base/Panel", "zz/utils/keyCode", "zz/utils/loadImgs", "zz/utils/utils", "zz/ui/loading", "diy/common/userActions", "diy/common/preview", "zz/ui/Range", "diy/resizeControl", "diy/leftControl", "zz/plugins/uploadFile", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full", "zz/ui/Tabs", "diy/materialControl", "diy/config/configStaticData", "diy/dropControl", "diy/otherControl", "zz/plugins/input", "zz/utils/lazyDo", "./configPanel", "./canvasControl", "zz/ui/plugins/state", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/utils/asserts", "./models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.color", "zz/extends/single", "./models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/utils/colorConvert", "./config/canvasStaticData", "./canvasDataControl", "zz/ui/Mask", "zz/ui/info", "common/submitDesignDialog", "zz/utils/beforeUnload", "./config/configStaticData", "./models/CanvasClass", "./models/HistoryClass", "./models/canvasJsonWrap", "diy/config/canvasStaticData", "./common/cutter", "./dropControl", "./toolControl", "./common/userActions", "./common/preview", "./leftControl", "./diyGuide", "zz/ui/MaskRect", "./photoshopDemoDlg", "./categoryTab", "./filterCategoryTree", "zz/utils/stopSelect"],
function (a) {
    function b() {
        global.isAPP || (global.require = d.noop),
		/\bMSIE [8]\.0\b/.test(navigator.userAgent) && e("您的IE浏览器版本为ie8, 如果想有更好的体验建议升级浏览器，或者使用谷歌火狐等非ie浏览器"),
		console.log("done"),
		a("diy/canvasControl"),
		a("diy/toolControl"),
		a("diy/resizeControl"),
		a("diy/leftControl"),
		a("diy/materialControl"),
		a("diy/dropControl"),
		a("diy/otherControl"),
		a("./configPanel"),
		a("./diyGuide"),
		a("./photoshopDemoDlg"),
		a("./categoryTab"),
		a("zz/utils/beforeUnload").bind(),
		a("zz/utils/stopSelect").init(),
		setTimeout(function () {
		    d("#diyTip").fadeOut()
		},
		3e4),
		global.diyLoading && global.diyLoading.close(),
		c()
    }
    function c() {
        a("zz/plugins/focusRect");
        var b = a("zz/utils/utils").getUrlData("a");
        if ("1" == b) {
            var c = d('<span style="color:red;padding-left:5px;border:2px solid red">亲把照片的亮度调高点再上传哦！这样印刷效果才会好，不会太暗~~</span>');
            d("#diyLeftContent").find("[data-item=diy_logo]").find(".info").append(c),
			c.focusRect(),
			setTimeout(function () {
			    c.unFocusRect(),
				c.css("border", "2px solid red")
			},
			1e4)
        }
    }
    a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui"),
	a("jquery.transform"),
	a("jquery.easing");
    var d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/ui/alert");
    b()
}),
define("diy/canvasControl", ["http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/ui/plugins/state", "jquery/jquery/1.7.2/jquery", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/utils/asserts", "zz/ui/confirm", "zz/ui/Dialog", "./models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/extends/single", "./models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "./config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "./canvasDataControl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "./config/configStaticData", "./models/CanvasClass", "./models/HistoryClass", "./models/canvasJsonWrap", "diy/canvasDataControl", "diy/config/canvasStaticData", "./common/cutter"],
function (a) {
    "use strict";
    a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl"),
	a("zz/ui/plugins/selectable");
    var b = a("zz/core/Class"),
	c = (a("zz/utils/objs"), a("zz/ui/confirm")),
	d = a("./models/SelectorClass"),
	e = a("./models/CanvasClass"),
	f = a("jquery/jquery/1.7.2/jquery"),
	g = new (a("zz/ui/Color2Picker")),
	h = a("./canvasDataControl"),
	i = b().defState("CHANGE_CANVAS").attr({
	    THUMB_MAX_HEIGHT: 45,
	    THUMB_MIN_WIDTH: 55
	}).init(function () {
	    this._type = h.getTypeName(global.category_en_name, global.product_en_name),
		this._canvasArr = [],
		this._selector,
		this._$thumbList = f('<ul class="fn-clear"></ul>').appendTo(f("#diyPageList")),
		this._$canvasList = f("#diyCanvasList"),
		this._curIndex,
		this._createSelector(),
		this._createPageList(),
		this.seleCanvas(0),
		this._listenEvents(),
		this._listenCanvasMultiSele(),
		this._loadTemplate()
	}).method({
	    _createSelector: function () {
	        var a = {
	            isMultiInput: "card_commerce" === this._type ? !1 : !0
	        };
	        this._selector = new d(a)
	    },
	    _createPageList: function (a) {
	        var b, c, d = h.getSizeArr(this._type)[0];
	        this._$thumbList.width(20),
			b = global.content ? global.content.pages.length : h.defaultPageCount(this._type),
			a = a || b;
	        for (var e = 0; a > e; e++) c = this._createCanvas(e, d),
			this._createThumb(e, c, a);
	        2 === a ? (f("#diyPageList").css("overflow", "hidden"), this._$thumbList.css("width", "100%")) : f("#diyPageList").css("overflow-x", "scroll")
	    },
	    _listenEvents: function () {
	        var a = this;
	        this._canvasArr.forEach(function (b, c) {
	            var d = a._$thumbList.children().eq(c).children(".page-container");
	            b.onChangeClone(d)
	        }),
			this._$thumbList.actionMap({
			    selePage: function () {
			        var b = +f(this).attr("data-index");
			        a.seleCanvas(b),
					f(window).trigger("resize")
			    }
			})
	    },
	    _createCanvas: function (a, b) {
	        var c, d = f("#canvasTemplate").tmpl(),
			g = {
			    type: this._type,
			    index: a,
			    showLimitRect: !1,
			    overflowShow: global.isUser ? !1 : !0,
			    hasCutter: !0,
			    hasRadius: h.hasRadius(this._type),
			    canvasSize: h.toSizeDetailData(b),
			    hasSplitLine: h.hasSplitLine(this._type),
			    bianma: h.getBianmaData(this._type),
			    citiao: h.getCitiaoData(this._type)
			};
	        return this._$canvasList.append(d),
			c = new e(d.children(".diy-r-canvas"), g),
			this._canvasArr.push(c),
			c
	    },
	    _createThumb: function (a, b, c) {
	        var d, e, g, h = f("#pageTemplate"),
			i = b.canvasSize,
			j = b.opts.hasRadius,
			k = 0;
	        if (2 === c) 0 === a && (d = h.tmpl({
	            pageIndex: "正面"
	        })),
			1 === a && (d = h.tmpl({
			    pageIndex: "反面"
			}));
	        else {
	            var l = Math.round((a + 1) / 2),
				m = a % 2 === 0 ? "正面" : "反面";
	            d = h.tmpl({
	                pageIndex: "第" + l + "页" + m
	            }),
				a % 2 !== 0 && (d.css("margin-right", 25), k = 20)
	        }
	        this._$thumbList.append(d),
			e = this.THUMB_MAX_HEIGHT / i.pxHeight,
			d.width(i.pxWidth * e < this.THUMB_MIN_WIDTH ? this.THUMB_MIN_WIDTH : i.pxWidth * e).height(i.pxHeight * e).attr("data-index", a),
			g = d.children(".page-container"),
			g.width(i.pxWidth * e).height(i.pxHeight * e).data("thumbScale", e),
			j && d.css("border-radius", "14px"),
			this._$thumbList.width(this._$thumbList.width() + i.pxWidth * e + 12 + k)
	    },
	    getSeleCanvas: function () {
	        return this._canvasArr[this._curIndex]
	    },
	    seleCanvas: function (a) {
	        var b;
	        if (!(0 > a || a >= this._canvasArr.length) && this._curIndex !== a) {
	            b = this._canvasArr[a],
				this._curIndex = a,
				this._$canvasList.find(".diy-r-canvas").each(function (b) {
				    b === a ? f(this).parent().addClass("select") : f(this).parent().removeClass("select")
				}),
				this._selector.seleCanvas(b);
	            var c = f("#diyToolPanel").children(".ui-range").attr("data-value") / 100;
	            b.zoom(c || .6),
				this._$thumbList.children().removeClass("select").eq(a).addClass("select"),
				b.updateCutterByAnim(),
				this._isCreateDom ? this._updateDomData() : this._createDomData(),
				this.triggerState("CHANGE_CANVAS")
	        }
	    },
	    _createDomData: function () {
	        var a, b = this.getSeleCanvas().canvasSize,
			c = b.mmWidth,
			d = b.mmHeight,
			e = b.mmBlood,
			g = "<a data-hover='category' data-name='${category_en_name}'>${category_cn_name}</a> <span>&gt;</span> <a data-hover='product' data-parent-name='${category_en_name}' data-name='${product_en_name}'>${product_cn_name}</a> <span>&gt;</span> <span id='diyHeadSize'>${size}毫米</span>";
	        f("#diyBgData").html("尺寸：" + c + "*" + d + "毫米"),
			c -= 2 * e,
			d -= 2 * e,
			a = f.tmpl(g, {
			    category_cn_name: global.category_cn_name,
			    product_cn_name: global.product_cn_name,
			    category_en_name: global.category_en_name,
			    product_en_name: global.product_en_name,
			    size: c + "*" + d
			}),
			f("#diyTypeData").html(a),
			this._isCreateDom = !0
	    },
	    _updateDomData: function () {
	        var a = this.getSeleCanvas().canvasSize,
			b = a.mmWidth,
			c = a.mmHeight,
			d = a.mmBlood;
	        f("#diyBgData").html("尺寸：" + b + "*" + c + "毫米"),
			b -= 2 * d,
			c -= 2 * d,
			f("#diyHeadSize").html(b + "*" + c + "毫米")
	    },
	    _listenCanvasMultiSele: function () {
	        var a = this,
			b = f("#diyWorkArea");
	        b.find(".diy-r-canvas").each(function () {
	            f(this).on("mousedown.canvasSelect",
				function (b) {
				    var c, d, h = f(b.target),
					i = h.data("type"); !i && (c = h.parent().data("type")) ? (i = c, h = h.parent()) : !i && (d = h.parent().parent().data("type")) && (i = d, h = h.parent().parent()),
					i && ~e.TYPE_LIST.indexOf(i) ? (a._selector.seleElem(h, b, !0), f(this).selectable2({
					    isCancel: !0
					})) : (a._selector.cancelSele(), f(this).selectable2({
					    isCancel: !1
					})),
					g.close(),
					b.stopPropagation(),
					b.preventDefault()
				}).selectable2({
				    ignoreClass: "diy-background",
				    seleClass: "diy-elem",
				    endFn: function () {
				        a._selector.seleMoreElems(this.getSeleArr())
				    }
				})
	        }),
			b.selectable2({
			    ignoreClass: "diy-background",
			    seleClass: "diy-elem",
			    scopeElem: b.find(".diy-r-canvas"),
			    startFn: function () {
			        g.close()
			    },
			    endFn: function () {
			        a._selector.seleMoreElems(this.getSeleArr())
			    }
			})
	    },
	    getSelector: function () {
	        return this._selector
	    },
	    getCanvasArr: function () {
	        return this._canvasArr
	    },
	    _loadTemplate: function () {
	        var a = this;
	        if (global.content) a._canvasArr.forEach(function (b, c) {
	            b.loadCanvasData(global.content.pages[c]),
				a._revertThumb(c)
	        });
	        else {
	            var b = h.getDemoArr(this._type)[0];
	            b && a._canvasArr.forEach(function (a, c) {
	                b.pages[c] && a.loadCanvasData(b.pages[c])
	            })
	        }
	    },
	    _clear: function () {
	        this._$canvasList.empty(),
			this._$thumbList.empty(),
			this._canvasArr.length = 0,
			this._$thumbList.unActionMap(),
			this._curIndex = null
	    },
	    changePage: function (a, b) {
	        return a === this._canvasArr.length ? !1 : void c("改变画布页数之后画布上的所有数据将丢失!!",
			function () {
			    this._clear(),
				this._createPageList(a),
				this.seleCanvas(0),
				this._listenEvents(),
				this._listenCanvasMultiSele(),
				b && b()
			}.bind(this))
	    },
	    revertCanvas: function (a) {
	        var b, d;
	        this._curIndex % 2 === 0 ? (b = this._curIndex, d = this._curIndex + 1) : (b = this._curIndex - 1, d = this._curIndex),
			c("旋转画布之后将丢失画布上已有的数据！！",
			function () {
			    this._canvasArr[b].revertCanvas(a),
				this._canvasArr[d].revertCanvas(a),
				this._revertThumb(b),
				this._revertThumb(d),
				this._updateDomData(),
				f(window).resize()
			}.bind(this))
	    },
	    _revertThumb: function (a) {
	        var b = this._canvasArr[a].canvasSize,
			c = this._$thumbList.children().eq(a),
			d = this.THUMB_MAX_HEIGHT / b.pxHeight,
			e = c.width(),
			f = b.pxWidth * d,
			g = b.pxHeight * d;
	        c.width(f > this.THUMB_MIN_WIDTH ? f : this.THUMB_MIN_WIDTH).height(g),
			c.children(".page-container").width(f).height(g).data("thumbScale", d),
			this._$thumbList.width(this._$thumbList.width() + c.width() - e)
	    },
	    getType: function () {
	        return this._type
	    }
	});
    return new i
}),
define("diy/models/SelectorClass", ["zz/ui/plugins/draggable2", "zz/ui/plugins/state", "jquery/jquery/1.7.2/jquery", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/utils/asserts", "zz/extends/single", "./selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "../config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "zz/ui/Dialog", "../canvasDataControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/ui/confirm", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "../config/configStaticData"],
function (a) {
    "use strict";
    a("zz/ui/plugins/draggable2"),
	a("zz/ui/plugins/resizable2"),
	a("zz/ui/plugins/rotable2"),
	a("jquery.transform"),
	a("zz/plugins/actionMap"),
	a("jquery.color");
    var b, c = a("zz/core/Class"),
	d = a("zz/extends/single"),
	e = a("jquery/jquery/1.7.2/jquery"),
	f = a("./selectorToolWrap"),
	g = (a("zz/utils/loadImgs.js"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/zz/utils/loadImgs.js*/), a("zz/utils/types"), a("zz/ui/alert"), 20),
	h = ["../../../../../../diy/logos/black.png"/*tpa=http://www.mayicy.cn/diy/logos/black.png*/, "../../../../../../diy/logos/white.png"/*tpa=http://www.mayicy.cn/diy/logos/white.png*/, "../../../../../../diy/logos/dragPhoto.jpg"/*tpa=http://www.mayicy.cn/diy/logos/dragPhoto.jpg*/],
	i = c().defState("SELECT_ELEM", "SELECT_CANCEL").attr({
	    DEFAULT_OPTS: {
	        isEasy: !1,
	        isMultiInput: !0,
	        isTextType: !0
	    }
	}).init(function (a) {
	    this._opts = e.extend({},
		this.DEFAULT_OPTS, a),
		this.canvas,
		this.container,
		this._createSeleBox(),
		this.$rect = e("#diySelector"),
		this.$toolBox = e("#diyToolBox"),
		this.$sele = null,
		this.$seleArr = [],
		this._loadToolsData(),
		this.isEasy = this._opts.isEasy,
		this.$textarea,
		this._initInputTextArea(),
		e("#textMean").before('<a href="javascript:;" data-part="text" data-action="textCenterX" title="居中对齐" class="diy-tb-item center-x">文本块居中</a>\n')
	}).method({
	    cancelSele: function () {
	        var a = this.$sele;
	        if (a) switch (a.data("type")) {
	            case "diy_text":
	                var b = this.$textarea;
	                if (b.data("isEdit")) return a.attr("data-content", b.val().trim()),
                    a.attr("data-old-val") !== a.attr("data-content") && this.canvas.emitChange(a),
                    b.data("isEdit", !1),
                    void b.parent().hide();
	                break;
	            case "diy_frame":
	                this._hideController()
	        }
	        this.triggerState("SELECT_CANCEL"),
			this.$sele = null,
			this.$seleArr.length = 0,
			this.$rect.hide(),
			this.$toolBox.hide()
	    },
	    _loadToolsData: function () {
	        this._loadMeans(),
			this._loadFonts()
	    },
	    _loadMeans: function () {
	        var b, c, d = [],
			f = "<option value='{{key}}'>{{name}}</option>";
	        b = global.category_en_name && global.product_en_name ? a("../canvasDataControl").getMeanList(global.category_en_name, global.product_en_name) : a("../canvasDataControl").getMeanList(global.content.type, global.product_en_name);
	        for (var g in b) c = "-1" !== g ? b[g] : "选择文本类别",
			d.push(f.replace("{{name}}", c).replace("{{key}}", g));
	        e("#textMean").html(d.join(""))
	    },
	    _loadFonts: function () {
	        var b = "",
			c = "<option value='{{key}}'>{{name}}</option>",
			d = a("../config/configStaticData").fonts;
	        for (var f in d) b += c.replace("{{name}}", d[f]).replace("{{key}}", f);
	        e("#textFontFamily").html(b)
	    },
	    isEdit: function () {
	        return this.$textarea.data("isEdit")
	    },
	    seleCanvas: function (a) {
	        this.cancelSele(),
			this.canvas = a;
	        var b = this.$toolBox;
	        this.canvas.isAddState || (this.canvas.history.onState("TEXT_IMG_LOADED",
			function () {
			    this.updateRect()
			}.bind(this)), this.canvas.onState("UP_ENABLE",
			function (a) {
			    a ? b.find("[data-action=up]").removeClass("disabled") : b.find("[data-action=up]").addClass("disabled")
			}), this.canvas.onState("DOWN_ENABLE",
			function (a) {
			    a ? b.find("[data-action=down]").removeClass("disabled") : b.find("[data-action=down]").addClass("disabled")
			}), this.canvas.isAddState = !0),
			this.container = a.container
	    },
	    _setTextInput: function () {
	        console.log("click");
	        var a, b = this.$sele;
	        if (b && "diy_text" === b.data("type")) {
	            var c = this.$textarea,
				d = b.attr("data-content").trim(),
				e = b.offset();
	            return b.attr("data-old-val", d),
				c.data("isEdit", !0),
				c.parent().show().css({
				    left: e.left,
				    top: e.top
				}),
				a = c.next(),
				0 !== a.length && (a.css({
				    top: 0,
				    opacity: 0
				}).animate({
				    top: a.data("top"),
				    opacity: 1
				},
				500), a.data("isAddTimeOut") || (setTimeout(function () {
				    a.remove()
				},
				1e4), a.data("isAddTimeOut", !0))),
				c.attr({
				    "data-sele-width": b.width(),
				    "data-sele-height": b.height(),
				    "data-sele-left": e.left,
				    "data-sele-top": e.top
				}).width(this._getTextAreaWidth(d)).height(this._getTextAreaHeight(d)).val(d).focus().select(),
				"center" === this.$sele.attr("data-text_align") ? c.css("text-align", "center") : c.css("text-align", "left"),
				this.$rect.hide(),
				void this.$toolBox.hide()
	        }
	    },
	    isTextMultiLine: function () {
	        var a = this.$sele;
	        if (a && "diy_text" === a.data("type")) {
	            var b = a.attr("data-content").trim();
	            return 1 !== b.split("\n").length ? !0 : !1
	        }
	    },
	    _getTextAreaWidth: function (a) {
	        var c, d = 0,
			f = a.split("\n"),
			g = this.$textarea,
			h = g.parent();
	        return b || (b = e("<p>").appendTo(document.body).css({
	            position: "absolute",
	            left: 0,
	            top: 0,
	            "font-size": "14px",
	            "z-index": -100,
	            visibility: "hidden"
	        })),
			f.forEach(function (a) {
			    c = b.text(a.replace(/\s/g, "-")).width(),
				c > d && (d = c)
			}),
			d += 20,
			d < g.attr("data-sele-width") && (d = Math.round(g.attr("data-sele-width"))),
			h.css(d + parseInt(g.attr("data-sele-left")) + 15 > e(window).scrollLeft() + e(window).width() ? {
			    left: e(window).width() + e(window).scrollLeft() - d - 15
			} : {
			    left: g.attr("data-sele-left") + "px"
			}),
			d
	    },
	    _getTextAreaHeight: function (a) {
	        var b = a.split("\n").length * g,
			c = this.$textarea,
			d = this.$textarea.parent();
	        return b < c.attr("data-sele-height") && (b = Math.round(c.attr("data-sele-height"))),
			b + parseInt(c.attr("data-sele-top")) + 15 >= e(window).height() + e(window).scrollTop() ? (console.log(e(document.body).scrollTop()), d.css({
			    top: e(window).height() + e(window).scrollTop() - b - 15
			})) : d.css({
			    top: c.attr("data-sele-top") + "px"
			}),
			b
	    },
	    _initInputTextArea: function () {
	        var b, c, d = '<div class="pa none" style="z-index:10000;">\n<textarea type="text" style="position:absolute;left:0;top:0;background-color:#ddd;border:1px solid #aaa;padding:5px"></textarea>\n<div class="diy-tip" style="opacity: 0;color:red; background:#eee;width:245px;line-height:22px;text-align:left;height:48px;left:130px;top:0px">\n    {{content}}\n</div>\n</div>\n',
			f = this;
	        f._opts.isMultiInput ? (c = "<p>点击回车键可进行多行输入,点击esc 或 输入框外边可退出输入</p>\n", b = e(d.replace("{{content}}", c)).appendTo(document.body), b.find(".diy-tip").data("top", -49)) : (c = "<p>点击esc 或 输入框外边可退出输入</p>", b = e(d.replace("{{content}}", c)).appendTo(document.body), b.find(".diy-tip").data("top", -23).css({
	            height: 22
	        })),
			b = this.$textarea = b.find("textarea").css({
			    resize: "none",
			    "line-height": "19px",
			    overflow: "hidden"
			}),
			e(document).on("keydown.textedit",
			function (b) {
			    return f._opts.isMultiInput || b.keyCode != a("zz/utils/keyCode").get("enter") ? void 0 : void f.cancelSele()
			}),
			e(document).on("keyup.textedit",
			function (c) {
			    if (c.keyCode == a("zz/utils/keyCode").get("esc")) return f.cancelSele(),
				void c.preventDefault();
			    if (f.isEdit()) {
			        var d = f._getTextAreaHeight(b.val()),
					e = f._getTextAreaWidth(b.val());
			        b.height(d).width(e)
			    }
			})
	    },
	    updateRect: function () {
	        if (this.$sele) {
	            this.$rect.show(),
				this.$toolBox.show();
	            var a = this.$sele;
	            return this._setElemData(this.$rect, a),
				this._setToolBox(a.width(), a.height(), this.$rect.attr("data-rotate")),
				this
	        }
	        return 0 !== this.$seleArr.length ? (this.$rect.show(), this.$toolBox.show(), this._setBiggerRect(this.$seleArr), this._setToolBox(this.$rect.width(), this.$rect.height(), 0), this) : void 0
	    },
	    seleElem: function (a, b, c) {
	        this.cancelSele();
	        var d, e = (this.$rect, this);
	        if (a && a != this.$sele) {
	            this.$sele = a,
				this.$seleArr = [],
				this.triggerState("SELECT_ELEM"),
				this.updateRect();
	            var f = {
	                startFn: function (a, b) {
	                    e.updateRect(),
						d = e._getElemData(e.$rect),
						b.ratio = e.$rect.width() / e.$rect.height(),
						b.snapArr = e.canvas.getSnapArr(e.$sele),
						b.snapLen = e.isEasy ? 3 : 5
	                },
	                stepFn: function () {
	                    e._setElemData(e.$sele, e.$rect),
						e._checkSize(e.$sele),
						e._setToolBox(e.$sele.width(), e.$sele.height(), e.$rect.attr("data-rotate"))
	                },
	                endFn: function () {
	                    e._isChange(e.$rect, d) && (e.canvas.emitChange(e.$sele), e.updateRect(!1), e._checkSize(e.$sele, !0))
	                }
	            };
	            this.$rect.draggable2(f).draggable2({
	                dragScope: this.container,
	                snapAppendTo: this.container.parent()
	            }).resizable2(f).resizable2({
	                handlers: ["ne", "nw", "se", "sw", "s", "e", "w", "n"]
	            }).rotable2(f),
				"diy_text" === this.$sele.data("type") ? this.$rect.resizable2({
				    handlers: []
				}) : "diy_frame" === this.$sele.data("type") ? this._showDiyFrameController() : "diy_line" === this.$sele.data("type") && (this.$rect.unRotable2(), this.$rect.resizable2({
				    handlers: this.$rect.width() < this.$rect.height() ? ["n", "s"] : ["e", "w"]
				})),
				c && this.$rect.triggerDrag2(b)
	        }
	    },
	    seleMoreElems: function (a) {
	        var b = this,
			c = [];
	        return this.cancelSele(),
			a = a.filter(function (a) {
			    return a.hasClass("diy-elem") && !a.hasClass("diy-background") && a.parent().is(b.container) ? !0 : void 0
			}),
			0 == a.length ? this : 1 == a.length ? (this.seleElem(a[0]), this) : (this.$seleArr = a, this.updateRect(), void this.$rect.unRotable2().resizable2({
			    handlers: []
			}).draggable2({
			    dragScope: this.container,
			    snapAppendTo: this.container.parent(),
			    startFn: function (a, d) {
			        b.$seleArr.forEach(function (a, b) {
			            c[b] = a.position()
			        }),
					b.isEasy || (d.snapArr = b.canvas.getSnapArr.apply(b.canvas, b.$seleArr))
			    },
			    stepFn: function () {
			        var a = this.dragLen;
			        b.$seleArr.forEach(function (b, d) {
			            b.css({
			                left: c[d].left + a[0],
			                top: c[d].top + a[1]
			            })
			        }),
					b._setToolBox(b.$rect.width(), b.$rect.height(), 0)
			    },
			    endFn: function () {
			        b.canvas.history.add("edit", a)
			    }
			}))
	    },
	    _setBiggerRect: function (a) {
	        var b, c, d, e = 0,
			f = 0,
			g = 0,
			h = 0;
	        a.forEach(function (a) {
	            b = a.offset(),
				c = a.width(),
				d = a.height(),
				(b.left < e || 0 == e) && (e = b.left),
				(b.top < f || 0 == f) && (f = b.top),
				b.left + c > g && (g = b.left + c),
				b.top + d > h && (h = b.top + d)
	        }),
			this.$rect.attr("data-rotate", 0).transform({
			    rotate: "0deg"
			}).offset({
			    left: e,
			    top: f
			}).width(g - e).height(h - f)
	    },
	    moveElem: function (a, b) {
	        this.$sele && (this.$sele.css({
	            left: this.$sele.position().left + a,
	            top: this.$sele.position().top + b
	        }), this.canvas.emitChange(this.$sele), this.updateRect()),
			this.$seleArr && (this.$seleArr.forEach(function (c) {
			    c.css({
			        left: c.position().left + a,
			        top: c.position().top + b
			    })
			}), this.canvas.emitChange(this.$seleArr), this.updateRect())
	    },
	    _setElemData: function (a, b) {
	        var c, d = parseInt(b.attr("data-rotate") || 0);
	        c = (b == this.$rect || -1) * (parseInt(this.$rect.css("borderLeftWidth")) || 0),
			b.show(),
			a.show(),
			a.attr("data-rotate", d),
			a.width(b.width()),
			a.height(b.height()),
			a.offset({
			    left: b.offset().left + c,
			    top: b.offset().top + c
			})
	    },
	    _getElemData: function (a) {
	        return {
	            rotate: parseInt(a.attr("data-rotate") || 0),
	            left: parseInt(a.offset().left),
	            top: parseInt(a.offset().top),
	            width: a.width(),
	            height: a.height()
	        }
	    },
	    _isChange: function (a, b) {
	        var c = this._getElemData(a);
	        for (var d in b) if (c[d] !== b[d]) return !0;
	        return !1
	    },
	    _hideController: function () {
	        return this.$rect.find(".diy-selector-control").hide(),
			this
	    },
	    _showDiyFrameController: function () {
	        var a, b, c, d, f, g = this; (f = this.$rect.find(".diy-selector-control"))[0] || (f = e('<div class="diy-selector-control"><a class="diy-frame-larger" data-action="frame-larger" title="放大" src="javascript:void(0);">放大</a><a class="diy-frame-smaller" data-action="frame-smaller" title="缩小" src="javascript:void(0);">缩小</a><a id="framePhotoMoveBtn"class="diy-frame-move" title="拖动边框内图片" src="javascript:void(0);">拖动</a></div>'), this.$rect.append(f));
	        var h = this.$sele.find(".diy-frame-visual-wrap"),
			i = this.$sele.find(".diy-frame-photo");
	        i[0] && (f.show(), f.css({
	            width: h[0].style.width,
	            height: h[0].style.height,
	            left: h[0].style.left,
	            top: h[0].style.top
	        }), e("#framePhotoMoveBtn").draggable2({
	            dragTarget: "clone",
	            startFn: function (e) {
	                this.$dragTarget.css({
	                    visibility: "hidden"
	                }),
					a = e.clientX,
					b = e.clientY,
					c = parseInt(i.css("left")),
					d = parseInt(i.css("top"))
	            },
	            stepFn: function (e) {
	                i.css({
	                    left: c + e.clientX - a,
	                    top: d + e.clientY - b
	                })
	            },
	            endFn: function () {
	                g.canvas.history.add("edit", [g.$sele])
	            }
	        }), this.$rect.actionMap({
	            "frame-larger": function () {
	                g.canvas.scaleDiyFramePhoto(1.1, g.$sele),
					g.canvas.history.add("edit", [g.$sele]),
					g._checkSize(g.$sele)
	            },
	            "frame-smaller": function () {
	                g.canvas.scaleDiyFramePhoto(10 / 11, g.$sele),
					g.canvas.history.add("edit", [g.$sele]),
					g._checkSize(g.$sele)
	            }
	        }))
	    },
	    _checkSize: function (a, b) {
	        var c, d = a.data("type"),
			e = this.canvas.zoomRatio;
	        return "diy_frame" === d && (a = a.find(".diy-frame-photo")),
			c = a.attr("data-key"),
			c && -1 === h.indexOf(c) && a.size() && ["diy_photo", "diy_frame", "diy_decorate"].indexOf(d) + 1 && (!b && (a.width() > a.data("origin_width") * e + 1 || a.height() > a.data("origin_height") * e + 1) || b && (a.attr("data-width") > a.data("origin_width") || a.attr("data-height") > a.data("origin_height"))) ? (this._showWarnBox(!0), this) : (this._showWarnBox(!1), this)
	    },
	    _showWarnBox: function (a) {
	        var b = this.$rect.find(".diy-selector-warn");
	        b.size() || (b = e('<div class="diy-selector-warn"><img src="' + global.s_domain + '/diy/imgs/warn.png"></div>').hide().appendTo(this.$rect)),
			a ? b.attr("title", "像素不足，建议缩小图片，或换用更大图片！").show() : b.hide()
	    },
	    _createSeleBox: function () {
	        var a, b;
	        this.$rect || (e("#diySelectorBox").show(), a = e("#diySelector"), b = e("#diyToolBox"), a.css("zIndex", "1000"), e.browser.msie && (a.css("backgroundColor", "rgba(133,65,65,0.1)"), 8 == e.browser.version && a.css("opacity", "0.5")), a.dblclick(this._setTextInput.bind(this)), a.draggable2().resizable2().rotable2(), a.hide(), b.hide())
	    }
	}).wrap(f).wrap(d);
    return i
}),
define("diy/models/CanvasClass", ["jquery.transform", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/utils/asserts", "jquery/jquery/1.7.2/jquery", "zz/ui/confirm", "zz/ui/Dialog", "zz/utils/utils", "./HistoryClass", "zz/utils/loadImgs", "./canvasJsonWrap", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/info", "diy/config/canvasStaticData", "common/submitDesignDialog", "zz/utils/beforeUnload", "zz/utils/math", "../common/cutter", "jquery.easing"],
function (a) {
    "use strict";
    a("jquery.transform"),
	console.log("class...");
    var b = a("zz/utils/objs"),
	c = a("zz/core/Class"),
	d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/utils/types"),
	f = (a("zz/ui/confirm"), a("zz/utils/utils"), a("./HistoryClass")),
	g = a("./canvasJsonWrap"),
	h = a("zz/utils/math"),
	i = a("zz/utils/utils").ratioImg,
	j = a("../common/cutter"),
	k = ["diy_photo", "diy_text", "diy_model", "diy_qianming"],
	l = c().defState("UP_ENABLE", "DOWN_ENABLE").attr({
	    _ENTER_: "_**_",
	    _REG_ENTER_: /\_\*\*\_/g,
	    DEFAULT_OPTS: {
	        MAX_ZOOM: 1,
	        MIN_ZOOM: .04,
	        type: "card",
	        index: 0,
	        overflowShow: !1,
	        showLimitRect: !0,
	        hasCutter: !1,
	        isPreLoad: !1,
	        hasRadius: !1,
	        radiusSize: 10,
	        canvasSize: null,
	        hasSplitLine: !1,
	        bgRatio: "50%",
	        photoRatio: "50%",
	        citiao: null,
	        bianma: null
	    }
	}).init(function (a, b) {
	    this.container = a,
		this.opts,
		this.$cutter,
		this.canvasSize,
		this.type,
		this._configOpts(b),
		this.bgElem = null,
		this.childElems = [],
		this.history = new f(this),
		this.zoomRatio = 1,
		this._createDiyBg(),
		this._updateLimitRect(),
		this.opts.hasCutter && this._createCutter(),
		this.techs = {}
	}).method({
	    _configOpts: function (a) {
	        this.opts = b.extend({},
			this.DEFAULT_OPTS, a),
			this.minZoom = this.opts.MIN_ZOOM,
			this.maxZoom = this.opts.MAX_ZOOM,
			this.type = this.opts.type,
			this.index = this.opts.index,
			a.canvasSize && (this.canvasSize = a.canvasSize, this.container.parent().width(this.canvasSize.pxWidth).height(this.canvasSize.pxHeight).attr("data-index", this.index)),
			this.opts.overflowShow || this.container.css("overflow", "hidden"),
			this.opts.hasSplitLine && this.splitLine()
	    },
	    addDiyElements: function () {
	        var a, b, c, e, f = this.childElems,
			g = this,
			h = d.makeArray(arguments),
			i = f.slice();
	        return h.forEach(function (a) {
	            this.container.append(a),
				this.childElems.push(a),
				a.css({
				    left: a.attr("data-left") * g.zoomRatio,
				    top: a.attr("data-top") * g.zoomRatio
				}),
				a.attr("data-index", this.childElems.length - 1),
				a.css("zIndex", this.childElems.length + 20 - 1)
	        }.bind(this)),
			c = f.slice(),
			a = function () {
			    this.childElems = c
			}.bind(this),
			b = function () {
			    this.childElems = i
			}.bind(this),
			e = this.history.add("add", h, a, b),
			{
			    curElemArr: h,
			    historyId: e
			}
	    },
	    addDiyQianming: function (a) {
	        var b = d("<div>");
	        return a = a || {
	            left: 400,
	            top: 200,
	            width: 295,
	            height: 50
	        },
			b.attr({
			    "data-type": "diy_qianming",
			    "data-origin_width": a.width,
			    "data-origin_height": a.height,
			    "data-left": a.left * this.zoomRatio,
			    "data-top": a.top * this.zoomRatio
			}),
			b = this._createDiyElem(b),
			b.addClass("diy-qianming"),
			b.css({
			    width: a.width * this.zoomRatio,
			    height: a.height * this.zoomRatio
			}),
			this.addDiyElements(b)
	    },
	    delDiyElements: function () {
	        var a, b, c = this.childElems,
			e = d.makeArray(arguments),
			f = this,
			g = [],
			h = c.slice();
	        e.forEach(function (a) {
	            h.forEach(function (b, d) {
	                b[0] == a[0] && (a.remove(), c[d] = void 0)
	            })
	        }),
			c.forEach(function (a) {
			    a && g.push(a)
			}),
			this.childElems = g.slice(),
			this._sortDiyElements();
	        var a = function () {
	            f.childElems = g,
				f._sortDiyElements()
	        },
			b = function () {
			    f.childElems = h,
				f._sortDiyElements()
			};
	        return f.history.add("del", e, a, b),
			e
	    },
	    _sortDiyElements: function () {
	        this.childElems.forEach(function (a, b) {
	            a.attr("data-index", b),
				a.css("zIndex", b + 20)
	        })
	    },
	    clear: function () {
	        this.container.empty(),
			this.bgElem = null,
			this.childElems = [],
			this.history.clear()
	    },
	    _createDiyElem: function (a, b) {
	        var c, e, f = this,
			g = this.container.offset(),
			h = a.attr("data-left") || parseInt(a.css("left")) - g.left,
			i = a.attr("data-top") || parseInt(a.css("top")) - g.top;
	        return b = b || "div",
			c = d("<" + b + " class='diy-elem' style='position:absolute;z-index:10'></" + b + ">"),
			c.attr({
			    "data-type": a.attr("data-type"),
			    "data-src": a.attr("data-src") || "",
			    "data-origin_width": a.attr("data-origin_width"),
			    "data-origin_height": a.attr("data-origin_height"),
			    "data-rotate": 0,
			    "data-left": h / f.zoomRatio,
			    "data-top": i / f.zoomRatio
			}),
			(e = a.attr("data-rotate")) && (c.attr("data-rotate", e), "0" !== e && c.transform({
			    rotate: e + "deg"
			})),
			c
	    },
	    _updateDiyPhotoByData: function (b, c) {
	        var d, e = "CMYK" === c.mode ? c.rgb_url : c.url;
	        return b.attr("data-width") ? (d = a("zz/utils/utils").ratioImg(c.width, c.height, b.attr("data-width"), b.attr("data-height")), b.attr({})) : d = [c.width, c.height],
			b.attr({
			    src: e,
			    "data-src": e,
			    "data-origin_height": c.height,
			    "data-origin_width": c.width,
			    "data-key": c.key,
			    "data-dpiX": c.dpi ? c.dpi[0] : 0,
			    "data-dpiY": c.dpi ? c.dpi[1] : 0,
			    "data-type": "diy_photo",
			    "data-width": d[0],
			    "data-height": d[1]
			}).css({
			    width: d[0] * this.zoomRatio,
			    height: d[1] * this.zoomRatio
			}),
			b
	    },
	    addDiyPhotoByData: function (a) {
	        var b = this._updateDiyPhotoByData(d("<img>"), a);
	        b.attr({
	            "data-left": 100,
	            "data-top": 100
	        });
	        var c = this.addDiyPhoto(b).curElemArr[0];
	        return c
	    },
	    replaceDiyPhoto: function (a, b) {
	        var c = this.childElems[a];
	        return this._updateDiyPhotoByData(c, b),
			c.attr("data-type", "diy_photo"),
			c.find("img").attr("src", this._getImgSmallSrc(c.attr("data-src"))),
			this.emitChange(c),
			c
	    },
	    replaceDiyPhotoFromDragger: function (a, b) {
	        var c = b.data();
	        return a.attr({
	            "data-type": "diy_photo",
	            "data-img_type": c.type.slice(4),
	            "data-src": c.src,
	            "data-origin_height": c.origin_height,
	            "data-origin_width": c.origin_width,
	            "data-key": c.key
	        }),
			a.find("img").attr("src", this._getImgSmallSrc(c.src)),
			this.emitChange(a),
			a
	    },
	    _getImgSmallSrc: function (a, b) {
	        var c, d = b ? this.opts.bgRatio : this.opts.photoRatio;
	        switch (d) {
	            case "50%":
	                c ="";// "!xmlog";
	                break;
	            case "20%":
	                c = "";//"!mlog";
	                break;
	            default:
	                throw new Error("不支持缩放比例: " + d)
	        }
	        return /^\//.test(a) || new RegExp("^" + global.s_domain).test(a) || /xmlog$|mlog$/.test(a) ? a : a + c
	    },
	    addDiyPhoto: function (a, b) {
	        console.log("addDiyPhoto");
	        var c, e = this._createDiyElem(a, "div"),
			f = i(.95 * a.attr("data-origin_width"), .95 * a.attr("data-origin_height"), this.canvasSize.pxWidth / 3, this.canvasSize.pxHeight / 3);
	        return e.css({
	            width: f[0] * this.zoomRatio,
	            height: f[1] * this.zoomRatio
	        }).attr({
	            "data-width": f[0],
	            "data-height": f[1],
	            "data-key": a.attr("data-key"),
	            "data-img_type": b
	        }),
			e.attr("data-ratio", a.width() / a.height()),
			c = d("<img>"),
			c.attr("src", this._getImgSmallSrc(a.attr("data-src"))),
			c.width("100%"),
			c.height("100%"),
			e.append(c),
			b = b || "photo",
			e.addClass("diy-" + b),
			"" == a.attr("data-key") && e.addClass("diy-model"),
			this.addDiyElements(e)
	    },
	    addDiyText: function (a) {
	        console.log("addDiyText");
	        var b = this._createDiyElem(a, "p");
	        return b.addClass("diy-text"),
			b.html("<img style='border-width:0;width:100%;height:100%;display:block'><i class='diy-text-warn iconfont none' title='未选择文本所属类别'></i>"),
			b.attr("data-type", "diy_text"),
			b.attr("data-content", "双击编辑文字"),
			b.attr("data-size", 9),
			b.attr("data-mean", "-1"),
			b.attr("data-family", a.attr("data-family") || "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/heiti.ttf"),
			b.attr("data-bold", 0),
			b.attr("data-italic", 0),
			b.attr("data-underline", 0),
			b.attr("data-align", "left"),
			b.attr("data-color", "0,0,0"),
			b.attr("data-cmyk", "0,0,0,100"),
			b.css({
			    width: 5,
			    height: 5
			}),
			this.addDiyElements(b)
	    },
	    addDiyLogo: function (a, b) {
	        return a.attr("data-type", "diy_photo"),
			this.addDiyPhoto(a, b || "logo")
	    },
	    addDiyFrame: function (a) {
	        var b = this.addDiyPhoto(a, "diy-frame"),
			c = d('<div class="diy-frame-visual-wrap"></div>'),
			e = d.parseJSON(b.attr("data-info"));
	        return c.css({
	            left: e.x / e.sw * 100 + "%",
	            top: e.y / e.sh * 100 + "%",
	            width: e.w / e.sw * 100 + "%",
	            height: e.h / e.sh * 100 + "%"
	        }),
			b.append(c),
			b
	    },
	    _createDiyBg: function () {
	        var a = d('<div class="diy-background" style="width:100%;height:100%;background-color:#FFFFFF;"><img class="diy-bg-img none" style="width:100%;height:100%"/></div>');
	        a.css({
	            top: 0,
	            left: 0,
	            zIndex: 10,
	            overflow: "hidden"
	        }).attr("data-index", -1).attr("data-type", "diy_background").attr("data-color", "#FFFFFF").appendTo(this.container),
			this.opts.hasRadius && a.css({
			    borderRadius: this.opts.radiusSize + "px"
			}),
			this.bgElem = a,
			this.history.addInitData(a)
	    },
	    addDiyBackground: function (a) {
	        console.log("add diy background !!");
	        var b, c = this.bgElem;
	        if (e.isObject(a)) {
	            if (c.attr("data-src") === a.attr("data-src")) return {
	                curElemArr: [c]
	            };
	            c.attr({
	                "data-type": a.attr("data-type"),
	                "data-src": a.attr("data-src"),
	                "data-key": a.attr("data-key"),
	                "data-dpiX": a.attr("data-dpiX") || 300,
	                "data-dpiY": a.attr("data-dpiY") || 300
	            }),
				c.children("img").attr("src", this._getImgSmallSrc(a.attr("data-src"))).show()
	        } else {
	            if (b = a, c.data("color") === b) return c;
	            c.attr({
	                "data-color": b,
	                "data-src": "",
	                "data-key": ""
	            }).css("backgroundColor", b).children("img").hide()
	        }
	        var d = this.history.add("edit", [c]);
	        return {
	            curElemArr: [c],
	            historyId: d
	        }
	    },
	    addDiyFramePhoto: function () { },
	    addDiyModel: function (a) {
	        return a.attr({
	            "data-type": "diy_photo",
	            "data-width": 100,
	            "data-height": 100,
	            "data-key": ""
	        }),
			this.addDiyPhoto(a, "model")
	    },
	    _initFramePhoto: function (a) {
	        var b = a.find(".diy-frame-photo"),
			c = a.width(),
			e = a.height(),
			f = d.parseJSON(a.attr("data-info")),
			g = c / f.sw,
			h = f.w * g,
			i = f.h * g,
			j = +b.attr("data-src-ratio"),
			k = f.w / f.h;
	        b.attr("data-frame-width", c),
			b.attr("data-frame-height", e),
			b.css(j > k ? {
			    width: i * j,
			    height: i,
			    left: (i * j - h) / 2,
			    top: 0
			} : {
			    width: h,
			    height: h / j,
			    left: 0,
			    top: (i / j - h) / 2
			})
	    },
	    resizeDiyFrame: function (a) {
	        var b = a.find(".diy-frame-photo"),
			c = a.width(),
			d = a.height(),
			e = c / parseInt(b.attr("data-frame-width")),
			f = d / parseInt(b.attr("data-frame-height")); (1 != e || 1 != f) && (b.css({
			    width: b.width() * e,
			    height: b.height() * f,
			    left: parseInt(b.css("left")) * e,
			    top: parseInt(b.css("top")) * f
			}), b.attr("data-frame-width", c), b.attr("data-frame-height", d))
	    },
	    scaleDiyFramePhoto: function (a, b) {
	        var c = b.find(".diy-frame-photo");
	        c[0] && c.css({
	            width: c.width() * a,
	            height: c.height() * a,
	            left: parseInt(c.css("left")) * a,
	            top: parseInt(c.css("top")) * a
	        })
	    },
	    _moveIndex: function (a, b) {
	        function c() {
	            g[h] = b,
				g[f] = e,
				b.css("zIndex", h + 20),
				e.css("zIndex", f + 20),
				b.attr("data-index", h),
				e.attr("data-index", f)
	        }
	        function d() {
	            g[h] = e,
				g[f] = b,
				e.css("zIndex", h + 20),
				b.css("zIndex", f + 20),
				e.attr("data-index", h),
				b.attr("data-index", f)
	        }
	        var e, f = +b.attr("data-index"),
			g = this.childElems,
			h = f + a;
	        return console.log("moveIndex " + h),
			h >= g.length || 0 > h ? void 0 : (e = g[h], c(), this.history.add("edit", [b, e], c, d), this.checkIndex(b), h)
	    },
	    moveUp: function (a) {
	        return this._moveIndex(1, a)
	    },
	    moveDown: function (a) {
	        return this._moveIndex(-1, a)
	    },
	    checkIndex: function (a) {
	        var b = a.attr("data-index");
	        b == this.childElems.length - 1 ? this.triggerState("UP_ENABLE", !1) : this.triggerState("UP_ENABLE", !0),
			0 == b ? this.triggerState("DOWN_ENABLE", !1) : this.triggerState("DOWN_ENABLE", !0)
	    },
	    getSnapArr: function () {
	        function a(a) {
	            for (var b = 0,
				d = f.length; b != d; b++) if (a.is(f[b])) return;
	            var g = a.offset(),
				i = parseFloat(a.attr("data-rotate") || 0),
				j = h.getRotateRect(a.width(), a.height(), i);
	            g && (c.push(g.left), e.push(g.top), c.push(g.left + j[0]), e.push(g.top + j[1]))
	        }
	        function b() {
	            var a = d(this),
				b = a.offset(),
				f = 1 * a.attr("data-is-vertical");
	            b && (f ? c.push(b.left + parseInt(a.children().css("marginLeft"))) : e.push(b.top + parseInt(a.children().css("marginTop"))))
	        }
	        var c = [],
			e = [],
			f = arguments;
	        return a(this.bgElem),
			this.childElems.forEach(a),
			this.container.siblings(".diy-r-helper-line").each(b),
			[c, e]
	    },
	    zoom: function (a, b, c) {
	        var e, f, g = d("#diyWorkArea");
	        return a < this.minZoom ? a = this.minZoom : a > this.maxZoom && (a = this.maxZoom),
			c || this.zoomRatio !== a ? (this.zoomRatio = a, this.container.data("zoomRatio", a), this.childElems.forEach(function (b) {
			    this.zoomElem(b, a)
			}.bind(this)), this.container.parent().css({
			    width: e = this.canvasSize.pxWidth * a,
			    height: f = this.canvasSize.pxHeight * a
			}), this._updateLimitRect(), this._updateCutter(), this._updateCitiao(), this.updateBianma(), b && b(), 0 === g.length ? this : (e >= g.width() ? g.css("overflow-x", "scroll") : (g.css("overflow-x", ""), g.scrollTop(0)), f >= g.height() ? g.css("overflow-y", "scroll") : (g.css("overflow-y", ""), g.scrollLeft(0)), this)) : this
	    },
	    zoomElem: function (a, b) {
	        this.history.zoomElem(a, b)
	    },
	    emitChange: function (a) {
	        e.isArray(a) || (a = [a]),
			this.history.add("edit", a)
	    },
	    onChange: function (a) {
	        this.history.onState("CHANGE", a)
	    },
	    onChangeClone: function (a, b) {
	        this.history.onChangeToClone(a, b)
	    },
	    checkTextMean: function () {
	        var a;
	        return this.childElems.forEach(function (b) {
	            "diy_text" === b.data("type") && "-1" == b.attr("data-mean") && (a = b)
	        }),
			a
	    },
	    isLogoCorrect: function () {
	        return this.childElems.forEach(function (a) {
	            return "logo" === a.attr("data-img_type") || "user_logo" === a.attr("data-img_type") ? !0 : void 0
	        }),
			!1
	    },
	    centerX: function (a) {
	        a.attr("data-align", "center"),
			this.emitChange(a)
	    },
	    centerY: function (a) {
	        a.attr("data-alignY", "center"),
			this.emitChange(a)
	    },
	    _updateLimitRect: function () {
	        if (this.canvasSize) {
	            var a = this.canvasSize.pxLimit,
				b = a * this.zoomRatio;
	            this.$limitRect || (this.$limitRect = d("<div class='diy-limitrect'></div>").appendTo(this.container).css({
	                border: "1px dotted rgba(0,0,0,0.2)",
	                position: "absolute",
	                "z-index": 11
	            }), this.opts.showLimitRect || this.$limitRect.hide()),
				this.$limitRect.css({
				    left: b - 1,
				    top: b - 1,
				    width: this.canvasSize.pxWidth * this.zoomRatio - 2 * b,
				    height: this.canvasSize.pxHeight * this.zoomRatio - 2 * b
				})
	        }
	    },
	    getLimitRect: function () {
	        var a = this.canvasSize.pxLimit;
	        return {
	            left: a,
	            top: a,
	            width: this.canvasSize.pxWidth - 2 * a,
	            height: this.canvasSize.pxHeight - 2 * a
	        }
	    },
	    _createCutter: function () {
	        return this.$cutter = j.createCutter(this.container.parent()),
			this
	    },
	    _updateCutter: function () {
	        return this.$cutter && j.updateCutter(this.$cutter, this),
			this
	    },
	    updateCutterByAnim: function () {
	        this.$cutter && j.updateCutterByAnim(this.$cutter, this)
	    },
	    getType: function () {
	        return this.type
	    },
	    splitLine: function () {
	        var a = d("<div></div>").css({
	            border: "1px dotted rgba(0,0,0,0.2)",
	            position: "absolute",
	            "z-index": 1e3,
	            height: "100%",
	            left: "50%",
	            width: "2px",
	            marginLeft: "1px"
	        });
	        this.container.append(a)
	    },
	    toggleBianma: function (a) {
	        var b = this.opts.bianma,
			c = this.techs.$bianma || this.container.children("[data-type=diy_bianma]");
	        return b ? a ? (c && 0 !== c.length || (c = this.createBianma(b)), this.techs.$bianma = c.show(), this.updateBianma(), this.history.triggerState("CHANGE"), c) : (c.hide(), this.techs.$bianma = null, this.history.execCloneChange(function (a) {
	            a.children("[data-type=diy_bianma]").hide()
	        }), this.history.triggerState("CHANGE"), void 0) : void 0
	    },
	    createBianma: function (a) {
	        if (this.techs.$bianma) return this.techs.$bianma;
	        var b = this.techs.$bianma = d("<div class='diy-bianma' style='position:absolute;z-index:1010;text-align:left'><img style='width:100%;height:100%;display:block'/></div>");
	        return b.appendTo(this.container).attr({
	            "data-type": "diy_bianma",
	            "data-color": a.color,
	            "data-cmyk": a.cmyk,
	            "data-mm-top": a.mmTop,
	            "data-mm-left": a.mmLeft,
	            "data-mm-height": a.mmHeight,
	            "data-mm-width": a.mmWidth,
	            "data-px-width": a.pxWidth,
	            "data-px-height": a.pxHeight,
	            "data-px-left": a.pxLeft,
	            "data-px-top": a.pxTop,
	            "data-start": a.start || "000001",
	            "data-content": a.content || "NO.000001"
	        }),
			b
	    },
	    updateBianma: function () {
	        var a = this.techs.$bianma,
			b = this.zoomRatio;
	        if (a) {
	            var c = a.find("img"),
				d = a.attr("data-px-height"),
				e = a.attr("data-px-left"),
				f = a.attr("data-px-top"),
				g = a.attr("data-px-width");
	            a.css({
	                left: e * b,
	                top: f * b,
	                width: g * b,
	                height: d * b,
	                "font-size": d * b,
	                "line-height": d * b + "px"
	            }),
				c.get(0).src = "/app/api/technic_png.php?type=diy_bianma&w=" + a.attr("data-mm-width") + "&h=" + a.attr("data-mm-height") + "&content=" + a.attr("data-content") + "&color=" + a.attr("data-color"),
			
				this.history.execCloneChange(function (b, c) {
				    var h = b.children("[data-type=diy_bianma]");
				    0 === h.length && (h = a.clone().appendTo(b)),
					h.css({
					    left: e * c,
					    top: f * c,
					    width: g * c,
					    height: d * c,
					    "font-size": d * c,
					    "line-height": d * c + "px",
					    "background-color": "rgb(" + a.attr("data-color") + ")"
					}).show()
				})
	        }
	    },
	    toggleCitiao: function (a) {
	        var b = this.opts.citiao,
			c = this.techs.$citiao;
	        b && (a ? (this.createCitiao(b), this._updateCitiao(), this.history.triggerState("CHANGE")) : (c.remove(), this.techs.$citiao = null, this.history.execCloneChange(function (a) {
	            a.children("[data-type=diy_citiao]").remove()
	        }), this.history.triggerState("CHANGE")))
	    },
	    createCitiao: function (a) {
	        if (this.techs.$citiao) return this.techs.$citiao;
	        var b = this.techs.$citiao = d("<div class='diy-citiao' style='position:absolute;left:0;top:0;width:100%;z-index:1000'></div>");
	        return b.appendTo(this.container).css({
	            "background-color": "rgb(" + a.color + ")"
	        }).attr({
	            "data-type": "diy_citiao",
	            "data-color": a.color,
	            "data-cmyk": a.cmyk,
	            "data-mm-top": a.mmTop,
	            "data-mm-height": a.mmHeight,
	            "data-px-top": a.pxTop,
	            "data-px-height": a.pxHeight
	        }),
			b
	    },
	    _updateCitiao: function () {
	        var a = this.techs.$citiao;
	        if (a) {
	            var b = a.attr("data-px-top"),
				c = a.attr("data-px-height"),
				d = a.attr("data-color");
	            a.css({
	                top: b * this.zoomRatio,
	                height: c * this.zoomRatio
	            }),
				this.history.execCloneChange(function (e, f) {
				    var g = e.children("[data-type=diy_citiao]");
				    0 === g.length && (g = a.clone().appendTo(e)),
					g.css({
					    top: b * f,
					    height: c * f,
					    "background-color": "rgb(" + d + ")"
					})
				})
	        }
	    },
	    revertCanvas: function (a) {
	        var b = this.canvasSize,
			c = b.mmHeight,
			d = b.pxHeight,
			e = !1;
	        switch (a) {
	            case "h":
	                b.mmHeight > b.mmWidth && (e = !0);
	                break;
	            case "v":
	                b.mmHeight < b.mmWidth && (e = !0)
	        }
	        e && (b.mmHeight = b.mmWidth, b.mmWidth = c, b.pxHeight = b.pxWidth, b.pxWidth = d, this.delDiyElements.apply(this, this.childElems), this.addDiyBackground("<img>"), this.history.lock(), this._updateLimitRect())
	    }
	}).wrap(g);
    return l.TYPE_LIST = k,
	l
}),
define("diy/canvasDataControl", ["jquery/jquery/1.7.2/jquery", "zz/ui/alert", "zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/Mask", "zz/ui/info", "zz/ui/confirm", "./config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload"],
function (a, b) {
    "use strict";
    var c, d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/ui/alert"),
	f = (a("zz/ui/Dialog"), a("zz/ui/info")),
	g = a("zz/ui/confirm"),
	h = "_",
	i = a("./config/canvasStaticData")._canvasData,
	j = global.template_id || global.user_template_id,
	k = j ? !0 : !1,
	l = a("zz/utils/utils").mm2px;
    b.save = function (b, c, g) {
        var h = k ? "/design/api/edit" : "/design/api/create",
		i = {
		    content: JSON.stringify(b),
		    width: b.pages[0].canvas.width,
		    height: b.pages[0].canvas.height,
		    category_id: global.category_id,
		    product_id: global.product_id,
		    csrf_token: d("#csrf_token").val(),
		    version: 1
		},
		l = a("zz/utils/utils").getUrlData("fc");
        l && !k && (i.fc = l),
		j && (i.template_id = j),
		d.post(h, i).done(function (a) {
		    200 == a.code ? (k = !0, a.data && a.data.id && (j = a.data.id), !g && f("保存成功"), console.log("saved template: " + j), c && c(!0)) : 403 == a.code ? (!g && e(a.msg), c && c(!1)) : (!g && e("系统出错了！！"), c && c(!1))
		}).fail(function () {
		    c && c(!1)
		})
    },
	b.audit = function (b) {
	    c || (c = a("common/submitDesignDialog").init({
	        id: j,
	        name: global.name,
	        url: "/design/api/audit",
	        cb: b,
	        done: function (b) {
	            200 == b.code ? (a("zz/utils/beforeUnload").unbind(), c.close(), g('<p style="color:#c8101c;font-size:16px"><i></i>提交审核成功, 还想再做一张吗？</p>',
				function () {
				    location.href = "http://www.mayicy.cn/design/" + global.category_id + "/" + global.product_id + "/create"
				},
				function () {
				    location.href = "http://www.mayicy.cn/myky/design"
				},
				["好的, 我还有战斗力 ^_^", "不做了"])) : e(403 == b.code ? b.msg : "系统出错了！！")
	        }
	    })),
		j ? c.open() : (e("你还没有保存模版哦~~"), b && b())
	},
	b.getSizeArr = function (a) {
	    return i[a].sizeArr || []
	},
	b.getDemoArr = function (a) {
	    var b = i[a].demoArr || [];
	    return b.forEach(function (a) {
	        a.pages.forEach(function (a) {
	            delete a.background
	        })
	    }),
		b
	},
	b.getMeanList = function (a, c) {
	    var d;
	    return d = c ? b.getTypeName(a, c) : a,
		i[d].meanList
	},
	b.hasRadius = function (a) {
	    return i[a].hasRadius
	},
	b.hasSplitLine = function (a) {
	    return i[a].hasSplitLine
	},
	b.getCanvasData = function (a) {
	    return i[a]
	},
	b.defaultPageCount = function (a) {
	    return i[a].defaultPageCount
	},
	b.getPageArr = function (a) {
	    return i[a].pageArr
	},
	b.canAddPage = function (a) {
	    return i[a].canAddPage
	},
	b.hasType = function (a, c) {
	    var d = b.getTypeName(a, c);
	    return i[d] ? !0 : !1
	},
	b.getTypeName = function (a, b) {
	    return a + h + b
	},
	b.toSizeDetailData = function (b) {
	    var c = a("zz/utils/utils").mm2px,
		d = b[0] + 2 * b[2],
		e = b[1] + 2 * b[2],
		f = c(d, 300),
		g = c(e, 300),
		h = c(b[2], 300),
		i = c(b[3], 300);
	    return {
	        mmWidth: d,
	        mmHeight: e,
	        pxWidth: Math.round(f),
	        pxHeight: Math.round(g),
	        mmBlood: b[2],
	        mmLimit: b[3],
	        pxLimit: Math.round(i),
	        pxBlood: Math.round(h)
	    }
	},
	b.getBianmaData = function (a) {
	    var b = i[a].bianma,
		c = i[a].sizeArr[0][2];
	    return b ? {
	        mmLeft: b.left + c,
	        mmTop: b.top + c,
	        mmWidth: b.width,
	        mmHeight: b.height,
	        pxLeft: l(b.left + c, 300),
	        pxTop: l(b.top + c, 300),
	        pxWidth: l(b.width, 300),
	        pxHeight: l(b.height, 300),
	        cmyk: "0,0,0,100",
	        color: "0,0,0"
	    } : null
	},
	b.getCitiaoData = function (a) {
	    var b = i[a].citiao,
		c = i[a].sizeArr[0][2];
	    return b ? {
	        cmyk: b.cmyk,
	        color: b.color,
	        mmTop: b.top + c,
	        mmHeight: b.height,
	        pxTop: l(b.top + c, 300),
	        pxHeight: l(b.height, 300)
	    } : null
	}
}),
define("diy/toolControl", ["zz/plugins/actionMap", "jquery/jquery/1.7.2/jquery", "jquery.mousewheel", "diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "./canvasDataControl", "zz/ui/alert", "zz/ui/Dialog", "jquery.easing", "zz/utils/types", "zz/ui/base/Panel", "zz/ui/Mask", "zz/ui/info", "./config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "arale/cookie/1.0.2/cookie", "zz/utils/keyCode", "zz/utils/loadImgs", "./common/userActions", "./common/preview", "zz/ui/Range", "zz/ui/plugins/draggable2"],
function (a, b) {
    function c() {
        return global.content.pages.forEach(function (a, b) {
            i.extend(a, k[b].getDiyAllData())
        }),
		global.content
    }
    function d() {
        var a = function () {
            i(this).removeClass("disabled")
        },
		b = function () {
		    i(this).addClass("disabled")
		};
        k.forEach(function (c) {
            c.history.unState("UNDO_NO_EMPTY").unState("REDO_NO_EMPTY").unState("UNDO_EMPTY").unState("REDO_EMPTY").onState("UNDO_NO_EMPTY", a, t.find("[data-action=undo]")).onState("REDO_NO_EMPTY", a, t.find("[data-action=redo]")).onState("UNDO_EMPTY", b, t.find("[data-action=undo]")).onState("REDO_EMPTY", b, t.find("[data-action=redo]")).triggerState("UNDO_EMPTY").triggerState("REDO_EMPTY")
        })
    }
    function e() {
        var b = new (a("zz/ui/Range"))({
            appendTo: t,
            css: {
                right: "86px",
                top: "8px"
            },
            changeFn: function (a) {
                var b = l.canvas;
                b.zoom(a,
				function () {
				    l.updateRect()
				})
            },
            scope: [l.canvas.minZoom, l.canvas.maxZoom]
        });
        b.open(),
		b.setRange(l.canvas.zoomRatio),
		i(document).mousewheel(function (a, c) {
		    (a.altKey || a.ctrlKey) && (c > 0 ? b.bigger() : b.smaller(), a.preventDefault(), a.stopPropagation()),
                l.updateRect()
		}),
		b.$range.attr("title", "alt+滚轮"),
		t.data("rangeObj", b)
    }
    function f(a) {
        var b, c = t.find("[data-action=save]");
        k.forEach(function (d) {
            d.history.onState("CHANGE",
			function () {
			    c.removeClass("disabled"),
				c.html('<i class="i-btn save"></i>保存');
			    var d = (new Date).getTime(),
				e = c.attr("save-time") || 0;
			    b && clearTimeout(b),
				d - e >= a ? (b = null, g(!0)) : b = setTimeout(function () {
				    g(!0)
				},
				a)
			})
        })
    }
    function g(a, b) {
        var c, d, e, f = t.find("[data-action=save]").addClass("disabled"),
		g = [],
		h = !0;
        return k.forEach(function (a) {
            var b;
            return (b = a.checkTextMean()) ? (h = !1, d = b, void (e = a.index)) : a.bgElem.attr("data-key") ? void g.push(a.getDiyAllData()) : void (h = !1)
        }),
		c = {
		    type: k[0].getType(),
		    pages: g,
		    "extends": {}
		},
		k[0].opts.hasRadius && (c.extends.rotate = !0),
		h ? (f.attr("save-time", (new Date).getTime()), void m.save(c,
		function (c) {
		    if (c && b && b(), a && c) {
		        var d = new Date;
		        f.html('<i class="i-btn save"></i>自动保存(' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")"),
				f.addClass("disabled")
		    } else f.removeClass("disabled"),
			f.html('<i class="i-btn save"></i>保存')
		},
		a)) : void (a ? (f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')) : d ? (j.seleCanvas(e), l.seleElem(d), p("请为指定文本选择文本所属类别！！"), f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')) : (p("正反面都需要添加背景图片哦！！"), f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')))
    }
    function h() {
        i(document).on("keydown.diyshotcut",
		function (a) {
		    if (!l.isEdit()) {
		        if (a.keyCode == o.get("delete") && u.del(), a.keyCode == o.get("left")) return l.moveElem(-1, 0),
				void a.preventDefault();
		        if (a.keyCode == o.get("right")) return l.moveElem(1, 0),
				void a.preventDefault();
		        if (a.keyCode == o.get("up")) return l.moveElem(0, -1),
				void a.preventDefault();
		        if (a.keyCode == o.get("down")) return l.moveElem(0, 1),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("c")) return l.copy(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("x")) return l.cut(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("v")) return l.paste(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("s")) return g(),
				void a.preventDefault();
		        a.ctrlKey && !a.shiftKey && a.keyCode == o.get("z") && u.undo(),
				(a.ctrlKey && a.shiftKey && a.keyCode == o.get("z") || a.ctrlKey && a.keyCode == o.get("y")) && u.redo()
		    }
		}),
		t.actionMap(u, null, {
		    disabled: !0
		}),
		e(),
		d(),
		global.isUser || f(1e4)
    }
    a("zz/plugins/actionMap"),
	a("jquery.mousewheel");
    var i = a("jquery/jquery/1.7.2/jquery"),
	j = a("diy/canvasControl"),
	k = j.getCanvasArr(),
	l = j.getSelector(),
	m = a("./canvasDataControl"),
	n = (a("arale/cookie/1.0.2/cookie"), a("zz/ui/Dialog"), a("zz/ui/base/Panel")),
	o = a("zz/utils/keyCode"),
	p = (a("zz/utils/loadImgs"), a("zz/ui/alert")),
	q = (a("zz/utils/utils"), a("zz/ui/loading")),
	r = a("./common/userActions"),
	s = a("zz/ui/confirm"),
	t = i("#diyToolPanel"),
	u = {
	    redo: function () {
	        var a = l.canvas.history.redo();
	        a && l.seleMoreElems(a)
	    },
	    undo: function () {
	        var a = l.canvas.history.undo();
	        l.seleMoreElems(a)
	    },
	    del: function () {
	        l.del()
	    },
	    preview: function () {
	        a("./common/preview").open(k, l.canvas.index)
	    },
	    save: function () {
	        g()
	    },
	    fangzhi_save: function () {
	        var a = i(this);
	        a.addClass("disabled"),
			r.fangzhiSave({
			    canvasArr: k,
			    alwaysCb: function () {
			        a.removeClass("disabled")
			    }
			})
	    },
	    fangzhi_pdf: function () {
	        s("生成pdf比较慢，需要一分多钟，您确定要生成吗? ",
			function () {
			    var a = q("正在生成pdf, 请耐心等待。。。"),
				b = i(this).addClass("disabled");
			    r.fangzhiSave({
			        canvasArr: k,
			        doneCb: function () {
			            r.fangzhiPdf(function () {
			                a.close(),
							b.removeClass("disabled")
			            })
			        },
			        noInfo: !0
			    })
			})
	    },
	    user_save: function () {
	        function a() {
	            b.removeClass("disabled")
	        }
	        var b = i(this);
	        b.addClass("disabled"),
			global.isService ? global.service_save(c(), a) : r.save({
			    canvasArr: k,
			    alwaysCb: function () {
			        b.removeClass("disabled")
			    }
			})
	    },
	    user_buy: function () {
	        function a() {
	            b.close(),
				d.removeClass("disabled")
	        }
	        var b = q("正在下单，请耐心等待。。。"),
			d = i(this).addClass("disabled");
	        global.isService ? global.service_audit(c(), a) : r.save({
	            canvasArr: k,
	            doneCb: function () {
	                r.buy(function () {
	                    b.close(),
						d.removeClass("disabled")
	                })
	            },
	            noInfo: !0
	        })
	    },
	    addModel: function () {
	        var a = l.canvas.addDiyModel();
	        l.seleElem(a)
	    },
	    audit: function () {
	        var a = i(this);
	        g(!1,
			function () {
			    a.addClass("disabled"),
				m.audit(function () {
				    a.removeClass("disabled")
				})
			})
	    },
	    drawLine: function (a) {
	        a.stopPropagation();
	        var b = i(this),
			c = new n({
			    append: i('<div><a href="javascript:;" class="diy-tb-item">水平线段</a></div><div><a href="javascript:;" class="diy-tb-item">垂直线段</a></div>'),
			    blankToClose: !0,
			    closeToDispose: !0
			}).onState("CLOSE",
			function () {
			    b.removeClass("select")
			}).open();
	        c.$target.css({
	            left: b.offset().left,
	            top: b.offset().top + i(this).outerHeight()
	        }).children().click(function () {
	            var a = i(this).index(),
				b = !a,
				d = l.canvas.container,
				e = l.canvas.addDiyLine().attr({
				    "data-is-vertical": a || ""
				}).css({
				    width: a ? 15 : 100,
				    height: a ? 100 : 15
				});
	            e.css({
	                left: (d.width() - e.width()) / 2,
	                top: (d.height() - e.height()) / 2
	            }),
				e.children().css({
				    borderLeft: a && "5px solid black",
				    borderTop: b && "5px solid black",
				    marginLeft: 5 * a,
				    marginTop: 5 * b,
				    width: b && "100%",
				    height: a && "100%"
				}),
				l.seleElem(e),
				c.close()
	        }),
			i(this).addClass("select")
	    }
	};
    h(),
	b.reBind = function () {
	    d(),
		global.isUser || f(1e4)
	}
}),
define("diy/common/userActions", ["zz/utils/objs", "zz/utils/types", "arale/cookie/1.0.2/cookie", "jquery/jquery/1.7.2/jquery", "zz/ui/info", "zz/ui/Dialog", "zz/ui/alert", "zz/utils/beforeUnload"],
function (a, b) {
    "use strict";
    function c(a) {
        a.preCb && a.preCb(),
		d(a.canvasArr),
		global.content.pages.forEach(function (b, c) {
		    i.extend(b, a.canvasArr[c].getDiyAllData())
		}),
		global.user_template_id ? l.post("/Goods/edit", {
		    template_id: global.user_template_id,
		    content: JSON.stringify(global.content),
		    csrf_token: l("#csrf_token").val()
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		}) : l.post("/templet/api/create", {
		    template_id: global.template_id,
		    product_id: global.product_id,
		    content: JSON.stringify(global.content),
		    csrf_token: l("#csrf_token").val()
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), global.user_template_id = b.data.id, a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		})
    }
    function d(a) {
        var b = [];
        a.forEach(function (a, c) {
            b[c] = {},
			a.childElems.forEach(function (a) {
			    "diy_text" === a.attr("data-type") && (b[c][a.attr("data-mean")] = a.attr("data-content"))
			})
        }),
		k.set(j, JSON.stringify(b), {
		    expires: 30,
		    path: "/templet"
		})
    }
    function e() {
        return JSON.parse(k.get(j) || "[]")
    }
    function f(b) {
        l.post("/Goods/pdf", {
            template_id: global.user_template_id,
            product_id: global.product_id,
            csrf_token: l("#csrf_token").val()
        }).done(function (b) {
            if (200 === b.code) {
                m("保存预览数据成功"),
				a("zz/utils/beforeUnload").unbind();
                var c = l(".diy-tb-item.diy-tb-item-focus").data("code");
                if (c) var d = b.data.url + "?code=" + c;
                else var d = b.data.url + "?";
                /[?&]a=1(&|$)/.test(location.href) && (d += "&a=1"),
				l(document.body).hasClass("global-iframe") && (d += "&iframe=1"),
				global.easy_iframe ? window.parent.location.href = "http://www.zhubajie.com/c-mpkpsj/mpsj/index-reuse.html?iframe=" + encodeURIComponent(d) : location.href = d
            } else b.msg && n(b.msg)
        }).always(function () {
            b && b()
        })
    }
    function g(a) {
        a.preCb && a.preCb(),
		global.content.pages.forEach(function (b, c) {
		    i.extend(b, a.canvasArr[c].getDiyAllData())
		}),
		global.user_imitation_id ? l.post("/fz/templet/api/edit", {
		    imitation_id: global.user_imitation_id,
		    content: JSON.stringify(global.content)
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		}) : l.post("/fz/templet/api/create", {
		    imitation_id: global.imitation_id,
		    pid: global.pid,
		    name: global.name,
		    content: JSON.stringify(global.content),
		    task_id: global.task_id
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), global.user_imitation_id = b.data.id, a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		})
    }
    function h(a) {
        function b() {
            setTimeout(function () {
                l.get("/fz/templet/file/download?id=" + global.user_imitation_id).done(function (c) {
                    200 === c.code ? (a && a(), n('<a class="ui-button ui-button-lred" href="' + c.data.url + '" download >点击此处下载pdf</a>', null, "关闭")) : 0 !== e ? b() : (n("生成pdf超时, 请重新生成!!"), e = d, a && a())
                }).fail(function () {
                    n("生成pdf错误，请重试!!"),
					a && a()
                }),
				e--
            },
			c)
        }
        var c = 1e4,
		d = 60,
		e = d;
        l.post("/fz/templet/api/create/pdf", {
            imitation_id: global.user_imitation_id
        }).done(function (c) {
            200 === c.code ? b() : (c.msg && n(c.msg), a && a())
        }).fail(function () {
            a && a()
        })
    }
    var i = a("zz/utils/objs"),
	j = "diyCookieData",
	k = a("arale/cookie/1.0.2/cookie"),
	l = a("jquery/jquery/1.7.2/jquery"),
	m = a("zz/ui/info"),
	n = a("zz/ui/alert");
    b.save = c,
	b.buy = f,
	b.fangzhiSave = g,
	b.fangzhiPdf = h,
	b.saveCookie = d,
	b.getCookie = e
}),
define("diy/common/preview", ["jquery/jquery/1.7.2/jquery", "zz/utils/loadImgs", "zz/utils/objs", "zz/core/Class", "zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/types", "zz/ui/base/Panel", "zz/ui/Mask", "zz/utils/utils", "zz/ui/loading", "zz/ui/alert"],
function (a, b) {
    "use strict";
    function c(a, b) {
        if (!a.bgElem.attr("data-key")) return void j("你还没有添加背景图片哦！！");
        var c = a.getDiyAllData(),
		f = a.canvasSize;
        c = JSON.stringify(c),
		d = i("正在打开预览图..."),
		e.post(n, {
		    content: c,
		    zoom_size: f.mmWidth + "x" + f.mmHeight
		}).done(function (a) {
		    var c = f.pxWidth * k,
			d = f.pxHeight * k,
			g = h.ratioImg(c, d, l, l);
		    g = h.ratioImg(g[0], g[1], e(window).width() - 2 * m, e(window).height() - 2 * m),
			b(g[0], g[1], a)
		}).fail(function () {
		    j("系统出错了！！"),
			d.close()
		})
    }
    var d, e = a("jquery/jquery/1.7.2/jquery"),
	f = a("zz/utils/loadImgs"),
	g = a("zz/ui/Dialog"),
	h = a("zz/utils/utils"),
	i = a("zz/ui/loading"),
	j = a("zz/ui/alert"),
	k = .5,
	l = 500,
	m = 40,
	n = global.DIY_PREVIEW || "/Goods/design",
	o = global.DIY_PREVIEW_IMG || "/Goods/preview";
    b.open = function (a, b, h, i, l) {
        function m(a) {
            var b, c = "",
			d = "";
            return b = o + "?ratio=" + k + "&ctime=" + (new Date).getTime(),
			a && 200 === a.code && (c = a.data.key, d = a.data.time, b = b + "&key=" + c + "&time=" + d),
			b
        }
        var n = [];
        n.push(b),
		c(a[b],
		function (k, o, p) {
		    f({
		        imgs: [m(p)],
		        done: function (f) {
		            d.close();
		            var p, q = h ? "confirm-wrap" : "confirm-wrap none";
		            p = new g({
		                hasTitle: !1,
		                hasFoot: !1,
		                append: "<div class='" + q + "'>" + l + '<a class="ui-dialog-btn" data-action="confirm">确定</a><a class="ui-dialog-btn" data-action="close">取消</a></div>\n<div class=\'img-wrap\' style=\'padding:1px;\'>\n<a class="next-btn left" data-type="left" data-action="next" title="上一页"><i class="iconfont"></i></a>\n<a class="next-btn right" data-type="right" data-action="next" title="下一页"><i class="iconfont"></i></a>\n<img style=\'display:block\' data-index=' + b + " src=" + f.src + " width='" + k + "' height='" + o + "'></div>",
		                maskZindex: 10500,
		                closeToDispose: !0,
		                className: "diy-preview-dialog",
		                actions: {
		                    confirm: function () {
		                        i && i(),
								this.close()
		                    },
		                    next: function (b) {
		                        switch (e(b.currentTarget).attr("data-type")) {
		                            case "left":
		                                var f = this.curIndex - 1;
		                                0 > f && (f = a.length - 1);
		                                break;
		                            case "right":
		                                var f = this.curIndex + 1;
		                                f >= a.length && (f = 0)
		                        }
		                        if (this.curIndex = f, -1 === n.indexOf(f)) {
		                            if (!a[f].bgElem.attr("data-key")) return void j("你还没有添加背景图片哦！！");
		                            n.push(f),
									c(a[f],
									function (a, b, c) {
									    d.close();
									    var g = m(c);
									    e(".global-iframe").size() || p.css({
									        "margin-left": "-" + a / 2 + "px",
									        "margin-top": "-" + b / 2 + "px"
									    }),
										p.$target.find("img").hide().parent().append('<img src="' + g + '" data-index="' + f + '" width="' + a + '" height="' + b + '"/>')
									})
		                        } else {
		                            var g = this.$target.find("img").hide().filter("[data-index=" + f + "]");
		                            g.show();
		                            var h = g.width(),
									i = g.height();
		                            e(".global-iframe").size() || p.css({
		                                "margin-left": "-" + h / 2 + "px",
		                                "margin-top": "-" + i / 2 + "px"
		                            })
		                        }
		                    }
		                }
		            }),
					p.curIndex = b,
					p.open()
		        }
		    })
		})
    }
}),
define("diy/resizeControl", ["zz/plugins/actionMap", "jquery/jquery/1.7.2/jquery", "diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "zz/utils/utils"],
function (a) {
    "use strict";
    function b() {
        var a, b = f(window).height(),
		c = f(window).width(),
		h = 240,
		i = 200;
        f("#diyLeftContent").height(b - 70),
		f("#diyCanvasList").height(b - i).width(c - h),
		f("#diyWorkArea").height(b - i).width(c - h),
		a = f("#diyPageList").width(c - h),
		a.children("ul").width() < c - h && a.children("ul").width(c - h);
        var j = d.canvas.canvasSize,
		k = e.ratioImg(j.pxWidth, j.pxHeight, c - h - 20, b - i - 20)[2];
        g.setRange(k)
    }
    function c() {
        b(),
		f(window).resize(b)
    }
    a("zz/plugins/actionMap");
    var d = a("diy/canvasControl").getSelector(),
	e = a("zz/utils/utils"),
	f = a("jquery/jquery/1.7.2/jquery"),
	g = f("#diyToolPanel").data("rangeObj");
    c()
}),
define("diy/leftControl", ["zz/plugins/actionMap", "jquery/jquery/1.7.2/jquery", "zz/plugins/uploadFile", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/Tabs", "zz/utils/objs", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/Color2Picker", "jquery.color", "zz/plugins/input", "zz/ui/utils/colorConvert", "zz/extends/single", "zz/utils/keyCode", "diy/canvasControl", "zz/ui/plugins/selectable", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "diy/canvasDataControl", "zz/ui/Dialog", "zz/utils/loadImgs", "zz/ui/alert"],
function (a, b) {
    "use strict";
    function c() {
        n("#bgColor").click(function (a) {
            var b = new p,
			c = q.canvas,
			d = n(this);
            a.stopPropagation(),
			b.onceState("OPEN",
			function () {
			    d.addClass("select"),
				this.setColor(d.children("i").css("backgroundColor"))
			}).onceState("SELECT",
			function () {
			    var a = this.getColor();
			    c.addDiyBackground(a),
				d.children("i").css("backgroundColor", a)
			}).onceState("CLOSE",
			function () {
			    d.removeClass("select")
			}).open(n(this))
        }),
		n("#cancelBg").click(function () {
		    var a = q.canvas;
		    a.addDiyBackground("#FFFFFF"),
			n("#bgColor").children("i").css("backgroundColor", "#FFFFFF")
		})
    }
    function d() {
        l = new o({
            $controls: n("#diyLeftTab").children(),
            $panels: n("#diyLeftContent").children(),
            activeClass: "select",
            selectCb: function () {
                var a = n("#diyLeftContent"),
				b = a.height();
                a.height(b + 1),
				setTimeout(function () {
				    a.height(b)
				},
				100)
            }
        })
    }
    function e() {
        n("#diyLeftContent").actionMap({
            "del-img": function () {
                r("确定要删除该图片吗？",
				function () {
				    n(this).parent().remove()
				}.bind(this))
            }
        })
    }
    function f(a, b, c) {
        var d = n("#" + b),
		e = {},
		f = a + "UploadBtn";
        d.parent().attr("id", f),
		"diy_background" === a && (e = {
		    zoom_size: q.canvas.canvasSize.pxWidth + "x" + q.canvas.canvasSize.pxHeight
		}),
		global.isService && (e.sign = "WuJtLWxCnCIsJt0y0kaVUfkfdi5wa1Emn9ylsHiZ/U4=");
        var i = new plupload.Uploader({
            runtimes: "html5,gears,flash,silverlight,browserplus,html4",
            browse_button: b,
            container: f,
            url: global.DIY_UPLOAD || "/Goods/upload",
            flash_swf_url: global.DIY_UPLOAD_FLASH || "../../../../../../sfr/plupload.flash.swf"/*tpa=http://www.mayicy.cn/sfr/plupload.flash.swf*/,
            filters: [{
                title: "Images files",
                extensions: "jpg,png,jpeg"
            }],
            multipart_params: e || {}
        });
        return i.bind("Init",
		function (a, b) {
		    console.log("upload runtime: " + b.runtime)
		}),
		i.init(),
		i.bind("FilesAdded",
		function (b) {
		    "diy_photo" === a && j(a),
			"diy_background" === a && (i.settings.multipart_params || (i.settings.multipart_params = {}), i.settings.multipart_params.zoom_size = q.canvas.canvasSize.pxWidth + "x" + q.canvas.canvasSize.pxHeight, i.refresh()),
			g(a),
			setTimeout(function () {
			    b.start()
			},
			30)
		}),
		i.bind("FileUploaded",
		function (b, e, f) {
		    b.refresh();
		    var g, i, j, k = JSON.parse(f.response);
			//return t(f.response)
		    if (200 == k.code && k.data && (k = k.data), d.html(c), "diy_background" === a) {
		       if ("image/jpeg" !== k.mime_type) return t("请上传jpg格式图片"),
			  //return t(k.mode),
				void h();
		       if ("CMYK" !== k.mode) return t("请上传CMYK模式图片(0)"),
				void h();
		      // if (!k.dpi || 0 === k.dpi.length) return t("对不起，系统检测不出您图片的分辨率值，请尝试在ps上修改分辨率值再上传"),
				//void h();
		    //  if (k.dpi[0] < 300 || k.dpi[1] < 300) return t("您的分辨率值" + k.dpi[0] + "像素/每英寸不符合规定哦"),
				//void h();
		     //  if (g = Math.round(k.width / k.dpi[0] * 25.4), i = Math.round(k.height / k.dpi[1] * 25.4), j = q.canvas.canvasSize, j.mmWidth !== g && j.mmHeight !== i) return t("您上传的图片大小为" + g + "*" + i + "毫米不符合要求, 需要" + j.mmWidth + "*" + j.mmHeight + "毫米且分辨率≥300像素/英寸的图片!!"),
			// if (g = Math.round(k.width / 300 * 25.4), i = Math.round(k.height / 300 * 25.4), j = q.canvas.canvasSize, j.mmWidth !== g && j.mmHeight !== i) return t("您上传的图片大小为" + g + "*" + i + "毫米不符合要求, 需要" + j.mmWidth + "*" + j.mmHeight + "毫米且分辨率≥300像素/英寸的图片!!"),
				//void h();
		    }
			
			//修改为一样的了。没有RGB地址，后期再修改回来。
		   var l = "CMYK" === k.mode ? k.rgb_url : k.url;
			//return t(k.url)


		    s({
		        //imgs: [l + "!xmlog"],
				imgs: [l],				
		        done: function (b) {
		            var c = n("#diyLeftContent").children("[data-item=" + a + "]");
		            h();
		            var d = n.tmpl(u, {
		                src: b.src,
		                origin_width: k.width,
		                origin_height: k.height,
		                type: "diy_logo" === a ? "diy_user_logo" : a,
		                key: k.key,
		                dpiX: k.dpi ? k.dpi[0] : 0,
		                dpiY: k.dpi ? k.dpi[1] : 0
		            });
		            d.children("span").remove(),
					c.append(d)
		        }
		    })
		}),
		i.bind("UploadProgress",
		function (a, b) {
		    d.text("已上传: " + b.percent + "%"),
			100 == b.percent && d.html(c)
		}),
		i.bind("Error",
		function (a, b) {
		    console.error("Error: " + b.code + ", Message: " + b.message + (b.file ? ", File: " + b.file.name : "")),
			b.file && t("文件: " + b.file.name + "不符合规定哦！！"),
			h(),
			d.html(c),
			a.refresh()
		}),
		i
    }
    function g(a) {
        var b = n("<span class='img-wrap' data-type='img-preview'><span style=\"position:absolute;left:36px; top:36px;z-index:1;\">图片加载中。。。</span></span>");
        return b.css({
            height: "100px",
            border: "1px solid #ccc"
        }),
		n("#diyLeftContent").children("[data-item=" + a + "]").append(b),
		b
    }
    function h() {
        n("#diyLeftContent").find("[data-type=img-preview]").remove()
    }
    function i() {
        var a = n("#diyLeftContent"),
		b = n("<div id='diyLeftPhotoTab'class='diy-left-photo-tab'><a class='select' data-select='diy_logo'>快印素材</a><a data-select='diy_photo'>我的上传</a></div>");
        a.children("[data-item=diy_photo]").append(b),
		b.children("a").click(function () {
		    j(n(this).attr("data-select"))
		})
    }
    function j(a) {
        var b = n("#diyLeftPhotoTab");
        b.children("a").removeClass("select").filter("[data-select=" + a + "]").addClass("select"),
		n("#diyLeftContent").children("[data-item=diy_photo]").find("img[data-type]").parent().hide().end().filter("[data-type=" + a + "]").parent().show()
    }
    function k() {
        c(),
		e(),
		d(),
		i(),
		m = f("diy_background", "uploadBackground", "上传背景"),
		!global.isUser && f("diy_photo", "uploadPhoto", "上传图片"),
		f("diy_logo", "uploadLogo", "上传Logo")
    }
    a("zz/plugins/actionMap"),
	a("zz/plugins/uploadFile"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl");
    var l, m, n = a("jquery/jquery/1.7.2/jquery"),
	o = a("zz/ui/Tabs"),
	p = (a("zz/ui/base/Panel"), a("zz/ui/Color2Picker")),
	q = a("diy/canvasControl").getSelector(),
	r = a("zz/ui/confirm"),
	s = a("zz/utils/loadImgs"),
	t = a("zz/ui/alert"),
	u = "<span class='img-wrap'>\n    <a style=\"z-index:44\" class='del-btn' data-src='${src}' data-action='del-img' data-type='${type}'>×</a>\n    <span style=\"position:absolute;left:36px; top:36px;z-index:1;\">图片加载中。。。</span>\n    <img src='${src}' data-src='${src}' data-dpiX='${dpiX}' data-dpiY='${dpiY}' data-origin_width='${origin_width}' data-type='${type}' data-origin_height='${origin_height}' data-key=\"${key}\"draggable='false' class='ui-draggable'/>\n</span>";
    k(),
	b.select = function (a) {
	    l._select(a)
	}
}),
define("diy/materialControl", ["http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery/jquery/1.7.2/jquery", "zz/ui/Tabs", "zz/utils/objs", "zz/core/Class", "zz/utils/loadImgs", "zz/utils/types", "zz/ui/alert", "zz/ui/Dialog", "./config/configStaticData"],
function (a) {
    "use strict";
    function b() {
        var a = [],
		b = [];
        for (var c in j) a.push(global.s_domain + "/diy/fonts/" + c.split(".")[0] + ".png"),
		b.push(c);
        d({
            diy_text: {
                imgs: a,
                infos: b
            }
        },
		!0)
    }
    function c() {
        var a = [],
		b = [];
        k.forEach(function (c) {
            a.push(global.s_domain + "/diy/logos/" + c),
			b.push("/diy/logos/" + c)
        }),
		d({
		    diy_logo: {
		        imgs: a,
		        infos: b
		    }
		},
		!0,
		function (a) {
		    g("#diyLeftContent").children("[data-item=diy_photo]").append(a)
		})
    }
    function d(a, b, c) {
        i.forEach(a,
		function (a, d) {
		    h({
		        imgs: a.imgs,
		        infos: a.infos,
		        sync: b,
		        done: function (b, f, h) {
		            var i = e(b, f, h, d, a.imgs[f]);
		            c ? c(i, d) : g("#diyLeftContent").children("[data-item=" + d + "]").append(i)
		        },
		        loaded: function () {
		            console.log("loaded " + d)
		        }
		    })
		})
    }
    function e(a, b, c, d, e) {
        var f = g.tmpl(l, {
            src: e,
            width: a.width,
            height: a.height,
            type: d
        });
        switch (d) {
            case "diy_photo":
            case "diy_logo":
                f.children("img").attr("data-key", c);
                break;
            case "diy_background":
                f.children("img").attr("data-key", c);
                break;
            case "diy_text":
                f.children("img").attr("data-family", c);
                break;
            case "diy_frame":
                f.children("img").attr("data-info", c)
        }
        return f
    }
    function f() {
        b(),
		c()
    }
    a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl");
    var g = a("jquery/jquery/1.7.2/jquery"),
	h = (a("zz/ui/Tabs"), a("zz/utils/loadImgs")),
	i = a("zz/utils/objs"),
	j = (a("zz/ui/alert"), a("./config/configStaticData").fonts),
	k = a("./config/configStaticData").logos,
	l = "<span class='img-wrap'>\n    <a class='del-btn' data-src='${src}' data-action='del-img' data-type='${type}'>×</a>\n    <img src='${src}' data-src='${src}' data-origin_width='${width}' data-type='${type}' data-origin_height='${height}' draggable='false' class='ui-draggable'/>\n</span>";
    f()
}),
define("diy/config/configStaticData", [],
function (a, b) {
    "use strict";
    b.fonts = {
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf": "微软雅黑",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/heiti.ttf": "黑体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huawenxihei.ttf": "华文细黑",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhtjt.ttf": "方正黑体简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf": "方正大黑简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdbsjt.ttf": "方正大标宋简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzcsjt.ttf": "方正粗宋简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf": "方正综艺简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzlsjt.ttf": "方正隶书简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzl2jt.ttf": "方正隶二简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhpjt.ttf": "方正琥珀简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzktjt.ttf": "方正康体简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/youyuan.ttf": "幼圆",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/shishangzhonghei.ttf": "时尚中黑简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanghaibao.ttf": "华康海报体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf": "华康俪金黑体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangshaonv.ttf": "华康少女文字简W5",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangwawa.ttf": "华康娃娃体简W5",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangyasong.ttf": "华康雅宋体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/songti.ttc": "宋体"
    },
	b.logos = ["dragPhoto.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/dragPhoto.jpg*/, "logo1.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo1.png*/, "001.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/001.png*/, "002.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/002.png*/, "003.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/003.png*/, "004.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/004.png*/, "005.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/005.png*/,"006.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/006.png*/,"007.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/007.png*/,"008.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/008.png*/,"009.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/009.png*/,"010.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/010.png*/,"011.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/011.png*/,"012.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/012.png*/,"013.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/013.png*/,"014.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/014.png*/,"015.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/015.png*/,"tiaoxingma.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/tiaoxingma.png*/, "erweima.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/erweima.png*/, "white.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/white.png*/, "black.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/black.png*/]
}),
define("diy/dropControl", ["jquery/jquery/1.7.2/jquery", "diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/Dialog"],
function (a, b) {
    "use strict";
    function c() {
        f(".diy-r-canvas");
        f("#diyLeftContent").children("li").on("mouseover", "img",
		function () {
		    f(this).draggable({
		        cursor: "move",
		        appendTo: "body",
		        scope: "diy-r-canvas",
		        helper: function () {
		            return f(this).clone().addClass("diy-dragging-img")
		        },
		        revert: "invalid",
		        cursorAt: {
		            top: 20,
		            left: 70
		        }
		    })
		}),
		f("#diyLeftContent").children("[data-item=diy_photo],[data-item=diy_logo]").on("mouseover", "img",
		function () {
		    var a;
		    f(this).draggable({
		        cursor: "move",
		        appendTo: "body",
		        scope: "diy-r-canvas",
		        helper: function () {
		            return f(this).clone().addClass("diy-dragging-img")
		        },
		        revert: "invalid",
		        cursorAt: {
		            top: 20,
		            left: 70
		        },
		        start: function () {
		            a = f(".diy-r-canvas").find("[data-key='../../../../../../diy/logos/dragPhoto.jpg'/*tpa=http://www.mayicy.cn/diy/logos/dragPhoto.jpg*/]"),
					g.cancelSele(),
					a.droppable({
					    activeClass: "diy-canvas-active",
					    hoverClass: "diy-canvas-hover",
					    scope: "diy-r-canvas",
					    over: function (a, b) {
					        b.helper.css({
					            transform: "scale(1.2,1.2)",
					            opacity: .7
					        }),
							g.container.droppable("disable")
					    },
					    out: function (a, b) {
					        b.helper.css({
					            transform: "scale(1)",
					            opacity: 1
					        }),
							g.container.droppable("enable")
					    },
					    drop: function (a, b) {
					        return g.canvas.replaceDiyPhotoFromDragger(f(this), b.helper),
							g.seleElem(f(this)),
							g.container.removeClass("diy-canvas-active diy-canvas-hover").droppable("enable"),
							!1
					    }
					})
		        },
		        stop: function () {
		            a.droppable("destroy")
		        }
		    })
		})
    }
    function d() {
        var a = f(".diy-r-canvas");
        a.droppable({
            activeClass: "diy-canvas-active",
            hoverClass: "diy-canvas-hover",
            scope: "diy-r-canvas",
            over: function (a, b) {
                b.helper.css({
                    transform: "scale(1.2,1.2)",
                    opacity: .7
                })
            },
            out: function (a, b) {
                b.helper.css({
                    transform: "scale(1)",
                    opacity: 1
                })
            },
            drop: function (a, b) {
                var c, d = b.helper.attr("data-type");
                switch (d) {
                    case "diy_photo":
                        c = g.canvas.addDiyPhoto(b.helper).curElemArr;
                        break;
                    case "diy_text":
                        c = g.canvas.addDiyText(b.helper).curElemArr;
                        break;
                    case "diy_background":
                        var e = parseInt(b.helper.attr("data-origin_width")),
                        f = parseInt(b.helper.attr("data-origin_height")),
                        i = g.canvas.canvasSize.pxWidth,
                        j = g.canvas.canvasSize.pxHeight;
                       // if (!(f > e && j > i || e > f && i > j)) return void h("画布已经旋转，这张背景不能用于这张画布哦！！2473");
                        c = g.canvas.addDiyBackground(b.helper).curElemArr;
                        break;
                    case "diy_logo":
                        c = g.canvas.addDiyLogo(b.helper, "logo").curElemArr;
                        break;
                    case "diy_user_logo":
                        c = g.canvas.addDiyLogo(b.helper, "user_logo").curElemArr;
                        break;
                    case "diy_frame":
                        c = g.canvas.addDiyFrame(b.helper).curElemArr;
                        break;
                    case "diy_model":
                        c = g.canvas.addDiyModel(b.helper).curElemArr
                }
                g.seleMoreElems(c)
            }
        })
    }
    function e() {
        c(),
		d()
    }
    var f = a("jquery/jquery/1.7.2/jquery"),
	g = a("diy/canvasControl").getSelector(),
	h = a("zz/ui/alert");
    e(),
	b.reBindCanvasDrop = d
}),
define("diy/otherControl", ["zz/plugins/input", "jquery/jquery/1.7.2/jquery", "./canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/ui/plugins/state", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/utils/asserts", "zz/ui/confirm", "zz/ui/Dialog", "./models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/extends/single", "./models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "./config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "./canvasDataControl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "./config/configStaticData", "./models/CanvasClass", "./models/HistoryClass", "./models/canvasJsonWrap", "diy/canvasDataControl", "diy/config/canvasStaticData", "./common/cutter", "zz/utils/lazyDo"],
function (a) {
    "use strict";
    function b() {
        i("#diyOtherCitiao").change(function () {
            j.seleCanvas(1);
            var a = j.getSeleCanvas();
            a.toggleCitiao(this.checked ? !0 : !1)
        }),
		i("#diyOtherBianma").change(function () {
		    var a;
		    j.seleCanvas(0);
		    var b = j.getSeleCanvas();
		    this.checked ? (a = b.toggleBianma(!0), i("#diyOtherBianmaWrap").show(), global.isUser && i("#diyOtherBianmaInput").show(), i("#diyOtherBianmaBg").css("background-color", a.css("color")), c(a, b)) : (i("#diyOtherBianmaWrap").hide(), global.isUser && (i("#diyOtherBianmaInput").hide(), i("#diyOtherBianmaInfo").hide()), b.toggleBianma(!1))
		}),
		i("#diyOtherQiaming").click(function () {
		    var a = j.getSeleCanvas().addDiyQianming().curElemArr;
		    j.getSelector().seleMoreElems(a)
		})
    }
    function c(a, b) {
        var c = j.getSelector();
        a.draggable2({
            dragScope: b.container,
            snapAppendTo: b.container.parent(),
            startFn: function (d, e) {
                c.cancelSele(),
				e.snapArr = b.getSnapArr(a)
            },
            endFn: function () {
                var c = b.zoomRatio,
				d = +a.css("left").slice(0, -2) / c,
				e = +a.css("top").slice(0, -2) / c;
                a.attr({
                    "data-px-left": d,
                    "data-px-top": e,
                    "data-mm-left": k(d, 300),
                    "data-mm-top": k(e, 300)
                }),
				b.updateBianma(),
				b.history.triggerState("CHANGE")
            }
        })
    }
    function d() {
        var a, b = j.getCanvasArr(); (a = b[0].techs.$bianma) && (i("#diyOtherBianma")[0].checked = !0, i("#diyOtherBianmaWrap").show(), global.isUser && i("#diyOtherBianmaInput").show(), i("#diyOtherBianmaBg").css("background-color", a.css("color")), i("#diyOtherBianmaInput").find("input").val(a.attr("data-content")), c(a, b[0])),
		b[1].techs.$citiao && (i("#diyOtherCitiao")[0].checked = !0)
    }
    function e() {
        var a = '<p>附加工艺:</p><div><label>- 添加签名条：</label><a id="diyOtherQiaming" style="text-decoration:underline;color:#36c">添加</a></div><div><label>- 显示磁条: <input type="checkbox" id="diyOtherCitiao" /></label></div><div><label>- 显示编码: <input type="checkbox" id="diyOtherBianma"/></label></div><div id="diyOtherBianmaWrap"class="none"><label>- 修改编码颜色: </label><a id="diyOtherBianmaBg" src="javascript:;" data-type="bianma" class="ui-color-icon"style="position:relative;background-color:black;"></a></div><div id="diyOtherBianmaInput" class="none"><label>- 起始码: </label><input type="text" placeholder="NO.000001" value="NO.000001" style="width:100px"></div><div id="diyOtherBianmaInfo" class="none"><span style="color:red">起始码以NO.开头, 数字部分不能超过6位！</span></div>';
        i("#diyLeftTab").find(".other").show(),
		i("#diyLeftContent").find("[data-item=diy_other]").html(a)
    }
    function f() {
        var a = function (a) {
            {
                var b, c = new l,
				d = i(this);
                d.data("type")
            }
            b = m[0].techs.$bianma,
			c.onceState("OPEN",
			function () {
			    d.addClass("select"),
				this.setRGB(d.css("backgroundColor"))
			}).onceState("SELECT",
			function () {
			    var a = this.getRGB(),
				c = i.Color(a);
			    b.attr("data-color", "" + c.red() + "," + c.green() + "," + c.blue()),
				b.attr("data-cmyk", this.getStrCMYK()),
				d.css("backgroundColor", a),
				m[0].updateBianma(),
				m[0].history.triggerState("CHANGE")
			}).onceState("CLOSE",
			function () {
			    d.removeClass("select")
			}).open(i(this)),
			a.stopPropagation()
        };
        i("#diyOtherBianmaBg").click(a)
    }
    function g() {
        var a = i("#diyOtherBianmaInput"),
		b = function (a) {
		    return /^NO\..*/.test(a) && i.isNumeric(a.substr(3)) && a.substr(3).length <= o ? !0 : !1
		},
		c = n(function () {
		    var a = m[0],
			b = m[0].techs.$bianma;
		    b.attr("data-start", i(this).val().slice(3)),
			b.attr("data-content", i(this).val()),
			a.updateBianma(),
			a.history.triggerState("CHANGE")
		});
        a.find("input").onInput(function () {
            var a = i(this).val();
            b(a) ? (i(this).css("border", "1px solid #888"), i("#diyOtherBianmaInfo").hide(), c.apply(this)) : (i(this).css("border", "1px solid red"), i("#diyOtherBianmaInfo").show())
        })
    }
    function h() {
        "pvc" === global.category_en_name && (e(), b(), f(), d(), g())
    }
    a("zz/plugins/input");
    var i = a("jquery/jquery/1.7.2/jquery"),
	j = a("./canvasControl"),
	k = a("zz/utils/utils").px2mm,
	l = a("zz/ui/Color2Picker"),
	m = j.getCanvasArr(),
	n = a("zz/utils/lazyDo"),
	o = 6;
    h()
}),
define("diy/configPanel", ["diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/ui/plugins/state", "jquery/jquery/1.7.2/jquery", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/utils/asserts", "zz/ui/confirm", "zz/ui/Dialog", "diy/models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/extends/single", "diy/models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "diy/config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "diy/canvasDataControl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "diy/config/configStaticData", "diy/models/CanvasClass", "diy/models/HistoryClass", "diy/models/canvasJsonWrap", "diy/canvasDataControl", "diy/config/canvasStaticData", "diy/common/cutter", "diy/dropControl", "diy/canvasControl", "diy/models/SelectorClass", "diy/models/CanvasClass", "diy/toolControl", "jquery.mousewheel", "arale/cookie/1.0.2/cookie", "diy/common/userActions", "diy/common/preview", "zz/ui/Range", "diy/leftControl", "zz/plugins/uploadFile", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full", "zz/ui/Tabs"],
function (a) {
    "use strict";
    function b() {
        var a = "<label><input type='radio' name='page'value='{value}' {checked}>{num}页</label>",
		b = "",
		c = h.getPageArr(g.getType()),
		d = k('<div id="layoutPanel" class="diy-layout-panel">\n    <a id="diyLayoutBtn">设置</a>    \n    <p>朝向：</p>\n    <div>\n    <label><input type="radio" value="h" name="revert" checked>水平</label>\n    <label><input type="radio" value="v" name="revert">垂直</label>\n    </div>\n</div>');
        c && (c.forEach(function (c, d) {
            b += a.replace(/{num}/, c / 2).replace(/{value}/, c).replace(/{checked}/, 0 === d ? "checked" : "")
        }), b = "<p>页数：</p><div>" + b + "</div>", d.append(b), f = !0),
		d.appendTo("#diyWorkArea")
    }
    function c() {
        var a = g.getCanvasArr().length,
		b = g.getSeleCanvas().canvasSize,
		c = k("#layoutPanel"),
		d = b.mmWidth > b.mmHeight ? "h" : "v";
        f && (c.find("label>input[name=page][value=" + a + "]")[0].checked = !0),
		c.find("label>input[name=revert][value=" + d + "]")[0].checked = !0
    }
    function d() {
        k("#layoutPanel").hover(function () {
            k(this).css("right", "0px"),
			c()
        },
		function () {
		    k(this).css("right", "-152px")
		}).find("label").mousedown(function (a) {
		    var b = k(this).find("input"),
			c = b.attr("name"),
			d = b.val();
		    "page" === c ? (d = parseInt(d), g.changePage(d,
			function () {
			    i.reBindCanvasDrop(),
				j.reBind()
			})) : "revert" === c && g.revertCanvas(d),
			b[0].checked = !0,
			a.stopPropagation()
		})
    }
    function e() {
        var a;
        if ("pvc" != global.category_en_name && !global.isUser) {
            if (a = h.getCanvasData(g.getType()), a.noVerticalSize) return;
            b(),
			d()
        }
    }
    var f, g = a("diy/canvasControl"),
	h = a("diy/canvasDataControl"),
	i = a("diy/dropControl"),
	j = a("diy/toolControl"),
	k = (a("diy/leftControl"), a("jquery/jquery/1.7.2/jquery"));
    e()
}),
define("diy/canvasControl", ["http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/ui/plugins/state", "jquery/jquery/1.7.2/jquery", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/utils/asserts", "zz/ui/confirm", "zz/ui/Dialog", "diy/models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/extends/single", "diy/models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "diy/config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "diy/canvasDataControl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "diy/config/configStaticData", "diy/models/CanvasClass", "diy/models/HistoryClass", "diy/models/canvasJsonWrap", "diy/canvasDataControl", "diy/config/canvasStaticData", "diy/common/cutter"],
function (a) {
    "use strict";
    a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl"),
	a("zz/ui/plugins/selectable");
    var b = a("zz/core/Class"),
	c = (a("zz/utils/objs"), a("zz/ui/confirm")),
	d = a("diy/models/SelectorClass"),
	e = a("diy/models/CanvasClass"),
	f = a("jquery/jquery/1.7.2/jquery"),
	g = new (a("zz/ui/Color2Picker")),
	h = a("diy/canvasDataControl"),
	i = b().defState("CHANGE_CANVAS").attr({
	    THUMB_MAX_HEIGHT: 45,
	    THUMB_MIN_WIDTH: 55
	}).init(function () {
	    this._type = h.getTypeName(global.category_en_name, global.product_en_name),
		this._canvasArr = [],
		this._selector,
		this._$thumbList = f('<ul class="fn-clear"></ul>').appendTo(f("#diyPageList")),
		this._$canvasList = f("#diyCanvasList"),
		this._curIndex,
		this._createSelector(),
		this._createPageList(),
		this.seleCanvas(0),
		this._listenEvents(),
		this._listenCanvasMultiSele(),
		this._loadTemplate()
	}).method({
	    _createSelector: function () {
	        var a = {
	            isMultiInput: "card_commerce" === this._type ? !1 : !0
	        };
	        this._selector = new d(a)
	    },
	    _createPageList: function (a) {
	        var b, c, d = h.getSizeArr(this._type)[0];
	        this._$thumbList.width(20),
			b = global.content ? global.content.pages.length : h.defaultPageCount(this._type),
			a = a || b;
	        for (var e = 0; a > e; e++) c = this._createCanvas(e, d),
			this._createThumb(e, c, a);
	        2 === a ? (f("#diyPageList").css("overflow", "hidden"), this._$thumbList.css("width", "100%")) : f("#diyPageList").css("overflow-x", "scroll")
	    },
	    _listenEvents: function () {
	        var a = this;
	        this._canvasArr.forEach(function (b, c) {
	            var d = a._$thumbList.children().eq(c).children(".page-container");
	            b.onChangeClone(d)
	        }),
			this._$thumbList.actionMap({
			    selePage: function () {
			        var b = +f(this).attr("data-index");
			        a.seleCanvas(b),
					f(window).trigger("resize")
			    }
			})
	    },
	    _createCanvas: function (a, b) {
	        var c, d = f("#canvasTemplate").tmpl(),
			g = {
			    type: this._type,
			    index: a,
			    showLimitRect: !1,
			    overflowShow: global.isUser ? !1 : !0,
			    hasCutter: !0,
			    hasRadius: h.hasRadius(this._type),
			    canvasSize: h.toSizeDetailData(b),
			    hasSplitLine: h.hasSplitLine(this._type),
			    bianma: h.getBianmaData(this._type),
			    citiao: h.getCitiaoData(this._type)
			};
	        return this._$canvasList.append(d),
			c = new e(d.children(".diy-r-canvas"), g),
			this._canvasArr.push(c),
			c
	    },
	    _createThumb: function (a, b, c) {
	        var d, e, g, h = f("#pageTemplate"),
			i = b.canvasSize,
			j = b.opts.hasRadius,
			k = 0;
	        if (2 === c) 0 === a && (d = h.tmpl({
	            pageIndex: "正面"
	        })),
			1 === a && (d = h.tmpl({
			    pageIndex: "反面"
			}));
	        else {
	            var l = Math.round((a + 1) / 2),
				m = a % 2 === 0 ? "正面" : "反面";
	            d = h.tmpl({
	                pageIndex: "第" + l + "页" + m
	            }),
				a % 2 !== 0 && (d.css("margin-right", 25), k = 20)
	        }
	        this._$thumbList.append(d),
			e = this.THUMB_MAX_HEIGHT / i.pxHeight,
			d.width(i.pxWidth * e < this.THUMB_MIN_WIDTH ? this.THUMB_MIN_WIDTH : i.pxWidth * e).height(i.pxHeight * e).attr("data-index", a),
			g = d.children(".page-container"),
			g.width(i.pxWidth * e).height(i.pxHeight * e).data("thumbScale", e),
			j && d.css("border-radius", "14px"),
			this._$thumbList.width(this._$thumbList.width() + i.pxWidth * e + 12 + k)
	    },
	    getSeleCanvas: function () {
	        return this._canvasArr[this._curIndex]
	    },
	    seleCanvas: function (a) {
	        var b;
	        if (!(0 > a || a >= this._canvasArr.length) && this._curIndex !== a) {
	            b = this._canvasArr[a],
				this._curIndex = a,
				this._$canvasList.find(".diy-r-canvas").each(function (b) {
				    b === a ? f(this).parent().addClass("select") : f(this).parent().removeClass("select")
				}),
				this._selector.seleCanvas(b);
	            var c = f("#diyToolPanel").children(".ui-range").attr("data-value") / 100;
	            b.zoom(c || .6),
				this._$thumbList.children().removeClass("select").eq(a).addClass("select"),
				b.updateCutterByAnim(),
				this._isCreateDom ? this._updateDomData() : this._createDomData(),
				this.triggerState("CHANGE_CANVAS")
	        }
	    },
	    _createDomData: function () {
	        var a, b = this.getSeleCanvas().canvasSize,
			c = b.mmWidth,
			d = b.mmHeight,
			e = b.mmBlood,
			g = "<a data-hover='category' data-name='${category_en_name}'>${category_cn_name}</a> <span>&gt;</span> <a data-hover='product' data-parent-name='${category_en_name}' data-name='${product_en_name}'>${product_cn_name}</a> <span>&gt;</span> <span id='diyHeadSize'>${size}毫米</span>";
	        f("#diyBgData").html("尺寸：" + c + "*" + d + "毫米"),
			c -= 2 * e,
			d -= 2 * e,
			a = f.tmpl(g, {
			    category_cn_name: global.category_cn_name,
			    product_cn_name: global.product_cn_name,
			    category_en_name: global.category_en_name,
			    product_en_name: global.product_en_name,
			    size: c + "*" + d
			}),
			f("#diyTypeData").html(a),
			this._isCreateDom = !0
	    },
	    _updateDomData: function () {
	        var a = this.getSeleCanvas().canvasSize,
			b = a.mmWidth,
			c = a.mmHeight,
			d = a.mmBlood;
	        f("#diyBgData").html("尺寸：" + b + "*" + c + "毫米"),
			b -= 2 * d,
			c -= 2 * d,
			f("#diyHeadSize").html(b + "*" + c + "毫米")
	    },
	    _listenCanvasMultiSele: function () {
	        var a = this,
			b = f("#diyWorkArea");
	        b.find(".diy-r-canvas").each(function () {
	            f(this).on("mousedown.canvasSelect",
				function (b) {
				    var c, d, h = f(b.target),
					i = h.data("type"); !i && (c = h.parent().data("type")) ? (i = c, h = h.parent()) : !i && (d = h.parent().parent().data("type")) && (i = d, h = h.parent().parent()),
					i && ~e.TYPE_LIST.indexOf(i) ? (a._selector.seleElem(h, b, !0), f(this).selectable2({
					    isCancel: !0
					})) : (a._selector.cancelSele(), f(this).selectable2({
					    isCancel: !1
					})),
					g.close(),
					b.stopPropagation(),
					b.preventDefault()
				}).selectable2({
				    ignoreClass: "diy-background",
				    seleClass: "diy-elem",
				    endFn: function () {
				        a._selector.seleMoreElems(this.getSeleArr())
				    }
				})
	        }),
			b.selectable2({
			    ignoreClass: "diy-background",
			    seleClass: "diy-elem",
			    scopeElem: b.find(".diy-r-canvas"),
			    startFn: function () {
			        g.close()
			    },
			    endFn: function () {
			        a._selector.seleMoreElems(this.getSeleArr())
			    }
			})
	    },
	    getSelector: function () {
	        return this._selector
	    },
	    getCanvasArr: function () {
	        return this._canvasArr
	    },
	    _loadTemplate: function () {
	        var a = this;
	        if (global.content) a._canvasArr.forEach(function (b, c) {
	            b.loadCanvasData(global.content.pages[c]),
				a._revertThumb(c)
	        });
	        else {
	            var b = h.getDemoArr(this._type)[0];
	            b && a._canvasArr.forEach(function (a, c) {
	                b.pages[c] && a.loadCanvasData(b.pages[c])
	            })
	        }
	    },
	    _clear: function () {
	        this._$canvasList.empty(),
			this._$thumbList.empty(),
			this._canvasArr.length = 0,
			this._$thumbList.unActionMap(),
			this._curIndex = null
	    },
	    changePage: function (a, b) {
	        return a === this._canvasArr.length ? !1 : void c("改变画布页数之后画布上的所有数据将丢失!!",
			function () {
			    this._clear(),
				this._createPageList(a),
				this.seleCanvas(0),
				this._listenEvents(),
				this._listenCanvasMultiSele(),
				b && b()
			}.bind(this))
	    },
	    revertCanvas: function (a) {
	        var b, d;
	        this._curIndex % 2 === 0 ? (b = this._curIndex, d = this._curIndex + 1) : (b = this._curIndex - 1, d = this._curIndex),
			c("旋转画布之后将丢失画布上已有的数据！！",
			function () {
			    this._canvasArr[b].revertCanvas(a),
				this._canvasArr[d].revertCanvas(a),
				this._revertThumb(b),
				this._revertThumb(d),
				this._updateDomData(),
				f(window).resize()
			}.bind(this))
	    },
	    _revertThumb: function (a) {
	        var b = this._canvasArr[a].canvasSize,
			c = this._$thumbList.children().eq(a),
			d = this.THUMB_MAX_HEIGHT / b.pxHeight,
			e = c.width(),
			f = b.pxWidth * d,
			g = b.pxHeight * d;
	        c.width(f > this.THUMB_MIN_WIDTH ? f : this.THUMB_MIN_WIDTH).height(g),
			c.children(".page-container").width(f).height(g).data("thumbScale", d),
			this._$thumbList.width(this._$thumbList.width() + c.width() - e)
	    },
	    getType: function () {
	        return this._type
	    }
	});
    return new i
}),
define("diy/models/SelectorClass", ["zz/ui/plugins/draggable2", "zz/ui/plugins/state", "jquery/jquery/1.7.2/jquery", "zz/utils/objs", "zz/utils/types", "zz/utils/math", "zz/ui/base/Effect", "zz/core/Class", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/utils/asserts", "zz/extends/single", "diy/models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "diy/config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "zz/ui/Dialog", "diy/canvasDataControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/ui/Mask", "zz/ui/info", "zz/ui/confirm", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "diy/config/configStaticData"],
function (a) {
    "use strict";
    a("zz/ui/plugins/draggable2"),
	a("zz/ui/plugins/resizable2"),
	a("zz/ui/plugins/rotable2"),
	a("jquery.transform"),
	a("zz/plugins/actionMap"),
	a("jquery.color");
    var b, c = a("zz/core/Class"),
	d = a("zz/extends/single"),
	e = a("jquery/jquery/1.7.2/jquery"),
	f = a("diy/models/selectorToolWrap"),
	g = (a("zz/utils/loadImgs.js"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/zz/utils/loadImgs.js*/), a("zz/utils/types"), a("zz/ui/alert"), 20),
	h = ["../../../../../../diy/logos/black.png"/*tpa=http://www.mayicy.cn/diy/logos/black.png*/, "../../../../../../diy/logos/white.png"/*tpa=http://www.mayicy.cn/diy/logos/white.png*/, "../../../../../../diy/logos/dragPhoto.jpg"/*tpa=http://www.mayicy.cn/diy/logos/dragPhoto.jpg*/],
	i = c().defState("SELECT_ELEM", "SELECT_CANCEL").attr({
	    DEFAULT_OPTS: {
	        isEasy: !1,
	        isMultiInput: !0,
	        isTextType: !0
	    }
	}).init(function (a) {
	    this._opts = e.extend({},
		this.DEFAULT_OPTS, a),
		this.canvas,
		this.container,
		this._createSeleBox(),
		this.$rect = e("#diySelector"),
		this.$toolBox = e("#diyToolBox"),
		this.$sele = null,
		this.$seleArr = [],
		this._loadToolsData(),
		this.isEasy = this._opts.isEasy,
		this.$textarea,
		this._initInputTextArea(),
		e("#textMean").before('<a href="javascript:;" data-part="text" data-action="textCenterX" title="居中对齐" class="diy-tb-item center-x">文本块居中</a>\n')
	}).method({
	    cancelSele: function () {
	        var a = this.$sele;
	        if (a) switch (a.data("type")) {
	            case "diy_text":
	                var b = this.$textarea;
	                if (b.data("isEdit")) return a.attr("data-content", b.val().trim()),
                    a.attr("data-old-val") !== a.attr("data-content") && this.canvas.emitChange(a),
                    b.data("isEdit", !1),
                    void b.parent().hide();
	                break;
	            case "diy_frame":
	                this._hideController()
	        }
	        this.triggerState("SELECT_CANCEL"),
			this.$sele = null,
			this.$seleArr.length = 0,
			this.$rect.hide(),
			this.$toolBox.hide()
	    },
	    _loadToolsData: function () {
	        this._loadMeans(),
			this._loadFonts()
	    },
	    _loadMeans: function () {
	        var b, c, d = [],
			f = "<option value='{{key}}'>{{name}}</option>";
	        b = global.category_en_name && global.product_en_name ? a("diy/canvasDataControl").getMeanList(global.category_en_name, global.product_en_name) : a("diy/canvasDataControl").getMeanList(global.content.type, global.product_en_name);
	        for (var g in b) c = "-1" !== g ? b[g] : "选择文本类别",
			d.push(f.replace("{{name}}", c).replace("{{key}}", g));
	        e("#textMean").html(d.join(""))
	    },
	    _loadFonts: function () {
	        var b = "",
			c = "<option value='{{key}}'>{{name}}</option>",
			d = a("diy/config/configStaticData").fonts;
	        for (var f in d) b += c.replace("{{name}}", d[f]).replace("{{key}}", f);
	        e("#textFontFamily").html(b)
	    },
	    isEdit: function () {
	        return this.$textarea.data("isEdit")
	    },
	    seleCanvas: function (a) {
	        this.cancelSele(),
			this.canvas = a;
	        var b = this.$toolBox;
	        this.canvas.isAddState || (this.canvas.history.onState("TEXT_IMG_LOADED",
			function () {
			    this.updateRect()
			}.bind(this)), this.canvas.onState("UP_ENABLE",
			function (a) {
			    a ? b.find("[data-action=up]").removeClass("disabled") : b.find("[data-action=up]").addClass("disabled")
			}), this.canvas.onState("DOWN_ENABLE",
			function (a) {
			    a ? b.find("[data-action=down]").removeClass("disabled") : b.find("[data-action=down]").addClass("disabled")
			}), this.canvas.isAddState = !0),
			this.container = a.container
	    },
	    _setTextInput: function () {
	        console.log("click");
	        var a, b = this.$sele;
	        if (b && "diy_text" === b.data("type")) {
	            var c = this.$textarea,
				d = b.attr("data-content").trim(),
				e = b.offset();
	            return b.attr("data-old-val", d),
				c.data("isEdit", !0),
				c.parent().show().css({
				    left: e.left,
				    top: e.top
				}),
				a = c.next(),
				0 !== a.length && (a.css({
				    top: 0,
				    opacity: 0
				}).animate({
				    top: a.data("top"),
				    opacity: 1
				},
				500), a.data("isAddTimeOut") || (setTimeout(function () {
				    a.remove()
				},
				1e4), a.data("isAddTimeOut", !0))),
				c.attr({
				    "data-sele-width": b.width(),
				    "data-sele-height": b.height(),
				    "data-sele-left": e.left,
				    "data-sele-top": e.top
				}).width(this._getTextAreaWidth(d)).height(this._getTextAreaHeight(d)).val(d).focus().select(),
				"center" === this.$sele.attr("data-text_align") ? c.css("text-align", "center") : c.css("text-align", "left"),
				this.$rect.hide(),
				void this.$toolBox.hide()
	        }
	    },
	    isTextMultiLine: function () {
	        var a = this.$sele;
	        if (a && "diy_text" === a.data("type")) {
	            var b = a.attr("data-content").trim();
	            return 1 !== b.split("\n").length ? !0 : !1
	        }
	    },
	    _getTextAreaWidth: function (a) {
	        var c, d = 0,
			f = a.split("\n"),
			g = this.$textarea,
			h = g.parent();
	        return b || (b = e("<p>").appendTo(document.body).css({
	            position: "absolute",
	            left: 0,
	            top: 0,
	            "font-size": "14px",
	            "z-index": -100,
	            visibility: "hidden"
	        })),
			f.forEach(function (a) {
			    c = b.text(a.replace(/\s/g, "-")).width(),
				c > d && (d = c)
			}),
			d += 20,
			d < g.attr("data-sele-width") && (d = Math.round(g.attr("data-sele-width"))),
			h.css(d + parseInt(g.attr("data-sele-left")) + 15 > e(window).scrollLeft() + e(window).width() ? {
			    left: e(window).width() + e(window).scrollLeft() - d - 15
			} : {
			    left: g.attr("data-sele-left") + "px"
			}),
			d
	    },
	    _getTextAreaHeight: function (a) {
	        var b = a.split("\n").length * g,
			c = this.$textarea,
			d = this.$textarea.parent();
	        return b < c.attr("data-sele-height") && (b = Math.round(c.attr("data-sele-height"))),
			b + parseInt(c.attr("data-sele-top")) + 15 >= e(window).height() + e(window).scrollTop() ? (console.log(e(document.body).scrollTop()), d.css({
			    top: e(window).height() + e(window).scrollTop() - b - 15
			})) : d.css({
			    top: c.attr("data-sele-top") + "px"
			}),
			b
	    },
	    _initInputTextArea: function () {
	        var b, c, d = '<div class="pa none" style="z-index:10000;">\n<textarea type="text" style="position:absolute;left:0;top:0;background-color:#ddd;border:1px solid #aaa;padding:5px"></textarea>\n<div class="diy-tip" style="opacity: 0;color:red; background:#eee;width:245px;line-height:22px;text-align:left;height:48px;left:130px;top:0px">\n    {{content}}\n</div>\n</div>\n',
			f = this;
	        f._opts.isMultiInput ? (c = "<p>点击回车键可进行多行输入,点击esc 或 输入框外边可退出输入</p>\n", b = e(d.replace("{{content}}", c)).appendTo(document.body), b.find(".diy-tip").data("top", -49)) : (c = "<p>点击esc 或 输入框外边可退出输入</p>", b = e(d.replace("{{content}}", c)).appendTo(document.body), b.find(".diy-tip").data("top", -23).css({
	            height: 22
	        })),
			b = this.$textarea = b.find("textarea").css({
			    resize: "none",
			    "line-height": "19px",
			    overflow: "hidden"
			}),
			e(document).on("keydown.textedit",
			function (b) {
			    return f._opts.isMultiInput || b.keyCode != a("zz/utils/keyCode").get("enter") ? void 0 : void f.cancelSele()
			}),
			e(document).on("keyup.textedit",
			function (c) {
			    if (c.keyCode == a("zz/utils/keyCode").get("esc")) return f.cancelSele(),
				void c.preventDefault();
			    if (f.isEdit()) {
			        var d = f._getTextAreaHeight(b.val()),
					e = f._getTextAreaWidth(b.val());
			        b.height(d).width(e)
			    }
			})
	    },
	    updateRect: function () {
	        if (this.$sele) {
	            this.$rect.show(),
				this.$toolBox.show();
	            var a = this.$sele;
	            return this._setElemData(this.$rect, a),
				this._setToolBox(a.width(), a.height(), this.$rect.attr("data-rotate")),
				this
	        }
	        return 0 !== this.$seleArr.length ? (this.$rect.show(), this.$toolBox.show(), this._setBiggerRect(this.$seleArr), this._setToolBox(this.$rect.width(), this.$rect.height(), 0), this) : void 0
	    },
	    seleElem: function (a, b, c) {
	        this.cancelSele();
	        var d, e = (this.$rect, this);
	        if (a && a != this.$sele) {
	            this.$sele = a,
				this.$seleArr = [],
				this.triggerState("SELECT_ELEM"),
				this.updateRect();
	            var f = {
	                startFn: function (a, b) {
	                    e.updateRect(),
						d = e._getElemData(e.$rect),
						b.ratio = e.$rect.width() / e.$rect.height(),
						b.snapArr = e.canvas.getSnapArr(e.$sele),
						b.snapLen = e.isEasy ? 3 : 5
	                },
	                stepFn: function () {
	                    e._setElemData(e.$sele, e.$rect),
						e._checkSize(e.$sele),
						e._setToolBox(e.$sele.width(), e.$sele.height(), e.$rect.attr("data-rotate"))
	                },
	                endFn: function () {
	                    e._isChange(e.$rect, d) && (e.canvas.emitChange(e.$sele), e.updateRect(!1), e._checkSize(e.$sele, !0))
	                }
	            };
	            this.$rect.draggable2(f).draggable2({
	                dragScope: this.container,
	                snapAppendTo: this.container.parent()
	            }).resizable2(f).resizable2({
	                handlers: ["ne", "nw", "se", "sw", "s", "e", "w", "n"]
	            }).rotable2(f),
				"diy_text" === this.$sele.data("type") ? this.$rect.resizable2({
				    handlers: []
				}) : "diy_frame" === this.$sele.data("type") ? this._showDiyFrameController() : "diy_line" === this.$sele.data("type") && (this.$rect.unRotable2(), this.$rect.resizable2({
				    handlers: this.$rect.width() < this.$rect.height() ? ["n", "s"] : ["e", "w"]
				})),
				c && this.$rect.triggerDrag2(b)
	        }
	    },
	    seleMoreElems: function (a) {
	        var b = this,
			c = [];
	        return this.cancelSele(),
			a = a.filter(function (a) {
			    return a.hasClass("diy-elem") && !a.hasClass("diy-background") && a.parent().is(b.container) ? !0 : void 0
			}),
			0 == a.length ? this : 1 == a.length ? (this.seleElem(a[0]), this) : (this.$seleArr = a, this.updateRect(), void this.$rect.unRotable2().resizable2({
			    handlers: []
			}).draggable2({
			    dragScope: this.container,
			    snapAppendTo: this.container.parent(),
			    startFn: function (a, d) {
			        b.$seleArr.forEach(function (a, b) {
			            c[b] = a.position()
			        }),
					b.isEasy || (d.snapArr = b.canvas.getSnapArr.apply(b.canvas, b.$seleArr))
			    },
			    stepFn: function () {
			        var a = this.dragLen;
			        b.$seleArr.forEach(function (b, d) {
			            b.css({
			                left: c[d].left + a[0],
			                top: c[d].top + a[1]
			            })
			        }),
					b._setToolBox(b.$rect.width(), b.$rect.height(), 0)
			    },
			    endFn: function () {
			        b.canvas.history.add("edit", a)
			    }
			}))
	    },
	    _setBiggerRect: function (a) {
	        var b, c, d, e = 0,
			f = 0,
			g = 0,
			h = 0;
	        a.forEach(function (a) {
	            b = a.offset(),
				c = a.width(),
				d = a.height(),
				(b.left < e || 0 == e) && (e = b.left),
				(b.top < f || 0 == f) && (f = b.top),
				b.left + c > g && (g = b.left + c),
				b.top + d > h && (h = b.top + d)
	        }),
			this.$rect.attr("data-rotate", 0).transform({
			    rotate: "0deg"
			}).offset({
			    left: e,
			    top: f
			}).width(g - e).height(h - f)
	    },
	    moveElem: function (a, b) {
	        this.$sele && (this.$sele.css({
	            left: this.$sele.position().left + a,
	            top: this.$sele.position().top + b
	        }), this.canvas.emitChange(this.$sele), this.updateRect()),
			this.$seleArr && (this.$seleArr.forEach(function (c) {
			    c.css({
			        left: c.position().left + a,
			        top: c.position().top + b
			    })
			}), this.canvas.emitChange(this.$seleArr), this.updateRect())
	    },
	    _setElemData: function (a, b) {
	        var c, d = parseInt(b.attr("data-rotate") || 0);
	        c = (b == this.$rect || -1) * (parseInt(this.$rect.css("borderLeftWidth")) || 0),
			b.show(),
			a.show(),
			a.attr("data-rotate", d),
			a.width(b.width()),
			a.height(b.height()),
			a.offset({
			    left: b.offset().left + c,
			    top: b.offset().top + c
			})
	    },
	    _getElemData: function (a) {
	        return {
	            rotate: parseInt(a.attr("data-rotate") || 0),
	            left: parseInt(a.offset().left),
	            top: parseInt(a.offset().top),
	            width: a.width(),
	            height: a.height()
	        }
	    },
	    _isChange: function (a, b) {
	        var c = this._getElemData(a);
	        for (var d in b) if (c[d] !== b[d]) return !0;
	        return !1
	    },
	    _hideController: function () {
	        return this.$rect.find(".diy-selector-control").hide(),
			this
	    },
	    _showDiyFrameController: function () {
	        var a, b, c, d, f, g = this; (f = this.$rect.find(".diy-selector-control"))[0] || (f = e('<div class="diy-selector-control"><a class="diy-frame-larger" data-action="frame-larger" title="放大" src="javascript:void(0);">放大</a><a class="diy-frame-smaller" data-action="frame-smaller" title="缩小" src="javascript:void(0);">缩小</a><a id="framePhotoMoveBtn"class="diy-frame-move" title="拖动边框内图片" src="javascript:void(0);">拖动</a></div>'), this.$rect.append(f));
	        var h = this.$sele.find(".diy-frame-visual-wrap"),
			i = this.$sele.find(".diy-frame-photo");
	        i[0] && (f.show(), f.css({
	            width: h[0].style.width,
	            height: h[0].style.height,
	            left: h[0].style.left,
	            top: h[0].style.top
	        }), e("#framePhotoMoveBtn").draggable2({
	            dragTarget: "clone",
	            startFn: function (e) {
	                this.$dragTarget.css({
	                    visibility: "hidden"
	                }),
					a = e.clientX,
					b = e.clientY,
					c = parseInt(i.css("left")),
					d = parseInt(i.css("top"))
	            },
	            stepFn: function (e) {
	                i.css({
	                    left: c + e.clientX - a,
	                    top: d + e.clientY - b
	                })
	            },
	            endFn: function () {
	                g.canvas.history.add("edit", [g.$sele])
	            }
	        }), this.$rect.actionMap({
	            "frame-larger": function () {
	                g.canvas.scaleDiyFramePhoto(1.1, g.$sele),
					g.canvas.history.add("edit", [g.$sele]),
					g._checkSize(g.$sele)
	            },
	            "frame-smaller": function () {
	                g.canvas.scaleDiyFramePhoto(10 / 11, g.$sele),
					g.canvas.history.add("edit", [g.$sele]),
					g._checkSize(g.$sele)
	            }
	        }))
	    },
	    _checkSize: function (a, b) {
	        var c, d = a.data("type"),
			e = this.canvas.zoomRatio;
	        return "diy_frame" === d && (a = a.find(".diy-frame-photo")),
			c = a.attr("data-key"),
			c && -1 === h.indexOf(c) && a.size() && ["diy_photo", "diy_frame", "diy_decorate"].indexOf(d) + 1 && (!b && (a.width() > a.data("origin_width") * e + 1 || a.height() > a.data("origin_height") * e + 1) || b && (a.attr("data-width") > a.data("origin_width") || a.attr("data-height") > a.data("origin_height"))) ? (this._showWarnBox(!0), this) : (this._showWarnBox(!1), this)
	    },
	    _showWarnBox: function (a) {
	        var b = this.$rect.find(".diy-selector-warn");
	        b.size() || (b = e('<div class="diy-selector-warn"><img src="' + global.s_domain + '/diy/imgs/warn.png"></div>').hide().appendTo(this.$rect)),
			a ? b.attr("title", "像素不足，建议缩小图片，或换用更大图片！").show() : b.hide()
	    },
	    _createSeleBox: function () {
	        var a, b;
	        this.$rect || (e("#diySelectorBox").show(), a = e("#diySelector"), b = e("#diyToolBox"), a.css("zIndex", "1000"), e.browser.msie && (a.css("backgroundColor", "rgba(133,65,65,0.1)"), 8 == e.browser.version && a.css("opacity", "0.5")), a.dblclick(this._setTextInput.bind(this)), a.draggable2().resizable2().rotable2(), a.hide(), b.hide())
	    }
	}).wrap(f).wrap(d);
    return i
}),
define("diy/models/selectorToolWrap", ["jquery.color", "zz/plugins/focusRect", "jquery/jquery/1.7.2/jquery", "zz/utils/math", "zz/utils/objs", "zz/utils/types", "zz/ui/Color2Picker", "zz/plugins/input", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/utils/colorConvert", "zz/extends/single", "zz/utils/keyCode", "diy/config/canvasStaticData"],
function (a) {
    "use strict";
    function b(a) {
        var b = c.Color(a);
        return "" + b.red() + "," + b.green() + "," + b.blue()
    }
    a("jquery.color"),
	a("zz/plugins/focusRect");
    var c = a("jquery/jquery/1.7.2/jquery"),
	d = a("zz/utils/math"),
	e = a("zz/utils/objs"),
	f = new (a("zz/ui/Color2Picker")),
	g = a("diy/config/canvasStaticData");
    return {
        init: function () {
            this.$paste = c("#diyPasteBtn"),
			this._pasteSaveArr = [],
			this._defToolActions(),
			this._bindToolEvents()
        },
        _setToolBox: function (a, b, e) {
            var f, g, h = this.$rect,
			i = c(window).height(),
			j = c("#diyToolBox");
            this._setToolBoxContent(),
			f = [parseInt(h.css("left")) + h.width() / 2, parseInt(h.css("top")) + h.height() / 2],
			g = d.getRotateRect(a, b, e),
			j.css({
			    left: f[0] - j.width() / 2,
			    top: f[1] + g[1] / 2 + 10
			}),
			this.isEasy || j.offset().top + j.height() > i && j.offset({
			    top: i - j.height()
			})
        },
        _setToolBoxContent: function () {
            var a = c("#diyToolUp"),
			b = c("#diyToolBottom");
            if (this.$sele) {
                var d = this.$sele.attr("data-type").slice(4);
                this.canvas.checkIndex(this.$sele)
            } else var d = "multi";
            var e = ~["multi", "text"].indexOf(d) ? d : "photo";
            switch (a.show().children().hide().removeClass("select").filter("[data-part=" + e + "]").show(), b.children().show().filter("[data-action=edit]").hide(), d) {
                case "text":
                    var f = c("#textMean");
                    c("#textFontFamily").val(this.$sele.attr("data-family")),
                    c("#textFontSize").val(this.$sele.attr("data-size")),
                    this._opts.isTextType ? (f = f.val(this.$sele.attr("data-mean")).focusRect(!0), "-1" != this.$sele.attr("data-mean") || this.isEasy ? (this.$sele.children("i").hide(), f.unFocusRect()) : this.$sele.children("i").show()) : f.remove(),
                    c("#textColor").children("i").css("backgroundColor", "rgb(" + this.$sele.attr("data-color") + ")"),
                    "1" === this.$sele.attr("data-bold") && c("#textWeight").addClass("select"),
                    "1" === this.$sele.attr("data-italic") && c("#textItalic").addClass("select"),
                    "1" === this.$sele.attr("data-underline") && c("#textUnderline").addClass("select"),
                    "center" === this.$sele.attr("data-align") && a.find("[data-action=centerX]").addClass("select"),
                    "center" === this.$sele.attr("data-text_align") && a.find("[data-action=textCenterX]").addClass("select"),
                    this.isTextMultiLine() || a.find("[data-action=textCenterX]").hide(),
                    b.children("[data-action=edit]").show();
                    break;
                case "qianming":
                case "photo":
                    "center" === this.$sele.attr("data-align") && a.find("[data-action=centerX]").addClass("select"),
                    "center" === this.$sele.attr("data-alignY") && a.find("[data-action=centerY]").addClass("select");
                    break;
                case "multi":
                    c("#diyAlign").val("null"),
                    b.children("[data-action=down],[data-action=up]").hide()
            }
            if (this.isEasy) {
                var g = a.children("p[data-action=easy-info]");
                c("#diyToolBottom").hide(),
				0 == g.length ? a.append("<p data-action='easy-info' style='color:red'>注：使用上下左右键或鼠标拖动可移动该元素~~</p>") : g.show(),
				c("#textMean").hide()
            }
        },
        _bindToolEvents: function () {
            var a = this;
            c("#textFontFamily").change(function () {
                a.$sele.attr("data-family", c(this).val()),
				a.canvas.emitChange(a.$sele)
            }),
			c("#textFontSize").change(function () {
			    a.$sele.attr("data-size", c(this).val()),
				a.canvas.emitChange(a.$sele)
			}),
			c("#textMean").change(function () {
			    a.$sele.attr("data-mean", c(this).val());
			    var b = c.trim(a.$sele.attr("data-content")),
				d = !0;
			    e.forEach(g._meanAutoTexts,
				function (a) {
				    return a === b || "" === b ? (d = !1, e.breaker) : void 0
				}),
				!d && a.$sele.attr("data-content", g._meanAutoTexts[c(this).val()]),
				"-1" === c(this).val() ? a.$sele.children("i").show() : a.$sele.children("i").hide(),
				a.canvas.emitChange(a.$sele)
			}),
			c("#lineWidth").change(function () {
			    var b = a.$sele.attr("data-is-vertical");
			    a.$sele.css({
			        width: b ? parseInt(c(this).val()) + 10 : "+=0",
			        height: b ? "+=0" : parseInt(c(this).val()) + 10
			    }).children().css({
			        borderTopWidth: !b && c(this).val(),
			        borderLeftWidth: b && c(this).val()
			    }),
				a.seleElem(a.$sele)
			}),
			c("#lineStyle").change(function () {
			    var b = a.$sele.attr("data-is-vertical");
			    a.$sele.children().css({
			        borderTopStyle: b ? "none" : c(this).val(),
			        borderLeftStyle: b ? c(this).val() : "none"
			    })
			}),
			c("#diyAlign").change(function () {
			    var b = a.$seleArr,
				d = a.$rect.offset(),
				e = d.left,
				f = d.top,
				g = d.left + a.$rect.width(),
				h = d.top + a.$rect.height();
			    switch (c(this).val()) {
			        case "align-left":
			            b.forEach(function (a) {
			                a.attr("data-align", "left"),
                            a.offset({
                                left: e
                            })
			            });
			            break;
			        case "align-right":
			            b.forEach(function (a) {
			                a.attr("data-align", "right"),
                            a.offset({
                                left: g - a.width()
                            })
			            });
			            break;
			        case "align-top":
			            b.forEach(function (a) {
			                a.offset({
			                    top:
                                f
			                })
			            });
			            break;
			        case "align-bottom":
			            b.forEach(function (a) {
			                a.offset({
			                    top:
                                h - a.height()
			                })
			            });
			            break;
			        case "align-h-center":
			            b.forEach(function (a) {
			                a.offset({
			                    left:
                                e + (g - e) / 2 - a.width() / 2
			                })
			            });
			            break;
			        case "align-v-center":
			            b.forEach(function (a) {
			                a.offset({
			                    top:
                                f + (h - f) / 2 - a.height() / 2
			                })
			            })
			    }
			    a._setBiggerRect(b),
				a.canvas.emitChange(b)
			})
        },
        _defToolActions: function () {
            var a = this;
            this.$toolBox.actionMap({
                up: function () {
                    a.canvas.moveUp(a.$sele)
                },
                down: function () {
                    a.canvas.moveDown(a.$sele)
                },
                edit: function () {
                    a._setTextInput()
                },
                "delete": function () {
                    a.del()
                },
                copy: function () {
                    a.copy()
                },
                cut: function () {
                    a.cut()
                },
                color: function (d) {
                    var e = a.$sele,
					g = c(this).toggleClass("select"),
					h = e.attr("data-cmyk");
                    d.stopPropagation(),
					f.onceState("OPEN",
					function () {
					    this.setCMYK(h)
					}).onceState("SELECT",
					function () {
					    e && ("diy_text" === e.attr("data-type") ? (a.$sele && (a.$sele.attr("data-color", b(this.getRGB())), a.$sele.attr("data-cmyk", this.getStrCMYK())), c("#textColor").children("i").css("backgroundColor", this.getRGB()), g.removeClass("select"), a.canvas.emitChange(a.$sele)) : "diy_line" === e.attr("data-type"))
					}).open(c(this))
                },
                stylus: function () {
                    var b = c(this),
					d = b.attr("data-type");
                    b.toggleClass("select"),
					b.hasClass("select") ? a.$sele.attr("data-" + d, 1) : a.$sele.attr("data-" + d, 0),
					a.canvas.emitChange(a.$sele)
                },
                "distribute-h": function () {
                    var b, c = a.$seleArr,
					d = [];
                    c = c.sort(function (a, b) {
                        return a.offset().left - b.offset().left
                    }),
					c.forEach(function (a, b, c) {
					    b !== c.length - 1 && d.push(c[b + 1].offset().left - a.offset().left - a.width())
					}),
					b = d.reduce(function (a, b) {
					    return a + b
					}) / d.length,
					c.forEach(function (a, c, d) {
					    0 !== c && a.offset({
					        left: d[c - 1].offset().left + d[c - 1].width() + b
					    })
					}),
					a.canvas.history.add("edit", c)
                },
                "distribute-v": function () {
                    var b, c = a.$seleArr,
					d = [];
                    c = c.sort(function (a, b) {
                        return a.offset().top - b.offset().top
                    }),
					c.forEach(function (a, b, c) {
					    b !== c.length - 1 && d.push(c[b + 1].offset().top - a.offset().top - a.height())
					}),
					b = d.reduce(function (a, b) {
					    return a + b
					}) / d.length,
					c.forEach(function (a, c, d) {
					    0 !== c && a.offset({
					        top: d[c - 1].offset().top + d[c - 1].height() + b
					    })
					}),
					a.canvas.history.add("edit", c)
                },
                filter: function () {
                    c(this).parent().hide().nextAll(":lt(3)").show()
                },
                centerX: function () {
                    "center" === a.$sele.attr("data-align") ? (a.$sele.attr("data-align", "left"), c(this).removeClass("select")) : (c(this).addClass("select"), a.canvas.centerX(a.$sele), a.updateRect())
                },
                textCenterX: function () {
                    "center" === a.$sele.attr("data-text_align") ? (a.$sele.attr("data-text_align", "left"), c(this).removeClass("select"), a.canvas.emitChange(a.$sele)) : (a.$sele.attr("data-text_align", "center"), c(this).addClass("select"), a.canvas.emitChange(a.$sele))
                },
                centerY: function () {
                    "center" === a.$sele.attr("data-alignY") ? (a.$sele.attr("data-alignY", "left"), c(this).removeClass("select")) : (c(this).addClass("select"), a.canvas.centerY(a.$sele), a.updateRect())
                },
                replace: function () { }
            },
			null, {
			    disabled: !0
			}),
			this.$paste.actionMap({
			    paste: function () {
			        a.paste()
			    },
			    "paste-cancel": function () {
			        a._pasteSaveArr = [],
					a.$paste.hide()
			    }
			})
        },
        copy: function () {
            var a = this,
			b = a.$sele ? [a.$sele] : a.$seleArr;
            return 0 === b.length ? this : (a._pasteSaveArr.length = 0, a._pasteSaveArr = b.slice(), void a.$paste.show())
        },
        cut: function () {
            this.copy(),
			this.canvas.delDiyElements.apply(this.canvas, this._pasteSaveArr),
			this.cancelSele()
        },
        paste: function () {
            var a = [],
			b = this;
            this._pasteSaveArr.forEach(function (c) {
                c = c.clone(),
				c.attr({
				    "data-left": c.attr("data-left") * b.canvas.zoomRatio + 10,
				    "data-top": c.attr("data-top") * b.canvas.zoomRatio + 10
				}),
				a.push(c)
            });
            var c = this.canvas.addDiyElements.apply(this.canvas, a).curElemArr;
            this.seleMoreElems(c),
			this._pasteSaveArr.length = 0,
			this.$paste.hide()
        },
        del: function () {
            var a = this.$sele ? [this.$sele] : this.$seleArr;
            this.canvas.delDiyElements.apply(this.canvas, a),
			this.cancelSele()
        }
    }
}),
define("diy/config/canvasStaticData", [],
function (a, b) {
    "use strict";
    b._meanAutoTexts = {
        title1: "标题1",
        title2: "标题2",
        title3: "标题3",
        text1: "文本1",
        text2: "文本2",
        text3: "文本3",
        cardName: "贵宾卡",
        leval: "VIP",
        number: "NO.000001",
        id: "ID:000001",
        barcode: "条形码区",
        logo: "LOGO",
        company: "中山六匹马网络科技有限公司",
        username: "蚂  蚁",
        job: "总经理",
        website: "网站：http://www.mayicy.cn",
        mobile: "手机：xxxxxxxxxxx",
        telphone: "电话：4006-027-359",
        address: "地址：武汉市江汉区菱角湖万达A3座1120",
        email: "邮箱：service@6pima.cn",
        fax: "传真：4006-027-359",
        advert: "广告语",
        qq: "QQ：4006027359",
        info1: "说明一",
        info2: "说明二",
        other: "其他",
        "-1": "双击编辑文字",
        company_: "Wuhan mayicy Valley Technology Co., Ltd.",
        username_: "mayi xiao",
        job_: "CEO",
        website_: "site：http://www.mayicy.cn",
        mobile_: "Mobile：4006-027-359",
        telphone_: "Tel：xxxxxxxxxxx",
        address_: "Add：No.13 Mayicy Rd, New JiangHan District, WhuHan City.",
        email_: "Email：service@6pima.cn",
        fax_: "Fax：4006-027-359"
    },
	b._canvasData = {
	    pvc_pvc: {
	        defaultPageCount: 2,
	        hasRadius: !0,
	        canAddPage: !1,
	        sizeArr: [[85.5, 54, 1.5, 3]],
	        demoArr: [{
	            type: "pvc_pvc",
	            pages: [{
	                canvas: {
	                    width: 85.5,
	                    height: 54,
	                    hasRadius: !0,
	                    blood: 1.5,
	                    limit: 3
	                },
	                elements: [{
	                    type: "diy_text",
	                    index: "0",
	                    align: "left",
	                    center_x: 547,
	                    center_y: 286,
	                    width: 394,
	                    height: 182,
	                    left: 350.58,
	                    top: 195.27,
	                    rotate: "0",
	                    content: "VIP",
	                    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
	                    size: 60,
	                    color: "0,0,0",
	                    cmyk: "0,0,0,100",
	                    bold: "0",
	                    italic: "0",
	                    underline: "0",
	                    mean: "leval",
	                    text_align: "left"
	                },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 821,
					    center_y: 71.5,
					    width: 316,
					    height: 29,
					    left: 663.75,
					    top: 57.74,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 574.17,
					    center_y: 70.67,
					    width: 128.33,
					    height: 53.33,
					    left: 510.22,
					    top: 44.21,
					    rotate: "0",
					    key: "logo1.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo1.png*/,
					    origin_width: 463,
					    origin_height: 192,
					    src: "../../../../../../images/logo1.png"/*tpa=http://www.mayicy.cn/images/logo1.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 244,
					    center_y: 383,
					    width: 168,
					    height: 54,
					    left: 160.84,
					    top: 356.15,
					    rotate: "0",
					    content: "贵宾卡",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhtjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "cardName",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 821.5,
					    center_y: 580.5,
					    width: 295,
					    height: 33,
					    left: 674.17,
					    top: 564.93,
					    rotate: "0",
					    content: "尊贵特权，会员专享",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 8,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000047.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../images/rgb-0000000047.jpg"/*tpa=http://www.mayicy.cn/images/rgb-0000000047.jpg*/,
	                    dpi: ["300", "300"]
	                },
	                techs: [{
	                    type: "diy_bianma",
	                    cmyk: "0,0,0,100",
	                    color: "0,0,0",
	                    width: 25,
	                    height: 4,
	                    left: 6.24,
	                    top: 47.83,
	                    content: "NO.000001",
	                    locate: "right_bottom",
	                    pre: "NO.",
	                    step: 1,
	                    start: "000001"
	                }]
	            },
				{
				    canvas: {
				        width: 85.5,
				        height: 54,
				        hasRadius: !0,
				        blood: 1.5,
				        limit: 3
				    },
				    elements: [{
				        type: "diy_text",
				        index: "0",
				        align: "left",
				        center_x: 299.5,
				        center_y: 367.5,
				        width: 465,
				        height: 29,
				        left: 67.55,
				        top: 353.22,
				        rotate: "0",
				        content: "1. 此卡仅限本人所有，不得转让他人",
				        family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
				        size: 7,
				        color: "0,0,0",
				        cmyk: "0,0,0,100",
				        bold: "0",
				        italic: "0",
				        underline: "0",
				        mean: "info1",
				        text_align: "left"
				    },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 256,
					    center_y: 409.5,
					    width: 378,
					    height: 29,
					    left: 67.55,
					    top: 395.3,
					    rotate: "0",
					    content: "2. 客户凭借此卡享受九折优惠",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 342,
					    center_y: 451.5,
					    width: 550,
					    height: 29,
					    left: 67.55,
					    top: 437.39,
					    rotate: "0",
					    content: "3. 使用此卡需遵守本公司相关法律条款原则",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 271.5,
					    center_y: 494,
					    width: 409,
					    height: 30,
					    left: 67.55,
					    top: 479.45,
					    rotate: "0",
					    content: "4. 此卡最终解释权归本公司所有",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 313.5,
					    center_y: 274.5,
					    width: 97,
					    height: 37,
					    left: 265.22,
					    top: 256.48,
					    rotate: "0",
					    content: "签名：",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 341.5,
					    center_y: 621.5,
					    width: 549,
					    height: 25,
					    left: 67.55,
					    top: 609.83,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 6,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 6,
					    align: "left",
					    center_x: 856.5,
					    center_y: 623,
					    width: 247,
					    height: 24,
					    left: 733.67,
					    top: 611.52,
					    rotate: "0",
					    content: "电话：4006-027-359",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 6,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "telphone",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000047.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../images/rgb-0000000047.jpg"/*tpa=http://www.mayicy.cn/images/rgb-0000000047.jpg*/,
				        dpi: ["300", "300"]
				    },
				    techs: [{
				        type: "diy_citiao",
				        cmyk: "0,0,0,100",
				        color: "0,0,0",
				        top: 5.5,
				        height: 12
				    },
					{
					    type: "diy_qianming",
					    cmyk: "0,0,0,0",
					    color: "255,255,255",
					    left: 32.68,
					    top: 21.08,
					    width: 24.98,
					    height: 4.23
					}]
				}],
	            "extends": {
	                rotate: !0
	            }
	        }],
	        citiao: {
	            cmyk: "0,0,0,100",
	            color: "0,0,0",
	            top: 4,
	            height: 12
	        },
	        bianma: {
	            cmyk: "0,0,0,100",
	            color: "0,0,0",
	            width: 25,
	            height: 4,
	            left: 7,
	            top: 45,
	            content: "NO.000001"
	        },
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    card_commerce: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3], [54, 90, 1, 3]],
	        demoArr: [{
	            type: "card_commerce",
	            pages: [{
	                canvas: {
	                    width: 90,
	                    height: 54,
	                    blood: 1
	                },
	                elements: [{
	                    type: "diy_logo",
	                    index: "0",
	                    align: "left",
	                    center_x: 872.33,
	                    center_y: 162.17,
	                    width: 276.67,
	                    height: 158.33,
	                    left: 734.51,
	                    top: 83.35,
	                    rotate: "0",
	                    key: "../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,
	                    origin_width: 290,
	                    origin_height: 167,
	                    src: "../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,
	                    dpi: [0, 0],
	                    img_type: "logo"
	                },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 157,
					    center_y: 110.5,
					    width: 172,
					    height: 55,
					    left: 71.19,
					    top: 83.35,
					    rotate: "0",
					    content: "蚂  蚁",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "username",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 274,
					    center_y: 191,
					    width: 114,
					    height: 36,
					    left: 217.05,
					    top: 173.64,
					    rotate: "0",
					    content: "总经理",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "job",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 232.5,
					    center_y: 417.5,
					    width: 323,
					    height: 37,
					    left: 71.19,
					    top: 399.38,
					    rotate: "0",
					    content: "手机：xxxxxxxxxxx",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "mobile",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 292,
					    center_y: 469,
					    width: 442,
					    height: 40,
					    left: 71.19,
					    top: 449.73,
					    rotate: "0",
					    content: "邮箱：service@6pima.cn",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "email",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 487.5,
					    center_y: 527,
					    width: 833,
					    height: 38,
					    left: 71.19,
					    top: 508.77,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000424.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,
	                    dpi: ["300", "300"]
	                }
	            },
				{
				    canvas: {
				        width: 90,
				        height: 54,
				        blood: 1
				    },
				    elements: [{
				        type: "diy_logo",
				        index: "0",
				        align: "left",
				        center_x: 889.04,
				        center_y: 179,
				        width: 276.09,
				        height: 158.01,
				        left: 751.87,
				        top: 100.71,
				        rotate: "0",
				        key: "../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,
				        origin_width: 290,
				        origin_height: 167,
				        src: "../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,
				        dpi: [0, 0],
				        img_type: "logo"
				    },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 174,
					    center_y: 127.5,
					    width: 172,
					    height: 55,
					    left: 88.56,
					    top: 100.71,
					    rotate: "0",
					    content: "蚂  蚁",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "username",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 291,
					    center_y: 209,
					    width: 114,
					    height: 36,
					    left: 234.42,
					    top: 191.01,
					    rotate: "0",
					    content: "总经理",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "job",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 249.5,
					    center_y: 434.5,
					    width: 323,
					    height: 37,
					    left: 88.56,
					    top: 416.74,
					    rotate: "0",
					    content: "手机：xxxxxxxxxxx",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "mobile",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 309,
					    center_y: 487,
					    width: 442,
					    height: 40,
					    left: 88.56,
					    top: 467.1,
					    rotate: "0",
					    content: "邮箱：service@6pima.cn",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "email",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 504.5,
					    center_y: 545,
					    width: 833,
					    height: 38,
					    left: 88.56,
					    top: 526.14,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000424.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,
				        dpi: ["300", "300"]
				    }
				}]
	        }],
	        meanList: {
	            "-1": "双击编辑文字",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            info1: "说明一",
	            info2: "说明二",
	            other: "其他",
	            company_: "公司名(英文)",
	            username_: "姓名(英文)",
	            job_: "职位(英文)",
	            website_: "网址(英文)",
	            mobile_: "手机(英文)",
	            telphone_: "电话(英文)",
	            address_: "地址(英文)",
	            email_: "邮箱(英文)",
	            fax_: "传真(英文)"
	        }
	    },
	    market_greeting: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[285, 210, 3, 8]],
	        hasSplitLine: !0,
	        noVerticalSize: !0,
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_award: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_coupon: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[180, 54, 1, 3], [90, 162, 1, 3]],
	        demoArr: [{
	            type: "market_coupon",
	            pages: [{
	                canvas: {
	                    width: 180,
	                    height: 54,
	                    blood: 1
	                },
	                elements: [{
	                    type: "diy_text",
	                    index: "0",
	                    align: "center",
	                    center_x: 1074.5,
	                    center_y: 331,
	                    width: 421,
	                    height: 220,
	                    left: 864.5,
	                    top: 221.32,
	                    rotate: "0",
	                    content: "100",
	                    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf",
	                    size: 72,
	                    color: "0,0,0",
	                    cmyk: "0,0,0,100",
	                    bold: "0",
	                    italic: "0",
	                    underline: "0",
	                    mean: "id",
	                    text_align: "left"
	                },
					{
					    type: "diy_logo",
					    index: 1,
					    align: "left",
					    center_x: 1943.99,
					    center_y: 519.99,
					    width: 233.97,
					    height: 155.98,
					    left: 1827.5,
					    top: 442.65,
					    rotate: "0",
					    key: "../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,
					    origin_width: 550,
					    origin_height: 367,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 1697.72,
					    center_y: 516.72,
					    width: 145.44,
					    height: 145.44,
					    left: 1625.15,
					    top: 444.75,
					    rotate: "0",
					    key: "../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,
					    origin_width: 512,
					    origin_height: 512,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 1381.5,
					    center_y: 402,
					    width: 71,
					    height: 72,
					    left: 1346.91,
					    top: 366.76,
					    rotate: "0",
					    content: "元",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf",
					    size: 19,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 276.5,
					    center_y: 84,
					    width: 415,
					    height: 38,
					    left: 69.58,
					    top: 65.34,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000486.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,
	                    dpi: ["300", "300"]
	                }
	            },
				{
				    canvas: {
				        width: 180,
				        height: 54,
				        blood: 1
				    },
				    elements: [{
				        type: "diy_text",
				        index: "0",
				        align: "center",
				        center_x: 1074.5,
				        center_y: 327,
				        width: 421,
				        height: 220,
				        left: 864.5,
				        top: 217.11,
				        rotate: "0",
				        content: "100",
				        family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf",
				        size: 72,
				        color: "0,0,0",
				        cmyk: "0,0,0,100",
				        bold: "0",
				        italic: "0",
				        underline: "0",
				        mean: "id",
				        text_align: "left"
				    },
					{
					    type: "diy_logo",
					    index: 1,
					    align: "left",
					    center_x: 1945.99,
					    center_y: 515.99,
					    width: 233.97,
					    height: 155.98,
					    left: 1829.61,
					    top: 438.43,
					    rotate: "0",
					    key: "../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,
					    origin_width: 550,
					    origin_height: 367,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 1699.72,
					    center_y: 512.72,
					    width: 145.44,
					    height: 145.44,
					    left: 1627.25,
					    top: 440.54,
					    rotate: "0",
					    key: "../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,
					    origin_width: 512,
					    origin_height: 512,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 1384.5,
					    center_y: 398,
					    width: 71,
					    height: 72,
					    left: 1349.02,
					    top: 362.55,
					    rotate: "0",
					    content: "元",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf",
					    size: 19,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 278.5,
					    center_y: 86,
					    width: 415,
					    height: 38,
					    left: 71.67,
					    top: 67.45,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000486.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,
				        dpi: ["300", "300"]
				    }
				}]
	        }],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_order: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    advert_leaflet: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[210, 285, 3, 8]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_funcard: {
	        defaultPageCount: 10,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3], [54, 90, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_postcard: {
	        defaultPageCount: 16,
	        pageArr: [16, 2],
	        hasRadius: !1,
	        canAddPage: !0,
	        sizeArr: [[148, 100, 3, 6]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    office_calendar: {
	        defaultPageCount: 26,
	        pageArr: [26, 14],
	        hasRadius: !1,
	        canAddPage: !0,
	        sizeArr: [[210, 148, 3, 6]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    }
	},
	b._canvasData.card = b._canvasData.card_pvc = b._canvasData.card_advance = b._canvasData.card_double11 = b._canvasData.card_commerce
}),
define("diy/canvasDataControl", ["jquery/jquery/1.7.2/jquery", "zz/ui/alert", "zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/Mask", "zz/ui/info", "zz/ui/confirm", "diy/config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload"],
function (a, b) {
    "use strict";
    var c, d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/ui/alert"),
	f = (a("zz/ui/Dialog"), a("zz/ui/info")),
	g = a("zz/ui/confirm"),
	h = "_",
	i = a("diy/config/canvasStaticData")._canvasData,
	j = global.template_id || global.user_template_id,
	k = j ? !0 : !1,
	l = a("zz/utils/utils").mm2px;
    b.save = function (b, c, g) {
        var h = k ? "/design/api/edit" : "/design/api/create",
		i = {
		    content: JSON.stringify(b),
		    width: b.pages[0].canvas.width,
		    height: b.pages[0].canvas.height,
		    category_id: global.category_id,
		    product_id: global.product_id,
		    csrf_token: d("#csrf_token").val(),
		    version: 1
		},
		l = a("zz/utils/utils").getUrlData("fc");
        l && !k && (i.fc = l),
		j && (i.template_id = j),
		d.post(h, i).done(function (a) {
		    200 == a.code ? (k = !0, a.data && a.data.id && (j = a.data.id), !g && f("保存成功"), console.log("saved template: " + j), c && c(!0)) : 403 == a.code ? (!g && e(a.msg), c && c(!1)) : (!g && e("系统出错了！！"), c && c(!1))
		}).fail(function () {
		    c && c(!1)
		})
    },
	b.audit = function (b) {
	    c || (c = a("common/submitDesignDialog").init({
	        id: j,
	        name: global.name,
	        url: "/design/api/audit",
	        cb: b,
	        done: function (b) {
	            200 == b.code ? (a("zz/utils/beforeUnload").unbind(), c.close(), g('<p style="color:#c8101c;font-size:16px"><i></i>提交审核成功, 还想再做一张吗？</p>',
				function () {
				    location.href = "http://www.mayicy.cn/design/" + global.category_id + "/" + global.product_id + "/create"
				},
				function () {
				    location.href = "http://www.mayicy.cn/myky/design"
				},
				["好的, 我还有战斗力 ^_^", "不做了"])) : e(403 == b.code ? b.msg : "系统出错了！！")
	        }
	    })),
		j ? c.open() : (e("你还没有保存模版哦~~"), b && b())
	},
	b.getSizeArr = function (a) {
	    return i[a].sizeArr || []
	},
	b.getDemoArr = function (a) {
	    var b = i[a].demoArr || [];
	    return b.forEach(function (a) {
	        a.pages.forEach(function (a) {
	            delete a.background
	        })
	    }),
		b
	},
	b.getMeanList = function (a, c) {
	    var d;
	    return d = c ? b.getTypeName(a, c) : a,
		i[d].meanList
	},
	b.hasRadius = function (a) {
	    return i[a].hasRadius
	},
	b.hasSplitLine = function (a) {
	    return i[a].hasSplitLine
	},
	b.getCanvasData = function (a) {
	    return i[a]
	},
	b.defaultPageCount = function (a) {
	    return i[a].defaultPageCount
	},
	b.getPageArr = function (a) {
	    return i[a].pageArr
	},
	b.canAddPage = function (a) {
	    return i[a].canAddPage
	},
	b.hasType = function (a, c) {
	    var d = b.getTypeName(a, c);
	    return i[d] ? !0 : !1
	},
	b.getTypeName = function (a, b) {
	    return a + h + b
	},
	b.toSizeDetailData = function (b) {
	    var c = a("zz/utils/utils").mm2px,
		d = b[0] + 2 * b[2],
		e = b[1] + 2 * b[2],
		f = c(d, 300),
		g = c(e, 300),
		h = c(b[2], 300),
		i = c(b[3], 300);
	    return {
	        mmWidth: d,
	        mmHeight: e,
	        pxWidth: Math.round(f),
	        pxHeight: Math.round(g),
	        mmBlood: b[2],
	        mmLimit: b[3],
	        pxLimit: Math.round(i),
	        pxBlood: Math.round(h)
	    }
	},
	b.getBianmaData = function (a) {
	    var b = i[a].bianma,
		c = i[a].sizeArr[0][2];
	    return b ? {
	        mmLeft: b.left + c,
	        mmTop: b.top + c,
	        mmWidth: b.width,
	        mmHeight: b.height,
	        pxLeft: l(b.left + c, 300),
	        pxTop: l(b.top + c, 300),
	        pxWidth: l(b.width, 300),
	        pxHeight: l(b.height, 300),
	        cmyk: "0,0,0,100",
	        color: "0,0,0"
	    } : null
	},
	b.getCitiaoData = function (a) {
	    var b = i[a].citiao,
		c = i[a].sizeArr[0][2];
	    return b ? {
	        cmyk: b.cmyk,
	        color: b.color,
	        mmTop: b.top + c,
	        mmHeight: b.height,
	        pxTop: l(b.top + c, 300),
	        pxHeight: l(b.height, 300)
	    } : null
	}
}),
define("common/submitDesignDialog", ["jquery/jquery/1.7.2/jquery", "zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/Mask", "zz/ui/alert", "zz/ui/loading"],
function (a, b) {
    function c() {
        var a = '<form class="diy-confirm-dialog">                 <div>                     <span>请输入模版名字：</span>                     <input name="name" type="text" style="width:200px">                     <input name="template_id" type="hidden">                     <input name="csrf_token" type="hidden">                 </div>                 <div class="pr">                     <span style="position:absolute;left:0;top:0">                         请选择模版类型：                     </span>                     <div style="margin-left:96px;width:400px">                     </div>                 </div>             </form>';
        return new j({
            hasTitle: !1,
            hasClose: !0,
            closeToDispose: !1,
            innerHTML: a,
            footBtns: {
                apply: "确定",
                close: "取消"
            },
            actions: {
                apply: function () {
                    this.getTarget().find("form").submit()
                },
                close: function () {
                    h.cb && h.cb.call(window),
					this.close()
                }
            }
        })
    }
    function d(a, b, c, d) {
        i.each(global.industries,
		function () {
		    i('<label><input type="checkbox" name="industry_id"></label>').appendTo(a.find("div>div")).append(this.name).find("input").val(this.id)
		}),
		a.attr("action", d).find("[name=template_id]").val(b).end().find("[name=name]").val(i.trim(c)).end().find("[name=csrf_token]").val(i("#csrf_token").val()),
		i.ajax({
		    url: "/design/api/get_industries",
		    type: "POST",
		    data: a.serialize(),
		    success: function (b) {
		        200 == b.code && i.isArray(b.data) && i.each(b.data,
				function (b, c) {
				    a.find("[name=industry_id][value=" + c.industry_id + "]").attr("checked", !0)
				}),
				0 == a.find("[name=industry_id]:checked").size() && a.find("[name=industry_id]:first").attr("checked", !0)
		    }
		})
    }
    function e(a, b) {
        return b.find("[name=industry_id]:checked").size() > 5 ? (k("最多只能选择 5 个行业！"), i(this).attr("checked", !1), !1) : !0
    }
    function f() {
        var a = i(this),
		b = [];
        return "" === a.find("[name=name]").val() && b.push("模板名字不能为空哦~~"),
		0 === i(this).find("[name=industry_id]:checked").size() && b.push("请选择模版类型哦~~"),
		b.length ? (k(b.join("<br>")), !1) : !0
    }
    function g(a) {
        if (a.preventDefault(), a.stopPropagation(), !f.call(this, a)) return !1;
        var b = l("正在提交...");
        return i.ajax({
            url: this.action,
            type: "POST",
            traditional: !0,
            needLogin: !0,
            data: i(this).serialize()
        }).done(function (a) {
            h.done && h.done.call(this, a)
        }).always(function () {
            h.cb && h.cb.call(window),
			b.close()
        }),
		!1
    }
    var h, i = a("jquery/jquery/1.7.2/jquery"),
	j = a("zz/ui/Dialog"),
	k = a("zz/ui/alert"),
	l = a("zz/ui/loading");
    b.init = function (a) {
        h = a || {};
        var b = c(),
		f = b.getTarget().find("form");
        return d(f, a.id, a.name, a.url),
		f.on("submit", g).on("change", ":checkbox",
		function (a) {
		    return e.call(this, a, f)
		}),
		b
    }
}),
define("diy/config/configStaticData", [],
function (a, b) {
    "use strict";
    b.fonts = {
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf": "微软雅黑",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/heiti.ttf": "黑体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huawenxihei.ttf": "华文细黑",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhtjt.ttf": "方正黑体简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf": "方正大黑简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdbsjt.ttf": "方正大标宋简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzcsjt.ttf": "方正粗宋简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf": "方正综艺简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzlsjt.ttf": "方正隶书简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzl2jt.ttf": "方正隶二简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhpjt.ttf": "方正琥珀简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzktjt.ttf": "方正康体简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/youyuan.ttf": "幼圆",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/shishangzhonghei.ttf": "时尚中黑简体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanghaibao.ttf": "华康海报体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf": "华康俪金黑体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangshaonv.ttf": "华康少女文字简W5",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangwawa.ttf": "华康娃娃体简W5",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakangyasong.ttf": "华康雅宋体",
        "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/songti.ttc": "宋体"
    },
	b.logos = ["dragPhoto.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/dragPhoto.jpg*/, "logo4.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo4.png*/, "logo1.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo1.png*/, "logo3.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo3.png*/, "logo2.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo2.png*/, "512.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/512.png*/, "logo6.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo6.png*/, "tiaoxingma.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/tiaoxingma.png*/, "erweima.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/erweima.png*/, "white.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/white.png*/, "black.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/black.png*/]
}),
define("diy/models/CanvasClass", ["jquery.transform", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/utils/asserts", "jquery/jquery/1.7.2/jquery", "zz/ui/confirm", "zz/ui/Dialog", "zz/utils/utils", "diy/models/HistoryClass", "zz/utils/loadImgs", "diy/models/canvasJsonWrap", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/info", "diy/config/canvasStaticData", "common/submitDesignDialog", "zz/utils/beforeUnload", "zz/utils/math", "diy/common/cutter", "jquery.easing"],
function (a) {
    "use strict";
    a("jquery.transform"),
	console.log("class...");
    var b = a("zz/utils/objs"),
	c = a("zz/core/Class"),
	d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/utils/types"),
	f = (a("zz/ui/confirm"), a("zz/utils/utils"), a("diy/models/HistoryClass")),
	g = a("diy/models/canvasJsonWrap"),
	h = a("zz/utils/math"),
	i = a("zz/utils/utils").ratioImg,
	j = a("diy/common/cutter"),
	k = ["diy_photo", "diy_text", "diy_model", "diy_qianming"],
	l = c().defState("UP_ENABLE", "DOWN_ENABLE").attr({
	    _ENTER_: "_**_",
	    _REG_ENTER_: /\_\*\*\_/g,
	    DEFAULT_OPTS: {
	        MAX_ZOOM: 1,
	        MIN_ZOOM: .04,
	        type: "card",
	        index: 0,
	        overflowShow: !1,
	        showLimitRect: !0,
	        hasCutter: !1,
	        isPreLoad: !1,
	        hasRadius: !1,
	        radiusSize: 10,
	        canvasSize: null,
	        hasSplitLine: !1,
	        bgRatio: "50%",
	        photoRatio: "50%",
	        citiao: null,
	        bianma: null
	    }
	}).init(function (a, b) {
	    this.container = a,
		this.opts,
		this.$cutter,
		this.canvasSize,
		this.type,
		this._configOpts(b),
		this.bgElem = null,
		this.childElems = [],
		this.history = new f(this),
		this.zoomRatio = 1,
		this._createDiyBg(),
		this._updateLimitRect(),
		this.opts.hasCutter && this._createCutter(),
		this.techs = {}
	}).method({
	    _configOpts: function (a) {
	        this.opts = b.extend({},
			this.DEFAULT_OPTS, a),
			this.minZoom = this.opts.MIN_ZOOM,
			this.maxZoom = this.opts.MAX_ZOOM,
			this.type = this.opts.type,
			this.index = this.opts.index,
			a.canvasSize && (this.canvasSize = a.canvasSize, this.container.parent().width(this.canvasSize.pxWidth).height(this.canvasSize.pxHeight).attr("data-index", this.index)),
			this.opts.overflowShow || this.container.css("overflow", "hidden"),
			this.opts.hasSplitLine && this.splitLine()
	    },
	    addDiyElements: function () {
	        var a, b, c, e, f = this.childElems,
			g = this,
			h = d.makeArray(arguments),
			i = f.slice();
	        return h.forEach(function (a) {
	            this.container.append(a),
				this.childElems.push(a),
				a.css({
				    left: a.attr("data-left") * g.zoomRatio,
				    top: a.attr("data-top") * g.zoomRatio
				}),
				a.attr("data-index", this.childElems.length - 1),
				a.css("zIndex", this.childElems.length + 20 - 1)
	        }.bind(this)),
			c = f.slice(),
			a = function () {
			    this.childElems = c
			}.bind(this),
			b = function () {
			    this.childElems = i
			}.bind(this),
			e = this.history.add("add", h, a, b),
			{
			    curElemArr: h,
			    historyId: e
			}
	    },
	    addDiyQianming: function (a) {
	        var b = d("<div>");
	        return a = a || {
	            left: 400,
	            top: 200,
	            width: 295,
	            height: 50
	        },
			b.attr({
			    "data-type": "diy_qianming",
			    "data-origin_width": a.width,
			    "data-origin_height": a.height,
			    "data-left": a.left * this.zoomRatio,
			    "data-top": a.top * this.zoomRatio
			}),
			b = this._createDiyElem(b),
			b.addClass("diy-qianming"),
			b.css({
			    width: a.width * this.zoomRatio,
			    height: a.height * this.zoomRatio
			}),
			this.addDiyElements(b)
	    },
	    delDiyElements: function () {
	        var a, b, c = this.childElems,
			e = d.makeArray(arguments),
			f = this,
			g = [],
			h = c.slice();
	        e.forEach(function (a) {
	            h.forEach(function (b, d) {
	                b[0] == a[0] && (a.remove(), c[d] = void 0)
	            })
	        }),
			c.forEach(function (a) {
			    a && g.push(a)
			}),
			this.childElems = g.slice(),
			this._sortDiyElements();
	        var a = function () {
	            f.childElems = g,
				f._sortDiyElements()
	        },
			b = function () {
			    f.childElems = h,
				f._sortDiyElements()
			};
	        return f.history.add("del", e, a, b),
			e
	    },
	    _sortDiyElements: function () {
	        this.childElems.forEach(function (a, b) {
	            a.attr("data-index", b),
				a.css("zIndex", b + 20)
	        })
	    },
	    clear: function () {
	        this.container.empty(),
			this.bgElem = null,
			this.childElems = [],
			this.history.clear()
	    },
	    _createDiyElem: function (a, b) {
	        var c, e, f = this,
			g = this.container.offset(),
			h = a.attr("data-left") || parseInt(a.css("left")) - g.left,
			i = a.attr("data-top") || parseInt(a.css("top")) - g.top;
	        return b = b || "div",
			c = d("<" + b + " class='diy-elem' style='position:absolute;z-index:10'></" + b + ">"),
			c.attr({
			    "data-type": a.attr("data-type"),
			    "data-src": a.attr("data-src") || "",
			    "data-origin_width": a.attr("data-origin_width"),
			    "data-origin_height": a.attr("data-origin_height"),
			    "data-rotate": 0,
			    "data-left": h / f.zoomRatio,
			    "data-top": i / f.zoomRatio
			}),
			(e = a.attr("data-rotate")) && (c.attr("data-rotate", e), "0" !== e && c.transform({
			    rotate: e + "deg"
			})),
			c
	    },
	    _updateDiyPhotoByData: function (b, c) {
	        var d, e = "CMYK" === c.mode ? c.rgb_url : c.url;
	        return b.attr("data-width") ? (d = a("zz/utils/utils").ratioImg(c.width, c.height, b.attr("data-width"), b.attr("data-height")), b.attr({})) : d = [c.width, c.height],
			b.attr({
			    src: e,
			    "data-src": e,
			    "data-origin_height": c.height,
			    "data-origin_width": c.width,
			    "data-key": c.key,
			    "data-dpiX": c.dpi ? c.dpi[0] : 0,
			    "data-dpiY": c.dpi ? c.dpi[1] : 0,
			    "data-type": "diy_photo",
			    "data-width": d[0],
			    "data-height": d[1]
			}).css({
			    width: d[0] * this.zoomRatio,
			    height: d[1] * this.zoomRatio
			}),
			b
	    },
	    addDiyPhotoByData: function (a) {
	        var b = this._updateDiyPhotoByData(d("<img>"), a);
	        b.attr({
	            "data-left": 100,
	            "data-top": 100
	        });
	        var c = this.addDiyPhoto(b).curElemArr[0];
	        return c
	    },
	    replaceDiyPhoto: function (a, b) {
	        var c = this.childElems[a];
	        return this._updateDiyPhotoByData(c, b),
			c.attr("data-type", "diy_photo"),
			c.find("img").attr("src", this._getImgSmallSrc(c.attr("data-src"))),
			this.emitChange(c),
			c
	    },
	    replaceDiyPhotoFromDragger: function (a, b) {
	        var c = b.data();
	        return a.attr({
	            "data-type": "diy_photo",
	            "data-img_type": c.type.slice(4),
	            "data-src": c.src,
	            "data-origin_height": c.origin_height,
	            "data-origin_width": c.origin_width,
	            "data-key": c.key
	        }),
			a.find("img").attr("src", this._getImgSmallSrc(c.src)),
			this.emitChange(a),
			a
	    },
	    _getImgSmallSrc: function (a, b) {
	        var c, d = b ? this.opts.bgRatio : this.opts.photoRatio;
	        switch (d) {
	            case "50%":
	                c = "";//"!xmlog";
	                break;
	            case "20%":
	                c = "";//"!mlog";
	                break;
	            default:
	                throw new Error("不支持缩放比例: " + d)
	        }
	        return /^\//.test(a) || new RegExp("^" + global.s_domain).test(a) || /xmlog$|mlog$/.test(a) ? a : a + c
	    },
	    addDiyPhoto: function (a, b) {
	        console.log("addDiyPhoto");
	        var c, e = this._createDiyElem(a, "div"),
			f = i(.95 * a.attr("data-origin_width"), .95 * a.attr("data-origin_height"), this.canvasSize.pxWidth / 3, this.canvasSize.pxHeight / 3);
	        return e.css({
	            width: f[0] * this.zoomRatio,
	            height: f[1] * this.zoomRatio
	        }).attr({
	            "data-width": f[0],
	            "data-height": f[1],
	            "data-key": a.attr("data-key"),
	            "data-img_type": b
	        }),
			e.attr("data-ratio", a.width() / a.height()),
			c = d("<img>"),
			c.attr("src", this._getImgSmallSrc(a.attr("data-src"))),
			c.width("100%"),
			c.height("100%"),
			e.append(c),
			b = b || "photo",
			e.addClass("diy-" + b),
			"" == a.attr("data-key") && e.addClass("diy-model"),
			this.addDiyElements(e)
	    },
	    addDiyText: function (a) {
	        console.log("addDiyText");
	        var b = this._createDiyElem(a, "p");
	        return b.addClass("diy-text"),
			b.html("<img style='border-width:0;width:100%;height:100%;display:block'><i class='diy-text-warn iconfont none' title='未选择文本所属类别'></i>"),
			b.attr("data-type", "diy_text"),
			b.attr("data-content", "双击编辑文字"),
			b.attr("data-size", 9),
			b.attr("data-mean", "-1"),
			b.attr("data-family", a.attr("data-family") || "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/heiti.ttf"),
			b.attr("data-bold", 0),
			b.attr("data-italic", 0),
			b.attr("data-underline", 0),
			b.attr("data-align", "left"),
			b.attr("data-color", "0,0,0"),
			b.attr("data-cmyk", "0,0,0,100"),
			b.css({
			    width: 5,
			    height: 5
			}),
			this.addDiyElements(b)
	    },
	    addDiyLogo: function (a, b) {
	        return a.attr("data-type", "diy_photo"),
			this.addDiyPhoto(a, b || "logo")
	    },
	    addDiyFrame: function (a) {
	        var b = this.addDiyPhoto(a, "diy-frame"),
			c = d('<div class="diy-frame-visual-wrap"></div>'),
			e = d.parseJSON(b.attr("data-info"));
	        return c.css({
	            left: e.x / e.sw * 100 + "%",
	            top: e.y / e.sh * 100 + "%",
	            width: e.w / e.sw * 100 + "%",
	            height: e.h / e.sh * 100 + "%"
	        }),
			b.append(c),
			b
	    },
	    _createDiyBg: function () {
	        var a = d('<div class="diy-background" style="width:100%;height:100%;background-color:#FFFFFF;"><img class="diy-bg-img none" style="width:100%;height:100%"/></div>');
	        a.css({
	            top: 0,
	            left: 0,
	            zIndex: 10,
	            overflow: "hidden"
	        }).attr("data-index", -1).attr("data-type", "diy_background").attr("data-color", "#FFFFFF").appendTo(this.container),
			this.opts.hasRadius && a.css({
			    borderRadius: this.opts.radiusSize + "px"
			}),
			this.bgElem = a,
			this.history.addInitData(a)
	    },
	    addDiyBackground: function (a) {
	        console.log("add diy background !!");
	        var b, c = this.bgElem;
	        if (e.isObject(a)) {
	            if (c.attr("data-src") === a.attr("data-src")) return {
	                curElemArr: [c]
	            };
	            c.attr({
	                "data-type": a.attr("data-type"),
	                "data-src": a.attr("data-src"),
	                "data-key": a.attr("data-key"),
	                "data-dpiX": a.attr("data-dpiX") || 300,
	                "data-dpiY": a.attr("data-dpiY") || 300
	            }),
				c.children("img").attr("src", this._getImgSmallSrc(a.attr("data-src"))).show()
	        } else {
	            if (b = a, c.data("color") === b) return c;
	            c.attr({
	                "data-color": b,
	                "data-src": "",
	                "data-key": ""
	            }).css("backgroundColor", b).children("img").hide()
	        }
	        var d = this.history.add("edit", [c]);
	        return {
	            curElemArr: [c],
	            historyId: d
	        }
	    },
	    addDiyFramePhoto: function () { },
	    addDiyModel: function (a) {
	        return a.attr({
	            "data-type": "diy_photo",
	            "data-width": 100,
	            "data-height": 100,
	            "data-key": ""
	        }),
			this.addDiyPhoto(a, "model")
	    },
	    _initFramePhoto: function (a) {
	        var b = a.find(".diy-frame-photo"),
			c = a.width(),
			e = a.height(),
			f = d.parseJSON(a.attr("data-info")),
			g = c / f.sw,
			h = f.w * g,
			i = f.h * g,
			j = +b.attr("data-src-ratio"),
			k = f.w / f.h;
	        b.attr("data-frame-width", c),
			b.attr("data-frame-height", e),
			b.css(j > k ? {
			    width: i * j,
			    height: i,
			    left: (i * j - h) / 2,
			    top: 0
			} : {
			    width: h,
			    height: h / j,
			    left: 0,
			    top: (i / j - h) / 2
			})
	    },
	    resizeDiyFrame: function (a) {
	        var b = a.find(".diy-frame-photo"),
			c = a.width(),
			d = a.height(),
			e = c / parseInt(b.attr("data-frame-width")),
			f = d / parseInt(b.attr("data-frame-height")); (1 != e || 1 != f) && (b.css({
			    width: b.width() * e,
			    height: b.height() * f,
			    left: parseInt(b.css("left")) * e,
			    top: parseInt(b.css("top")) * f
			}), b.attr("data-frame-width", c), b.attr("data-frame-height", d))
	    },
	    scaleDiyFramePhoto: function (a, b) {
	        var c = b.find(".diy-frame-photo");
	        c[0] && c.css({
	            width: c.width() * a,
	            height: c.height() * a,
	            left: parseInt(c.css("left")) * a,
	            top: parseInt(c.css("top")) * a
	        })
	    },
	    _moveIndex: function (a, b) {
	        function c() {
	            g[h] = b,
				g[f] = e,
				b.css("zIndex", h + 20),
				e.css("zIndex", f + 20),
				b.attr("data-index", h),
				e.attr("data-index", f)
	        }
	        function d() {
	            g[h] = e,
				g[f] = b,
				e.css("zIndex", h + 20),
				b.css("zIndex", f + 20),
				e.attr("data-index", h),
				b.attr("data-index", f)
	        }
	        var e, f = +b.attr("data-index"),
			g = this.childElems,
			h = f + a;
	        return console.log("moveIndex " + h),
			h >= g.length || 0 > h ? void 0 : (e = g[h], c(), this.history.add("edit", [b, e], c, d), this.checkIndex(b), h)
	    },
	    moveUp: function (a) {
	        return this._moveIndex(1, a)
	    },
	    moveDown: function (a) {
	        return this._moveIndex(-1, a)
	    },
	    checkIndex: function (a) {
	        var b = a.attr("data-index");
	        b == this.childElems.length - 1 ? this.triggerState("UP_ENABLE", !1) : this.triggerState("UP_ENABLE", !0),
			0 == b ? this.triggerState("DOWN_ENABLE", !1) : this.triggerState("DOWN_ENABLE", !0)
	    },
	    getSnapArr: function () {
	        function a(a) {
	            for (var b = 0,
				d = f.length; b != d; b++) if (a.is(f[b])) return;
	            var g = a.offset(),
				i = parseFloat(a.attr("data-rotate") || 0),
				j = h.getRotateRect(a.width(), a.height(), i);
	            g && (c.push(g.left), e.push(g.top), c.push(g.left + j[0]), e.push(g.top + j[1]))
	        }
	        function b() {
	            var a = d(this),
				b = a.offset(),
				f = 1 * a.attr("data-is-vertical");
	            b && (f ? c.push(b.left + parseInt(a.children().css("marginLeft"))) : e.push(b.top + parseInt(a.children().css("marginTop"))))
	        }
	        var c = [],
			e = [],
			f = arguments;
	        return a(this.bgElem),
			this.childElems.forEach(a),
			this.container.siblings(".diy-r-helper-line").each(b),
			[c, e]
	    },
	    zoom: function (a, b, c) {
	        var e, f, g = d("#diyWorkArea");
	        return a < this.minZoom ? a = this.minZoom : a > this.maxZoom && (a = this.maxZoom),
			c || this.zoomRatio !== a ? (this.zoomRatio = a, this.container.data("zoomRatio", a), this.childElems.forEach(function (b) {
			    this.zoomElem(b, a)
			}.bind(this)), this.container.parent().css({
			    width: e = this.canvasSize.pxWidth * a,
			    height: f = this.canvasSize.pxHeight * a
			}), this._updateLimitRect(), this._updateCutter(), this._updateCitiao(), this.updateBianma(), b && b(), 0 === g.length ? this : (e >= g.width() ? g.css("overflow-x", "scroll") : (g.css("overflow-x", ""), g.scrollTop(0)), f >= g.height() ? g.css("overflow-y", "scroll") : (g.css("overflow-y", ""), g.scrollLeft(0)), this)) : this
	    },
	    zoomElem: function (a, b) {
	        this.history.zoomElem(a, b)
	    },
	    emitChange: function (a) {
	        e.isArray(a) || (a = [a]),
			this.history.add("edit", a)
	    },
	    onChange: function (a) {
	        this.history.onState("CHANGE", a)
	    },
	    onChangeClone: function (a, b) {
	        this.history.onChangeToClone(a, b)
	    },
	    checkTextMean: function () {
	        var a;
	        return this.childElems.forEach(function (b) {
	            "diy_text" === b.data("type") && "-1" == b.attr("data-mean") && (a = b)
	        }),
			a
	    },
	    isLogoCorrect: function () {
	        return this.childElems.forEach(function (a) {
	            return "logo" === a.attr("data-img_type") || "user_logo" === a.attr("data-img_type") ? !0 : void 0
	        }),
			!1
	    },
	    centerX: function (a) {
	        a.attr("data-align", "center"),
			this.emitChange(a)
	    },
	    centerY: function (a) {
	        a.attr("data-alignY", "center"),
			this.emitChange(a)
	    },
	    _updateLimitRect: function () {
	        if (this.canvasSize) {
	            var a = this.canvasSize.pxLimit,
				b = a * this.zoomRatio;
	            this.$limitRect || (this.$limitRect = d("<div class='diy-limitrect'></div>").appendTo(this.container).css({
	                border: "1px dotted rgba(0,0,0,0.2)",
	                position: "absolute",
	                "z-index": 11
	            }), this.opts.showLimitRect || this.$limitRect.hide()),
				this.$limitRect.css({
				    left: b - 1,
				    top: b - 1,
				    width: this.canvasSize.pxWidth * this.zoomRatio - 2 * b,
				    height: this.canvasSize.pxHeight * this.zoomRatio - 2 * b
				})
	        }
	    },
	    getLimitRect: function () {
	        var a = this.canvasSize.pxLimit;
	        return {
	            left: a,
	            top: a,
	            width: this.canvasSize.pxWidth - 2 * a,
	            height: this.canvasSize.pxHeight - 2 * a
	        }
	    },
	    _createCutter: function () {
	        return this.$cutter = j.createCutter(this.container.parent()),
			this
	    },
	    _updateCutter: function () {
	        return this.$cutter && j.updateCutter(this.$cutter, this),
			this
	    },
	    updateCutterByAnim: function () {
	        this.$cutter && j.updateCutterByAnim(this.$cutter, this)
	    },
	    getType: function () {
	        return this.type
	    },
	    splitLine: function () {
	        var a = d("<div></div>").css({
	            border: "1px dotted rgba(0,0,0,0.2)",
	            position: "absolute",
	            "z-index": 1e3,
	            height: "100%",
	            left: "50%",
	            width: "2px",
	            marginLeft: "1px"
	        });
	        this.container.append(a)
	    },
	    toggleBianma: function (a) {
	        var b = this.opts.bianma,
			c = this.techs.$bianma || this.container.children("[data-type=diy_bianma]");
	        return b ? a ? (c && 0 !== c.length || (c = this.createBianma(b)), this.techs.$bianma = c.show(), this.updateBianma(), this.history.triggerState("CHANGE"), c) : (c.hide(), this.techs.$bianma = null, this.history.execCloneChange(function (a) {
	            a.children("[data-type=diy_bianma]").hide()
	        }), this.history.triggerState("CHANGE"), void 0) : void 0
	    },
	    createBianma: function (a) {
	        if (this.techs.$bianma) return this.techs.$bianma;
	        var b = this.techs.$bianma = d("<div class='diy-bianma' style='position:absolute;z-index:1010;text-align:left'><img style='width:100%;height:100%;display:block'/></div>");
	        return b.appendTo(this.container).attr({
	            "data-type": "diy_bianma",
	            "data-color": a.color,
	            "data-cmyk": a.cmyk,
	            "data-mm-top": a.mmTop,
	            "data-mm-left": a.mmLeft,
	            "data-mm-height": a.mmHeight,
	            "data-mm-width": a.mmWidth,
	            "data-px-width": a.pxWidth,
	            "data-px-height": a.pxHeight,
	            "data-px-left": a.pxLeft,
	            "data-px-top": a.pxTop,
	            "data-start": a.start || "000001",
	            "data-content": a.content || "NO.000001"
	        }),
			b
	    },
	    updateBianma: function () {
	        var a = this.techs.$bianma,
			b = this.zoomRatio;
	        if (a) {
	            var c = a.find("img"),
				d = a.attr("data-px-height"),
				e = a.attr("data-px-left"),
				f = a.attr("data-px-top"),
				g = a.attr("data-px-width");
	            a.css({
	                left: e * b,
	                top: f * b,
	                width: g * b,
	                height: d * b,
	                "font-size": d * b,
	                "line-height": d * b + "px"
	            }),
				c.get(0).src = "/app/api/technic_png.php?type=diy_bianma&w=" + a.attr("data-mm-width") + "&h=" + a.attr("data-mm-height") + "&content=" + a.attr("data-content") + "&color=" + a.attr("data-color"),
				this.history.execCloneChange(function (b, c) {
				    var h = b.children("[data-type=diy_bianma]");
				    0 === h.length && (h = a.clone().appendTo(b)),
					h.css({
					    left: e * c,
					    top: f * c,
					    width: g * c,
					    height: d * c,
					    "font-size": d * c,
					    "line-height": d * c + "px",
					    "background-color": "rgb(" + a.attr("data-color") + ")"
					}).show()
				})
	        }
	    },
	    toggleCitiao: function (a) {
	        var b = this.opts.citiao,
			c = this.techs.$citiao;
	        b && (a ? (this.createCitiao(b), this._updateCitiao(), this.history.triggerState("CHANGE")) : (c.remove(), this.techs.$citiao = null, this.history.execCloneChange(function (a) {
	            a.children("[data-type=diy_citiao]").remove()
	        }), this.history.triggerState("CHANGE")))
	    },
	    createCitiao: function (a) {
	        if (this.techs.$citiao) return this.techs.$citiao;
	        var b = this.techs.$citiao = d("<div class='diy-citiao' style='position:absolute;left:0;top:0;width:100%;z-index:1000'></div>");
	        return b.appendTo(this.container).css({
	            "background-color": "rgb(" + a.color + ")"
	        }).attr({
	            "data-type": "diy_citiao",
	            "data-color": a.color,
	            "data-cmyk": a.cmyk,
	            "data-mm-top": a.mmTop,
	            "data-mm-height": a.mmHeight,
	            "data-px-top": a.pxTop,
	            "data-px-height": a.pxHeight
	        }),
			b
	    },
	    _updateCitiao: function () {
	        var a = this.techs.$citiao;
	        if (a) {
	            var b = a.attr("data-px-top"),
				c = a.attr("data-px-height"),
				d = a.attr("data-color");
	            a.css({
	                top: b * this.zoomRatio,
	                height: c * this.zoomRatio
	            }),
				this.history.execCloneChange(function (e, f) {
				    var g = e.children("[data-type=diy_citiao]");
				    0 === g.length && (g = a.clone().appendTo(e)),
					g.css({
					    top: b * f,
					    height: c * f,
					    "background-color": "rgb(" + d + ")"
					})
				})
	        }
	    },
	    revertCanvas: function (a) {
	        var b = this.canvasSize,
			c = b.mmHeight,
			d = b.pxHeight,
			e = !1;
	        switch (a) {
	            case "h":
	                b.mmHeight > b.mmWidth && (e = !0);
	                break;
	            case "v":
	                b.mmHeight < b.mmWidth && (e = !0)
	        }
	        e && (b.mmHeight = b.mmWidth, b.mmWidth = c, b.pxHeight = b.pxWidth, b.pxWidth = d, this.delDiyElements.apply(this, this.childElems), this.addDiyBackground("<img>"), this.history.lock(), this._updateLimitRect())
	    }
	}).wrap(g);
    return l.TYPE_LIST = k,
	l
}),
define("diy/models/HistoryClass", ["zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/utils/asserts", "jquery/jquery/1.7.2/jquery", "zz/utils/loadImgs"],
function (a) {
    "use strict";
    var b = a("zz/utils/objs"),
	c = a("zz/core/Class"),
	d = a("jquery/jquery/1.7.2/jquery"),
	e = a("zz/utils/loadImgs"),
	f = c().defState("CHANGE", "TEXT_IMG_LOADED", "UNDO_EMPTY", "REDO_EMPTY", "UNDO_NO_EMPTY", "REDO_NO_EMPTY").init(function (a) {
	    this._initArr = [],
		this._redoArr = [],
		this._undoArr = [],
		this._undoLockArr = [],
		this.HISTORY_MAX_COUNT = 100,
		this.addedCount = 0,
		this.container = a.container,
		this.canvas = a,
		this.$cloneArr = []
	}).method({
	    addInitData: function (a) {
	        this._initArr.push({
	            $elem: a,
	            data: this.getElemData(a)
	        })
	    },
	    add: function (a, b, c, d) {
	        var e = ++this.addedCount,
			f = [],
			g = this;
	        switch (b.forEach(function (a) {
				g.setOriginElemData(a,
				function () {
					f.push(g.getElemData(a)),
					g.zoomElem(a)
	        })
	        }), a) {
	            case "add":
	            case "del":
	            case "edit":
	                return this._undoArr.push({
	                    action:
                        a,
	                    $elemArr: b.slice(),
	                    dataArr: f,
	                    redoCb: c,
	                    undoCb: d,
	                    id: e
	                }),
                    this._undoArr.length > this.HISTORY_MAX_COUNT && this._undoArr.shift(),
                    this._redoArr.length = 0,
                    this.triggerState("REDO_EMPTY"),
                    this.triggerState("UNDO_NO_EMPTY"),
                    this.triggerState("CHANGE", a, b),
                    e;
	            default:
	                throw new Error("无法添加历史记录: " + a)
	        }
	    },
	    undo: function () {
	        if (0 === this._undoArr.length) return [];
	        var a = this,
			b = this._undoArr.pop(),
			c = b.$elemArr,
			d = [],
			e = "";
	        switch (b.action) {
	            case "add":
	                e = "del";
	                break;
	            case "del":
	                e = "add";
	                break;
	            case "edit":
	                e = "edit"
	        }
	        return c.forEach(function (c) {
	            switch (b.action) {
	                case "add":
	                    c.remove(),
                        d = a._getEditNearElemArr();
	                    break;
	                case "del":
	                    a.container.append(c);
	                case "edit":
	                    var e = a._getEditNearData(c);
	                    a.setElemData(c, e),
                        d.push(c),
                        a.zoomElem(c)
	            }
	        }),
			this._redoArr.push(b),
			this.triggerState("REDO_NO_EMPTY"),
			b.undoCb && b.undoCb(),
			this.triggerState("CHANGE", e, c),
			0 === this._undoArr.length && this.triggerState("UNDO_EMPTY"),
			d
	    },
	    redo: function () {
	        if (0 === this._redoArr.length) return !1;
	        var a = this,
			b = this._redoArr.pop(),
			c = b.$elemArr,
			d = [],
			e = "";
	        switch (b.action) {
	            case "add":
	                e = "add";
	                break;
	            case "del":
	                e = "del";
	                break;
	            case "edit":
	                e = "edit"
	        }
	        return c.forEach(function (c, e) {
	            switch (b.action) {
	                case "del":
	                    c.remove(),
                        d = a._getEditNearElemArr();
	                    break;
	                case "add":
	                    a.container.append(c);
	                case "edit":
	                    a.setElemData(c, b.dataArr[e]),
                        d.push(c),
                        a.zoomElem(c)
	            }
	        }),
			this._undoArr.push(b),
			this.triggerState("UNDO_NO_EMPTY"),
			b.redoCb && b.redoCb(),
			this.triggerState("CHANGE", e, c),
			0 === this._redoArr.length && this.triggerState("REDO_EMPTY"),
			d
	    },
	    _getEditNearElemArr: function () {
	        for (var a, b = this._undoArr.length,
			c = this._undoLockArr.concat(this._undoArr) ; b > 0;) {
	            if (a = c[b - 1].$elemArr, a[0].parent().length) return a.slice();
	            b--
	        }
	        return []
	    },
	    _getEditNearData: function (a) {
	        for (var b, c = this._undoLockArr.concat(this._undoArr), d = c.length - 1; d >= 0; d--) if (c[d].$elemArr.forEach(function (e, f) {
				e[0] == a[0] && (b = c[d].dataArr[f])
	        }), b) return b;
	        return this._initArr.forEach(function (c) {
	            c.$elem[0] == a[0] && (b = c.data)
	        }),
			b
	    },
	    clear: function () {
	        this._redoArr.length = 0,
			this._undoArr.length = 0,
			this._initArr.length = 0,
			this._undoLockArr.length = 0,
			this.addedCount = 0
	    },
	    getElemData: function (a) {
	        var b, c, d = {};
	        b = a.html(),
			c = a[0].attributes;
	        for (var e = 0,
			f = c.length; e != f; e++) d[c[e].name] = c[e].value;
	        return [b, d]
	    },
	    setOriginElemData: function (a, b) {
	        function c(b, c) {
	            return a.css(b).slice(0, -2) / c * 1
	        }
	        var e, f, g = this;
	        if ("diy_text" === a.data("type")) this.loadTextImg(a,
			function (h) {
			    var i = g.container.data("zoomRatio") || 1;
			    if (a.attr({
					"data-left": c("left", i),
					"data-top": c("top", i)
			    }), h && a.attr({
					"data-width": a.width(),
					"data-height": a.height()
			    }), "center" === a.attr("data-align")) {
			        var j = g.canvas.canvasSize.pxWidth / 2 - a.attr("data-width") / 2;
			        a.attr("data-left", j),
					a.css("left", j * i)
			    }
			    if (e = g.canvas.$limitRect) {
			        var k = !1;
			        if (f = g.canvas.getLimitRect(), a.attr("data-left") < f.left && (a.attr("data-left", f.left), a.css("left", f.left * i), k = !0), a.attr("data-top") < f.top && (a.attr("data-top", f.top), a.css("top", f.top * i), k = !0), Math.round(a.attr("data-width")) + Math.round(a.attr("data-left")) > f.left + f.width) {
			            var l = f.left + f.width - Math.round(a.attr("data-width"));
			            a.attr("data-left", l),
						a.css("left", l * i),
						k = !0
			        }
			        if (Math.round(a.attr("data-height")) + Math.round(a.attr("data-top")) > f.top + f.height) {
			            var m = f.top + f.height - Math.round(a.attr("data-height"));
			            a.attr("data-top", m),
						a.css("top", m * i),
						k = !0
			        }
			        if (k) {
			            var n = d("#diyTip");
			            n.find("em").text("亲，文字和内容不要超出虚线框哦！以免裁切误差，影响美观~").end().fadeIn(function () {
			                setTimeout(function () {
			                    n.css("opacity", 0)
			                },
							3e4)
			            }).data("old-top", n.css("top")).offset({
			                top: a.offset().top
			            }).css("opacity", 0).animate({
			                top: n.data("old-top"),
			                opacity: 1
			            },
						500)
			        }
			    }
			    b && b(),
				g.triggerState("CHANGE", "edit", [a])
			});
	        else if ("diy_background" === a.data("type")) b && b();
	        else {
	            var h = g.container.data("zoomRatio") || 1;
	            if (a.attr({
					"data-left": c("left", h),
					"data-top": c("top", h),
					"data-width": c("width", h),
					"data-height": c("height", h)
	            }), "center" === a.attr("data-align")) {
	                var i = g.canvas.canvasSize.pxWidth / 2 - a.attr("data-width") / 2;
	                a.attr("data-left", i),
					a.css("left", i * h)
	            }
	            if ("center" === a.attr("data-alignY")) {
	                var j = g.canvas.canvasSize.pxHeight / 2 - a.attr("data-height") / 2;
	                a.attr("data-top", j),
					a.css("top", j * h)
	            }
	            b && b()
	        }
	    },
	    zoomElem: function (a, b, c) {
	        function d(c) {
	            return a.attr("data-" + c) * b + "px"
	        }
	        b = b || this.container.data("zoomRatio") || 1,
			a.css({
			    width: d("width"),
			    height: d("height"),
			    left: d("left"),
			    top: d("top")
			}),
			c && c()
	    },
	    setElemData: function (a, c, d) {
	        if (c) {
	            var e = c[1];
	            return "diy_text" == a.attr("data-type") && a.attr("data-src") && a.attr("data-src") == e["data-src"] || a.html(c[0]),
				b.forEach(e,
				function (b, c) {
				    a.attr(c, b)
				}),
				this.zoomElem(a, d),
				a
	        }
	    },
	    loadTextImg: function (a, b, c) {
	        if (a && "diy_text" === a.data("type")) {
	            var d, f = this,
				g = this._getTextImgSrc(a, c),
				h = (a.attr("data-src") || "").split("&ctime=")[0];
	            return g === h ? (b && b(!1), f.triggerState("TEXT_IMG_LOADED"), this) : (g = g + "&ctime=" + (new Date).getTime(), d = (a.data("loadingImgCount") || 0) + 1, a.data("loadingImgCount", d), e({
	                imgs: [encodeURI(g)],
	                done: function (c) {
	                    a.data("loadingImgCount") == d && (a.width(c.width), a.height(c.height), a.attr("data-src", g), a.find("img").attr("src", c.src), b && b(!0), f.triggerState("TEXT_IMG_LOADED"), a.data("loadingImgCount", 0))
	                }
	            }), this)
	        }
	    },
	    _getTextImgSrc: function (a, b) {
	        var c, d = a.attr("data-family"),
			e = a.attr("data-size"),
			f = a.attr("data-color"),
			g = a.attr("data-content").replace(/\n/g, this.canvas._ENTER_),
			h = a.attr("data-bold"),
			i = a.attr("data-italic"),
			j = a.attr("data-underline"),
			k = a.attr("data-text_align") || "left",
			b = b || 1;
	        return c = "size=" + e + "&content=" + g + "&family=" + d + "&bold=" + h + "&color=" + f + "&italic=" + i + "&underline=" + j + "&ratio=" + b + "&text_align=" + k,
			(global.DIY_TEXT_PATH || "../../../../app/api/text_png.php.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/app/api/text_png.php*/) + "?" + c
	    },
	    onChangeToClone: function (a) {
	        function b(b, e) {
	            var f = d("<div></div>"),
				g = c.getElemData(b);
	            a.append(f),
				c.setElemData(f, g, e)
	        }
	        var c = this;
	        this._initArr.forEach(function (a) {
	            b(a.$elem)
	        }),
			this.$cloneArr.push(a),
			this.onState("CHANGE",
			function (d, e) {
			    var f = a.data("thumbScale");
			    if (d) switch (d) {
			        case "add":
			            e.forEach(function (a) {
			                b(a, f)
			            });
			            break;
			        case "edit":
			            e.forEach(function (b) {
			                var d = b.attr("data-index");
			                c.setElemData(a.children("[data-index=" + d + "]"), c.getElemData(b), f)
			            });
			            break;
			        case "del":
			            e.forEach(function (b) {
			                var c = b.attr("data-index");
			                a.children("[data-index=" + c + "]").remove()
			            })
			    }
			})
	    },
	    unChange: function () {
	        this.unState("CHANGE")
	    },
	    getLength: function () {
	        return this._undoArr.length
	    },
	    lock: function () {
	        var a = this._undoLockArr;
	        return this._undoArr.slice().forEach(function (b) {
	            a.push(b)
	        }),
			this._undoArr.length = 0,
			this
	    },
	    execCloneChange: function (a) {
	        this.$cloneArr.forEach(function (b) {
	            a(b, b.data("thumbScale"))
	        })
	    }
	});
    return f
}),
define("diy/models/canvasJsonWrap", ["zz/utils/objs", "zz/utils/types", "jquery/jquery/1.7.2/jquery", "zz/utils/utils", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/Dialog", "zz/ui/info", "zz/ui/confirm", "diy/config/canvasStaticData", "common/submitDesignDialog", "zz/utils/beforeUnload"],
function (a) {
    "use strict";
    function b(a, b) {
        return parseFloat(a.toFixed(b))
    }
    var c = a("zz/utils/objs"),
	d = a("zz/utils/types"),
	e = a("jquery/jquery/1.7.2/jquery"),
	f = a("zz/utils/utils").mm2px,
	g = a("zz/utils/utils").px2mm;
    return {
        getDiyElemData: function (a) {
            if (a && a[0]) {
                var b;
                if (b = {
                    type: a.data("type"),
                    index: a.attr("data-index"),
                    align: a.attr("data-align") || "left"
                },
				"diy_background" !== b.type) {
                    var e = a.attr("data-width"),
					f = a.attr("data-height"),
					g = a.attr("data-left"),
					h = a.attr("data-top");
                    if (b.center_x = parseInt(g) + e / 2, b.center_y = parseInt(h) + f / 2, b.width = e, b.height = f, b.left = g, b.top = h, b.rotate = a.attr("data-rotate") || 0, "0" == e || "0" == f) return void console.log("no width or no height elem: ", b)
                }
                return "diy_text" == b.type ? (b.content = a.attr("data-content").replace(/\n/g, this._ENTER_), b.family = a.attr("data-family"), b.size = a.attr("data-size"), b.color = a.attr("data-color"), b.cmyk = a.attr("data-cmyk"), b.bold = a.attr("data-bold"), b.italic = a.attr("data-italic"), b.underline = a.attr("data-underline"), b.mean = a.attr("data-mean"), b.text_align = a.attr("data-text_align") || "left") : "diy_background" == b.type ? (b.key = a.attr("data-key") || "", b.color = a.attr("data-color"), b.src = a.attr("data-src").replace(/!mlog$|!xmlog$/, ""), b.dpi = [a.attr("data-dpiX"), a.attr("data-dpiY")]) : "diy_photo" == b.type && (b.key = a.attr("data-key") || "", b.origin_width = a.attr("data-origin_width"), b.origin_height = a.attr("data-origin_height"), b.src = a.attr("data-src").replace(/!mlog$|!xmlog$/, ""), b.dpi = [a.attr("data-dpiX") || 0, a.attr("data-dpiY") || 0], b.img_type = a.attr("data-img_type"), "logo" === b.img_type && (b.type = "diy_logo")),
				c.forEach(b,
				function (a, c) {
				    "content" !== c && d.isNumber(Number(a)) && Number(a) && (b[c] = Math.round(100 * a) / 100)
				}),
				b
            }
        },
        getDiyTechsData: function () {
            var a, b, e = [];
            return (a = this.techs.$bianma) && e.push({
                type: a.attr("data-type"),
                cmyk: a.attr("data-cmyk"),
                color: a.attr("data-color"),
                width: a.attr("data-mm-width"),
                height: a.attr("data-mm-height"),
                left: a.attr("data-mm-left"),
                top: a.attr("data-mm-top"),
                content: a.attr("data-content") || "NO.000001",
                locate: "right_bottom",
                pre: "NO.",
                step: 1,
                start: a.attr("data-start") || "000001"
            }),
			(b = this.techs.$citiao) && e.push({
			    type: b.attr("data-type"),
			    cmyk: b.attr("data-cmyk"),
			    color: b.attr("data-color"),
			    top: b.attr("data-mm-top"),
			    height: b.attr("data-mm-height")
			}),
			e.forEach(function (a) {
			    c.forEach(a,
				function (b, c) {
				    "content" !== c && "start" !== c && d.isNumber(Number(b)) && Number(b) && (a[c] = Math.round(100 * b) / 100)
				})
			}),
			e
        },
        getDiyAllData: function () {
            var a = {
                canvas: {},
                elements: [],
                background: {}
            },
			c = this.canvasSize,
			d = [];
            a.canvas = {
                width: c.mmWidth - 2 * c.mmBlood,
                height: c.mmHeight - 2 * c.mmBlood,
                hasRadius: this.opts.hasRadius,
                blood: this.canvasSize.mmBlood,
                limit: this.canvasSize.mmLimit
            },
			this.bgElem && (a.background = this.getDiyElemData(this.bgElem));
            for (var e = this.childElems,
			f = 0,
			h = e.length; h > f; f++) {
                var i = this.getDiyElemData(e[f]);
                i && "diy_qianming" === i.type ? d.push({
                    type: "diy_qianming",
                    cmyk: "0,0,0,0",
                    color: "255,255,255",
                    left: b(g(i.left, 300), 2),
                    top: b(g(i.top, 300), 2),
                    width: b(g(i.width, 300), 2),
                    height: b(g(i.height, 300), 2)
                }) : i && a.elements.push(i)
            }
            return a.techs = this.getDiyTechsData(),
			a.techs = a.techs.concat(d),
			a
        },
        loadCanvasData: function (b) {
            var d = this,
			g = [b.canvas.width || 90, b.canvas.height || 54, b.canvas.blood || 1, b.canvas.limit || 3];
            this.canvasSize = this.opts.canvasSize = a("diy/canvasDataControl").toSizeDetailData(g);
            var h = function (a) {
                var b = e("<img>");
                return c.forEach(a,
				function (c, e) {
				    "content" === e && (a[e] = c = c.replace(d._REG_ENTER_, "\n")),
					b.attr("data-" + e, c)
				}),
				"diy_background" !== a && b.css({
				    left: a.left + "px",
				    top: a.top + "px",
				    width: a.width + "px",
				    height: a.height + "px",
				    zIndex: a.index + 10
				}),
				b
            };
            b.elements.concat(b.background).forEach(function (a) {
                if (a) {
                    var b = h(a);
                    switch (b.attr("data-type")) {
                        case "diy_photo":
                            b = d.addDiyPhoto(b).curElemArr[0];
                            break;
                        case "diy_frame":
                            break;
                        case "diy_logo":
                            b = d.addDiyLogo(b).curElemArr[0];
                            break;
                        case "diy_text":
                            b = d.addDiyText(b).curElemArr[0];
                            break;
                        case "diy_background":
                            b = d.addDiyBackground(b).curElemArr[0]
                    }
                    "diy_background" !== b.attr("data-type") && (c.forEach(a,
					function (a, c) {
					    "type" !== c && b.attr("data-" + c, a)
					}), b.css({
					    left: a.left * d.zoomRatio,
					    top: a.top * d.zoomRatio,
					    width: a.width * d.zoomRatio,
					    height: a.height * d.zoomRatio
					}), d.emitChange(b))
                }
            }),
			b.techs && b.techs.forEach(function (a) {
			    switch (a.type) {
			        case "diy_bianma":
			            d.createBianma({
			                color:
                            a.color,
			                cmyk: a.cmyk,
			                content: a.content,
			                pre: "NO.",
			                step: 1,
			                start: a.start || "000001",
			                mmHeight: a.height,
			                mmWidth: a.width,
			                mmTop: a.top,
			                mmLeft: a.left,
			                pxHeight: f(a.height, 300),
			                pxWidth: f(a.width, 300),
			                pxLeft: f(a.left, 300),
			                pxTop: f(a.top, 300)
			            }),
                        d.updateBianma();
			            break;
			        case "diy_citiao":
			            d.createCitiao({
			                color:
                            a.color,
			                cmyk: a.cmyk,
			                mmTop: a.top,
			                mmHeight: a.height,
			                pxTop: f(a.top, 300),
			                pxHeight: f(a.height, 300)
			            }),
                        d._updateCitiao();
			            break;
			        case "diy_qianming":
			            d.addDiyQianming({
			                left:
                            f(a.left, 300),
			                top: f(a.top, 300),
			                width: f(a.width, 300),
			                height: f(a.height, 300)
			            })
			    }
			}),
			this.history.lock()
        }
    }
}),
define("diy/config/canvasStaticData", [],
function (a, b) {
    "use strict";
    b._meanAutoTexts = {
        title1: "标题1",
        title2: "标题2",
        title3: "标题3",
        text1: "文本1",
        text2: "文本2",
        text3: "文本3",
        cardName: "贵宾卡",
        leval: "VIP",
        number: "NO.000001",
        id: "ID:000001",
        barcode: "条形码区",
        logo: "LOGO",
        company: "中山六匹马网络科技有限公司",
        username: "蚂  蚁",
        job: "总经理",
        website: "网站：http://www.mayicy.cn",
        mobile: "手机：xxxxxxxxxxx",
        telphone: "电话：4006-027-359",
        address: "地址：武汉市江汉区菱角湖万达A3座1120",
        email: "邮箱：service@6pima.cn",
        fax: "传真：4006-027-359",
        advert: "广告语",
        qq: "QQ：4006027359",
        info1: "说明一",
        info2: "说明二",
        other: "其他",
        "-1": "双击编辑文字",
        company_: "Wuhan Golden Valley Technology Co., Ltd.",
        username_: "YinGu Jin",
        job_: "CEO",
        website_: "site：http://www.mayicy.cn",
        mobile_: "Mobile：13396092109",
        telphone_: "Tel：xxxxxxxxxxx",
        address_: "Add：No.13 Huangxiaobai Rd, New JiangHan District, WhuHan City.",
        email_: "Email：service@6pima.cn",
        fax_: "Fax：4006-027-359"
    },
	b._canvasData = {
	    pvc_pvc: {
	        defaultPageCount: 2,
	        hasRadius: !0,
	        canAddPage: !1,
	        sizeArr: [[85.5, 54, 1.5, 3]],
	        demoArr: [{
	            type: "pvc_pvc",
	            pages: [{
	                canvas: {
	                    width: 85.5,
	                    height: 54,
	                    hasRadius: !0,
	                    blood: 1.5,
	                    limit: 3
	                },
	                elements: [{
	                    type: "diy_text",
	                    index: "0",
	                    align: "left",
	                    center_x: 547,
	                    center_y: 286,
	                    width: 394,
	                    height: 182,
	                    left: 350.58,
	                    top: 195.27,
	                    rotate: "0",
	                    content: "VIP",
	                    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
	                    size: 60,
	                    color: "0,0,0",
	                    cmyk: "0,0,0,100",
	                    bold: "0",
	                    italic: "0",
	                    underline: "0",
	                    mean: "leval",
	                    text_align: "left"
	                },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 821,
					    center_y: 71.5,
					    width: 316,
					    height: 29,
					    left: 663.75,
					    top: 57.74,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 574.17,
					    center_y: 70.67,
					    width: 128.33,
					    height: 53.33,
					    left: 510.22,
					    top: 44.21,
					    rotate: "0",
					    key: "logo1.png"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/logo1.png*/,
					    origin_width: 463,
					    origin_height: 192,
					    src: "../../../../../../images/logo1.png"/*tpa=http://www.mayicy.cn/images/logo1.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 244,
					    center_y: 383,
					    width: 168,
					    height: 54,
					    left: 160.84,
					    top: 356.15,
					    rotate: "0",
					    content: "贵宾卡",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzhtjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "cardName",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 821.5,
					    center_y: 580.5,
					    width: 295,
					    height: 33,
					    left: 674.17,
					    top: 564.93,
					    rotate: "0",
					    content: "尊贵特权，会员专享",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 8,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000047.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../../kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg"/*tpa=http://kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg*/,
	                    dpi: ["300", "300"]
	                },
	                techs: [{
	                    type: "diy_bianma",
	                    cmyk: "0,0,0,100",
	                    color: "0,0,0",
	                    width: 25,
	                    height: 4,
	                    left: 6.24,
	                    top: 47.83,
	                    content: "NO.000001",
	                    locate: "right_bottom",
	                    pre: "NO.",
	                    step: 1,
	                    start: "000001"
	                }]
	            },
				{
				    canvas: {
				        width: 85.5,
				        height: 54,
				        hasRadius: !0,
				        blood: 1.5,
				        limit: 3
				    },
				    elements: [{
				        type: "diy_text",
				        index: "0",
				        align: "left",
				        center_x: 299.5,
				        center_y: 367.5,
				        width: 465,
				        height: 29,
				        left: 67.55,
				        top: 353.22,
				        rotate: "0",
				        content: "1. 此卡仅限本人所有，不得转让他人",
				        family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
				        size: 7,
				        color: "0,0,0",
				        cmyk: "0,0,0,100",
				        bold: "0",
				        italic: "0",
				        underline: "0",
				        mean: "info1",
				        text_align: "left"
				    },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 256,
					    center_y: 409.5,
					    width: 378,
					    height: 29,
					    left: 67.55,
					    top: 395.3,
					    rotate: "0",
					    content: "2. 客户凭借此卡享受九折优惠",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 342,
					    center_y: 451.5,
					    width: 550,
					    height: 29,
					    left: 67.55,
					    top: 437.39,
					    rotate: "0",
					    content: "3. 使用此卡需遵守本公司相关法律条款原则",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 271.5,
					    center_y: 494,
					    width: 409,
					    height: 30,
					    left: 67.55,
					    top: 479.45,
					    rotate: "0",
					    content: "4. 此卡最终解释权归本公司所有",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 7,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "info1",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 313.5,
					    center_y: 274.5,
					    width: 97,
					    height: 37,
					    left: 265.22,
					    top: 256.48,
					    rotate: "0",
					    content: "签名：",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 341.5,
					    center_y: 621.5,
					    width: 549,
					    height: 25,
					    left: 67.55,
					    top: 609.83,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 6,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 6,
					    align: "left",
					    center_x: 856.5,
					    center_y: 623,
					    width: 247,
					    height: 24,
					    left: 733.67,
					    top: 611.52,
					    rotate: "0",
					    content: "电话：4006-027-359",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 6,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "telphone",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000047.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../../kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg"/*tpa=http://kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg*/,
				        dpi: ["300", "300"]
				    },
				    techs: [{
				        type: "diy_citiao",
				        cmyk: "0,0,0,100",
				        color: "0,0,0",
				        top: 5.5,
				        height: 12
				    },
					{
					    type: "diy_qianming",
					    cmyk: "0,0,0,0",
					    color: "255,255,255",
					    left: 32.68,
					    top: 21.08,
					    width: 24.98,
					    height: 4.23
					}]
				}],
	            "extends": {
	                rotate: !0
	            }
	        }],
	        citiao: {
	            cmyk: "0,0,0,100",
	            color: "0,0,0",
	            top: 4,
	            height: 12
	        },
	        bianma: {
	            cmyk: "0,0,0,100",
	            color: "0,0,0",
	            width: 25,
	            height: 4,
	            left: 7,
	            top: 45,
	            content: "NO.000001"
	        },
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    card_commerce: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3], [54, 90, 1, 3]],
	        demoArr: [{
	            type: "card_commerce",
	            pages: [{
	                canvas: {
	                    width: 90,
	                    height: 54,
	                    blood: 1
	                },
	                elements: [{
	                    type: "diy_logo",
	                    index: "0",
	                    align: "left",
	                    center_x: 872.33,
	                    center_y: 162.17,
	                    width: 276.67,
	                    height: 158.33,
	                    left: 734.51,
	                    top: 83.35,
	                    rotate: "0",
	                    key: "../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,
	                    origin_width: 290,
	                    origin_height: 167,
	                    src: "../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,
	                    dpi: [0, 0],
	                    img_type: "logo"
	                },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 157,
					    center_y: 110.5,
					    width: 172,
					    height: 55,
					    left: 71.19,
					    top: 83.35,
					    rotate: "0",
					    content: "蚂  蚁",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "username",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 274,
					    center_y: 191,
					    width: 114,
					    height: 36,
					    left: 217.05,
					    top: 173.64,
					    rotate: "0",
					    content: "总经理",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "job",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 232.5,
					    center_y: 417.5,
					    width: 323,
					    height: 37,
					    left: 71.19,
					    top: 399.38,
					    rotate: "0",
					    content: "手机：xxxxxxxxxxx",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "mobile",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 292,
					    center_y: 469,
					    width: 442,
					    height: 40,
					    left: 71.19,
					    top: 449.73,
					    rotate: "0",
					    content: "邮箱：service@6pima.cn",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "email",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 487.5,
					    center_y: 527,
					    width: 833,
					    height: 38,
					    left: 71.19,
					    top: 508.77,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000424.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,
	                    dpi: ["300", "300"]
	                }
	            },
				{
				    canvas: {
				        width: 90,
				        height: 54,
				        blood: 1
				    },
				    elements: [{
				        type: "diy_logo",
				        index: "0",
				        align: "left",
				        center_x: 889.04,
				        center_y: 179,
				        width: 276.09,
				        height: 158.01,
				        left: 751.87,
				        top: 100.71,
				        rotate: "0",
				        key: "../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,
				        origin_width: 290,
				        origin_height: 167,
				        src: "../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,
				        dpi: [0, 0],
				        img_type: "logo"
				    },
					{
					    type: "diy_text",
					    index: 1,
					    align: "left",
					    center_x: 174,
					    center_y: 127.5,
					    width: 172,
					    height: 55,
					    left: 88.56,
					    top: 100.71,
					    rotate: "0",
					    content: "蚂  蚁",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzdhjt.ttf",
					    size: 14,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "username",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 2,
					    align: "left",
					    center_x: 291,
					    center_y: 209,
					    width: 114,
					    height: 36,
					    left: 234.42,
					    top: 191.01,
					    rotate: "0",
					    content: "总经理",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "job",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 249.5,
					    center_y: 434.5,
					    width: 323,
					    height: 37,
					    left: 88.56,
					    top: 416.74,
					    rotate: "0",
					    content: "手机：xxxxxxxxxxx",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "mobile",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 309,
					    center_y: 487,
					    width: 442,
					    height: 40,
					    left: 88.56,
					    top: 467.1,
					    rotate: "0",
					    content: "邮箱：service@6pima.cn",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "email",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 5,
					    align: "left",
					    center_x: 504.5,
					    center_y: 545,
					    width: 833,
					    height: 38,
					    left: 88.56,
					    top: 526.14,
					    rotate: "0",
					    content: "地址：武汉市江汉区菱角湖万达A3座1120",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "address",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000424.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,
				        dpi: ["300", "300"]
				    }
				}]
	        }],
	        meanList: {
	            "-1": "双击编辑文字",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            info1: "说明一",
	            info2: "说明二",
	            other: "其他",
	            company_: "公司名(英文)",
	            username_: "姓名(英文)",
	            job_: "职位(英文)",
	            website_: "网址(英文)",
	            mobile_: "手机(英文)",
	            telphone_: "电话(英文)",
	            address_: "地址(英文)",
	            email_: "邮箱(英文)",
	            fax_: "传真(英文)"
	        }
	    },
	    market_greeting: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[285, 210, 3, 8]],
	        hasSplitLine: !0,
	        noVerticalSize: !0,
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_award: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_coupon: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[180, 54, 1, 3], [90, 162, 1, 3]],
	        demoArr: [{
	            type: "market_coupon",
	            pages: [{
	                canvas: {
	                    width: 180,
	                    height: 54,
	                    blood: 1
	                },
	                elements: [{
	                    type: "diy_text",
	                    index: "0",
	                    align: "center",
	                    center_x: 1074.5,
	                    center_y: 331,
	                    width: 421,
	                    height: 220,
	                    left: 864.5,
	                    top: 221.32,
	                    rotate: "0",
	                    content: "100",
	                    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf",
	                    size: 72,
	                    color: "0,0,0",
	                    cmyk: "0,0,0,100",
	                    bold: "0",
	                    italic: "0",
	                    underline: "0",
	                    mean: "id",
	                    text_align: "left"
	                },
					{
					    type: "diy_logo",
					    index: 1,
					    align: "left",
					    center_x: 1943.99,
					    center_y: 519.99,
					    width: 233.97,
					    height: 155.98,
					    left: 1827.5,
					    top: 442.65,
					    rotate: "0",
					    key: "../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,
					    origin_width: 550,
					    origin_height: 367,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 1697.72,
					    center_y: 516.72,
					    width: 145.44,
					    height: 145.44,
					    left: 1625.15,
					    top: 444.75,
					    rotate: "0",
					    key: "../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,
					    origin_width: 512,
					    origin_height: 512,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 1381.5,
					    center_y: 402,
					    width: 71,
					    height: 72,
					    left: 1346.91,
					    top: 366.76,
					    rotate: "0",
					    content: "元",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf",
					    size: 19,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 276.5,
					    center_y: 84,
					    width: 415,
					    height: 38,
					    left: 69.58,
					    top: 65.34,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					}],
	                background: {
	                    type: "diy_background",
	                    index: -1,
	                    align: "left",
	                    key: "0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000486.jpg*/,
	                    color: "#FFFFFF",
	                    src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,
	                    dpi: ["300", "300"]
	                }
	            },
				{
				    canvas: {
				        width: 180,
				        height: 54,
				        blood: 1
				    },
				    elements: [{
				        type: "diy_text",
				        index: "0",
				        align: "center",
				        center_x: 1074.5,
				        center_y: 327,
				        width: 421,
				        height: 220,
				        left: 864.5,
				        top: 217.11,
				        rotate: "0",
				        content: "100",
				        family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/huakanglijin.ttf",
				        size: 72,
				        color: "0,0,0",
				        cmyk: "0,0,0,100",
				        bold: "0",
				        italic: "0",
				        underline: "0",
				        mean: "id",
				        text_align: "left"
				    },
					{
					    type: "diy_logo",
					    index: 1,
					    align: "left",
					    center_x: 1945.99,
					    center_y: 515.99,
					    width: 233.97,
					    height: 155.98,
					    left: 1829.61,
					    top: 438.43,
					    rotate: "0",
					    key: "../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,
					    origin_width: 550,
					    origin_height: 367,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_logo",
					    index: 2,
					    align: "left",
					    center_x: 1699.72,
					    center_y: 512.72,
					    width: 145.44,
					    height: 145.44,
					    left: 1627.25,
					    top: 440.54,
					    rotate: "0",
					    key: "../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,
					    origin_width: 512,
					    origin_height: 512,
					    src: "../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,
					    dpi: [0, 0],
					    img_type: "logo"
					},
					{
					    type: "diy_text",
					    index: 3,
					    align: "left",
					    center_x: 1384.5,
					    center_y: 398,
					    width: 71,
					    height: 72,
					    left: 1349.02,
					    top: 362.55,
					    rotate: "0",
					    content: "元",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/fzzongyi.ttf",
					    size: 19,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "other",
					    text_align: "left"
					},
					{
					    type: "diy_text",
					    index: 4,
					    align: "left",
					    center_x: 278.5,
					    center_y: 86,
					    width: 415,
					    height: 38,
					    left: 71.67,
					    top: 67.45,
					    rotate: "0",
					    content: "中山六匹马网络科技有限公司",
					    family: "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/yahei.ttf",
					    size: 9,
					    color: "0,0,0",
					    cmyk: "0,0,0,100",
					    bold: "0",
					    italic: "0",
					    underline: "0",
					    mean: "company",
					    text_align: "left"
					}],
				    background: {
				        type: "diy_background",
				        index: -1,
				        align: "left",
				        key: "0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/0000000486.jpg*/,
				        color: "#FFFFFF",
				        src: "../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,
				        dpi: ["300", "300"]
				    }
				}]
	        }],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_order: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            cardName: "卡名",
	            leval: "等级",
	            number: "编号",
	            id: "ID",
	            barcode: "条形码区",
	            info1: "说明一",
	            info2: "说明二",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    advert_leaflet: {
	        defaultPageCount: 2,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[210, 285, 3, 8]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_funcard: {
	        defaultPageCount: 10,
	        hasRadius: !1,
	        canAddPage: !1,
	        sizeArr: [[90, 54, 1, 3], [54, 90, 1, 3]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    market_postcard: {
	        defaultPageCount: 16,
	        pageArr: [16, 2],
	        hasRadius: !1,
	        canAddPage: !0,
	        sizeArr: [[148, 100, 3, 6]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    },
	    office_calendar: {
	        defaultPageCount: 26,
	        pageArr: [26, 14],
	        hasRadius: !1,
	        canAddPage: !0,
	        sizeArr: [[210, 148, 3, 6]],
	        demoArr: [],
	        meanList: {
	            "-1": "双击编辑文字",
	            title1: "标题1",
	            title2: "标题2",
	            title3: "标题3",
	            text1: "文本1",
	            text2: "文本2",
	            text3: "文本3",
	            company: "公司名",
	            username: "姓名",
	            logo: "LOGO",
	            job: "职位",
	            website: "网址",
	            mobile: "手机",
	            telphone: "电话",
	            address: "地址",
	            email: "邮箱",
	            fax: "传真",
	            advert: "广告语",
	            qq: "qq",
	            other: "其他"
	        }
	    }
	},
	b._canvasData.card = b._canvasData.card_pvc = b._canvasData.card_advance = b._canvasData.card_double11 = b._canvasData.card_commerce
}),
define("diy/common/cutter", ["jquery/jquery/1.7.2/jquery", "jquery.easing"],
function (a, b) {
    function c(a) {
        var b = a.parent(),
		c = -(f("#diyRight").width() / 2 - b.width() / 2 + 33 + 16),
		d = c,
		e = -(b.offset().top + 33 + 16),
		g = -(f(window).height() - b.height() - b.offset().top + 33 + 16);
        return {
            left: c,
            right: d,
            top: e,
            bottom: g
        }
    }
    function d(a, b, c, d, h) {
        a.children().each(function () {
            var a = f(this).attr("data-type"),
			e = {};
            e[a] = b[a] - 23,
			c ? f(this).animate(e, h || g, d) : f(this).css(e)
        }),
		e(a, b)
    }
    function e(a, b) {
        a.children().each(function () {
            var a = f(this).attr("data-type"),
			c = f(this).find("div"),
			d = b[a];
            switch (a) {
                case "left":
                    c.css({
                        width:
                        d
                    });
                    break;
                case "right":
                    c.width(d);
                    break;
                case "top":
                    c.height(d);
                    break;
                case "bottom":
                    c.height(d)
            }
        })
    }
    var f = a("jquery/jquery/1.7.2/jquery");
    a("jquery.easing");
    var g = "slow";
    b.createCutter = function (a) {
        var b = '<ul class="diy-r-canvas-cut-list">\n    <li data-type="left" class="diy-r-canvas-cut cut-left"><div></div><span></span></li>\n    <li data-type="right" class="diy-r-canvas-cut cut-right"><div></div><span></span></li>\n    <li data-type="top" class="diy-r-canvas-cut cut-top"><div></div><span></span></li>\n    <li data-type="bottom" class="diy-r-canvas-cut cut-bottom"><div></div><span></span></li>\n</ul>\n';
        return f(b).appendTo(a)
    },
	b.updateCutter = function (a, b) {
	    var c = b.zoomRatio,
		e = b.canvasSize.pxBlood * c;
	    d(a, {
	        left: e,
	        top: e,
	        right: e,
	        bottom: e
	    })
	},
	b.updateCutterByAnim = function (a, e, f) {
	    var h = c(a),
		i = e.zoomRatio,
		j = e.canvasSize.pxBlood * i;
	    a.show().css({
	        opacity: "0.3"
	    }).animate({
	        opacity: "1"
	    },
		g),
		d(a, h),
		d(a, {
		    left: j,
		    top: j,
		    right: j,
		    bottom: j
		},
		!0,
		function () {
		    b.updateCutter(a, e),
			f && f()
		})
	},
	b.hideCutter = function (a, b) {
	    var e = c(a);
	    d(a, e, !0, b, "fast")
	}
}),
define("diy/dropControl", ["jquery/jquery/1.7.2/jquery", "diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/Dialog"],
function (a, b) {
    "use strict";
    function c() {
        f(".diy-r-canvas");
        f("#diyLeftContent").children("li").on("mouseover", "img",
		function () {
		    f(this).draggable({
		        cursor: "move",
		        appendTo: "body",
		        scope: "diy-r-canvas",
		        helper: function () {
		            return f(this).clone().addClass("diy-dragging-img")
		        },
		        revert: "invalid",
		        cursorAt: {
		            top: 20,
		            left: 70
		        }
		    })
		}),
		f("#diyLeftContent").children("[data-item=diy_photo],[data-item=diy_logo]").on("mouseover", "img",
		function () {
		    var a;
		    f(this).draggable({
		        cursor: "move",
		        appendTo: "body",
		        scope: "diy-r-canvas",
		        helper: function () {
		            return f(this).clone().addClass("diy-dragging-img")
		        },
		        revert: "invalid",
		        cursorAt: {
		            top: 20,
		            left: 70
		        },
		        start: function () {
		            a = f(".diy-r-canvas").find("[data-key='../../../../../../diy/logos/dragPhoto.jpg'/*tpa=http://www.mayicy.cn/diy/logos/dragPhoto.jpg*/]"),
					g.cancelSele(),
					a.droppable({
					    activeClass: "diy-canvas-active",
					    hoverClass: "diy-canvas-hover",
					    scope: "diy-r-canvas",
					    over: function (a, b) {
					        b.helper.css({
					            transform: "scale(1.2,1.2)",
					            opacity: .7
					        }),
							g.container.droppable("disable")
					    },
					    out: function (a, b) {
					        b.helper.css({
					            transform: "scale(1)",
					            opacity: 1
					        }),
							g.container.droppable("enable")
					    },
					    drop: function (a, b) {
					        return g.canvas.replaceDiyPhotoFromDragger(f(this), b.helper),
							g.seleElem(f(this)),
							g.container.removeClass("diy-canvas-active diy-canvas-hover").droppable("enable"),
							!1
					    }
					})
		        },
		        stop: function () {
		            a.droppable("destroy")
		        }
		    })
		})
    }
    function d() {
        var a = f(".diy-r-canvas");
        a.droppable({
            activeClass: "diy-canvas-active",
            hoverClass: "diy-canvas-hover",
            scope: "diy-r-canvas",
            over: function (a, b) {
                b.helper.css({
                    transform: "scale(1.2,1.2)",
                    opacity: .7
                })
            },
            out: function (a, b) {
                b.helper.css({
                    transform: "scale(1)",
                    opacity: 1
                })
            },
            drop: function (a, b) {
                var c, d = b.helper.attr("data-type");
                switch (d) {
                    case "diy_photo":
                        c = g.canvas.addDiyPhoto(b.helper).curElemArr;
                        break;
                    case "diy_text":
                        c = g.canvas.addDiyText(b.helper).curElemArr;
                        break;
                    case "diy_background":
                        var e = parseInt(b.helper.attr("data-origin_width")),
                        f = parseInt(b.helper.attr("data-origin_height")),
                        i = g.canvas.canvasSize.pxWidth,
                        j = g.canvas.canvasSize.pxHeight;
                        if (!(f > e && j > i || e > f && i > j)) return void h("画布已经旋转，这张背景不能用于这张画布哦！！");
                        c = g.canvas.addDiyBackground(b.helper).curElemArr;
                        break;
                    case "diy_logo":
                        c = g.canvas.addDiyLogo(b.helper, "logo").curElemArr;
                        break;
                    case "diy_user_logo":
                        c = g.canvas.addDiyLogo(b.helper, "user_logo").curElemArr;
                        break;
                    case "diy_frame":
                        c = g.canvas.addDiyFrame(b.helper).curElemArr;
                        break;
                    case "diy_model":
                        c = g.canvas.addDiyModel(b.helper).curElemArr
                }
                g.seleMoreElems(c)
            }
        })
    }
    function e() {
        c(),
		d()
    }
    var f = a("jquery/jquery/1.7.2/jquery"),
	g = a("diy/canvasControl").getSelector(),
	h = a("zz/ui/alert");
    e(),
	b.reBindCanvasDrop = d
}),
define("diy/toolControl", ["zz/plugins/actionMap", "jquery/jquery/1.7.2/jquery", "jquery.mousewheel", "diy/canvasControl", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/plugins/selectable", "zz/core/Class", "zz/utils/objs", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/Dialog", "jquery.easing", "zz/utils/types", "zz/ui/base/Panel", "zz/ui/Mask", "zz/ui/info", "diy/config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "arale/cookie/1.0.2/cookie", "zz/utils/keyCode", "zz/utils/loadImgs", "diy/common/userActions", "diy/common/preview", "zz/ui/Range", "zz/ui/plugins/draggable2"],
function (a, b) {
    function c() {
        return global.content.pages.forEach(function (a, b) {
            i.extend(a, k[b].getDiyAllData())
        }),
		global.content
    }
    function d() {
        var a = function () {
            i(this).removeClass("disabled")
        },
		b = function () {
		    i(this).addClass("disabled")
		};
        k.forEach(function (c) {
            c.history.unState("UNDO_NO_EMPTY").unState("REDO_NO_EMPTY").unState("UNDO_EMPTY").unState("REDO_EMPTY").onState("UNDO_NO_EMPTY", a, t.find("[data-action=undo]")).onState("REDO_NO_EMPTY", a, t.find("[data-action=redo]")).onState("UNDO_EMPTY", b, t.find("[data-action=undo]")).onState("REDO_EMPTY", b, t.find("[data-action=redo]")).triggerState("UNDO_EMPTY").triggerState("REDO_EMPTY")
        })
    }
    function e() {
        var b = new (a("zz/ui/Range"))({
            appendTo: t,
            css: {
                right: "86px",
                top: "8px"
            },
            changeFn: function (a) {
                var b = l.canvas;
                b.zoom(a,
				function () {
				    l.updateRect()
				})
            },
            scope: [l.canvas.minZoom, l.canvas.maxZoom]
        });
        b.open(),
		b.setRange(l.canvas.zoomRatio),
		i(document).mousewheel(function (a, c) {
		    (a.altKey || a.ctrlKey) && (c > 0 ? b.bigger() : b.smaller(), a.preventDefault(), a.stopPropagation()),
                l.updateRect()
		}),
		b.$range.attr("title", "alt+滚轮"),
		t.data("rangeObj", b)
    }
    function f(a) {
        var b, c = t.find("[data-action=save]");
        k.forEach(function (d) {
            d.history.onState("CHANGE",
			function () {
			    c.removeClass("disabled"),
				c.html('<i class="i-btn save"></i>保存');
			    var d = (new Date).getTime(),
				e = c.attr("save-time") || 0;
			    b && clearTimeout(b),
				d - e >= a ? (b = null, g(!0)) : b = setTimeout(function () {
				    g(!0)
				},
				a)
			})
        })
    }
    function g(a, b) {
        var c, d, e, f = t.find("[data-action=save]").addClass("disabled"),
		g = [],
		h = !0;
        return k.forEach(function (a) {
            var b;
            return (b = a.checkTextMean()) ? (h = !1, d = b, void (e = a.index)) : a.bgElem.attr("data-key") ? void g.push(a.getDiyAllData()) : void (h = !1)
        }),
		c = {
		    type: k[0].getType(),
		    pages: g,
		    "extends": {}
		},
		k[0].opts.hasRadius && (c.extends.rotate = !0),
		h ? (f.attr("save-time", (new Date).getTime()), void m.save(c,
		function (c) {
		    if (c && b && b(), a && c) {
		        var d = new Date;
		        f.html('<i class="i-btn save"></i>自动保存(' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")"),
				f.addClass("disabled")
		    } else f.removeClass("disabled"),
			f.html('<i class="i-btn save"></i>保存')
		},
		a)) : void (a ? (f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')) : d ? (j.seleCanvas(e), l.seleElem(d), p("请为指定文本选择文本所属类别！！"), f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')) : (p("正反面都需要添加背景图片哦！！"), f.removeClass("disabled"), f.html('<i class="i-btn save"></i>保存')))
    }
    function h() {
        i(document).on("keydown.diyshotcut",
		function (a) {
		    if (!l.isEdit()) {
		        if (a.keyCode == o.get("delete") && u.del(), a.keyCode == o.get("left")) return l.moveElem(-1, 0),
				void a.preventDefault();
		        if (a.keyCode == o.get("right")) return l.moveElem(1, 0),
				void a.preventDefault();
		        if (a.keyCode == o.get("up")) return l.moveElem(0, -1),
				void a.preventDefault();
		        if (a.keyCode == o.get("down")) return l.moveElem(0, 1),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("c")) return l.copy(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("x")) return l.cut(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("v")) return l.paste(),
				void a.preventDefault();
		        if (a.ctrlKey && a.keyCode == o.get("s")) return g(),
				void a.preventDefault();
		        a.ctrlKey && !a.shiftKey && a.keyCode == o.get("z") && u.undo(),
				(a.ctrlKey && a.shiftKey && a.keyCode == o.get("z") || a.ctrlKey && a.keyCode == o.get("y")) && u.redo()
		    }
		}),
		t.actionMap(u, null, {
		    disabled: !0
		}),
		e(),
		d(),
		global.isUser || f(1e4)
    }
    a("zz/plugins/actionMap"),
	a("jquery.mousewheel");
    var i = a("jquery/jquery/1.7.2/jquery"),
	j = a("diy/canvasControl"),
	k = j.getCanvasArr(),
	l = j.getSelector(),
	m = a("diy/canvasDataControl"),
	n = (a("arale/cookie/1.0.2/cookie"), a("zz/ui/Dialog"), a("zz/ui/base/Panel")),
	o = a("zz/utils/keyCode"),
	p = (a("zz/utils/loadImgs"), a("zz/ui/alert")),
	q = (a("zz/utils/utils"), a("zz/ui/loading")),
	r = a("diy/common/userActions"),
	s = a("zz/ui/confirm"),
	t = i("#diyToolPanel"),
	u = {
	    redo: function () {
	        var a = l.canvas.history.redo();
	        a && l.seleMoreElems(a)
	    },
	    undo: function () {
	        var a = l.canvas.history.undo();
	        l.seleMoreElems(a)
	    },
	    del: function () {
	        l.del()
	    },
	    preview: function () {
	        a("diy/common/preview").open(k, l.canvas.index)
	    },
	    save: function () {
	        g()
	    },
	    fangzhi_save: function () {
	        var a = i(this);
	        a.addClass("disabled"),
			r.fangzhiSave({
			    canvasArr: k,
			    alwaysCb: function () {
			        a.removeClass("disabled")
			    }
			})
	    },
	    fangzhi_pdf: function () {
	        s("生成pdf比较慢，需要一分多钟，您确定要生成吗? ",
			function () {
			    var a = q("正在生成pdf, 请耐心等待。。。"),
				b = i(this).addClass("disabled");
			    r.fangzhiSave({
			        canvasArr: k,
			        doneCb: function () {
			            r.fangzhiPdf(function () {
			                a.close(),
							b.removeClass("disabled")
			            })
			        },
			        noInfo: !0
			    })
			})
	    },
	    user_save: function () {
	        function a() {
	            b.removeClass("disabled")
	        }
	        var b = i(this);
	        b.addClass("disabled"),
			global.isService ? global.service_save(c(), a) : r.save({
			    canvasArr: k,
			    alwaysCb: function () {
			        b.removeClass("disabled")
			    }
			})
	    },
	    user_buy: function () {
	        function a() {
	            b.close(),
				d.removeClass("disabled")
	        }
	        var b = q("正在下单，请耐心等待。。。"),
			d = i(this).addClass("disabled");
	        global.isService ? global.service_audit(c(), a) : r.save({
	            canvasArr: k,
	            doneCb: function () {
	                r.buy(function () {
	                    b.close(),
						d.removeClass("disabled")
	                })
	            },
	            noInfo: !0
	        })
	    },
	    addModel: function () {
	        var a = l.canvas.addDiyModel();
	        l.seleElem(a)
	    },
	    audit: function () {
	        var a = i(this);
	        g(!1,
			function () {
			    a.addClass("disabled"),
				m.audit(function () {
				    a.removeClass("disabled")
				})
			})
	    },
	    drawLine: function (a) {
	        a.stopPropagation();
	        var b = i(this),
			c = new n({
			    append: i('<div><a href="javascript:;" class="diy-tb-item">水平线段</a></div><div><a href="javascript:;" class="diy-tb-item">垂直线段</a></div>'),
			    blankToClose: !0,
			    closeToDispose: !0
			}).onState("CLOSE",
			function () {
			    b.removeClass("select")
			}).open();
	        c.$target.css({
	            left: b.offset().left,
	            top: b.offset().top + i(this).outerHeight()
	        }).children().click(function () {
	            var a = i(this).index(),
				b = !a,
				d = l.canvas.container,
				e = l.canvas.addDiyLine().attr({
				    "data-is-vertical": a || ""
				}).css({
				    width: a ? 15 : 100,
				    height: a ? 100 : 15
				});
	            e.css({
	                left: (d.width() - e.width()) / 2,
	                top: (d.height() - e.height()) / 2
	            }),
				e.children().css({
				    borderLeft: a && "5px solid black",
				    borderTop: b && "5px solid black",
				    marginLeft: 5 * a,
				    marginTop: 5 * b,
				    width: b && "100%",
				    height: a && "100%"
				}),
				l.seleElem(e),
				c.close()
	        }),
			i(this).addClass("select")
	    }
	};
    h(),
	b.reBind = function () {
	    d(),
		global.isUser || f(1e4)
	}
}),
define("diy/common/userActions", ["zz/utils/objs", "zz/utils/types", "arale/cookie/1.0.2/cookie", "jquery/jquery/1.7.2/jquery", "zz/ui/info", "zz/ui/Dialog", "zz/ui/alert", "zz/utils/beforeUnload"],
function (a, b) {
    "use strict";
    function c(a) {
        a.preCb && a.preCb(),
		d(a.canvasArr),
		global.content.pages.forEach(function (b, c) {
		    i.extend(b, a.canvasArr[c].getDiyAllData())
		}),
		global.user_template_id ? l.post("/Goods/edit", {
		    template_id: global.user_template_id,
		    content: JSON.stringify(global.content),
		    csrf_token: l("#csrf_token").val()
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		}) : l.post("/templet/api/create", {
		    template_id: global.template_id,
		    product_id: global.product_id,
		    content: JSON.stringify(global.content),
		    csrf_token: l("#csrf_token").val()
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), global.user_template_id = b.data.id, a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		})
    }
    function d(a) {
        var b = [];
        a.forEach(function (a, c) {
            b[c] = {},
			a.childElems.forEach(function (a) {
			    "diy_text" === a.attr("data-type") && (b[c][a.attr("data-mean")] = a.attr("data-content"))
			})
        }),
		k.set(j, JSON.stringify(b), {
		    expires: 30,
		    path: "/templet"
		})
    }
    function e() {
        return JSON.parse(k.get(j) || "[]")
    }
    function f(b) {
        l.post("/Goods/pdf", {
            template_id: global.user_template_id,
            product_id: global.product_id,
            csrf_token: l("#csrf_token").val()
        }).done(function (b) {
            if (200 === b.code) {
                m("保存预览数据成功"),
				a("zz/utils/beforeUnload").unbind();
                var c = l(".diy-tb-item.diy-tb-item-focus").data("code");
                if (c) var d = b.data.url + "?code=" + c;
                else var d = b.data.url + "?";
                /[?&]a=1(&|$)/.test(location.href) && (d += "&a=1"),
				l(document.body).hasClass("global-iframe") && (d += "&iframe=1"),
				global.easy_iframe ? window.parent.location.href = "http://www.zhubajie.com/c-mpkpsj/mpsj/index-reuse.html?iframe=" + encodeURIComponent(d) : location.href = d
            } else b.msg && n(b.msg)
        }).always(function () {
            b && b()
        })
    }
    function g(a) {
        a.preCb && a.preCb(),
		global.content.pages.forEach(function (b, c) {
		    i.extend(b, a.canvasArr[c].getDiyAllData())
		}),
		global.user_imitation_id ? l.post("/fz/templet/api/edit", {
		    imitation_id: global.user_imitation_id,
		    content: JSON.stringify(global.content)
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		}) : l.post("/fz/templet/api/create", {
		    imitation_id: global.imitation_id,
		    pid: global.pid,
		    name: global.name,
		    content: JSON.stringify(global.content),
		    task_id: global.task_id
		}).done(function (b) {
		    200 === b.code ? (!a.noInfo && m("保存成功"), global.user_imitation_id = b.data.id, a.doneCb && a.doneCb()) : b.msg && n(b.msg)
		}).always(function () {
		    a.alwaysCb && a.alwaysCb()
		})
    }
    function h(a) {
        function b() {
            setTimeout(function () {
                l.get("/fz/templet/file/download?id=" + global.user_imitation_id).done(function (c) {
                    200 === c.code ? (a && a(), n('<a class="ui-button ui-button-lred" href="' + c.data.url + '" download >点击此处下载pdf</a>', null, "关闭")) : 0 !== e ? b() : (n("生成pdf超时, 请重新生成!!"), e = d, a && a())
                }).fail(function () {
                    n("生成pdf错误，请重试!!"),
					a && a()
                }),
				e--
            },
			c)
        }
        var c = 1e4,
		d = 60,
		e = d;
        l.post("/fz/templet/api/create/pdf", {
            imitation_id: global.user_imitation_id
        }).done(function (c) {
            200 === c.code ? b() : (c.msg && n(c.msg), a && a())
        }).fail(function () {
            a && a()
        })
    }
    var i = a("zz/utils/objs"),
	j = "diyCookieData",
	k = a("arale/cookie/1.0.2/cookie"),
	l = a("jquery/jquery/1.7.2/jquery"),
	m = a("zz/ui/info"),
	n = a("zz/ui/alert");
    b.save = c,
	b.buy = f,
	b.fangzhiSave = g,
	b.fangzhiPdf = h,
	b.saveCookie = d,
	b.getCookie = e
}),
define("diy/common/preview", ["jquery/jquery/1.7.2/jquery", "zz/utils/loadImgs", "zz/utils/objs", "zz/core/Class", "zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/types", "zz/ui/base/Panel", "zz/ui/Mask", "zz/utils/utils", "zz/ui/loading", "zz/ui/alert"],
function (a, b) {
    "use strict";
    function c(a, b) {
        if (!a.bgElem.attr("data-key")) return void j("你还没有添加背景图片哦！！");
        var c = a.getDiyAllData(),
		f = a.canvasSize;
        c = JSON.stringify(c),
		d = i("正在打开预览图..."),
		e.post(n, {
		    content: c,
		    zoom_size: f.mmWidth + "x" + f.mmHeight
		}).done(function (a) {
		    var c = f.pxWidth * k,
			d = f.pxHeight * k,
			g = h.ratioImg(c, d, l, l);
		    g = h.ratioImg(g[0], g[1], e(window).width() - 2 * m, e(window).height() - 2 * m),
			b(g[0], g[1], a)
		}).fail(function () {
		    j("系统出错了！！"),
			d.close()
		})
    }
    var d, e = a("jquery/jquery/1.7.2/jquery"),
	f = a("zz/utils/loadImgs"),
	g = a("zz/ui/Dialog"),
	h = a("zz/utils/utils"),
	i = a("zz/ui/loading"),
	j = a("zz/ui/alert"),
	k = .5,
	l = 500,
	m = 40,
	n = global.DIY_PREVIEW || "/Goods/design",
	o = global.DIY_PREVIEW_IMG || "/Goods/preview";
    b.open = function (a, b, h, i, l) {
        function m(a) {
            var b, c = "",
			d = "";
            return b = o + "?ratio=" + k + "&ctime=" + (new Date).getTime(),
			a && 200 === a.code && (c = a.data.key, d = a.data.time, b = b + "&key=" + c + "&time=" + d),
			b
        }
        var n = [];
        n.push(b),
		c(a[b],
		function (k, o, p) {
		    f({
		        imgs: [m(p)],
		        done: function (f) {
		            d.close();
		            var p, q = h ? "confirm-wrap" : "confirm-wrap none";
		            p = new g({
		                hasTitle: !1,
		                hasFoot: !1,
		                append: "<div class='" + q + "'>" + l + '<a class="ui-dialog-btn" data-action="confirm">确定</a><a class="ui-dialog-btn" data-action="close">取消</a></div>\n<div class=\'img-wrap\' style=\'padding:1px;\'>\n<a class="next-btn left" data-type="left" data-action="next" title="上一页"><i class="iconfont"></i></a>\n<a class="next-btn right" data-type="right" data-action="next" title="下一页"><i class="iconfont"></i></a>\n<img style=\'display:block\' data-index=' + b + " src=" + f.src + " width='" + k + "' height='" + o + "'></div>",
		                maskZindex: 10500,
		                closeToDispose: !0,
		                className: "diy-preview-dialog",
		                actions: {
		                    confirm: function () {
		                        i && i(),
								this.close()
		                    },
		                    next: function (b) {
		                        switch (e(b.currentTarget).attr("data-type")) {
		                            case "left":
		                                var f = this.curIndex - 1;
		                                0 > f && (f = a.length - 1);
		                                break;
		                            case "right":
		                                var f = this.curIndex + 1;
		                                f >= a.length && (f = 0)
		                        }
		                        if (this.curIndex = f, -1 === n.indexOf(f)) {
		                            if (!a[f].bgElem.attr("data-key")) return void j("你还没有添加背景图片哦！！");
		                            n.push(f),
									c(a[f],
									function (a, b, c) {
									    d.close();
									    var g = m(c);
									    e(".global-iframe").size() || p.css({
									        "margin-left": "-" + a / 2 + "px",
									        "margin-top": "-" + b / 2 + "px"
									    }),
										p.$target.find("img").hide().parent().append('<img src="' + g + '" data-index="' + f + '" width="' + a + '" height="' + b + '"/>')
									})
		                        } else {
		                            var g = this.$target.find("img").hide().filter("[data-index=" + f + "]");
		                            g.show();
		                            var h = g.width(),
									i = g.height();
		                            e(".global-iframe").size() || p.css({
		                                "margin-left": "-" + h / 2 + "px",
		                                "margin-top": "-" + i / 2 + "px"
		                            })
		                        }
		                    }
		                }
		            }),
					p.curIndex = b,
					p.open()
		        }
		    })
		})
    }
}),
define("diy/leftControl", ["zz/plugins/actionMap", "jquery/jquery/1.7.2/jquery", "zz/plugins/uploadFile", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "zz/ui/Tabs", "zz/utils/objs", "zz/core/Class", "zz/ui/base/Panel", "zz/ui/Color2Picker", "jquery.color", "zz/plugins/input", "zz/ui/utils/colorConvert", "zz/extends/single", "zz/utils/keyCode", "diy/canvasControl", "zz/ui/plugins/selectable", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "diy/canvasDataControl", "zz/ui/Dialog", "zz/utils/loadImgs", "zz/ui/alert"],
function (a, b) {
    "use strict";
    function c() {
        n("#bgColor").click(function (a) {
            var b = new p,
			c = q.canvas,
			d = n(this);
            a.stopPropagation(),
			b.onceState("OPEN",
			function () {
			    d.addClass("select"),
				this.setColor(d.children("i").css("backgroundColor"))
			}).onceState("SELECT",
			function () {
			    var a = this.getColor();
			    c.addDiyBackground(a),
				d.children("i").css("backgroundColor", a)
			}).onceState("CLOSE",
			function () {
			    d.removeClass("select")
			}).open(n(this))
        }),
		n("#cancelBg").click(function () {
		    var a = q.canvas;
		    a.addDiyBackground("#FFFFFF"),
			n("#bgColor").children("i").css("backgroundColor", "#FFFFFF")
		})
    }
    function d() {
        l = new o({
            $controls: n("#diyLeftTab").children(),
            $panels: n("#diyLeftContent").children(),
            activeClass: "select",
            selectCb: function () {
                var a = n("#diyLeftContent"),
				b = a.height();
                a.height(b + 1),
				setTimeout(function () {
				    a.height(b)
				},
				100)
            }
        })
    }
    function e() {
        n("#diyLeftContent").actionMap({
            "del-img": function () {
                r("确定要删除该图片吗？",
				function () {
				    n(this).parent().remove()
				}.bind(this))
            }
        })
    }
    function f(a, b, c) {
        var d = n("#" + b),
		e = {},
		f = a + "UploadBtn";
        d.parent().attr("id", f),
		"diy_background" === a && (e = {
		    zoom_size: q.canvas.canvasSize.pxWidth + "x" + q.canvas.canvasSize.pxHeight
		}),
		global.isService && (e.sign = "WuJtLWxCnCIsJt0y0kaVUfkfdi5wa1Emn9ylsHiZ/U4=");
        var i = new plupload.Uploader({
            runtimes: "html5,gears,flash,silverlight,browserplus,html4",
            browse_button: b,
            container: f,
            url: global.DIY_UPLOAD || "/Goods/upload",
            flash_swf_url: global.DIY_UPLOAD_FLASH || "../../../../../../sfr/plupload.flash.swf"/*tpa=http://www.mayicy.cn/sfr/plupload.flash.swf*/,
            filters: [{
                title: "Images files",
                extensions: "jpg,png,jpeg"
            }],
            multipart_params: e || {}
        });
        return i.bind("Init",
		function (a, b) {
		    console.log("upload runtime: " + b.runtime)
		}),
		i.init(),
		i.bind("FilesAdded",
		function (b) {
		    "diy_photo" === a && j(a),
			"diy_background" === a && (i.settings.multipart_params || (i.settings.multipart_params = {}), i.settings.multipart_params.zoom_size = q.canvas.canvasSize.pxWidth + "x" + q.canvas.canvasSize.pxHeight, i.refresh()),
			g(a),
			setTimeout(function () {
			    b.start()
			},
			30)
		}),
		i.bind("FileUploaded",
		function (b, e, f) {
		    b.refresh();
		    var g, i, j, k = JSON.parse(f.response);
		    if (200 == k.code && k.data && (k = k.data), d.html(c), "diy_background" === a) {
		       // if ("image/jpeg" !== k.mime_type) return t("请上传jpg格式图片"),
				void h();
		        if ("CMYK" !== k.mode) return t("请上传CMYK模式图片8389"),
				void h();
		        if (!k.dpi || 0 === k.dpi.length) return t("对不起，系统检测不出您图片的分辨率值，请尝试在ps上修改分辨率值再上传"),
				void h();
		        if (k.dpi[0] < 300 || k.dpi[1] < 300) return t("您的分辨率值" + k.dpi[0] + "像素/每英寸不符合规定哦"),
				void h();
		        if (g = Math.round(k.width / k.dpi[0] * 25.4), i = Math.round(k.height / k.dpi[1] * 25.4), j = q.canvas.canvasSize, j.mmWidth !== g && j.mmHeight !== i) return t("您上传的图片大小为" + g + "*" + i + "毫米不符合要求, 需要" + j.mmWidth + "*" + j.mmHeight + "毫米且分辨率≥300像素/英寸的图片!!"),
				void h()
		    }
		    var l = "CMYK" === k.mode ? k.rgb_url : k.url;
		    s({
		        imgs:  [l],//[l + "!xmlog"],
		        done: function (b) {
                    console.log(b);
		            var c = n("#diyLeftContent").children("[data-item=" + a + "]");
		            h();
		            var d = n.tmpl(u, {
		                src: b.src,
		                origin_width: k.width,
		                origin_height: k.height,
		                type: "diy_logo" === a ? "diy_user_logo" : a,
		                key: k.key,
		                dpiX: k.dpi ? k.dpi[0] : 0,
		                dpiY: k.dpi ? k.dpi[1] : 0
		            });
		            d.children("span").remove(),
					c.append(d)
		        }
		    })
		}),
		i.bind("UploadProgress",
		function (a, b) {
		    d.text("已上传: " + b.percent + "%"),
			100 == b.percent && d.html(c)
		}),
		i.bind("Error",
		function (a, b) {
		    console.error("Error: " + b.code + ", Message: " + b.message + (b.file ? ", File: " + b.file.name : "")),
			b.file && t("文件: " + b.file.name + "不符合规定哦！！"),
			h(),
			d.html(c),
			a.refresh()
		}),
		i
    }
    function g(a) {
        var b = n("<span class='img-wrap' data-type='img-preview'><span style=\"position:absolute;left:36px; top:36px;z-index:1;\">图片加载中。。。</span></span>");
        return b.css({
            height: "100px",
            border: "1px solid #ccc"
        }),
		n("#diyLeftContent").children("[data-item=" + a + "]").append(b),
		b
    }
    function h() {
        n("#diyLeftContent").find("[data-type=img-preview]").remove()
    }
    function i() {
        var a = n("#diyLeftContent"),
		b = n("<div id='diyLeftPhotoTab'class='diy-left-photo-tab'><a class='select' data-select='diy_logo'>快印素材</a><a data-select='diy_photo'>我的上传</a></div>");
        a.children("[data-item=diy_photo]").append(b),
		b.children("a").click(function () {
		    j(n(this).attr("data-select"))
		})
    }
    function j(a) {
        var b = n("#diyLeftPhotoTab");
        b.children("a").removeClass("select").filter("[data-select=" + a + "]").addClass("select"),
		n("#diyLeftContent").children("[data-item=diy_photo]").find("img[data-type]").parent().hide().end().filter("[data-type=" + a + "]").parent().show()
    }
    function k() {
        c(),
		e(),
		d(),
		i(),
		m = f("diy_background", "uploadBackground", "上传背景"),
		!global.isUser && f("diy_photo", "uploadPhoto", "上传图片"),
		f("diy_logo", "uploadLogo", "上传Logo")
    }
    a("zz/plugins/actionMap"),
	a("zz/plugins/uploadFile"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.ui"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/plupload/plupload.full"),
	a("http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl");
    var l, m, n = a("jquery/jquery/1.7.2/jquery"),
	o = a("zz/ui/Tabs"),
	p = (a("zz/ui/base/Panel"), a("zz/ui/Color2Picker")),
	q = a("diy/canvasControl").getSelector(),
	r = a("zz/ui/confirm"),
	s = a("zz/utils/loadImgs"),
	t = a("zz/ui/alert"),
	u = "<span class='img-wrap'>\n    <a style=\"z-index:44\" class='del-btn' data-src='${src}' data-action='del-img' data-type='${type}'>×</a>\n    <span style=\"position:absolute;left:36px; top:36px;z-index:1;\">图片加载中。。。</span>\n    <img src='${src}' data-src='${src}' data-dpiX='${dpiX}' data-dpiY='${dpiY}' data-origin_width='${origin_width}' data-type='${type}' data-origin_height='${origin_height}' data-key=\"${key}\"draggable='false' class='ui-draggable'/>\n</span>";
    k(),
	b.select = function (a) {
	    l._select(a)
	}
}),
define("diy/diyGuide", ["zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/ui/base/Panel", "jquery/jquery/1.7.2/jquery", "zz/ui/Mask", "zz/ui/MaskRect", "diy/canvasControl", "zz/ui/plugins/selectable", "zz/ui/confirm", "diy/models/SelectorClass", "diy/models/CanvasClass", "zz/ui/Color2Picker", "diy/canvasDataControl", "arale/cookie/1.0.2/cookie"],
function (a) {
    "use strict";
    function b() {
        j = new n,
		k = new m({
		    hasTitle: !1,
		    hasFoot: !1,
		    hasMask: !1,
		    innerHTML: "",
		    className: "diy-guide",
		    isCenter: !1,
		    left: 249,
		    top: 40,
		    actions: {
		        step: function (a) {
		            d(p(a.currentTarget).data("index"))
		        },
		        close: function () {
		            f()
		        }
		    }
		})
    }
    function c() {
        j || b(),
		j.open(),
		k.open(),
		d(0)
    }
    function d(a) {
        var b, c, d, g, h = s[a];
        return l && (l(), l = null),
		h ? (g = q.replace("{{content}}", h.content).replace(/{{nextIndex}}/g, 1 + a).replace(/{{preIndex}}/g, a - 1).replace(/{{index}}/g, 1 + a), g = p(g), b = e(h.rect), c = e(h.dialogRect), d = e(h.focusRect), j.setRect(b), d && j.setFocusRect(d, h.focusImg), h.done && (h.done(), l = h.unDone), a >= 1 && k.$target.css({
		    "-webkit-transition": "all 0.3s ease",
		    "-o-transition": "all 0.3s ease",
		    "-moz-transition": "all 0.3s ease",
		    transition: "all 0.3s ease"
		}), a === s.length - 1 && g.children(".diy-guide-content").append("<p style='color:red;padding-top:10px'>注：编辑器现在还处于测试阶段，很多问题还没解决，欢迎您提出宝贵意见~~</p>"), void k.$target.css({
		    left: c[0] + "px",
		    top: c[1] + "px"
		}).find(".ui-dialog-body").html(g).find("[data-index=-1]").hide().end().find("[data-index=" + s.length + "]").text("结束教程")) : void f()
    }
    function e(a) {
        return p.isFunction(a) ? a() : a
    }
    function f() {
        j.close(),
		k.close(),
		j = null,
		k = null
    }
    function g() {
        if ("1" != r.get("noShowDiyGuide")) {
            var a = new m({
                hasTitle: !1,
                hasFoot: !1,
                innerHTML: '<div style="padding:50px 40px">\n    <div class="tc">\n        <a data-action="close" data-type="show" class="ui-button ui-button-lred mr10">观看教程</a>\n        <a data-action="close" data-type="unShow"class="ui-button ui-button-lred">已经看过</a>\n    </div>\n    <div style="position:absolute;bottom:15px;left:15px">\n        <label><input class="mr5" type="checkbox"/><span>以后不再弹出</span></label>\n    </div>\n</div>',
                actions: {
                    close: function (a) {
                        var b = this.$target.find("input")[0].checked;
                        b ? r.set("noShowDiyGuide", 1, {
                            expires: 30,
                            path: "/"
                        }) : r.remove("noShowDiyGuide"),
						"show" === p(a.currentTarget).data("type") && c(),
						this.close()
                    }
                }
            });
            a.open()
        }
    }
    function h() {
        var a = new m({
            title: "常用快捷键",
            innerHTML: '<div style="padding:15px 200px 15px 15px">\n   <p>保存：<em>ctrl + s</em></p>\n    <p>撤销：<em>ctrl + z</em></p>\n    <p>恢复：<em>ctrl + shift + z</em></p>\n    <p>复制：<em>ctrl + c</em></p>\n    <p>剪切：<em>ctrl + x</em></p>\n    <p>粘帖：<em>ctrl + v</em></p>\n    <p>删除：<em>delete</em></p>\n    <p>上移：<em>↑</em></p>\n    <p>下移：<em>↓</em></p>\n    <p>左移：<em>←</em></p>\n    <p>右移：<em>→</em></p>\n    <p>放大：<em>ctrl/alt + 滚轮上滚</em></p>\n    <p>缩小：<em>ctrl/alt + 滚轮下滚</em></p>\n    <p>水平移动画布(出现水平滚动条时)：<em>shift + 滚轮</em></p>\n</div>',
            className: "diy-shotcut-dlg"
        });
        a.open()
    }
    function i() {
        g(),
		p("#showDiyGuide").click(function () {
		    c()
		}),
		p("#shotcut").click(function () {
		    h()
		})
    }
    var j, k, l, m = a("zz/ui/Dialog"),
	n = a("zz/ui/MaskRect"),
	o = a("diy/canvasControl").getSelector(),
	p = a("jquery/jquery/1.7.2/jquery"),
	q = '<div style="padding:40px">\n<div class="diy-guide-title"><span>第{{index}}步: </span></div>\n<div style="width:400px" class="diy-guide-content">{{content}}</div>\n<div class="tr">\n<a class="ui-button ui-button-sred mr10" data-action="step" data-index="{{preIndex}}">上一步</a>\n<a class="ui-button ui-button-sred" data-action="step" data-index="{{nextIndex}}">下一步</a>\n</div>\n</div>',
	r = a("arale/cookie/1.0.2/cookie"),
	s = [{
	    rect: [40, 30, 200, 200],
	    dialogRect: [249, 40],
	    focusRect: [70, 53, 120, 41],
	    content: global.isUser ? "点击“上传LOGO”为名片添加logo" : "点击“上传背景”为名片添加背景，请注意背景图片必须完全符合“上传须知”。",
	    done: function () {
	        global.isUser ? p("#diyLeftTab").children(".logo").click() : p("#diyLeftTab").children(".bg").click()
	    }
	},
	{
	    rect: [40, 30, 200, 400],
	    dialogRect: [249, 240],
	    focusRect: [60, 230, 150, 90],
	    focusImg: global.s_domain + "/diy/imgs/guide1.jpg",
	    content: "上传完背景后会在这里显示，可将该图拖曳至右侧空白编辑区域进行编辑。"
	},
	{
	    rect: [0, 20, 240, 500],
	    dialogRect: [249, 40],
	    focusRect: [-2, 138, 40, 115],
	    content: "左边栏切换至“文字”，即可选择字体, 并可将字体拖移至右侧模板区进行文本编辑。",
	    done: function () {
	        p("#diyLeftTab").children(".font").click()
	    },
	    unDone: function () {
	        p("#diyLeftTab").children(".bg").click()
	    }
	},
	{
	    rect: function () {
	        var a = o.canvas.container;
	        return [a.offset().left - 5, a.offset().top - 5, a.width() + 10, a.height() + 10]
	    },
	    focusRect: function () {
	        var a = o.canvas.container,
			b = o.canvas.zoomRatio;
	        return [a.offset().left + 50, a.offset().top + 55, 409 * b, 199 * b]
	    },
	    dialogRect: function () {
	        var a = o.canvas.container;
	        return [a.offset().left + 50 - 100, a.offset().top + 70 + 199]
	    },
	    focusImg: global.s_domain + "/diy/imgs/guide2.png",
	    content: "拖过来的文本块可进行多种样式调整，文本块必须选择文本类别。"
	},
	{
	    rect: function () {
	        var a = o.canvas.container;
	        return [a.offset().left - 5, a.offset().top - 5, a.width() + 10, a.height() + 10]
	    },
	    focusRect: function () {
	        var a = o.canvas.container,
			b = o.canvas.zoomRatio;
	        return [a.offset().left + 50, a.offset().top + 55, 326 * b, 285 * b]
	    },
	    dialogRect: function () {
	        var a = o.canvas.container;
	        return [a.offset().left + 50 - 100, a.offset().top + 70 + 285]
	    },
	    focusImg: global.s_domain + "/diy/imgs/guide3.png",
	    content: "在画布空白区按住鼠标不放进行框选, 可选中多个文本块，并可进行批量编辑。"
	},
	{
	    rect: function () {
	        var a = p("#diyPageList").find(".select");
	        return [a.offset().left - 10, a.offset().top - 10, 2 * a.width() + 40, a.height() + 50]
	    },
	    focusRect: function () {
	        var a = p("#diyPageList").find(".select");
	        return [a.offset().left - 5, a.offset().top - 5, a.width() + 10, a.height() + 10]
	    },
	    dialogRect: function () {
	        var a = p("#diyPageList").find("li").eq(0);
	        return [a.offset().left - 200, a.offset().top - 200]
	    },
	    content: "点击这里可以切换画布正反面"
	},
	{
	    rect: [270, 25, 400, 60],
	    dialogRect: [255, 90],
	    focusRect: [410, 25, 60, 40],
	    content: "在制作过程中，可选择“撤销”和“恢复”，并要学会随时点击“保存”，系统也会为您定时自动保存。"
	},
	{
	    rect: [270, 25, 400, 60],
	    dialogRect: [295, 90],
	    focusRect: [480, 25, 75, 40],
	    content: global.isUser ? "设计完并确认无误后，点击下单印刷可直接下单" : "设计完成并确认无误后，点击“提交审核”等待后台审核该模板，审核结果可在“设计师专区 - 我设计的模板”中查看。"
	},
	{
	    rect: function () {
	        return [p("#shotcut").offset().left - 20, 0, 150, 40]
	    },
	    dialogRect: function () {
	        return [p("#shotcut").offset().left - 480, 90]
	    },
	    focusRect: function () {
	        return [p("#shotcut").offset().left - 5, 0, 64, 20]
	    },
	    content: "恭喜您，完成了编辑器教学，想要重新观看教程，可以点击右上角“观看教程”，编辑器还为您提供一些常用快捷键，点击这里可以查看。"
	}];
    i()
}),
define("diy/photoshopDemoDlg", ["zz/ui/Dialog", "http://www.mayicy.cn/Public/kuaiyin/static/js/dist/diy/jquery.tmpl", "jquery.easing", "zz/utils/objs", "zz/utils/types", "zz/core/Class", "zz/ui/base/Panel", "jquery/jquery/1.7.2/jquery", "zz/ui/Mask", "diy/canvasControl", "zz/ui/plugins/selectable", "zz/ui/plugins/state", "zz/utils/math", "zz/ui/base/Effect", "zz/utils/asserts", "zz/ui/confirm", "diy/models/SelectorClass", "zz/ui/plugins/draggable2", "zz/ui/plugins/resizable2", "zz/ui/plugins/rotable2", "jquery.transform", "zz/plugins/actionMap", "jquery.color", "zz/extends/single", "diy/models/selectorToolWrap", "zz/plugins/focusRect", "zz/ui/Color2Picker", "zz/plugins/input", "zz/ui/utils/colorConvert", "zz/utils/keyCode", "diy/config/canvasStaticData", "zz/utils/loadImgs", "zz/ui/alert", "diy/canvasDataControl", "zz/ui/info", "zz/utils/utils", "common/submitDesignDialog", "zz/ui/loading", "zz/utils/beforeUnload", "diy/config/configStaticData", "diy/models/CanvasClass", "diy/models/HistoryClass", "diy/models/canvasJsonWrap", "diy/canvasDataControl", "diy/config/canvasStaticData", "diy/common/cutter"],
function (a) {
    "use strict";
    function b() {
        var a = g.canvas.canvasSize,
		b = a.mmWidth,
		c = a.mmHeight,
		d = new e({
		    title: "Photoshop设置演示",
		    hasFoot: !1,
		    innerHTML: "<div style='background:url(" + f + ");width:556px;height:449px;'><p style='left:176px;top:209px;'>" + b + "</p><p style='left:176px;top:239px;'>" + c + " </p></div>"
		});
        d.$target.find("p").css({
            backgroundColor: "white",
            height: "17px",
            position: "absolute",
            color: "#444",
            "padding-right": "5px"
        }),
		d.open()
    }
    function c() {
        var a = h("#diyLeftContent").children("[data-item=diy_background]"),
		c = h('<a style="display:block;color:rgb(190,37,37);margin-left:10px">查看ps设置演示</a>').appendTo(a);
        c.click(function () {
            b()
        })
    }
    function d() {
        c()
    }
    var e = a("zz/ui/Dialog"),
	f = global.s_domain + "/diy/imgs/psDemo.png",
	g = a("diy/canvasControl").getSelector(),
	h = a("jquery/jquery/1.7.2/jquery");
    d()
}),
define("diy/categoryTab", ["jquery/jquery/1.7.2/jquery", "diy/filterCategoryTree", "diy/canvasDataControl", "zz/ui/alert", "zz/ui/Dialog", "zz/ui/info", "zz/ui/confirm", "diy/config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/utils/beforeUnload"],
function (a) {
    "use strict";
    function b(a, b) {
        var c = e("<div class='diy-cat-tip'></div>").appendTo(a),
		d = "<a href='{{href}}' target='_blank'>{{cn_name}}</a>";
        switch (b) {
            case "category":
                f.forEach(function (b) {
                    var f, g, h = "";
                    b.en_name !== a.attr("data-name") && (g = e(d.replace("{{cn_name}}", b.cn_name).replace("{{href}}", "javascript:;")), g.appendTo(c), b.childrens && 0 !== b.childrens.length && (f = e('<div class="diy-cat-tip-next"></div>').appendTo(g), b.childrens.forEach(function (a) {
                        var c = "/design/" + b.id + "/" + a.id + "/create";
                        h += d.replace("{{cn_name}}", a.cn_name).replace("{{href}}", c),
                        f.html(h)
                    })))
                });
                break;
            case "product":
                f.forEach(function (b) {
                    var e = a.attr("data-parent-name"),
                    f = "";
                    e === b.en_name && b.childrens && 0 !== b.childrens.length && b.childrens.forEach(function (e) {
                        if (e.en_name !== a.attr("data-name")) {
                            var g = "/design/" + b.id + "/" + e.id + "/create";
                            f += d.replace("{{cn_name}}", e.cn_name).replace("{{href}}", g),
                            c.html(f)
                        }
                    })
                })
        }
        "" !== c.html() ? c.show().css("left", a.position().left - c.width() / 2 + a.width() / 2) : c.hide()
    }
    function c(a) {
        a.find(".diy-cat-tip").remove()
    }
    function d() {
        e("#diyTypeData").find("[data-hover=category]").hover(function () {
            b(e(this), "category")
        },
		function () {
		    c(e(this))
		}).end().find("[data-hover=product]").hover(function () {
		    b(e(this), "product")
		},
		function () {
		    c(e(this))
		})
    }
    var e = a("jquery/jquery/1.7.2/jquery"),
	f = a("diy/filterCategoryTree");
    d()
}),
define("diy/filterCategoryTree", ["diy/canvasDataControl", "jquery/jquery/1.7.2/jquery", "zz/ui/alert", "zz/ui/Dialog", "zz/ui/info", "zz/ui/confirm", "diy/config/canvasStaticData", "zz/utils/utils", "common/submitDesignDialog", "zz/utils/beforeUnload"],
function (a) {
    "use strict";
    function b() {
        var a = global.categories_tree || [];
        a = a.filter(function (a) {
            return a.childrens && (a.childrens = a.childrens.filter(function (b) {
                return c(a.en_name, b.en_name) ? ("宣传品" === a.cn_name && (a.cn_name = "宣传单"), "PVC卡" === a.cn_name && (a.cn_name = "PVC"), !0) : void 0
            })),
			0 != a.childrens.length ? !0 : void 0
        }),
		global.categories_tree = a
    }
    var c = a("diy/canvasDataControl").hasType;
    return b(),
	global.categories_tree
});