/*global Ting:false, Parse:false */

Ting.Feed = (function () {
    var that = {},

	init = function () {

	    return that;
	},

	getUserFeed = function (parameters, callback) {
	    console.log("GetFeed Parameters ", parameters);
	    Parse.Cloud.run("getFeed", parameters, {
	        success: function (result) {
	            console.log("Getting User Feed");
	            var pins = Ting.Pins.createPinsArray(result);
	            callback(pins);
	        },
	        error: function (error) {
	            console.log(error);
	        }
	    });
	};

    that.getUserFeed = getUserFeed;
    that.init = init;
    return that;
}());