import fetch from 'node-fetch';
import fs from 'fs';

// The Met API setup
const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// The Met API functions
async function getMetObjects() {
    const url = `${MET_BASE_URL}/objects`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getMetObjectDetails(objectID) {
    const url = `${MET_BASE_URL}/objects/${objectID}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching Met object:", error);
    }
}

// Function to save data to JSON file
async function saveDataToFile(filename, data) {
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log(`Data overwritten and saved to ${filename}`);
    });
}

// Fetch data from Met API and save to file
async function fetchAndSaveMetData() {
    const metData = await getMetObjects();
    await saveDataToFile('metObjects.json', metData);
}

// Run the Met fetching and saving process
fetchAndSaveMetData();
