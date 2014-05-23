Ting.User = (function () {
    var that = {},
        name,
        currentUserId,

        init = function () {
            console.log("UserInit");
            return that;
        },

        register = function (u, callback) {
            console.log("User Register", u, callback);
            var user = new Parse.User();
            user.set("username", u.username);
            user.set("password", u.password);
            user.set("email", u.email);
            var gender = new Parse.Object('gender');
            gender.set('id', u.gender.id);
            user.set("gender", gender);

            user.signUp(null, {
                success: function (user) {
                    console.log("User created", user);
                    onLogin(user, callback);
                },
                error: function (user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        },

        login = function (username, password, callback) {
            Parse.User.logIn(username, password, {
                success: function (user) {
                    onLogin(user, callback);
                },
                error: function (user, error) {
                    onLogin(user, callback);
                }
            });
        },

        logout = function () {
            Parse.User.logOut();
            $(that).trigger('loggedout');
        },

        loginStored = function (callback) {
            var user = Parse.User.current();
            if (user) {
                onLogin(user, callback);
            } else {
                onLogin(user, callback);
            }
        },

        onLogin = function (user, callback) {
            var success = user != null;
            var res = { success: success };
            console.log("loginRes", res, user);
            if (success) {
                currentUserId = user.id;
                res.user = createUserObject(user);
            }
            $(that).trigger('loggedin', res);
            console.log("Logincallback", callback);
            if (callback != undefined)
                callback(res);
        },

        getCurrenUser = function () {
            return new Parse.User({ id: currentUserId });
        },


        createUserObject = function (loginRes) {
            return {
                name: loginRes.get("username"),
                id: loginRes.id
            };
        };

    that.getCurrenUser = getCurrenUser;
    that.login = login;
    that.logout = logout;
    that.loginStored = loginStored;
    that.register = register;
    that.init = init;
    return that;
}());