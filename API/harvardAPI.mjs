import { cache } from 'react';

const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = process.env.NEXT_PUBLIC_HARVARD_API_KEY;

export async function fetchObjectsByCulture(cultureId, cultureName) {
  console.log(`[API] Starting fetch for culture: ${cultureId} (${cultureName})`);
  
  try {
    let entries = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&q=culture:${encodeURIComponent(cultureName)}&size=${pageSize}&page=${page}`;
      console.log(`[API] Fetching page ${page} for ${cultureName}`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`[API] HTTP error ${response.status} for ${cultureName}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[API] Received ${data.records.length} records for ${cultureName} (page ${page})`);

      if (data.records && data.records.length > 0) {
        entries = entries.concat(data.records);
        console.log(`[API] Total records so far for ${cultureName}: ${entries.length}`);
        
        if (data.info.next === null) {
          console.log(`[API] Reached last page for ${cultureName}`);
          break;
        }
        page++;
      } else {
        console.log(`[API] No more records for ${cultureName}`);
        break;
      }
    }

    console.log(`[API] Completed fetch for ${cultureName}. Total records: ${entries.length}`);
    return entries;
  } catch (error) {
    console.error(`[API] Error fetching data for ${cultureName}:`, error);
    throw error;
  }
}