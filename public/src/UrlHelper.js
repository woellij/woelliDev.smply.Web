var UrlHelper = (function () {
    var that = {},

        parseURL = function (url) {
            /// <param name="url" type="String">Url String</param>
            var a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function () {
                    var ret = {},
                        seg = a.search.replace(/^\?/, '').split('&'),
                        len = seg.length, i = 0, s;
                    for (; i < len; i++) {
                        if (!seg[i]) { continue; }
                        s = seg[i].split('=');
                        ret[s[0]] = s[1];
                    }
                    return ret;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        },
        shortenURL = function (url, remainingCharCount, ellipse) {
            /// <param name="url" type="String">Url String</param>
            if (url) {
                url = url.replace("https://", "");
                url = url.replace("http://", "");
                var slashIndex = url.indexOf("/");
                url = url.substr(0, remainingCharCount);
                if (ellipse)
                    url += "...";
            }
            return url;
        },
        decodeURL = function (url) {
            /// <param name="url" type="String">Url String</param>
            return decodeURIComponent(url);
        },

        trimFileEnding = function (url) {
            /// <param name="url" type="String">Description</param>
            if (url) {
                var lastSlash = url.lastIndexOf("/");
                url = url.substring(0, lastSlash);
            }
            return url;
        },

        resolveRealUrl = function (url) {
            /// <param name="url" type="String">Url string</param>
            var URL = parseURL(url);
            if (URL) {
                var u = URL.params['u'];
                if (u) {
                    url = decodeURIComponent(u);
                }
            }
            return url;
        };

    that.trimFileEnding = trimFileEnding;
    that.resolveRealUrl = resolveRealUrl;
    that.parseURL = parseURL;
    that.shortenURL = shortenURL;
    that.decodeURL = decodeURL;
    return that;
})();