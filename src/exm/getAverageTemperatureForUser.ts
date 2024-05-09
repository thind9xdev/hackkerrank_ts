import https from "https";

function fetchData(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk: string) => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });

            response.on('error', (error: Error) => {
                reject(error);
            });
        });
    });
}

async function getAverageTemperatureForUser(userId: string): Promise<string> {
    let totalTemperature = 0;
    let recordCount = 0;

    let currentPage = 1;

    while (true) {
        const url = `https://jsonmock.hackerrank.com/api/medical_records?userId=${userId}&page=${currentPage}`;
        const response: string = await fetchData(url);
        const data = JSON.parse(response);

        const medicalRecords = data.data;

        if (medicalRecords.length === 0) {
            break;
        }

        for (const record of medicalRecords) {
            totalTemperature += record.vitals.bodyTemperature;
            recordCount++;
        }

        currentPage++;
    }

    if (recordCount === 0) {
        return "0";
    }

    const averageTemperature = totalTemperature / recordCount;

    return averageTemperature.toFixed(1);
}
