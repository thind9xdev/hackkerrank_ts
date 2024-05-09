const https = require('https');
const URL_API = 'https://jsonmock.hackerrank.com/api/football_matches'

async function getNumDraws(year) {
  try {
      const totalPages = await getTotalPages(year);

      const requests = [];
      for (let page = 1; page <= totalPages; page++) {
          requests.push(getMatches(year, page));
      }

      const responses = await Promise.all(requests);
      let totalDraws = 0;
      responses.forEach(response => {
          totalDraws += response.totalDraws;
      });

      return totalDraws;
  } catch (error) {
      console.error(error);
      return 0;
  }
}

async function getTotalPages(year) {
  return new Promise((resolve, reject) => {
      https.get(`${URL_API}?year=${year}`, (res) => {
          let data = '';
          res.on('data', (chunk) => {
              data += chunk;
          });
          res.on('end', () => {
              const response = JSON.parse(data);
              resolve(response.total_pages);
          });
      }).on('error', (err) => {
          reject(err);
      });
  });
}

async function getMatches(year, page) {
  return new Promise((resolve, reject) => {
      https.get(`${URL_API}?year=${year}&page=${page}`, (res) => {
          let data = '';
          res.on('data', (chunk) => {
              data += chunk;
          });
          res.on('end', () => {
              const response = JSON.parse(data);
              let totalDraws = 0;
              response.data.forEach(match => {
                  if (parseInt(match.team1goals) === parseInt(match.team2goals)) {
                      totalDraws++;
                  }
              });
              resolve({ totalDraws });
          });
      }).on('error', (err) => {
          reject(err);
      });
  });
}