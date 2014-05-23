CreateBoardViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Create a new Board");
    self.categories = ko.observableArray();
    self.selectedCategory = ko.observable();
    self.name = ko.observable();
    self.description = ko.observable();
    self.categoryHint = "Select a category for your board";

    self.createBoardCommand = function () {
        self.isLoading(true);
        Ting.Boards.createBoard(ko.toJS(self), function (res) {
            self.isLoading(false);
        });
    };

    this.init = function () {
        Ting.Categories.getAll(function (cats) {
            self.categories(cats);
        });
    };
};

