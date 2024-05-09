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

async function getCountryName(code) {
      let pageNumber = 1;
    let countryName = null;

    while (!countryName) {
        const url = `https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`;
        const response = await fetchData(url);
        const data = JSON.parse(response);
        const countries = data.data;

        const matchingCountry = countries.find(country => country.alpha2Code === code);
        if (matchingCountry) {
            countryName = matchingCountry.name;
        } else {
            pageNumber++;
        }
    }

    return countryName;

}