/// <reference path="BaseFeedViewModel.js"/>
CategoryFeedViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);
    var category;

    self.loadItems = function (parameters, callback) {
        parameters.category = category;
        Ting.Pins.getPinsForCategory(parameters, function (pins) {            
            console.log("CategoryFeed pins fetched", pins);
            callback(pins);
        });
    };

    this.init = function (parameters) {
        var categoryShort = parameters.short;
        category = Ting.Categories.getForShort(categoryShort);
        
        self.title(category.category_name);
       
        self.isLoading(true);
        self.pullData(function () {
            self.isLoading(false);
        });
    };
};
