const https = require('https');

function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });

            response.on('error', (error) => {
                reject(error);
            });
        });
    });
}
async function getTeams(year, k) {
    let pageNumber = 1;
    let allMatches = [];
    let totalPages = 1;

    while (pageNumber <= totalPages) {
        const url = `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${pageNumber}`;
        const response = await fetchData(url);
        const data = JSON.parse(response);

        allMatches = allMatches.concat(data.data);
        totalPages = data.total_pages;
        pageNumber++;
    }

    const teamMatchesMap = {};
    allMatches.forEach(match => {
        if (!teamMatchesMap[match.team1]) {
            teamMatchesMap[match.team1] = 0;
        }
        if (!teamMatchesMap[match.team2]) {
            teamMatchesMap[match.team2] = 0;
        }
        teamMatchesMap[match.team1]++;
        teamMatchesMap[match.team2]++;
    });

    const teams = Object.keys(teamMatchesMap).filter(team => teamMatchesMap[team] >= k);

    teams.sort();

    return teams;
}