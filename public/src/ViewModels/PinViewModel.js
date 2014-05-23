var PinViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Select a pin");
    self.images = ko.observableArray();
    self.capture = ko.observable();

    self.pinSelected = function (clicked) {
        showBoardSelection(setupPin(clicked));
    };

    self.captureSelected = function (vm, event) {
        var pin = setupPin(self.capture());
        pin.isScreenshot = true;
        showBoardSelection(pin);
    };

    self.captureCommand = function () {
        console.log("CaptureCommand");
        Tabs.captureScreen(function (res) {
            console.log("Captured Screenshot", res);
            self.capture({
                src: res.image,
                ratio: res.ratio
            });
        });
    };

    var setupPin = function (pin) {
        console.log("Setting up pin", pin);
        if (!pin.relatedSites) {
            pin.relatedSites = [];
        }
        pin.relatedSites.unshift(tabInfos);
        return pin;
    };

    var showBoardSelection = function (pin) {
        Navigation.navigateTo("boardSelection", { pin: pin });
    };

    var tabInfos = {};

    this.init = function () {
        self.isLoading(true);
        self.captureCommand();
        Tabs.getImages({ minWidth: 100, minHeight: 100 }, function (data) {
            console.log("getImages Callback", data);
            for (var i = 0; i < data.images.length; i++) {
                var imageData = data.images[i];
                self.images.push(imageData);
            }
            for (var prop in data) {
                if (prop !== "images") {
                    tabInfos[prop] = data[prop];
                }
            }
            console.log("TabInfos", tabInfos);
            self.isLoading(false);
        });
    };
};
