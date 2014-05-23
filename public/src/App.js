/// <reference path="../src/UrlHelper.js"/>

ControlsViewModel = function () {
    var self = this;
    self.categories = ko.observableArray();

    self.categorySelected = function (cat, ev) {
        Navigation.navigateTo("#/category/" + cat.short);
        ev.stopPropagation();
    };

    self.init = function () {
        Ting.Categories.getAll(function (res) {
            for (var i = 0; i < res.length; i++) {
                var cat = res[i];
                cat.url = function () {
                    return "#/category/" + cat.short;
                };
                console.log(cat);
                self.categories.push(cat);
            }
            //self.categories(res);
        });
    };
}


Controls = (function () {
    var that = {},
        init = function () {
            var controlsBar = document.getElementById('controls');
            var controlsVM = new ControlsViewModel();
            controlsVM.init();
            ko.applyBindings(controlsVM, controlsBar);
            return that;
        };

    that.init = init;
    return that;
}());

var App = (function () {
    var that = {},
        navigation,
        ting,
        tabs,

        init = function (context, parameters) {
            var location = document.location.toString();
            console.log("APP INIT LOCATION", location);
            console.log("Site init context", context);
            $(document).foundation();
            $(document).foundation('abide', 'events');

            History = window['History'];
            ting = Ting.init();

            initNavigation(parameters);

            var userVM = UserViewModel.init();
            console.log("USER VIEW MODEL", userVM);
            ko.applyBindings(userVM, document.getElementById("usercontrols"));
            //ko.applyBindings(userVM, document.getElementById("loginpanel"));
            ko.applyBindings(userVM, document.getElementById("usersettings"));

            Controls.init();

            if (userVM.isLoggedIn())
                Navigation.navigateTo(parameters.isLoggedInStart);
            else Navigation.navigateTo(parameters.isNotLoggedInStart);

            $("#splashScreen").hide();

            return that;
        },

        initNavigation = function (parameters) {
            console.log(parameters);
            var hash = parameters.hash;
            if (hash)
                hash = parameters.hash.replace("#", "");

            navigation = Navigation.init({
                allowWindowNavigation: true,
                start: "",
                rootDir: "",
                fileDir: parameters.fileDir ? parameters.fileDir : ""
            });
        };

    that.init = init;
    return that;
}());

