Ting.Boards = (function () {
    var that = {},
        Board,
        user,

    init = function (usr) {
        user = usr;
        console.log("Boards init");
        Board = Parse.Object.extend("board");
        return that;
    },
    createBoard = function (boardSettings, callback) {
        var board = new Board();
        board.set('name', boardSettings.name);
        board.set('description', boardSettings.description);
        board.set('category', Ting.Categories.getParseObjectForId(boardSettings.selectedCategory.id));
        board.set('owner', Ting.User.getCurrenUser());
        console.log("CreateBoard", board);

        board.save(null, {
            success: function (gameScore) {
                // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + gameScore.id);
            },
            error: function (gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });
    },

    createBoards = function (collection) {
        var boards = [];
        for (var i = 0; i < collection.length; i++) {
            var board = collection[i].attributes;
            board.id = collection[i].id;
            board.description = board.description == undefined ? "" : board.description;
            board.url = function () {
                return board.owner.id + "/" + board.name;
            };
            boards.push(board);
        }
        return boards;
    },


    getUserBoards = function (callback, userID) {
        userID = typeof userID === typeof undefined ? Ting.User.getCurrenUser().id : userID;

        var q = new Parse.Query(Board);
        var user = new Parse.User();
        user.id = userID;

        q.equalTo('owner', user);

        q.find({
            success: function (results) {
                callback(createBoards(results));
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    that.getUserBoards = getUserBoards;
    that.createBoard = createBoard;
    that.init = init;
    return that;
}());