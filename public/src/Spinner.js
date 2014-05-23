ko.bindingHandlers.spinner = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        $(element).hide();
        var options = {};
        $.extend(options, ko.bindingHandlers.spinner.defaultOptions, ko.utils.unwrapObservable(allBindingsAccessor().spinnerOptions));

        //create the spinner with the appropriate options
        var spinner = new Spinner(options);

        //could do this in the update function, but this gives us easy access to the spinner object (through the closure) without having to store it with the element
        ko.dependentObservable(function () {
            var value = ko.utils.unwrapObservable(valueAccessor());  //this ensures that it depends on the observable value

            if (value) {
                $(element).show();
                spinner.spin(element);
            } else if (spinner.el) {   //don't stop first time
                spinner.stop();
                $(element).hide();
            }
        });
    },
    defaultOptions: {
        lines: 17,
        length: 22,
        width: 2,
        radius: 18,
        color: '#000',
        speed: 1,
        trail: 60,
        rotate: 60
    }
};