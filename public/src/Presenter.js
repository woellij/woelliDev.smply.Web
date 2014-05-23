Presenter = (function () {
    var that = {},
        rootDir,
        viewLoader,
        viewModelLoader,
        frame,
        modalViews,
        $modal,
        $header,

        init = function (rootD, modlViews, $modl, hdr) {
            $header = $(hdr);
            console.log($header);
            rootDir = rootD;
            modalViews = modlViews;
            $modal = $modl;
            frame = document.getElementById("navigation-div");
            viewLoader = Presenter.ViewLoader.init(rootDir);
            viewModelLoader = Presenter.ViewModelLoader.init(rootDir);
            return that;
        },

        view,
        viewModel,
        showView = function (target, parameters) {
            var content = frame.firstChild;
            if (content && content.classList) {
                content.classList.add("invis");
            }

            viewLoader.load(target, function (v) {
                view = v;
                setTimeout(function () { tryRender(target, parameters); }, 1);
            });

            viewModelLoader.load(target, function (vm) {
                viewModel = vm;
                viewModel.init(parameters);
                console.log(target + "ViewModel init", parameters);
                setTimeout(function () { tryRender(target, parameters); }, 1);
            });
        },

        tryRender = function (target, parameters) {
            if (!view || !viewModel)
                return;
            if (modalViews[target] != undefined)
                renderModal(view, target, parameters);
            else {
                render(view);
            }
            $(view).prepend($header);
            document.title = "Ting - " + viewModel.title();
            main = document.getElementById("main");
            ko.cleanNode(main);
            ko.applyBindings(viewModel, main);

            $(that).trigger('viewChanged', target, viewModel, parameters);
            view = undefined;
            viewModel = undefined;
        },

        render = function (view) {
            $(frame).html(view);
        },

        renderModal = function (view, target, parameters) {
            $modal.html(view);
            $modal.foundation('reveal', 'open');
        };

    that.showView = showView;
    that.init = init;
    return that;
}());