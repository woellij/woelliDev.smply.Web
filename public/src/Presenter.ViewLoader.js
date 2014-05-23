Presenter.ViewLoader = (function () {
    var that = {},
        rootDir,
        viewBluePrints = [],

        init = function (rtDir) {
            rootDir = rtDir;
            return that;
        },

        load = function (target, callback) {
            var el = $("<div class='content'></div>");

            var lowerTarget = target.toLowerCase();
            var isFeedView = lowerTarget.indexOf("feed") > -1 || lowerTarget.indexOf("all") > -1 || lowerTarget.indexOf("popular") > -1;
            if (isFeedView) {
                target = "feed";
            }
            console.log("Getting View for", target);

            if (viewBluePrints[target] != undefined) {
                var viewHtml = viewBluePrints[target];
                console.log("Found stored view", target);
                el.html($(viewHtml));
                callback(el);
            } else {
                console.log("Loading View for ", target);
                var filename = rootDir + "/src/Views/" + target + "View.min.html";
                console.log("loading view", filename);
                var html = $(el).load(filename, function (response, status, xhr) {
                    console.log(".html load status", status, filename);
                    if (status == "error") {
                        if (target !== "404")
                            load("404", callback);
                        return;
                    } else {
                        viewBluePrints[target] = el.html();
                        callback(el);
                    }
                });
            }
        };

    that.load = load;
    that.init = init;
    return that;
}());