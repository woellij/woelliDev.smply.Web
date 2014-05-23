/// <reference path="../Navigation.js"/>
/// <reference path="../Ting/Ting.js"/>
/// <reference path="../Ting/User.js"/>

RegisterViewModel = function () {
    var self = this;
    BaseViewModel.call(self, "Register");
    self.email = ko.observable();
    self.username = ko.observable();
    self.password = ko.observable();
    self.gender = ko.observable();
    self.genders = ko.observableArray();
    self.genderHint = "Please select a gender";

    self.sendCommand = function (event, param) {
        Ting.User.register(ko.toJS(self), function (res) {
            console.log("register callback", res);
            if (res.success) {
                if (requestedBy !== undefined) {
                    if (requestedBy.indexOf("all") > -1)
                        Navigation.navigateTo("feed");
                    else
                        Navigation.navigateTo(requestedBy);
                }
            }
        });
    };

    self.loginStored = function (fail) {
        Ting.user.loginStored(onLogin);
    };

    var Gender = function (id, name) {
        this.id = id;
        this.name = name;
    };

    var requestedBy;
    this.init = function (parameters) {
        requestedBy = parameters.requestedBy;

        self.genders.push(new Gender("7uUFa5pgwW", "Female"));
        self.genders.push(new Gender("vUjCdGSa2k", "Male"));
        self.genders.push(new Gender("4aA196ySIV", "Transgender"));
        self.genders.push(new Gender("Bo7XTvW4ap", "I'd rather not say"));
    };

    var onLogin = function (res) {
        console.log("LoginResult", res);
        self.isLoading(false);
        if (res.success) {
            if (res.user.name != null) {
                console.log("LoginSuccess");
                Navigation.navigateTo("start");
                return;
            }
        }
        Navigation.navigateTo("login");
    };
};

