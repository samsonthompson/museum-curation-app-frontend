import dotenv from 'dotenv';

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

// Function to fetch all objects by medium and return a list of unique cultures
export const fetchUniqueCulturesByMedium = async (mediumId) => {
    let uniqueCultures = new Set();
    let page = 1;
    const pageSize = 100;

    try {
        while (true) {
            const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&medium=${mediumId}&size=${pageSize}&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.records && data.records.length > 0) {
                data.records.forEach(record => {
                    if (record.culture) {
                        uniqueCultures.add(record.culture);
                    }
                });
                console.log(`Fetched ${data.records.length} records on page ${page}`);
                page++;
            } else {
                console.log(`No more records found after page ${page - 1}`);
                break;
            }
        }

        const uniqueCulturesArray = Array.from(uniqueCultures);
        console.log('Unique cultures:', uniqueCulturesArray);
        return uniqueCulturesArray;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

// Test the API key when this module is imported
testHarvardApiKey().catch(error => {
    console.error('Error during API key test:', error);
});

// Only run fetchUniqueCulturesByMedium if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const mediumId = '2028206'; // Example medium ID
    fetchUniqueCulturesByMedium(mediumId).then(cultures => {
        console.log('Unique cultures:', cultures);
    }).catch(error => {
        console.error('Error during fetchUniqueCulturesByMedium:', error);
    });
}
