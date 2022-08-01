$(function () {
    const pageTop = $("#pagetop");
    pageTop.click(function () {
        $("body,html").animate({
                scrollTop: 0, // 上から0pxの位置に戻る
            },
            500 // 500ミリ秒かけて戻る
        );
        return false;
    });

    $(".button").click(function () { //ボタンがクリックされたら
        $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
        $("#nav").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
    });

    $("#nav a").click(function () { //ナビゲーションのリンクがクリックされたら
        $(".button").removeClass('active'); //ボタンの activeクラスを除去し
        $("#nav").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
    });

});