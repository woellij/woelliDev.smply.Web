var Bookmarks = (function () {
    var that = {},

        init = function () {
            chrome.bookmarks.getTree(function (res) {
                console.log(JSON.stringify(res));
            });
            return that;
        };

    that.init = init;
    return that;
})();