// @exclude
var Radic;
// @endexclude

Radic.defaults.github = {
    username: 'RobinRadic',
    url: 'https://api.github.com'
};



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

Github.prototype.init = function () {
    var self = this,
        cached = self.getCache();
};

Github.prototype.requestData = function (url, callback) {
    var self = this;


    var opts = {
        url: this.options.url + "/" + url,
        dataType: "jsonp",
        error: function (data, err) {
            console.warn('jsonp error', data, err);
        },
        success: function (results, txtstatus, xhr) {
            var result_data = results.data;

            if (results.meta.status >= 400 && result_data.message) {
                console.warn(result_data.message);
            }
            else if (results.meta.status === 200) {
                result_data = self.setCache(url, results.data);
            }

            if (typeof callback === 'function') {
                callback(result_data);
            }
        }
    };

    var cached = this.getCache(url);
    if (cached !== false && typeof callback === 'function') {
        callback(cached);
    } else {
        return $.ajax(opts);
    }
};

Github.prototype.setCache = function (url, result_data) {
    var self = this;
    // cache data in cookie for 10 minutes, not to hit the rate limiter
    $.cookie('radic-github-' + Radic.md5(url), result_data, {
        // 1 day / 24 = 1 hour
        // 1 hour / 6 = 10 minutes
        expires: (1 / 24) / 6,
        path: '/'
    });

};

Github.prototype.getCache = function (url) {
    var self = this;
    var result_data = $.cookie('radic-github-' + Radic.md5(url));
    if (typeof result_data !== 'undefined') {
        return result_data;
    }
    else {
        return false;
    }
};


Radic.prototype.github = function(what, cb){
    if(Radic.defined(this._github) === false){
        this._github = new Github(this.options.github);
    }
    var url;
    if (what === 'user') {
        url = 'users/' + this.options.github.username;
    } else if (what === 'repos') {
        url = 'users/' + this.options.github.username + '/repos';
    }
    this._github.requestData(url, cb);
};
