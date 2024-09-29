import fetch from 'node-fetch';
import fs from 'fs';

// Function to get all unique cultures and write to a file
async function getAllCulturesAndWriteToFile() {
    const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
    const batchSize = 10000; // Number of objects to fetch in each batch
    const cultures = new Set();

    try {
        console.log('Fetching all object IDs...');
        const objectsResponse = await fetch(`${baseUrl}/objects`);
        const objectsData = await objectsResponse.json();
        const objectIDs = objectsData.objectIDs;
        console.log(`Total objects fetched: ${objectIDs.length}`);

        for (let i = 0; i < objectIDs.length; i += batchSize) {
            const batch = objectIDs.slice(i, i + batchSize);
            console.log(`Fetching details for object IDs: ${batch.join(', ')}`);

            const fetchPromises = batch.map(objectID => fetch(`${baseUrl}/objects/${objectID}`).then(res => res.json()));
            const objectsDataBatch = await Promise.all(fetchPromises);

            objectsDataBatch.forEach(objectData => {
                if (objectData.culture) {
                    console.log(`Found culture: ${objectData.culture}`);
                    cultures.add(objectData.culture);
                } else {
                    console.log(`No culture found for object ID: ${objectData.objectID}`);
                }
            });
        }

        const uniqueCultures = Array.from(cultures);
        console.log('All cultures fetched successfully.');
        console.log('Writing cultures to file...');

        fs.writeFileSync('unique_cultures.json', JSON.stringify(uniqueCultures, null, 2));
        console.log('Cultures written to unique_cultures.json');
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

// Example usage
getAllCulturesAndWriteToFile();
