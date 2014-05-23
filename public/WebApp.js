var WebApp = function () {
    var loc = window.location;

    var InitXdkApp = function () {
        var root = intel.xdk.webRoot;
        console.log("XDK APP root", root);
        var parameters = {
            isLoggedInStart: "feed",
            isNotLoggedInStart: "all",
            root: root.substring(0, root.length - 1),
            hash: window.location.hash,
            fileDir: root
        };
        document.addEventListener("intel.xdk.device.ready", function () {
            //start grabbing the Android hardware back button
            console.log("DEVICE READY");
            intel.xdk.device.hideSplashScreen();
            //intel.xdk.device.addVirtualPage();
        }, false);
        //document.addEventListener("intel.xdk.device.hardware.back", function () {
        //    //continue to grab the back button
        //    intel.xdk.device.addVirtualPage();
        //    Navigation.navigateBack();
        //    console.log("BackButton pressed");
        //}, false);

        var context = window;
        App.init(context, parameters);
    };

    var InitWebApp = function () {
        var loc = window.location;
        console.log("WebApp", loc.hash, loc.pathname);
        var root = loc.pathname;
        root = root.replace("/index.html", "");
        console.log("ROOT DIR", root);
        var context = window;

        var parameters = {
            isLoggedInStart: "feed",
            isNotLoggedInStart: "all",
            root: root,
            hash: window.location.hash
        };
        App.init(context, parameters);
    };
    console.log("Starting");
    //console.log(intel);
    if (typeof intel === typeof undefined) {
        InitWebApp();
    } else {
        InitXdkApp();
    }
}();