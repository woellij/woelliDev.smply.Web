BoardSelectionViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Select a Board");
    self.boards = ko.observableArray();

    var pin;
    self.boardSelected = function (board) {
        console.log("SelectedBoard", board);
        parameter.board = board;
        Navigation.navigateTo("editPin", parameter);
    };

    var userID;
    var parameter;

    this.init = function (parameters) {
        parameter = parameters;

        Ting.Boards.getUserBoards(function (res) {
            self.isLoading(false);
            console.log("User Boards", res);
            self.boards(res);
        }, userID);
        return self;
    };
};
