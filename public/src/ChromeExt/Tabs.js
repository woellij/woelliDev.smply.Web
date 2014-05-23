var Tabs = (function () {
    var that = {},
        currentTab,

        init = function () {
            console.log("Tabs init");
            console.log(chrome);
            getCurrentTab(function (tab) {
                currentTab = tab;
                chrome.tabs.executeScript(currentTab.id, { file: "src/ContentScript.js" });
            });
            console.log("Tabs finish");
            return that;
        },

        getCurrentTab = function (callback) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                var tab = tabs[0];
                console.log("CurrentTab", tab);
                callback(tabs[0]);
            });
        },

        captureScreen = function (callback) {
            console.log("Tabs capture");
            chrome.tabs.captureVisibleTab(null, { format: "jpeg", quality: 50 }, function (image) {
                var res = {
                    image: image,
                    ratio: currentTab.width / currentTab.height
                };
                console.log("Captured Image", res);
                callback(res);
            });
        },

        sendMessage = function (message, callback) {
            chrome.tabs.sendMessage(currentTab.id, message, callback);
        },

        getImages = function (parameters, callback) {
            parameters.method = "getImages";
            sendMessage(parameters, function (response) {
                if (response.method === "getImages") {
                    response.data.title = currentTab.title;
                    response.data.url = currentTab.url;
                    console.log("Tab Parsed Images Result", response.data);
                    callback(response.data);
                }
            });
        };

    that.getImages = getImages;
    that.captureScreen = captureScreen;
    that.init = init;
    return that;
})();