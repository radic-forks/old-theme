// @exclude
var Radic;
// @endexclude

Radic.defaults.cookie = {

};

function encodeCookie(s) {
    return config.raw ? s : encodeURIComponent(s);
}

function decodeCookie(s) {
    return config.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
    return encodeCookie(config.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
        // This is a quoted cookie as according to RFC2068, unescape...
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
        // Replace server-side written pluses with spaces.
        // If we can't decode the cookie, ignore it, it's unusable.
        // If we can't parse the cookie, ignore it, it's unusable.
        s = decodeURIComponent(s.replace(/\+/g, ' '));
        return config.json ? JSON.parse(s) : s;
    } catch (e) {
    }
}

function readCookie(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return Radic.isFunction(converter) ? converter(value) : value;
}

Radic.prototype.cookie = function (key, value, extraOptions) {

    // Write
    var options = this.options.cookie;

    if (arguments.length > 1 && !Radic.isFunction(value)) {
        options = Radic.extend({}, options, extraOptions);

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setTime(+t + days * 864e+5);
        }

        return (document.cookie = [
            encodeCookie(key), '=', stringifyCookieValue(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling Radic.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        var name = decodeCookie(parts.shift());
        var cookie = parts.join('=');

        if (key && key === name) {
            // If second argument (value) is a function it's a converter...
            result = readCookie(cookie, value);
            break;
        }

        // Prevent storing a cookie that we couldn't decode.
        if (!key && (cookie = readCookie(cookie)) !== undefined) {
            result[name] = cookie;
        }
    }

    return result;
};


Radic.prototype.removeCookie = function () {
    if (this.cookie(key) === undefined) {
        return false;
    }

    // Must not alter options, thus extending a fresh object...
    this.cookie(key, '', Radic.extend({}, this.options.cookie, {expires: -1}));
    return !this.cookie(key);

};

