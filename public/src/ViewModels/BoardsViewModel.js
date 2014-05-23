BoardsViewModel = function () {
    var self = this;
    BaseViewModel.call(self);
    self.boards = ko.observableArray();

    
    var userID;
    this.init = function (parameters) {
        if(parameters !== undefined)
        {
            userID = parameters.userID;
        }

        console.log("BoardsViewModel Init");

        Ting.Boards.getUserBoards(function (res) {
            self.isLoading(false);
            console.log("User Boards", res);

            //for (var i = 0; i < res.length; i++) {
            //    var board = res[i];
            //    res.url = ko.
            //}
            self.boards(res);
        }, userID);
    };
};