/**
 * 提交模板（修改/审核）对话框
 */
define(function (require, exports){
    var $ = require('$'),
        Dialog = require('zz/ui/Dialog'),
        alert = require('zz/ui/alert'),
        loading = require('zz/ui/loading');

    var _options;

    /**
     * 初始化对话框
     */
    function initDialog(){
        var dlgTpl = '<form class="diy-confirm-dialog"> \
                <div> \
                    <span>请输入模版名字：</span> \
                    <input name="name" type="text" style="width:200px"> \
                    <input name="template_id" type="hidden"> \
                    <input name="csrf_token" type="hidden"> \
                </div> \
                <div class="pr"> \
                    <span style="position:absolute;left:0;top:0"> \
                        请选择模版类型： \
                    </span> \
                    <div style="margin-left:96px;width:400px"> \
                    </div> \
                </div> \
            </form>';

        return new Dialog({
            hasTitle: false,
            hasClose: true,
            closeToDispose: false,
            innerHTML: dlgTpl,
            footBtns: {
                apply: '确定',
                close: '取消'
            },
            actions: {
                apply: function(){
                    this.getTarget().find('form').submit()
                },
                close: function(){
                    _options.cb && _options.cb.call(window);
                    this.close();
                }
            }
        });
    }

    /**
     * 初始化表单、填充数据
     */
    function initForm($form, id, name, url){
        // 行业列表
        $.each(global.industries, function(i){
            $('<label><input type="checkbox" name="industry_id"></label>')
                .appendTo($form.find('div>div'))
                .append(this.name)
                .find('input').val(this.id);
        });

        // ID/名字/token
        $form.attr('action', url)
            .find('[name=template_id]').val(id).end()
            .find('[name=name]').val($.trim(name)).end()
            .find('[name=csrf_token]').val($('#csrf_token').val());

        // 行业
        $.ajax({
            url: '/design/api/get_industries',
            type: 'POST',
            data: $form.serialize(),
            success: function(data, state, xhr){
                if(data.code == 200 && $.isArray(data.data)){
                    $.each(data.data, function(i, industry){
                        $form.find('[name=industry_id][value='+industry.industry_id+']').attr('checked', true);
                    });
                }

                // 没有行业数据时默认选中第一个
                if($form.find('[name=industry_id]:checked').size() == 0){
                    $form.find('[name=industry_id]:first').attr('checked', true);
                }
            }
        });
    }

    /**
     * 最多只能选择 5 个行业
     */
    function most5Industries(e, $wrap){
        if($wrap.find('[name=industry_id]:checked').size() > 5){
            alert('最多只能选择 5 个行业！');
            $(this).attr('checked', false);
            return false;
        }
        return true;
    }

    /**
     * 表单校验
     */
    function validateForm(e){
        var $this = $(this),
            msg = [];

        if($this.find('[name=name]').val() === ''){
            msg.push('模板名字不能为空哦~~');
        }
        if($(this).find('[name=industry_id]:checked').size() === 0){
            msg.push('请选择模版类型哦~~');
        }

        if(msg.length){
            alert(msg.join('<br>'));
            return false;
        }

        return true;
    }

    /**
     * 表单提交
     */
    function submitForm(e){
        e.preventDefault();
        e.stopPropagation();

        if(!validateForm.call(this, e)){
            return false;
        }

        var loadDlg = loading('正在提交...');

        $.ajax({
            url: this.action,
            type: 'POST',
            traditional: true,
            needLogin: true,
            // showMessage: true,
            data: $(this).serialize()
        }).done(function(data){
            _options.done && _options.done.call(this, data);
            // if(data.code == 200 || data.code == 403){
            //     if(_options.nextPage){
            //         location.assign(_options.nextPage);
            //     }else{
            //         location.reload();
            //     }
            // }
        }).always(function(){
            _options.cb && _options.cb.call(window);
            loadDlg.close();
        });
        return false;
    }


    exports.init = function init(options){
        _options = options || {};

        var dlg = initDialog(),
            $form = dlg.getTarget().find('form');

        initForm($form, options.id, options.name, options.url);
        $form.on('submit', submitForm)
            .on('change', ':checkbox', function(e){ return most5Industries.call(this, e, $form); });

        return dlg;
    }
})
