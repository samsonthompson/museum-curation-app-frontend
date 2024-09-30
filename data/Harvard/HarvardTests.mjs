import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import centuries from './categories/centuries.json' assert { type: 'json' };


dotenv.config();


const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";


async function saveDataToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
    });
}

async function getHarvardObjectsByMediumAndCentury(mediumId, centuryId, centuryName, size = 100) {
    const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&medium=${mediumId}&century=${centuryId}&size=${size}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            return [];
        }

        await saveDataToFile(`ivory_${centuryName}.json`, data.records);

        return data.records;
    } catch (error) {
        return { error: 'An error occurred while fetching data.' };
    }
}


async function testIvoryAcrossCenturies() {
    const mediumId = 2028686;

    for (const century of centuries) {
        const { centuryId, century: centuryName } = century;

        const data = await getHarvardObjectsByMediumAndCentury(mediumId, centuryId, centuryName);

        if (data.length > 0) {
        }
    }
}

testIvoryAcrossCenturies();
