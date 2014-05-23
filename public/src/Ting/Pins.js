/* global Ting: false, Parse: false*/
/// <reference path="../../res/js/parse.min.js"/>

Ting.Pins = (function () {
    var that = {},
        Pin,

        init = function () {
            Pin = Parse.Object.extend("pin");
            return that;
        },

        createPinsArray = function (collection) {
            var pins = [];
            for (var i = 0; i < collection.length; i++) {
                var pin = collection[i];
                var p = pin.attributes;
                p.pinclicked = function (ev) { console.log("Pin clicked", ev); }
                p.id = pin.id;
                p.url = p.url ? p.url : "http://ting.parseapp.com";
                p.description = p.description ? p.description : "";
                p.title = p.title ? p.title : "";
                pins.push(p);
            }
            console.log("PINS", pins);
            return pins;
        },

        getAll = function (parameters, callback) {
            var q = new Parse.Query(Pin);
            q.descending('createdAt');
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.find({
                success: function (result) {
                    callback(createPinsArray(result));
                },
                error: function (error) {
                    alert("GetAllPinsError", error);
                }
            });
        },

        getPinsForCategory = function (parameters, callback) {
            var categoryID;
            if (typeof parameters.category !== typeof undefined) {
                categoryID = parameters.category.id;
            } else if (typeof parameters.categoryID !== typeof undefined) {
                categoryID = parameters.categoryID;
            } else {
                throw new EvalError("category undefined");
            }

            var Cat = Parse.Object.extend("category");
            var c = new Cat();
            c.set('id', categoryID);

            var q = new Parse.Query(Pin);
           
            q.descending("createdAt");
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.equalTo("category", c);

            q.find({
                success: function (results) {
                    callback(createPinsArray(results));
                },
                error: function (error) {
                    console.error("NO PINS FOR CATEGORY", parameters.category, error);
                }
            });
        },

        getPinsForBoard = function (parameters, callback) {
            if (typeof parameters.board === typeof undefined) {
                if (typeof parameters.id === typeof undefined) {
                    throw new EvalError("board undefined");
                } else {
                    var Board = Parse.Object.extend("board");
                    var b = new Board();
                    b.set('id', parameters.id);
                    parameters.board = b;
                }
            }

            var q = new Parse.Query(Pin);
            q.skip(parameters.from);
            q.limit(parameters.count);
            q.equalTo("board", parameters.board);
            
            q.descending("createdAt");
            q.find({
                success: function (res) {
                    console.log("got pins for", res);
                    callback(createPinsArray(res));
                },
                error: function (res) {
                    console.error("NO PINS FOR BOARD", parameters.board, error);
                }
            });
        },

        create = function (p, b, finishedCallback) {
            var Board = Parse.Object.extend('board');
            var board = new Board();
            board.set("id", b.id);

            var C = Parse.Object.extend('category');
            var c = new C();
            c.set('id', b.category.objectId);

            console.log("Creating Pin for board", board, c);

            var pin = new Pin({
                aspectratio: p.ratio,
                image: p.src,
                title: p.title,
                description: p.description,
                board: board,
                category: c,
                url: p.url
            });
            console.log("Creating Pin", pin);
            pin.save({
                success: function (pin) {
                    console.log("CREATED PIN", pin);
                    finishedCallback(pin);
                },
                error: function (model, result, options) {
                    console.log("Error creating PIN", model, result, options);
                    finishedCallback(result);
                }
            });
        },

        getPopular = function (parameters, callback) {
            getAll(parameters, callback);
        };

    //create = function (image, title, description, board, finishedCallback) {
    //    var pin = new Pin({
    //        image: image,
    //        title: title,
    //        description: description,
    //        board: board.board_id,
    //        category: board.category
    //    });

    //    pin.save({
    //        success: function (pin) {
    //            console.log("CREATED PIN", pin);
    //            finishedCallback(pin);
    //        },
    //        error: function (model, result, options) {
    //            console.log("Error Creating Pin", model, result, options);
    //        }
    //    });
    //};

    that.getPopular = getPopular;
    that.createPinsArray = createPinsArray;
    that.getAll = getAll;
    that.getPinsForBoard = getPinsForBoard;
    that.getPinsForCategory = getPinsForCategory;
    that.create = create;
    that.init = init;
    return that;
}());