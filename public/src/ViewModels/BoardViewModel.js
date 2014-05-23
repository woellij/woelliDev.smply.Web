/*global BaseFeedViewModel:false, Ting:false */
var BoardViewModel = function () {
    var self = this;
    BaseFeedViewModel.call(self);

    this.init = function (parameters) {
        self.isLoading(true);
        self.board = parameters.board;

        pinId = self.board.id;

        self.title(self.board.name);

        self.pullData(function () {
            self.initGrid();
            self.isLoading(false);
        });
        
        //Ting.Pins.getPinsForBoard({
        //    id: parameters.id,
        //    from: 0,
        //    count: 20
        //},
        //    function (pins) {
        //        self.addRange(pins);
        //        self.initGrid();
        //        self.isLoading(false);
        //    });
    };

    self.loadItems = function (parameters, callback) {
        parameters.id = pinId;
        Ting.Pins.getPinsForBoard(parameters, callback);
    };
};
