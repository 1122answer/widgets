require.config({
    paths: {
        jquery: 'jquery-1.9.1.min',
        jqueryUI: 'https://code.jquery.com/ui/1.12.1/jquery-ui'
    }
});

require(['jquery', 'window', 'tabs', 'Selects', 'checks'], function($, w, t, s, m) {
    $("#a").click(function() {
        var win = new w.Window()
        win.alert({
            title: '消息dd',
            content: 'welcome!dd',
            handler4CloseBtn: function() {
                alert("你点击了关闭按钮")
            },
            handler4AlertBtn: function() {
                alert('你点击了确定')
            },
            width: 500,
            height: 300,
            hasCloseBtn: true,
            text4AlertBtn: '残忍离去dd',
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
            content: "您确定要做出改变吗？",
            width: 500,
            height: 300,
            y: 50,
            text4ConfirmBtn: '确定改变',
            text4CancelBtn: '马上放弃',
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
    });

    new s.SelectList('#choose2');
    new m.Mcheck('.checkbox-wrap input')
    new m.Mcheck('.radio-wrap input')
})