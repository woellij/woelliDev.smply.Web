chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var findClosestLink = function (node) {
            /// <param name="node" type="Element"></param>
            var relatedUrls = [];
            var parentLevel = 0;
            while (node) {
                if (parentLevel <= 3) {
                    checkSiblings(node, "previousElementSibling", relatedUrls);
                    checkSiblings(node, "nextElementSibling", relatedUrls);
                }
                checkAddAnchor(node, relatedUrls);
                node = node.parentNode;
                parentLevel++;
            }
            return relatedUrls;
        };

        var checkAddAnchor = function (node, urls) {
            /// <param name="node" type="Element"></param>
            /// <param name="urls" type="Array"></param>

            if (node && node.tagName &&
                node.tagName.toLowerCase() === "a") {
                var link = node.getAttribute("href");
                if (typeof link !== typeof undefined
                    && urls.indexOf(link) === -1) {
                    urls.push(link);
                }
            }
        };

        var checkSiblings = function (node, direction, urls) {
            /// <param name="node" type="Element"></param>
            /// <param name="urls" type="Array"></param>
            /// <param name="direction" type="String"></param>
            if (node) {
                checkAddAnchor(node, urls);
                checkSiblings(node[direction], direction, urls);
            }
        };

        var getMeta = function (metaNames) {
            /// <param name="metaName" type="Array">meta names</param>
            var result = "";
            var metas = document.getElementsByTagName('meta');

            if (metas) {
                for (var i = 0; i < metaNames.length; i++) {
                    var metaName = metaNames[i];

                    for (var x = 0; x < metas.length; x++) {
                        var meta = metas[x];
                        /// <param name="meta" type="HTMLMetaElement"></param>
                        var name = meta.name.toLowerCase();

                        if (name.indexOf(metaName) > -1) {
                            result = meta.content;
                            return result;
                        }

                        var property = meta.attributes.property;
                        if (property) {
                            var value = property.value;
                            if (value) {

                                if (value.toLowerCase().indexOf(metaName) > -1) {
                                    result = meta.content;
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        };

        if (request.method === "getImages") {
            var minWidth = request.minWidth;
            var minHeight = request.minHeight;
            console.log("InjectedScript getImages");
            var images = [];

            var imgNodes = Array.prototype.slice.call(document.getElementsByTagName("img"), 0);
            imgNodes.sort(function (i1, i2) {
                res = (i2.width * i2.height) - (i1.width * i1.height);
                return res;
            });
            var imageUrls = [];
            for (var i = 0; i < imgNodes.length; i++) {
                var img = imgNodes[i];
                if (img.width > minWidth && img.height > minHeight) {
                    var relatedUrls = findClosestLink(img);
                    var relatedSites = [];
                    for (var j = 0; j < relatedUrls.length; j++) {
                        relatedSites.push({ url: relatedUrls[j] });
                    }
                    imageUrls.push(img.src);
                    images.push({
                        src: img.src,
                        ratio: img.width / img.height,
                        relatedSites: relatedSites
                    });
                }
            }

            var description = getMeta(['og:desc', 'description']);
            var image = getMeta(['og:image', 'thumbnail']);
            if (image && images.length == 0 && imageUrls.indexOf(image) == -1) {
                images.unshift({
                    src: image
                });
            }
            if (!description)
                description = "";
            else {
                var div = document.createElement('div');
                div.innerHTML = description;
                description = div.firstChild.nodeValue;
            }
            var data = { images: images, description: description };

            sendResponse({ data: data, method: "getImages" }); //same as innerText
        }
    }
);