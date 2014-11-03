(function () {
    'use strict';

    var Radic = window.Radic = function Radic(options) {
        this._init(options);
    };
    Radic.defaults = {
        git: {
            username: 'RobinRadic',
            url: 'https://api.github.com'
        }
    };

    (function addStaticHelpers() {
        Radic.utf8_encode = function (argString) {
            //  discuss at: http://phpjs.org/functions/utf8_encode/
            // original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: sowberry
            // improved by: Jack
            // improved by: Yves Sucaet
            // improved by: kirilloid
            // bugfixed by: Onno Marsman
            // bugfixed by: Onno Marsman
            // bugfixed by: Ulrich
            // bugfixed by: Rafal Kukawski
            // bugfixed by: kirilloid
            //   example 1: utf8_encode('Kevin van Zonneveld');
            //   returns 1: 'Kevin van Zonneveld'

            if (argString === null || typeof argString === 'undefined') {
                return '';
            }

            var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
            var utftext = '',
                start, end, stringl = 0;

            start = end = 0;
            stringl = string.length;
            for (var n = 0; n < stringl; n++) {
                var c1 = string.charCodeAt(n);
                var enc = null;

                if (c1 < 128) {
                    end++;
                } else if (c1 > 127 && c1 < 2048) {
                    enc = String.fromCharCode(
                        (c1 >> 6) | 192, (c1 & 63) | 128
                    );
                } else if ((c1 & 0xF800) != 0xD800) {
                    enc = String.fromCharCode(
                        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                    );
                } else { // surrogate pairs
                    if ((c1 & 0xFC00) != 0xD800) {
                        throw new RangeError('Unmatched trail surrogate at ' + n);
                    }
                    var c2 = string.charCodeAt(++n);
                    if ((c2 & 0xFC00) != 0xDC00) {
                        throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                    }
                    c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                    enc = String.fromCharCode(
                        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                    );
                }
                if (enc !== null) {
                    if (end > start) {
                        utftext += string.slice(start, end);
                    }
                    utftext += enc;
                    start = end = n + 1;
                }
            }

            if (end > start) {
                utftext += string.slice(start, stringl);
            }

            return utftext;
        };
        Radic.md5 = function (str) {
            //  discuss at: http://phpjs.org/functions/md5/
            // original by: Webtoolkit.info (http://www.webtoolkit.info/)
            // improved by: Michael White (http://getsprink.com)
            // improved by: Jack
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            //    input by: Brett Zamir (http://brett-zamir.me)
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            //  depends on: utf8_encode
            //   example 1: md5('Kevin van Zonneveld');
            //   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'

            var xl;

            var rotateLeft = function (lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            };

            var addUnsigned = function (lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            };

            var _F = function (x, y, z) {
                return (x & y) | ((~x) & z);
            };
            var _G = function (x, y, z) {
                return (x & z) | (y & (~z));
            };
            var _H = function (x, y, z) {
                return (x ^ y ^ z);
            };
            var _I = function (x, y, z) {
                return (y ^ (x | (~z)));
            };

            var _FF = function (a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _GG = function (a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _HH = function (a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var _II = function (a, b, c, d, x, s, ac) {
                a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
                return addUnsigned(rotateLeft(a, s), b);
            };

            var convertToWordArray = function (str) {
                var lWordCount;
                var lMessageLength = str.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = new Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            var wordToHex = function (lValue) {
                var wordToHexValue = '',
                    wordToHexValue_temp = '',
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    wordToHexValue_temp = '0' + lByte.toString(16);
                    wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
                }
                return wordToHexValue;
            };

            var x = [],
                k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22,
                S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20,
                S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23,
                S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;

            str = this.utf8_encode(str);
            x = convertToWordArray(str);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;

            xl = x.length;
            for (k = 0; k < xl; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }

            var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

            return temp.toLowerCase();
        };
        Radic.defined = function (obj) {
            return typeof obj !== 'undefined';
        }
    }).call();


    function Github(options) {
        var self = this,
            defaults = {
                iconStars: true,
                iconForks: true,
                iconIssues: false
            };


        self.options = $.extend({}, defaults, options);

        self._defaults = defaults;

        self.init();
    }

    Github.prototype = {
        init: function () {
            var self = this,
                cached = self.getCache();
        },
        etag: function (key, val) {
            var etags = $.cookie('radic-git-etags');

            if (Radic.defined(etags)) {
                if (Radic.defined(val)) {
                    // set etag
                    etags[key] = val;
                    $.cookie('radic-git-etags', etags);
                } else if (Radic.defined(etags[key])) {
                    // get etag
                    return etags[key];
                } else {
                    // get etag, failed
                    return false;
                }
            }
        },
        requestData: function (url, callback) {
            var self = this;

            // set default ajax request options
            var opts = {
                url: "https://api.github.com/" + url,
                dataType: "jsonp",

                error: function (data, err) {
                    console.warn('jsonp error', data, err);
                }
            };

            if (this.etag(url)) {
                opts.headers['If-None-Match'] = this.etag(url);
            }

            opts.success = function (results) {
                var result_data = results.data;

                // Handle API failures
                if (results.meta.status >= 400 && result_data.message) {
                    console.warn(result_data.message);
                }
                else {
                    if (results.meta.status === 304) {
                        results.data = self.getCache(url);
                    }
                    else if (results.meta.status === 200) {
                        self.etag(url, results.meta.etag);
                        self.setCache(url, result_data);
                    }
                }
                if (typeof callback === 'function') {
                    callback(result_data);
                }
            };

            var cached = this.getCache(url);
            if (cached !== false) {
                callback(cached);
            } else {
                return $.ajax(opts);
            }
        },
        setCache: function (url, result_data) {
            var self = this;

            // cache data in cookie for 10 minutes, not to hit the rate limiter

            $.cookie('radic-github-' + Radic.md5(url), result_data, {
                // 1 day / 24 = 1 hour
                // 1 hour / 6 = 10 minutes
                expires: (1 / 24) / 6,
                path: '/'
            });

        },
        getCache: function (url) {
            var self = this;


            var result_data = $.cookie('radic-github-' + Radic.md5(url));
            if (typeof result_data !== 'undefined') {
                return result_data;
            }
            else {
                return false;
            }
        }
    };


    function GitHubWidget(radic, options) {
        var template = 'github-widget';

        this.defaultConfig = {
            sortBy: 'stars', // possible: 'stars', 'updateTime'
            reposHeaderText: 'Most starred',
            maxRepos: 5
        };

        options = options || this.defaultConfig;

        this.$template = document.getElementById(template);
        this.user = options.userName || this.$template.dataset.username;

        this.url = {
            langs: []
        };
        this.radic = radic;

        this.error = null;
        this.data = null;

        this.profile = {};
        this.langs = {};

        // load resources and render widget
        this.init();
    }

    GitHubWidget.prototype.init = function () {
        var self = this;
        this.load(function () {
            self.render();
        });
    };
    GitHubWidget.prototype.load = function (done) {
        var self = this;
        var request = this.radic.git('user', function (user) {
            self.data = user;
            console.log('GitHubWidget.data', self.data);
            self.loadRepos(done);
        });

        function old() {
            this.data = JSON.parse(request.responseText);

            if (request.status === 200) {

                this.error = null;

                this.loadRepos();

            } else {
                var limitRequests = request.getResponseHeader('X-RateLimit-Remaining');

                this.error = {
                    message: this.data.message
                };

                if (Number(limitRequests) === 0) {
                    // API is blocked
                    var resetTime = request.getResponseHeader('X-RateLimit-Reset');
                    this.error.resetDate = new Date(resetTime * 1000);

                    // full message is too long, leave only important thing
                    this.error.message = this.error.message.split('(')[0];
                }

                if (request.status === 404) {
                    this.error.isWrongUser = true;
                }
            }
        }
    };
    GitHubWidget.prototype.loadRepos = function (done) {
        var self = this;
        console.log('GitHubWidget.loadRepos');
        var request = this.radic.git('repos', function (repos) {
            self.profile.repos = repos;
            console.log('GitHubWidget.repos', self.profile.repos);
            for (var k in self.profile.repos) {
                self.url.langs.push(self.profile.repos[k].languages_url);
            }
            done();
        });

        function old() {
            var request = this.getURL(this.data.repos_url);

            this.profile.repos = JSON.parse(request.responseText);

            // get API urls to generate language stats
            for (var k in this.profile.repos) {
                this.url.langs.push(this.profile.repos[k].languages_url);
            }

            return this.profile.repos;
        }
    };
    GitHubWidget.prototype.getRepos = function () {
        return this.profile.repos;
    };
    GitHubWidget.prototype.getTopLanguages = function (callback) {
        var langStats = []; // array of URL strings
        callback();
        function old() {
            // get URLs with language stats for each repository
            this.url.langs.forEach(function (apiURL) {
                var that = this,
                    request = new XMLHttpRequest();

                request.addEventListener('load', function () {

                    var repoLangs = JSON.parse(request.responseText);
                    langStats.push(repoLangs);

                    if (langStats.length === that.url.langs.length) { // all requests were made
                        calcPopularity.bind(that)();
                    }

                }, false);

                request.open('GET', apiURL, true);
                request.send(null);
            }, this);

            // give rank (weights) to the language
            var calcPopularity = function () {
                langStats.forEach(function (repoLangs) {
                    var k, sum = 0;

                    for (k in repoLangs) {
                        if (repoLangs[k] !== undefined) {
                            sum += repoLangs[k];
                            this.langs[k] = this.langs[k] || 0;
                        }
                    }

                    for (k in repoLangs) {
                        if (repoLangs[k] !== undefined) {
                            this.langs[k] += repoLangs[k] / (sum * 1.00); // force floats
                        }
                    }
                }, this);

                callback();
            };
        }
    };
    GitHubWidget.prototype.render = function (options) {
        options = options || this.defaultConfig;
        console.log('rendering', options);

        var $root = this.$template;

        // clear root template element to prepare space for widget
        while ($root.hasChildNodes()) {
            $root.removeChild($root.firstChild);
        }

        // handle API errors
        if (this.error) {
            var $error = document.createElement('div');
            $error.className = 'error';

            $error.innerHTML = '<span>' + this.error.message + '</span>';

            if (this.error.isWrongUser) {
                $error.innerHTML = '<span>Not found user: ' + this.user + '</span>';
            }

            if (this.error.resetDate) {
                var remainingTime = this.error.resetDate.getMinutes() - new Date().getMinutes();
                remainingTime = (remainingTime < 0) ? 60 + remainingTime : remainingTime;

                $error.innerHTML += '<span class="remain">Come back after ' + remainingTime + ' minutes</span>';
            }

            $root.appendChild($error);

            return false;
        }

        // API doesen't return errors, try to built widget
        var $profile = this.render.profile.bind(this)();

        /*
         this.getTopLanguages((function () {
         var $langs = this.render.langs.bind(this)();
         $profile.appendChild($langs);
         }).bind(this));
         */
        $root.appendChild($profile);

        if (options.maxRepos > 0) {
            var $repos = this.render.repos.bind(this)(options.sortBy, options.maxRepos),
                $reposHeader = document.createElement('span');
            $reposHeader.className = 'header';
            $reposHeader.appendChild(document.createTextNode(options.reposHeaderText + ' repositories'));

            $repos.insertBefore($reposHeader, $repos.firstChild);
            $root.appendChild($repos);
        }
    };
    GitHubWidget.prototype.render.repos = function (sortyBy, maxRepos) {
        var reposData = this.getRepos();

        var $reposList = document.createElement('div');

        reposData.sort(function (a, b) {
            // sorted by last commit
            if (sortyBy == 'stars') {
                return b.stargazers_count - a.stargazers_count;
            } else {
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            }
        });

        for (var i = 0; i < maxRepos && reposData[i]; i++) {
            var updated = new Date(reposData[i].updated_at);
            var $repoLink = document.createElement('a');

            $repoLink.href = reposData[i].html_url;
            $repoLink.title = reposData[i].description;
            $repoLink.innerHTML += '<span class="repo-name">' + reposData[i].name + '</span>';
            $repoLink.innerHTML += '<span class="updated">Updated: ' + updated.toLocaleDateString() + '</span>';
            $repoLink.innerHTML += '<span class="star">' + reposData[i].stargazers_count + '</span>';

            $reposList.appendChild($repoLink);
        }

        $reposList.className = 'repos';
        return $reposList;
    };
    GitHubWidget.prototype.render.profile = function () {
        var $profile = document.createElement('div'),
            $name = document.createElement('a'),
            $avatar = document.createElement('img'),
            $stats = document.createElement('div'),
            $followContainer = document.createElement('div'),
            $followButton = document.createElement('a'),
            $followers = document.createElement('span');

        $name.href = this.data.html_url;
        $name.className = 'name';
        $name.appendChild(document.createTextNode(this.data.name));

        $avatar.src = this.data.avatar_url;
        $avatar.className = 'avatar';

        $followButton.href = $name.href;
        $followButton.className = 'follow-button';
        $followButton.innerHTML = 'Follow @' + this.user;

        $followers.href = this.data.followers_url;
        $followers.className = 'followers';
        $followers.innerHTML = this.data.followers;

        $followContainer.className = 'followMe';
        $followContainer.appendChild($followButton);
        $followContainer.appendChild($followers);

        $profile.appendChild($avatar);
        $profile.appendChild($name);
        $profile.appendChild($followContainer);
        $profile.appendChild($stats);
        $profile.classList.add('profile');

        return $profile;
    };
    GitHubWidget.prototype.render.langs = function () {

        function old() {
            var $langsList = document.createElement('ul');

            var topLangs = [];
            for (var k in this.langs) {
                topLangs.push([k, this.langs[k]]);
            }

            topLangs.sort(function (a, b) {
                return b[1] - a[1];
            });

            // generating HTML structure
            for (var i = 0; i < 3 && topLangs[i]; i++) {
                $langsList.innerHTML += '<li>' + topLangs[i][0] + '</li>';
            }

            $langsList.className = 'languages';
            return $langsList;
        }

        return [];
    };
// handle AJAX requests to GitHub's API
    GitHubWidget.prototype.getURL = function (url, async) {
        console.warn('GET URL CALLED. FIX ME PLZ', url);
        function old() {
            async = async || false;

            var request = new XMLHttpRequest();
            request.open('GET', url, async);
            request.send();

            return request;
        }
    };
    GitHubWidget.prototype.loadCSS = function () {
        console.info('loadCSS called. aborting, already got it in scss.');
        function old() {
            var $style = document.createElement('link'),
                $scripts = document.getElementsByTagName('script'),
                scriptPath;

            scriptPath = $scripts[$scripts.length - 1].src;	// This works because the browser loads and executes scripts in order,
            // so while your script is executing,
            // the document it was included in
            // is sure to have your script element as the last one on the page
            $style.rel = 'stylesheet';
            $style.href = scriptPath + '/../gh-profile-widget.css';

            document.head.appendChild($style);
            this.$template.className = 'gh-profile-widget';

            return $style.sheet;
        }
    };


    Radic.prototype = {
        _init: function (options) {

            // options
            this.options = $.extend(true, {}, Radic.defaults, options);
            // cache some elements and initialize some variables
            this._config();

            $.cookie.json = true;
        },
        _config: function () {

            this._git = new Github();
            this._widgets = {
                'github-profile': GitHubWidget
            };
        },
        // API requests
        git: function (what, cb) {
            var url;
            if (what === 'user') {
                url = 'users/' + this.options.git.username;
            } else if (what === 'repos') {
                url = 'users/' + this.options.git.username + '/repos';
            }
            this._git.requestData(url, cb);
        },
        // Widget creator
        widget: function (name, options) {
            this._widgets[name] = new this._widgets[name](this, options);
            return this._widgets[name];
        }
    };

    Radic.make = function (options, callback) {
        window.radic = new window.Radic(options);
        callback(window.radic);
    };
}).call();