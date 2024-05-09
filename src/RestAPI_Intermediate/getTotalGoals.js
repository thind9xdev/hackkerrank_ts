const https = require('https');
const URL_API = 'https://jsonmock.hackerrank.com/api/football_matches'

async function getTotalGoals(team, year) {
    let page = 1;
    let totalGoals = 0;
    let totalPages = 1;

    const fetchData = async (url) => {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });

            }).on('error', (err) => {
                reject(err);
            });
        });
    };

    while (page <= totalPages) {
        const response1 = await fetchData(`${URL_API}?year=${year}&team1=${team}&page=${page}`);
        const response2 = await fetchData(`${URL_API}?year=${year}&team2=${team}&page=${page}`);

        totalPages = Math.max(response1.total_pages, response2.total_pages);

        response1.data.forEach(match => totalGoals += parseInt(match.team1goals));
        response2.data.forEach(match => totalGoals += parseInt(match.team2goals));

        page++;
    }

    return totalGoals;
}
