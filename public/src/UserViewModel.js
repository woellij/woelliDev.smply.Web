UserViewModel = (function () {
    var that = {
        username: "",
        isLoggedIn: ko.observable(false),
        isLoggingIn: ko.observable(false),
        registerCommand: function () {
            Navigation.navigateTo("register");
        },
        logoutCommand: function (sender, event) {
            Ting.User.logout();
        },
        loginCommand: function () {
            Navigation.navigateTo("login");
        },

        boardSelected: function (board, ev) {
            console.log("BoardsViewModel selected board", board);
            Navigation.navigateTo(that.username + "/" + board.name, { board: board });
            ev.stopPropagation();
        },

        createBoardCommand: function (sender, ev) {
            var parent = $(ev.currentTarget).parents(".f-dropdown");
            parent.removeClass('open');
            parent.hide();
            Navigation.navigateTo("createBoard");
        },
        boardsViewModel: ko.observable()
    },

        init = function () {
            $(Ting.User).on('loggedin', function (event, res) {
                console.log("LOGIN EVENT", event, res);
                onLogin(res);
            });
            $(Ting.User).on('loggedout', onLogout);
            $(Navigation).on('navigated', function (event, target) {
                that.isLoggingIn(target == 'register' || target == 'login');
            });
            Ting.User.loginStored();
            return that;
        },

        onLogout = function (event) {
            console.log("onlogout");
            that.isLoggedIn(false);
        },

        onLogin = function (loginRes) {
            that.isLoggingIn(false);
            that.isLoggedIn(loginRes.success);
            if (loginRes.success) {
                initBoards(loginRes.user);
                $("#navigation-div").css('padding-top', "0px");
            }
            console.log("userviewmodel onlogin", ko.toJS(that), loginRes);
        },

        initBoards = function (user) {
            Presenter.ViewModelLoader.load('boards', function (vm) {
                vm.init({
                    userID: user.id
                });
                that.boardsViewModel(vm);
                that.username = user.name;
                console.log()
            });
        };


    that.init = init;
    return that;
}());