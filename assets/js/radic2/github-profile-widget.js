function GithubProfileWidget(radic, options) {


    var template = $(document.createElement('div'));
    template.attr('id', 'github-widget');
    template.attr('data-username', 'robinradic');
    template.addClass('gh-profile-widget');
    $('body').prepend(template);


    this.defaultConfig = {
        sortBy: 'stars', // possible: 'stars', 'updateTime'
        reposHeaderText: 'Most starred',
        maxRepos: 5
    };


    options = options || this.defaultConfig;

    this.$template = document.getElementById('github-widget');
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

GithubProfileWidget.prototype.init = function () {
    var self = this;
    this.load(function () {
        self.render();
    });
};
GithubProfileWidget.prototype.load = function (done) {
    var self = this;

    self.radic.github('user', function (user) {
        self.data = user;
        console.log('GithubProfileWidget.data', self.data);
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
GithubProfileWidget.prototype.loadRepos = function (done) {
    var self = this;
    console.log('GithubProfileWidget.loadRepos');
    var request = this.radic.github('repos', function (repos) {
        self.profile.repos = repos;
        console.log('GithubProfileWidget.repos', self.profile.repos);
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
GithubProfileWidget.prototype.getRepos = function () {
    return this.profile.repos;

};
GithubProfileWidget.prototype.getTopLanguages = function (callback) {
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
GithubProfileWidget.prototype.render = function (options) {
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
GithubProfileWidget.prototype.render.repos = function (sortyBy, maxRepos) {
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
GithubProfileWidget.prototype.render.profile = function () {
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
GithubProfileWidget.prototype.render.langs = function () {

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
GithubProfileWidget.prototype.getURL = function (url, async) {
    console.warn('GET URL CALLED. FIX ME PLZ', url);
    function old() {
        async = async || false;

        var request = new XMLHttpRequest();
        request.open('GET', url, async);
        request.send();

        return request;
    }
};
GithubProfileWidget.prototype.loadCSS = function () {
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

