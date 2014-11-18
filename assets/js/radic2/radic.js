// @include external/eventemitter2.js

// @include external/async.js


/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */

(function () {
    'use strict';


    function Radic(options, callback) {

        //# options
        this.options = Radic.extend(true, {}, Radic.defaults, options);
        this.init();
        if(Radic.defined(callback)){
            callback(this);
        }
    }


    var root;

    if (typeof module !== 'undefined' && module.exports) {
        root = module.exports;
    } else {
        root = window;
    }

    Radic.defaults = {
    };


    // @include statics.js


    // @if cookie
    // @include cookie.js
    // @endif

    // @if github
    // @include github.js
    // @endif




    //# Widgets

    // @if GithubProfileWidget
    // @include github-profile-widget.js
    // @endif


    Radic.prototype.init = function(){

        this._widgets = {
            // @if GithubProfileWidget
            'github-profile': GithubProfileWidget,
            // @endif
        };


    }
    Radic.prototype.widget = function (name, options) {
        this._widgets[name] = new this._widgets[name](this, options);
        return this._widgets[name];
    };

    Radic.make = function(options){
        root.radic= new Radic(options);
        return root.radic;
    };

    //# AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return  Radic.make;
        });
    }
    //# CommonJS / NodeJS
    //# included directly via <script> tag OR exported to module
    //# if (typeof module !== 'undefined' && module.exports)
    else {
        root.radic =  Radic.make
    }


}).call();