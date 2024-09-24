import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const HARVARD_API_KEY = process.env.HARVARD_API_KEY;
const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";

// Verify that the API key is loaded correctly
if (HARVARD_API_KEY) {
    console.log('Harvard API key is loaded');
} else {
    console.error('Harvard API key is not defined. Check your .env file.');
}

// Function to test the API key
export const testHarvardApiKey = async () => {
    try {
        const response = await fetch(`${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&size=1`);
        const data = await response.json();
        
        if (response.ok) {
            console.log('Harvard API key is valid and working.');
            return true;
        } else {
            console.error('Harvard API key is invalid or there was an error:', data.error);
            return false;
        }
    } catch (error) {
        console.error('Error testing Harvard API key:', error);
        return false;
    }
};

// Function to fetch all objects by medium and save to JSON file
export const fetchAndSaveHarvardObjectsByMedium = async (mediumId) => {
    let allRecords = [];
    let page = 1;
    const pageSize = 100;

    try {
        while (true) {
            const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&medium=${mediumId}&size=${pageSize}&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.records && data.records.length > 0) {
                allRecords = [...allRecords, ...data.records];
                console.log(`Fetched ${data.records.length} records on page ${page}`);
                page++;
            } else {
                console.log(`No more records found after page ${page - 1}`);
                break;
            }
        }

        // Save all records to mediumALL.json
        const jsonContent = JSON.stringify(allRecords, null, 2);
        const filePath = path.join(process.cwd(), 'mediumALL.json');
        await fs.writeFile(filePath, jsonContent, 'utf8');
        console.log(`Saved ${allRecords.length} records to mediumALL.json`);

        return allRecords;
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        return [];
    }
};

// Function to fetch objects for an exhibition
export const fetchExhibitionObjects = async (mediumId = '2028206') => {
    try {
        const objects = await fetchAndSaveHarvardObjectsByMedium(mediumId);
        if (objects.length === 0) {
            console.log('No objects found for the selected medium.');
            return null;
        }

        console.log(`Fetched and saved ${objects.length} objects for medium ${mediumId}`);
        return objects;
    } catch (error) {
        console.error('Error fetching exhibition objects:', error);
        return null;
    }
};

// Test the API key when this module is imported
testHarvardApiKey().catch(error => {
    console.error('Error during API key test:', error);
});

// Only run fetchExhibitionObjects if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fetchExhibitionObjects().catch(error => {
        console.error('Error during fetchExhibitionObjects:', error);
    });
}
