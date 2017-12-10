require.config({
    paths: {
        jquery: 'jquery-1.9.1.min',
        jqueryUI: 'https://code.jquery.com/ui/1.12.1/jquery-ui'
    }
});

require(['jquery', 'window', 'tabs', 'Selects', 'checks','dataCheck'], function($, w, t, s, m ,d) {
    $("#a").click(function() {
        var win = new w.Window()
        win.alert({
            title: '系统弹窗消息',
            content: 'JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型',
            handler4CloseBtn: function() {
                alert("你点击了关闭按钮")
            },
            handler4AlertBtn: function() {
                alert('你点击了确定按钮')
            },
            width: 500,
         
            hasCloseBtn: true,
            text4AlertBtn: '残忍离开',
            hasMask: true,
            dragHandle: '.window_header'
        })

        win.on('alet', function() {
            alert("the thild alert handler")
        })
    })

    $('#b').click(function() {
        new w.Window().confirm({
            title: "系统消息",
            content: "ECMAScript 6（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了",
            width: 500,
           
            y: 50,
            text4ConfirmBtn: '确定学习',
            text4CancelBtn: '暂不学习',
            dragHandle: ".window_header"
        }).on('confirm', function() {
            alert('你点击了确定按钮')
        }).on('cancel', function() {
            alert('你点击了取消按钮')
        })
    })

    $('#c').click(function() {
        new w.Window().common({
            content: '危险操作!',
            width: 300,
            height: 200,
            hasCloseBtn: false,
            closeTime: 2000,
            type: 'info'
        })
    })

    $('#d').click(function() {
        new w.Window().confirm({
            content: '你确定要这样做吗？',
            width: 300,
            height:235,
            text4ConfirmBtn: '确认',
            text4CancelBtn: '取消',
            type: 'warning'
        })
    })

    new t.tabs(".tabs1", {
        triggerType: 'click',
        effect: 'none',
        activeIndex: 2,
    });
    new t.tabs(".tabs3", {
        triggerType: 'click',
        activeIndex: 2,
        auto:true
    })

    new s.SelectList('#choose2');
    new m.Mcheck('.checkbox-wrap input')
    new m.Mcheck('.radio-wrap input');
    new d.DataCheck('form')
})