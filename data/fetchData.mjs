import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

// The Met API setup
const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// Harvard API setup
const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";

// The Met API functions
async function getMetDepartments() {
    const url = `${MET_BASE_URL}/departments`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getMetObjectsByDepartment(departmentIds) {
    const url = `${MET_BASE_URL}/objects?departmentIds=${departmentIds}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getMetObjectDetails(objectId) {
    const url = `${MET_BASE_URL}/objects/${objectId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

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
        console.log(`Data saved to ${filename}`);
    });
}

// Fetch data from both APIs and save to files
async function fetchAndSaveData() {
    const metData = await getMetDepartments();
    await saveDataToFile('metDepartments.json', metData);

    const harvardData = await getHarvardObjects();
    await saveDataToFile('harvardObjects.json', harvardData);
}

// Run the fetching and saving process
fetchAndSaveData();
