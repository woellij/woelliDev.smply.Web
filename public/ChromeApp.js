var ChromeApp = function () {
    console.log("ChromeApp");
    var context = chrome.extension.getBackgroundPage();
    console.log(context);
    Tabs = context.Tabs.init();
    Bookmarks = context.Bookmarks.init();
    var parameters = {
        isLoggedInStart: "pin",
        isNotLoggedInStart: "login"
    };

    App.init(window, parameters);
}();