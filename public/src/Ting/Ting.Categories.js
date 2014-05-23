Ting.Categories = (function () {
    var that = {},
        categoriesByID = [],
        categoriesByShort = [],
        categories = [],
        Category,


        init = function () {
            console.log("Categories init");
            Category = Parse.Object.extend('category');
            return that;
        },

        getAll = function (callback) {
            if (categories.length > 1)
                callback(categories);

            var CategoryCollection = Parse.Collection.extend({
                model: Category
            });
            var collection = new CategoryCollection();
            collection.comparator = function (object) {
                return object.get("category_name");
            };
            collection.fetch({
                success: function (res) {
                    res.each(function (obj) {
                        var c = obj.attributes;
                        c.id = obj.id;
                        categoriesByID[c.id] = c;
                        categoriesByShort[c.short] = c;
                        categories.push(c);
                    });
                    callback(categories);
                },
                error: function (error) {
                    console.log("Categories", error);
                }
            });
        },

        getParseObjectForId = function (id) {
            return new Category({ id: id });
        },

        getForShort = function (short) {
            return categoriesByShort[short];
        };

    that.getParseObjectForId = getParseObjectForId;
    that.getForShort = getForShort;
    that.getAll = getAll;
    that.init = init;
    return that;
}());