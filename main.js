
cc.game.onStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);

    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MainGame());
    }, this);
};
cc.game.run();