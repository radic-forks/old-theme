
(function (factory) {

    factory(jQuery);

}(function ($) {


    'use strict';

    $.gitter = {
        user: 'RobinRadic',
        getRepositories: function (user) {
            user = user || this.user;
            $.github.user.repos(user, function (repos) {
                console.log(repos);
            });
        }
    };


    var sortMethods = ['size', 'stars', 'watchers', 'forks', 'issues', 'created', 'updated', 'pushed'];

    $.gitter.utils = {
        getSortMethods: function(){
            return sortMethods;
        },

        repoTopLanguages: function (languages) {
            var topLangs = [];
            for (var k in languages) {
                topLangs.push([k, languages[k]]);
            }

            topLangs.sort(function (a, b) {
                return b[1] - a[1];
            });
            return topLangs;
        },

        sortRepository: function (sortMethod, reposData) {
            var self = this;
            reposData.sort(function (a, b) {
                // sorted by last commit
                if (self.options.sortBy == 'stars') {
                    return b.stargazers_count - a.stargazers_count;
                } else {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
            });


            return reposData.slice(0, self.options.maxRepos);
        }
    };


    $.gitter.getRepositories();

}));

