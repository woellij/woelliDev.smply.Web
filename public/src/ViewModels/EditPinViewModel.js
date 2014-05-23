/// <reference path="/public/src/UrlHelper.js"/>

EditPinViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Edit your Pin");
    self.board = ko.observable();
    self.pin = ko.observable();

    this.onFinish = function () {
        self.isLoading(true);
        var pin = {};
        var p = self.pin();
        var site = p.selectedSite();
        pin.title = site.title;
        pin.description = site.description;
        pin.src = p.src;
        pin.ratio = p.ratio;
        pin.url = site.url;

        console.log(pin, self.board());
        Ting.Pins.create(pin, self.board(), function (res) {
            self.isLoading(false);
        });
    };

    this.init = function (parameters) {
        if (typeof parameters !== typeof undefined) {

            self.pin(parameters.pin);
            self.board(parameters.board);

            parameters.pin.selectedSite = ko.observable(parameters.pin.relatedSites[0]);

            var sites = self.pin().relatedSites;
            if (sites) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var url = UrlHelper.resolveRealUrl(site.url);
                    if (!site.title) {
                        site.title = UrlHelper.shortenURL(url, 35, true);
                    }
                    if (!site.description) {
                        site.description = "";
                    }
                    site.url = url;
                    console.log("Overhauled site", site);
                }
            }
        }
    };
};


