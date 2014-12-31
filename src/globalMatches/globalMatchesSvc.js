angular.module('matchHubApp')
    .service('GlobalMatchesSvc', function ($http) {
        'use strict';

        var pageSize = 25,
            currentMatches;

        var searchMatches = function(pageNum, searchTerm, filters){
            var offset = pageSize * (pageNum - 1);
            var url = '/home/searchMatches?format=json&pageSize=' + (pageSize + 1) + '&pageNum=' + pageNum + '&offset=' + offset;

            if(searchTerm){
                url += '&searchTerm=' + searchTerm;
            }
            if(filters){
                if(filters.leagueIds){
                    url += '&league-ids=' + JSON.stringify(filters.leagueIds);
                }
                if(filters.seasonIds){
                    url += '&season-ids=' + JSON.stringify(filters.seasonIds);
                }
            }
            window.console.log('SEARCH MATCHES URL: ' + url);

            return $http.get(url);
        };

        var fetch = function (pageNum, searchTerm, filters) {
            return searchMatches(pageNum, searchTerm, filters)
                .then(function(resp){
                    var result = resp.data;
                    currentMatches = resp.data.result.matches;

                    // TODO: This can be refactored once we get a match count in result set
                    result.result.matches = currentMatches.slice(0, pageSize);

                    return result;
                });
        };

        // We fetch one more than our page size so we know if there is a next page
        var areMorePagesAvailable = function(){
            return currentMatches !== undefined && currentMatches.length > pageSize;
        };

        var saveMatch = function(match){
            var url = '/home/saveMatch?format=json';
            var data = $.param(match);
            window.console.log(JSON.stringify('SAVING MATCH: ' + data));

            return $http({
                        method: 'POST',
                        url: url,
                        data: data,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        var saveMatches = function(matches){
            var url = '/home/saveMatches?format=json';
            var data = $.param(matches);
            window.console.log(JSON.stringify('SAVING MATCHES: ' + data));

            return $http({
                        method: 'POST',
                        url: url,
                        data: data,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    });
        };

        return {
            areMorePagesAvailable: areMorePagesAvailable,
            fetch: fetch,
            saveMatch: saveMatch,
            saveMatches: saveMatches
        };
    });
