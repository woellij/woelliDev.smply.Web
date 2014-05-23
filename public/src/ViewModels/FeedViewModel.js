/*global BaseFeedViewModel:false, Ting:false */
var FeedViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self, "Feed");

    this.init = function (parameters) {
        console.log("FEEDVIEWMODEL INIT");
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };

    self.loadItems = function (parameters, callback) {
        Ting.Feed.getUserFeed(parameters, function (res) {
            callback(res);
        });
    };
};
