/**
 * 不同产品相关数据
 * @author by liuwencheng
 * @date 2013-12-3
 *      尺寸类型数组表示(单位毫米): 宽，高，出血线，内容限制线，是否圆角
 */
define(function(require,exports) {
    "use strict"
    /**
     * 文本自动填写对照表
     */
    exports._meanAutoTexts = {
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
        company: "重庆猪八戒网络有限公司",
        username: "猪八戒",
        job: "总经理",
        website: "网站：http://kuaiyin.zhubajie.com",
        mobile: "手机：xxxxxxxxxxx",
        telphone: "电话：023-61690371",
        address: "地址：重庆市北部新区青枫北路30号凤凰座C座5F",
        email: "邮箱：zbj@zhubajie.com",
        fax: "传真：023-63866338",
        advert: "广告语",
        qq: "QQ：2969788304",
        info1: "说明一",
        info2: "说明二",
        other: "其他",
        "-1": "双击编辑文字",
        company_: "Zhubajie Network Co, Ltd",
        username_: "Bajie Zhu",
        job_: "CEO",
        website_: "site：http://kuaiyin.zhubajie.com",
        mobile_: "Mobile：18612875583",
        telphone_: "Tel：xxxxxxxxxxx",
        //address: "Add：C-5F Phenix Building, No.30 Qingfeng North Rd, New North District, Chongqing City.",
        address_: "Add：No.30 Qingfeng North Rd, New North District, Chongqing City.",
        email_: "Email：zbj@zhubajie.com",
        fax_: "Fax：023-6386633"
    }
    exports._canvasData = {
        "pvc_pvc": {
            defaultPageCount: 2,
            hasRadius: true,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [85.5, 54, 1.5, 3]
            ],
            demoArr: [
                {"type":"pvc_pvc","pages":[{"canvas":{"width":85.5,"height":54,"hasRadius":true,"blood":1.5,"limit":3},"elements":[{"type":"diy_text","index":"0","align":"left","center_x":547,"center_y":286,"width":394,"height":182,"left":350.58,"top":195.27,"rotate":"0","content":"VIP","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzdhjt.ttf","size":60,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"leval","text_align":"left"},{"type":"diy_text","index":1,"align":"left","center_x":821,"center_y":71.5,"width":316,"height":29,"left":663.75,"top":57.74,"rotate":"0","content":"重庆猪八戒网络有限公司","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":7,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"company","text_align":"left"},{"type":"diy_logo","index":2,"align":"left","center_x":574.17,"center_y":70.67,"width":128.33,"height":53.33,"left":510.22,"top":44.21,"rotate":"0","key":"../../../../../../diy/logos/logo1.png"/*tpa=http://www.mayicy.cn/diy/logos/logo1.png*/,"origin_width":463,"origin_height":192,"src":"../../../../../../../s.kywcdn.com/diy/logos/logo1.png"/*tpa=http://s.kywcdn.com/diy/logos/logo1.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_text","index":3,"align":"left","center_x":244,"center_y":383,"width":168,"height":54,"left":160.84,"top":356.15,"rotate":"0","content":"贵宾卡","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzhtjt.ttf","size":14,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"cardName","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":821.5,"center_y":580.5,"width":295,"height":33,"left":674.17,"top":564.93,"rotate":"0","content":"尊贵特权，会员专享","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":8,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"info1","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000047.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg"/*tpa=http://kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg*/,"dpi":["300","300"]},"techs":[{"type":"diy_bianma","cmyk":"0,0,0,100","color":"0,0,0","width":25,"height":4,"left":6.24,"top":47.83,"content":"NO.000001","locate":"right_bottom","pre":"NO.","step":1,"start":"000001"}]},{"canvas":{"width":85.5,"height":54,"hasRadius":true,"blood":1.5,"limit":3},"elements":[{"type":"diy_text","index":"0","align":"left","center_x":299.5,"center_y":367.5,"width":465,"height":29,"left":67.55,"top":353.22,"rotate":"0","content":"1. 此卡仅限本人所有，不得转让他人","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":7,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"info1","text_align":"left"},{"type":"diy_text","index":1,"align":"left","center_x":256,"center_y":409.5,"width":378,"height":29,"left":67.55,"top":395.3,"rotate":"0","content":"2. 客户凭借此卡享受九折优惠","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":7,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"info1","text_align":"left"},{"type":"diy_text","index":2,"align":"left","center_x":342,"center_y":451.5,"width":550,"height":29,"left":67.55,"top":437.39,"rotate":"0","content":"3. 使用此卡需遵守本公司相关法律条款原则","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":7,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"info1","text_align":"left"},{"type":"diy_text","index":3,"align":"left","center_x":271.5,"center_y":494,"width":409,"height":30,"left":67.55,"top":479.45,"rotate":"0","content":"4. 此卡最终解释权归本公司所有","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":7,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"info1","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":313.5,"center_y":274.5,"width":97,"height":37,"left":265.22,"top":256.48,"rotate":"0","content":"签名：","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"other","text_align":"left"},{"type":"diy_text","index":5,"align":"left","center_x":341.5,"center_y":621.5,"width":549,"height":25,"left":67.55,"top":609.83,"rotate":"0","content":"地址：重庆市北部新区青枫北路30号凤凰座C座5F","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":6,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"address","text_align":"left"},{"type":"diy_text","index":6,"align":"left","center_x":856.5,"center_y":623,"width":247,"height":24,"left":733.67,"top":611.52,"rotate":"0","content":"电话：023-61690371","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":6,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"telphone","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000047.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000047.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg"/*tpa=http://kyidev.b0.upaiyun.com/0/000/000/rgb-0000000047.jpg*/,"dpi":["300","300"]},"techs":[{"type":"diy_citiao","cmyk":"0,0,0,100","color":"0,0,0","top":5.5,"height":12},{"type":"diy_qianming","cmyk":"0,0,0,0","color":"255,255,255","left":32.68,"top":21.08,"width":24.98,"height":4.23}]}],"extends":{"rotate":true}}
            ],
            citiao: { //pvc磁条的位置及高度，单位毫米，
                cmyk: "0,0,0,100", //默认cmyk颜色
                color: "0,0,0", //默认rgb颜色
                top: 4, //默认距离上边缘高度，按成品中之后算的位置不包括出血线
                height: 12
            },
            bianma: { //pvc编码
                cmyk: "0,0,0,100", //默认cmyk颜色
                color: "0,0,0", //默认rgb颜色
                width: 25,
                height: 4,
                left: 7, //不包含出血
                top: 45, //不包含出血
                content: "NO.000001" //磁条默认内容
                //type: "bottom_right"
            },
            meanList: {
                "-1": "双击编辑文字",
                cardName: "卡名",
                leval: "等级",
                number: "编号",
                id: "ID",
                //barcode: "条形码区",
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
        //名片
        "card_commerce": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [90, 54, 1, 3],
                [54, 90, 1, 3]
            ],
            demoArr: [
                {"type":"card_commerce","pages":[{"canvas":{"width":90,"height":54,"blood":1},"elements":[{"type":"diy_logo","index":"0","align":"left","center_x":872.33,"center_y":162.17,"width":276.67,"height":158.33,"left":734.51,"top":83.35,"rotate":"0","key":"../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,"origin_width":290,"origin_height":167,"src":"../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_text","index":1,"align":"left","center_x":157,"center_y":110.5,"width":172,"height":55,"left":71.19,"top":83.35,"rotate":"0","content":"猪八戒","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzdhjt.ttf","size":14,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"username","text_align":"left"},{"type":"diy_text","index":2,"align":"left","center_x":274,"center_y":191,"width":114,"height":36,"left":217.05,"top":173.64,"rotate":"0","content":"总经理","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"job","text_align":"left"},{"type":"diy_text","index":3,"align":"left","center_x":232.5,"center_y":417.5,"width":323,"height":37,"left":71.19,"top":399.38,"rotate":"0","content":"手机：xxxxxxxxxxx","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"mobile","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":292,"center_y":469,"width":442,"height":40,"left":71.19,"top":449.73,"rotate":"0","content":"邮箱：zbj@zhubajie.com","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"email","text_align":"left"},{"type":"diy_text","index":5,"align":"left","center_x":487.5,"center_y":527,"width":833,"height":38,"left":71.19,"top":508.77,"rotate":"0","content":"地址：重庆市北部新区青枫北路30号凤凰座C座5F","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"address","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000424.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,"dpi":["300","300"]}},{"canvas":{"width":90,"height":54,"blood":1},"elements":[{"type":"diy_logo","index":"0","align":"left","center_x":889.04,"center_y":179,"width":276.09,"height":158.01,"left":751.87,"top":100.71,"rotate":"0","key":"../../../../../../diy/logos/logo6.png"/*tpa=http://www.mayicy.cn/diy/logos/logo6.png*/,"origin_width":290,"origin_height":167,"src":"../../../../../../../s.kywcdn.com/diy/logos/logo6.png"/*tpa=http://s.kywcdn.com/diy/logos/logo6.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_text","index":1,"align":"left","center_x":174,"center_y":127.5,"width":172,"height":55,"left":88.56,"top":100.71,"rotate":"0","content":"猪八戒","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzdhjt.ttf","size":14,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"username","text_align":"left"},{"type":"diy_text","index":2,"align":"left","center_x":291,"center_y":209,"width":114,"height":36,"left":234.42,"top":191.01,"rotate":"0","content":"总经理","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"job","text_align":"left"},{"type":"diy_text","index":3,"align":"left","center_x":249.5,"center_y":434.5,"width":323,"height":37,"left":88.56,"top":416.74,"rotate":"0","content":"手机：xxxxxxxxxxx","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"mobile","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":309,"center_y":487,"width":442,"height":40,"left":88.56,"top":467.1,"rotate":"0","content":"邮箱：zbj@zhubajie.com","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"email","text_align":"left"},{"type":"diy_text","index":5,"align":"left","center_x":504.5,"center_y":545,"width":833,"height":38,"left":88.56,"top":526.14,"rotate":"0","content":"地址：重庆市北部新区青枫北路30号凤凰座C座5F","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"address","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000424.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000424.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000424.jpg*/,"dpi":["300","300"]}}]}
            ],
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
        //贺卡/邀请卡
        "market_greeting": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [285,210,3,8]//[210, 140, 1, 3]
            ],
            hasSplitLine: true, //中间分割线
            noVerticalSize: true, //不能使用垂直尺寸
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
        //刮奖卡
        "market_award": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [90, 54, 1, 3]
            ],
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
        //优惠券
        "market_coupon": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [180, 54, 1, 3],
                [90,162,1,3]
            ],
            demoArr: [
                {"type":"market_coupon","pages":[{"canvas":{"width":180,"height":54,"blood":1},"elements":[{"type":"diy_text","index":"0","align":"center","center_x":1074.5,"center_y":331,"width":421,"height":220,"left":864.5,"top":221.32,"rotate":"0","content":"100","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/huakanglijin.ttf","size":72,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"id","text_align":"left"},{"type":"diy_logo","index":1,"align":"left","center_x":1943.99,"center_y":519.99,"width":233.97,"height":155.98,"left":1827.5,"top":442.65,"rotate":"0","key":"../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,"origin_width":550,"origin_height":367,"src":"../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_logo","index":2,"align":"left","center_x":1697.72,"center_y":516.72,"width":145.44,"height":145.44,"left":1625.15,"top":444.75,"rotate":"0","key":"../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,"origin_width":512,"origin_height":512,"src":"../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_text","index":3,"align":"left","center_x":1381.5,"center_y":402,"width":71,"height":72,"left":1346.91,"top":366.76,"rotate":"0","content":"元","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzzongyi.ttf","size":19,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"other","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":276.5,"center_y":84,"width":415,"height":38,"left":69.58,"top":65.34,"rotate":"0","content":"重庆猪八戒网络有限公司","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"company","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000486.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,"dpi":["300","300"]}},{"canvas":{"width":180,"height":54,"blood":1},"elements":[{"type":"diy_text","index":"0","align":"center","center_x":1074.5,"center_y":327,"width":421,"height":220,"left":864.5,"top":217.11,"rotate":"0","content":"100","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/huakanglijin.ttf","size":72,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"id","text_align":"left"},{"type":"diy_logo","index":1,"align":"left","center_x":1945.99,"center_y":515.99,"width":233.97,"height":155.98,"left":1829.61,"top":438.43,"rotate":"0","key":"../../../../../../diy/logos/tiaoxingma.png"/*tpa=http://www.mayicy.cn/diy/logos/tiaoxingma.png*/,"origin_width":550,"origin_height":367,"src":"../../../../../../../s.kywcdn.com/diy/logos/tiaoxingma.png"/*tpa=http://s.kywcdn.com/diy/logos/tiaoxingma.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_logo","index":2,"align":"left","center_x":1699.72,"center_y":512.72,"width":145.44,"height":145.44,"left":1627.25,"top":440.54,"rotate":"0","key":"../../../../../../diy/logos/erweima.png"/*tpa=http://www.mayicy.cn/diy/logos/erweima.png*/,"origin_width":512,"origin_height":512,"src":"../../../../../../../s.kywcdn.com/diy/logos/erweima.png"/*tpa=http://s.kywcdn.com/diy/logos/erweima.png*/,"dpi":[0,0],"img_type":"logo"},{"type":"diy_text","index":3,"align":"left","center_x":1384.5,"center_y":398,"width":71,"height":72,"left":1349.02,"top":362.55,"rotate":"0","content":"元","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/fzzongyi.ttf","size":19,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"other","text_align":"left"},{"type":"diy_text","index":4,"align":"left","center_x":278.5,"center_y":86,"width":415,"height":38,"left":71.67,"top":67.45,"rotate":"0","content":"重庆猪八戒网络有限公司","family":"http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/yahei.ttf","size":9,"color":"0,0,0","cmyk":"0,0,0,100","bold":"0","italic":"0","underline":"0","mean":"company","text_align":"left"}],"background":{"type":"diy_background","index":-1,"align":"left","key":"0000000486.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000000486.jpg*/,"color":"#FFFFFF","src":"../../../../../../../kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg"/*tpa=http://kyistag.b0.upaiyun.com/0/000/000/rgb-0000000486.jpg*/,"dpi":["300","300"]}}]}
            ],
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
        //点餐卡
        "market_order": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [90, 54, 1, 3]
            ],
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
        //宣传单
        "advert_leaflet": {
            defaultPageCount: 2,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [210, 285, 3, 8]
            ],
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
        //趣味卡片
        "market_funcard": {
            defaultPageCount: 10,
            hasRadius: false,
            canAddPage: false, //是否允许加页面
            sizeArr: [
                [90, 54, 1, 3],
                [54, 90, 1, 3]
            ],
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
        //明信片
        "market_postcard": {
            defaultPageCount: 16,
            pageArr: [16, 2], //两种
            hasRadius: false,
            canAddPage: true, //是否允许加页面
            sizeArr: [
                [148, 100, 3, 6]
            ],
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

        //台历
        "office_calendar": {
            defaultPageCount: 26,
            pageArr: [26, 14], //两种
            hasRadius: false,
            canAddPage: true, //是否允许加页面
            sizeArr: [
                [210, 148, 3, 6]
            ],
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
/*            whiteImg: {
                src: "../../../../../../../img1.kywcdn.com/0/000/006/rgb-0000006006.jpg"/*tpa=http://img1.kywcdn.com/0/000/006/rgb-0000006006.jpg*/,
                dpi: 300,
                key: "0000006006.jpg"/*tpa=http://www.mayicy.cn/Public/kuaiyin/static/js/diy/config/0000006006.jpg*/,
                width: 2551,
                height: 1819
            }*/
        }
    }
    exports._canvasData.card
        = exports._canvasData.card_pvc
        = exports._canvasData.card_advance
        = exports._canvasData.card_double11
        = exports._canvasData.card_commerce //兼容旧版本模板
})
