/// <reference path="QUnit.js" />
/// <reference path="../public/src/UrlHelper.js" />

var urlHelper = null;
var encodedHiddenFbUrl = "http://l.facebook.com/l.php?u=http%3A%2F%2Fwww.bild.de%2Fpolitik%2Fausland%2Fconchita-wurst%2Fmuss-ich-conchita-wurst-gut-finden-35935258.bild.html&h=NAQFuvakV&enc=AZN-3Xl0-kDavH7NYb07xHLvIA4MxKhj43Xhnnxf9lAbqmFlUp1L8HhDa3n4oq0yMVcCnLBUMIncSRVfveqE_fYyhW_nitn-Eu9clALAaytTgMvDHjUvJzDchMyoj6yz6ykbuETsRreBC6rIdA1PddtVy3L_4ySnrfmSfSCvvWdDZw&s=1";
var u_param = "http%3A%2F%2Fwww.bild.de%2Fpolitik%2Fausland%2Fconchita-wurst%2Fmuss-ich-conchita-wurst-gut-finden-35935258.bild.html";
var u_param_decoded = "http://www.bild.de/politik/ausland/conchita-wurst/muss-ich-conchita-wurst-gut-finden-35935258.bild.html";

var shouldResolveTo = u_param_decoded;

module("UrlHelper.resolveRealUrl(url)", {
    setup: function () {

    },
    teardown: function () {

    }
});
test("Url Parse", function () {
    var URL = UrlHelper.parseURL(encodedHiddenFbUrl);
    var uparam = URL.params['u'];
    equal(uparam, u_param, "The url was not parsed correctly " + uparam);
});

test("Url decode", function () {
    var decoded = UrlHelper.decodeURL(u_param);
    equal(decoded, u_param_decoded, "The Url wasn't decoded properly");
});
test("Resolve Real Url", function () {
    var real = UrlHelper.resolveRealUrl(encodedHiddenFbUrl);
    equal(real, shouldResolveTo);
});

test("Doesnt touch regular url", function () {
    var result = UrlHelper.resolveRealUrl(u_param_decoded);
    console.log(result);
    equal(result, u_param_decoded);
});

test("TrimFileNameFromUrl", function () {
    var res = UrlHelper.trimFileEnding("www.bild.de/indasdf/asdf/asdf//asdfasdf%20asdfasdf/index.html");
    equal(res, "www.bild.de/indasdf/asdf/asdf//asdfasdf%20asdfasdf");
});

test("Shorten url", function () {
    var result = UrlHelper.shortenURL(shouldResolveTo, 11, true);
    equal(result, "www.bild.de...");
});
