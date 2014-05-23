/*global Presenter:false, ko:false*/

Presenter.ViewModelLoader = (function () {
	var that = {},
		vmBluePrints = [],
        rootDir,

        init = function (rtDir) {
        	rootDir = rtDir;
        	return that;
        },

		load = function (target, callback) {
		    if (vmBluePrints[target] !== undefined) {
		        var blueprint = vmBluePrints[target];
				var vm = new blueprint();
				callback(vm);
				console.log("FoundStoredVM", target, ko.toJS(vm));
			} else {
				var vmName = capitaliseFirstLetter(target) + "ViewModel";
				var vmFile = rootDir + "/src/ViewModels/" + vmName + ".min.js";
				console.log("Loading VM", vmFile);
				$.getScript(vmFile, function (res) {
					var vmClass = window[vmName];
					vmBluePrints[target] = vmClass;
					var vm = new vmClass();
					//vm.init(parameters);
					callback(vm);
				});
			}
		},

        capitaliseFirstLetter = function (string) {
        	return string.charAt(0).toUpperCase() + string.slice(1);
        };

	that.load = load;
	that.init = init;
	return that;
}());