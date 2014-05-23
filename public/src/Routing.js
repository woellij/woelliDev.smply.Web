
/*global History:false, crossroads:false*/

var Routing = (function () {
    var that = {},
        presenter,
        rootDir,
        parameter,
        previousHash,

        init = function (prsntr, rootDr) {
            presenter = prsntr;
            rootDir = rootDr;
            History.options.disableSuid = true;
            History.Adapter.bind(window, 'statechange', function () {
                var State = History.getState();
                console.log("History STATE", State);
                parameter = State.data;
                var hash = State.hash.replace(".", "");

                /// <param name="hash" type="String">Description</param>
                hash = hash.replace("//", "/");
                hash = hash.replace("#", "");
                /// <param name="previousHash" type="String">Description</param>

                parameter.requestedBy = removeFirstSlash(previousHash);
                previousHash = hash;
                parse(hash);
            });

            registerRoute(rootDir + "/category/{short}", function (short) {
                presenter.showView('categoryFeed', { short: short });
            });

            registerRoute(rootDir + '/user/{id}', function (id) {
                presenter.showView("user", { userID: id });
            });

            registerRoute(rootDir + '/{username}/{boardname}', function (username, boardname) {
                presenter.showView("board", parameter);
                console.log("Routing to user board", username, boardname, parameter.id);
            });
            registerRoute(rootDir + '/{section}', function (section) {
                presenter.showView(section, parameter);
            });
            return that;
        },

        removeFirstSlash = function (string) {
            /// <param name="string" type="String">Description</param>

            if (string && string.charAt(0) == '/')
                string = string.substring(1, string.length);
            return string;
        },

        parse = function (url) {
            console.log("RouteParsing", url);
            crossroads.parse(url);
        },

        log = function (param) {
            console.log("ROUTING res", param);
        },

        registerRoute = function (path, callback) {
            console.log("Adding Route", path);
            var route = crossroads.addRoute(path, callback);
        };

    that.registerRoute = registerRoute;
    that.parse = parse;
    that.init = init;
    return that;
}());