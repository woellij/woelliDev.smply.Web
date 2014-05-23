/// <reference path="BaseFeedViewModel.js"/>
var AllViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    self.loadItems = function (parameters, callback) {
        Ting.Pins.getAll(parameters, function (res) {
            callback(res);
        });
    };

    this.init = function (parameters) {
        self.title("Everything");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };
};
