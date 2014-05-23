Ting = (function () {
    var that = {},

        init = function (context) {
            console.log("Ting init", Ting);

            Parse.initialize("rnklQPqG2yqcKwmXfYqMSqQ2CoF6lGB56sofWiHt",
                "YKZ49dzwWLXGsOMFcaTFqnUVz34auB7fVoWEuM4t");
            console.log("TingUser", Ting.User);
            that.user = Ting.User.init();
            that.feed = Ting.Feed.init();
            console.log(Ting);
            that.categories = Ting.Categories.init();
            that.pins = Ting.Pins.init();
            that.boards = Ting.Boards.init(that.user);
            return that;
        };

    that.init = init;
    return that;
}());