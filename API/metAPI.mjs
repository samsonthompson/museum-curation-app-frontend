import fetch from 'node-fetch';
import fs from 'fs';


async function getAllCulturesAndWriteToFile() {
    const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
    const batchSize = 100; 
    const cultures = new Set();

    try {
        const objectsResponse = await fetch(`${baseUrl}/objects`);
        const objectsData = await objectsResponse.json();
        const objectIDs = objectsData.objectIDs;

        for (let i = 0; i < objectIDs.length; i += batchSize) {
            const batch = objectIDs.slice(i, i + batchSize);

            const fetchPromises = batch.map(objectID => fetch(`${baseUrl}/objects/${objectID}`).then(res => res.json()));
            const objectsDataBatch = await Promise.all(fetchPromises);

            objectsDataBatch.forEach(objectData => {
                if (objectData.culture) {
                    cultures.add(objectData.culture);
                }
            });
        }

        const uniqueCultures = Array.from(cultures);

        fs.writeFileSync('unique_cultures.json', JSON.stringify(uniqueCultures, null, 2));
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}

// Example usage
getAllCulturesAndWriteToFile();
