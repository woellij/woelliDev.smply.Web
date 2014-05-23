/// <reference path="../Ting/Ting.js"/>
/// <reference path="../Ting/User.js"/>

LoginViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Login");
    self.username = ko.observable();
    self.password = ko.observable();
    
    self.loginCommand = function () {
        self.isLoading(true);
        Ting.User.login(this.username(), this.password(), onLogin);
    };

    var requestedBy;
    this.init = function (parameters) {
        console.log("Loginviewmodel init", parameters);
        requestedBy = parameters.requestedBy;
    };

    var onLogin = function (res) {
        self.isLoading(false);
        console.log("Loginviewmodel on login", res);
        if (res.success) {
            if (requestedBy !== undefined) {
                if (requestedBy.indexOf("all") > -1)
                    Navigation.navigateTo("feed");
                else
                    Navigation.navigateTo(requestedBy);
            }
            return;
        }
    };
};

