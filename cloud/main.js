require('cloud/app.js');


Parse.Cloud.afterSave("pin", function (request) {
    var imgurl = request.object.get('image');
    console.log(imgurl);
    Parse.Cloud.httpRequest({
        method: "GET",
        url: imgurl,
        success: function (httpResponse) {
            for (var prop in httpResponse.headers) {
                console.log(httpResponse.headers.prop);
            }
        },
        error: function (httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
});

Parse.Cloud.define("getFeed", function (request, response) {
    var user = request.user;
    var userQuery = new Parse.Query(Parse.User);
    var boardQuery = user.relation("boards_followed").query();
    boardQuery.find({
        success: function (result) {
            var parms = request.params;
            var query = new Parse.Query("pin");
            query.containedIn("board", result);
            query.skip(parms.from);
            query.limit(parms.count);
            query.descending("createdAt");
            query.find({
                success: function (result) {
                    response.success(result);
                },
                error: function (error) {
                    response.error(error);
                }
            });

            //query.find({
            //    success: function (results) {
            //        response.success(results);
            //    },
            //    error: function (error) {
            //        response.error(error);
            //    }
            //});
        }
    });
});

//Parse.Cloud.httpRequest({
//    url: 'http://www.google.com/search',
//    params: {
//        q: 'Sean Plott'
//    },
//    success: function (httpResponse) {
//        console.log(httpResponse.text);
//    },
//    error: function (httpResponse) {
//        console.error('Request failed with response code ' + httpResponse.status);
//    }
//});