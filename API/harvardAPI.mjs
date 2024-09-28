import NodeCache from 'node-cache';

const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = process.env.NEXT_PUBLIC_HARVARD_API_KEY;
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export async function fetchObjectsByMaterial(mediumId) {
    console.log(`[API] Fetching objects for medium: ${mediumId}`);
    const cacheKey = `material-${mediumId}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log(`[API] Cache HIT for ${mediumId}. Returning ${cachedData.length} cached entries.`);
        return cachedData;
    }

    console.log(`[API] Cache MISS for ${mediumId}. Fetching fresh data.`);
    let entries = [];
    let page = 1;
    const pageSize = 100;

    try {
        while (true) {
            const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&medium=${mediumId}&size=${pageSize}&page=${page}`;
            console.log(`[API] Fetching page ${page} for ${mediumId}`);
            const response = await fetch(url);
            
            if (response.status === 401) {
                console.error('[API] Unauthorized: Invalid API key');
                throw new Error('Unauthorized: Invalid API key');
            }

            const data = await response.json();

            if (data.records && data.records.length > 0) {
                entries = entries.concat(data.records);
                console.log(`[API] Fetched ${data.records.length} records on page ${page} for ${mediumId}`);
                page++;
                
                // Check if we've reached the last page
                if (data.info.next === null || data.records.length < pageSize) {
                    console.log(`[API] Reached last page for ${mediumId}`);
                    break;
                }
            } else {
                console.log(`[API] No more records found after page ${page - 1} for ${mediumId}`);
                break;
            }
        }

        console.log(`[API] Total entries fetched for ${mediumId}: ${entries.length}`);
        console.log(`[API] Caching ${entries.length} entries for ${mediumId}`);
        cache.set(cacheKey, entries);
        return entries;
    } catch (error) {
        console.error(`[API] Error fetching data for ${mediumId}:`, error);
        throw error;
    }
}

// Add a function to check cache status
export function checkCacheStatus(mediumId) {
    const cacheKey = `material-${mediumId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log(`[API] Cache contains ${cachedData.length} entries for ${mediumId}`);
        return true;
    } else {
        console.log(`[API] No cache found for ${mediumId}`);
        return false;
    }
}

// Optional: Test the API key when this module is imported
export const testHarvardApiKey = async () => {
    try {
        const response = await fetch(`${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&size=1`);
        if (response.ok) {
            console.log('Harvard API key is valid and working.');
            return true;
        } else {
            console.error('Harvard API key is invalid or there was an error.');
            return false;
        }
    } catch (error) {
        console.error('Error testing Harvard API key:', error);
        return false;
    }
};

// Uncomment to test the API key when this module is imported
// testHarvardApiKey().catch(error => {
//     console.error('Error during API key test:', error);
// });
