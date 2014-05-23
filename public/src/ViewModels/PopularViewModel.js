/*global BaseFeedViewModel:false, Ting:false */
var PopularViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    this.init = function (parameters) {
        console.log("Popular INIT");
        self.title("Popular");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };

    self.loadItems = function (parameters, callback) {
        Ting.Pins.getPopular(parameters, function (res) {
            callback(res);
        });
    };
};
