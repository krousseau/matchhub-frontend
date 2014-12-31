angular.module('matchHubApp')
    .service('GlobalPlayersSvc', function ($http) {
        'use strict';

        var pageSize = 3,  // This is the number of teams to display
            currentTeams;

        var searchPlayers = function(pageNum, searchTerm, filters){
            var offset = pageSize * (pageNum - 1);
            var url = '/home/searchTeams?format=json&includePlayers=10000&pageSize=' + (pageSize + 1) + '&pageNum=' + pageNum + '&offset=' + offset;

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

            return $http.get(url);
        };

        var reduceResult = function(teams, players){
            var result = {
                teams:[]
            };
            var teamsMap = {};
            teams.forEach(function(team){
                teamsMap[team.id] = {
                    teamName: team.name,
                    teamId: team.id,
                    players: []
                };
            });

            // Loop over all of the players and their teams, adding them to the appropriate teams in our list
            players.forEach(function(player){
                player.teams.forEach(function(teamId){
                    if(teamsMap.hasOwnProperty(teamId)){
                        teamsMap[teamId].players.push({
                            id: player.actingEntityInCurrentContext.id,
                            name: player.actingEntityInCurrentContext.name,
                            email: player.actingEntityInCurrentContext.email
                        });
                    }
                });
            });

            for (var key in teamsMap) {
                if (teamsMap.hasOwnProperty(key)) {
                    result.teams.push(teamsMap[key]);
                }
            }

            return result;
        };

        var fetch = function (pageNum, searchTerm, filters) {
            return searchPlayers(pageNum, searchTerm, filters)
                .then(function(resp){
                    var result = resp.data;
                    currentTeams = resp.data.result.teams;

                    // We requested 1 extra to know if we need to page so take the first 3
                    //result.result.teams = currentTeams.slice(0, pageSize);

                    return reduceResult(result.result.teams, result.result.players);
                });
        };

        // We fetch one more than our page size so we know if there is a next page
        var areMorePagesAvailable = function(){
            return currentTeams !== undefined && currentTeams.length > pageSize;
        };


        return {
            areMorePagesAvailable: areMorePagesAvailable,
            fetch: fetch
        };
    });
