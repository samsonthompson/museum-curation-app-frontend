import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import centuries from './categories/centuries.json' assert { type: 'json' };

// Load environment variables from .env file
dotenv.config();

// Harvard API setup
const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";

// Function to save data to JSON file
async function saveDataToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`Data saved to ${filename}`);
    });
}

// Function to get objects by medium and century
async function getHarvardObjectsByMediumAndCentury(mediumId, centuryId, centuryName, size = 100) {
    const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&medium=${mediumId}&century=${centuryId}&size=${size}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.records || data.records.length === 0) {
            console.log(`No matching objects found for mediumId ${mediumId}, centuryId: ${centuryId}`);
            return [];
        }

        console.log(`Found ${data.records.length} objects for mediumId ${mediumId}, century: ${centuryName}`);

        // Save the data to a JSON file
        await saveDataToFile(`ivory_${centuryName}.json`, data.records);

        return data.records;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'An error occurred while fetching data.' };
    }
}

// Test each century for Ivory
async function testIvoryAcrossCenturies() {
    const mediumId = 2028686; // Example mediumId for "Ivory"

    for (const century of centuries) {
        const { centuryId, century: centuryName } = century;

        console.log(`Testing mediumId ${mediumId}, century: ${centuryName} (centuryId: ${centuryId})`);

        const data = await getHarvardObjectsByMediumAndCentury(mediumId, centuryId, centuryName);

        if (data.length > 0) {
            console.log(`Data saved for century: ${centuryName}`);
        } else {
            console.log(`No data found for century: ${centuryName}`);
        }
    }
}

testIvoryAcrossCenturies();
