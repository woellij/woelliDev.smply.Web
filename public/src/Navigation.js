var Navigation = (function () {
    var that = {},
        rootDir,
        startPage,
        historyEnabled,

        init = function (options) {
            console.log("Navigation Init", options);
            rootDir = typeof options.rootDir === typeof undefined ? "" : options.rootDir;
            rootDir = rootDir === "/" ? "" : rootDir;
            //modalViews['login'] = true;
            //modalViews['register'] = true;
            var modalViews = new Array();

            var $modal = $("#modal");
            $(document).on('closed', '[data-reveal]', function () {
                console.log("Modal closed");
                navigateBack();
            });
            var header = "<div class='row header' id='header'><h1 id='backbutton'><a><i class='icon-arrow-left-3 fg-darker'></i></a></h1><h1 data-bind='text: title'></h1></div>";

            var presenter = Presenter.init(options.fileDir, modalViews, $modal, header);
            $(presenter).on('viewChanged', onViewChanged);

            Routing.init(presenter, rootDir);
            startPage = options.start;

            if (options.allowWindowNavigation) {
                historyEnabled = options.allowWindowNavigation;
            }
            return that;
        },

        onViewChanged = function (event, target, parameters) {
            toggleBackButton();
            $(that).trigger('navigated', target);

            console.log("OnViewChange", target, parameters);
        },

        navigateBack = function (event) {
            console.log("BackButtonClicked");
            History.back();
        },

        navigateTo = function (target, parameters) {
            if (target == "start")
                target = startPage;

            target = rootDir + "/" + target;
            console.log("navigating chaging history", target, parameters);
            History.pushState(parameters, null, target);
        },

        toggleBackButton = function () {
            var $backButton = $("#backbutton");
            console.log("Backbutton", $backButton);
            $backButton.on('click', navigateBack);
            if (History.getCurrentIndex() <= 1) {
                $backButton.hide();
            } else {
                $backButton.show();
            }
        };

    that.navigateTo = navigateTo;
    that.init = init;
    return that;
}());