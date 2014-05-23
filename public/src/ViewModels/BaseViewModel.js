BaseViewModel = function (title) {
    var self = this;
    
    self.isLoading = ko.observable();
    self.title = ko.observable(title);

};
