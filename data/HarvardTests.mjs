import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// Harvard API setup
const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";

// Harvard Art Museums API functions
async function getHarvardObjects() {
    const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&size=10`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getHarvardObjectDetails(objectId) {
    const url = `${HARVARD_BASE_URL}/object/${objectId}?apikey=${HARVARD_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.objectid) {
        return data;
    } else {
        return { error: "Object not found or not available" };
    }
}

// Function to save data to JSON file
async function saveDataToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`Data overwritten and saved to ${filename}`);
    });
}

// Fetch data from Harvard API and save to file
async function fetchAndSaveHarvardData() {
    const harvardData = await getHarvardObjects();
    await saveDataToFile('harvardObjects.json', harvardData);
}

// Run the Harvard fetching and saving process
fetchAndSaveHarvardData();
