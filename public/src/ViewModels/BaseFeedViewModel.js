/// <reference path="../../res/"/>
/// <reference path="../../res/js/jquery-2.1.0.js"/>
BaseFeedViewModel = function (title) {
    var self = this;
    BaseViewModel.call(self);
    self.title(title);
    self.items = ko.observableArray();

    var hasMoreItems = true;
    var loading = false;
    var options;
    var handler = "#grid .item";
    var $handler;

    self.onscroll = function (sender, ev) {
        console.log(ev);
        var el = ev.target;
        var remaining = el.scrollHeight - el.scrollTop;

        var closeToBottom = (el.clientHeight - remaining) > -200;
        console.log("scroll to top", remaining, el.clientHeight, closeToBottom);
        if (closeToBottom) {
            self.pullData();
        }
    };

    self.pullData = function (callback) {
        var count = (window.innerWidth / 250) * 3;
        var params = {
            from: self.items().length,
            count: count | 0
        };
        console.log("PULLING params", params, loading, hasMoreItems);

        if (!loading && hasMoreItems) {
            console.log("Fetching Items with params", params);
            loading = true;
            self.loadItems(params, function (newItems) {
                hasMoreItems = newItems.length >= params.count;
                self.addRange(newItems);
                loading = false;
                if (callback)
                    callback();
            });
        }
    };

    self.pinRendered = function (item, ev) {
        console.log("pinRendered item ev", item, ev);
    };

    self.columnWidth = ko.observable(250);

    self.addRange = function (newItems) {
        for (var i = 0; i < newItems.length; i++) {
            var item = newItems[i];
            item.height = ko.computed(function (param) {
                //console.log("computed param", item);
                var height = self.columnWidth() / item.aspectratio;
                //console.log("computed height", self.columnWidth(), item.aspectratio, height);
                return height;
            }, item);
            self.items.push(item);
            applyLayout();
        }
    };
    var initiatedGrid = false;
    var applyLayout = function () {
        if (!initiatedGrid) {
            self.initGrid();
            initiatedGrid = true;
        }
        if ($handler) {
            $handler = $(handler);
            $handler.wookmark(options);
        }

        $('#grid').imagesLoaded(function () {
            if ($handler && $handler.wookmarkInstance) {
                $handler.wookmarkInstance.clear();
            }
            // Create a new layout handler.
            $handler = $(handler);
            $handler.wookmark(options);
        });
    };


    var onLayoutChanged = function () {
        var width = $('#grid .item').first().width();
        self.columnWidth(width);
        var body = $('body');
        console.log("layoutChanged", body.height());
        $('body').height("100%");
    };

    self.initGrid = function () {
        var $container = $('#grid');
        var $items = $('#grid item');
        console.log("items", $items);
        $items.imagesLoaded(function () {
            $.each($('#grid item'), function (index, el) {
                console.log("foreach items", el);
            });
            // Prepare layout options.
            console.log("Images Loaded");
            $handler = $(handler);
            if (!options)
                options = {
                    itemWidth: 270, // Optional min width of a grid item
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('#grid'),
                    onLayoutChanged: onLayoutChanged,
                    offset: 15, // Optional, the distance between grid items
                    outerOffset: 1, // Optional the distance from grid to parent
                    flexibleWidth: 500 // Optional, the maximum width of a grid item
                        , resizeDelay: 150
                };
            // Call the layout function.
            $handler.wookmark(options);
            setTimeout(applyLayout, 200);
        });
    };
};