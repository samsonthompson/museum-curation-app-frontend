import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const SMITHSONIAN_API_KEY = 'ofdsWrbe8RkXQjS3bByHEZCDATuSAoOOl7B3jOLB';
const SMITHSONIAN_BASE_URL = 'https://api.si.edu/openaccess/api/v1.0';

async function getAllCultures() {
  try {
    const url = `${SMITHSONIAN_BASE_URL}/terms/culture?api_key=${SMITHSONIAN_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response && Array.isArray(data.response.terms)) {
      return data.response.terms;
    } else {
      console.error('Unexpected response structure:', JSON.stringify(data, null, 2).substring(0, 500));
      return [];
    }
  } catch (error) {
    console.error('Error fetching Smithsonian cultures:', error);
    return [];
  }
}

async function getEntriesByCulture(culture, start = 0, rows = 10) {
  try {
    const url = `${SMITHSONIAN_BASE_URL}/search?api_key=${SMITHSONIAN_API_KEY}&q=culture:"${encodeURIComponent(culture)}"&start=${start}&rows=${rows}`;

    console.log(`[getEntriesByCulture] Fetching data from URL: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('[getEntriesByCulture] Response status:', data.status);
    console.log('[getEntriesByCulture] Response code:', data.responseCode);
    
    if (data.response) {
      console.log('[getEntriesByCulture] Total entries:', data.response.rowCount);
      console.log('[getEntriesByCulture] Response message:', data.response.message);
      
      if (Array.isArray(data.response.rows)) {
        console.log('\n[getEntriesByCulture] Summary of fetched entries:');
        data.response.rows.forEach((entry, index) => {
          console.log(`\nEntry ${index + 1}:`);
          console.log(`Title: ${entry.title}`);
          console.log(`Type: ${entry.type}`);
          console.log(`Unit Code: ${entry.unitCode}`);
          
          if (entry.content) {
            const content = entry.content;
            if (content.freetext) {
              console.log('Freetext information:');
              if (content.freetext.date) {
                console.log(`  Date: ${content.freetext.date[0]?.content}`);
              }
              if (content.freetext.place) {
                console.log(`  Place: ${content.freetext.place[0]?.content}`);
              }
              if (content.freetext.notes) {
                console.log(`  Notes: ${content.freetext.notes[0]?.content}`);
              }
            }
            if (content.indexedStructured) {
              console.log('Indexed Structured information:');
              if (content.indexedStructured.date) {
                console.log(`  Date: ${content.indexedStructured.date.join(', ')}`);
              }
              if (content.indexedStructured.object_type) {
                console.log(`  Object Type: ${content.indexedStructured.object_type.join(', ')}`);
              }
            }

            // Add logging for image information
            if (content.descriptiveNonRepeating && content.descriptiveNonRepeating.online_media) {
              const media = content.descriptiveNonRepeating.online_media;
              console.log('Image information:');
              if (Array.isArray(media.mediaCount)) {
                console.log(`  Number of media items: ${media.mediaCount[0]}`);
              }
              if (Array.isArray(media.media)) {
                media.media.forEach((item, mediaIndex) => {
                  console.log(`  Media ${mediaIndex + 1}:`);
                  console.log(`    Type: ${item.type}`);
                  console.log(`    URL: ${item.content}`);
                });
              }
            } else {
              console.log('No image information available');
            }
          }
        });
      } else {
        console.log('[getEntriesByCulture] Unexpected structure for response.rows:', typeof data.response.rows);
      }
    } else {
      console.log('[getEntriesByCulture] No response object in the data');
    }

    return data;
  } catch (error) {
    console.error('[getEntriesByCulture] Error fetching entries:', error);
    return null;
  }
}

async function fetchSampleData(culture = 'American', rows = 10) {
  try {
    const category = 'art_design';
    const url = `${SMITHSONIAN_BASE_URL}/category/${category}/search?api_key=${SMITHSONIAN_API_KEY}&q=culture:"${encodeURIComponent(culture)}"&rows=${rows}`;

    console.log(`[fetchSampleData] Fetching data from URL: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[fetchSampleData] Error fetching sample data:', error);
    return null;
  }
}

// smithsonianAPI.js

const SMITHSONIAN_API_BASE = 'https://api.si.edu/openaccess/api/v1.0';
const API_KEY = 'your_api_key_here';

async function fetchArtworksByCulture(culture, start = 0, rows = 10) {
  const url = `${SMITHSONIAN_API_BASE}/search?q=culture:"${encodeURIComponent(culture)}"&start=${start}&rows=${rows}&api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.response.rows;
}

function extractImageUrls(item) {
  const media = item.content?.descriptiveNonRepeating?.online_media?.media || [];
  return media.filter(m => m.type === 'Images').map(m => m.content);
}

async function logImageUrlsByCulture(culture, start = 0, rows = 10) {
  try {
    const artworks = await fetchArtworksByCulture(culture, start, rows);
    artworks.forEach(artwork => {
      const imageUrls = extractImageUrls(artwork);
      if (imageUrls.length > 0) {
        console.log(`Title: ${artwork.title}`);
        imageUrls.forEach(url => console.log(`Image URL: ${url}`));
      } else {
        console.log(`Title: ${artwork.title} - No images found`);
      }
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

// Example usage
logImageUrlsByCulture('American', 0, 10);

module.exports = { fetchArtworksByCulture, extractImageUrls, logImageUrlsByCulture };

// Main execution
(async () => {
  try {
    console.log('[Test] Fetching all cultures');
    const allCultures = await getAllCultures();
    
    if (allCultures.length > 0) {
      console.log(`\n[Test] Total cultures: ${allCultures.length}`);
      
      // Save cultures to file for inspection
      const culturesFilePath = path.join(process.cwd(), 'data', 'Smithsonian', 'cultures_art_design.json');
      await fs.writeFile(culturesFilePath, JSON.stringify(allCultures, null, 2));
      console.log(`\n[Test] Full list of cultures saved to ${culturesFilePath}`);
      
      // Test getEntriesByCulture with the first culture
      const testCulture = allCultures[0];
      console.log(`\n[Test] Fetching entries for culture: ${testCulture}`);
      const entriesData = await getEntriesByCulture(testCulture, 0, 20);
      
      if (entriesData && entriesData.response && entriesData.response.rows) {
        console.log('\n[Test] Successfully fetched entries:');
        console.log(`Total entries: ${entriesData.response.rowCount}`);
        
        // Log some statistics
        const objectTypes = new Set();
        const dates = new Set();
        let totalImages = 0;

        entriesData.response.rows.forEach(entry => {
          if (entry.content) {
            if (entry.content.indexedStructured) {
              if (entry.content.indexedStructured.object_type) {
                entry.content.indexedStructured.object_type.forEach(type => objectTypes.add(type));
              }
              if (entry.content.indexedStructured.date) {
                entry.content.indexedStructured.date.forEach(date => dates.add(date));
              }
            }
            if (entry.content.descriptiveNonRepeating && entry.content.descriptiveNonRepeating.online_media) {
              const media = entry.content.descriptiveNonRepeating.online_media;
              if (Array.isArray(media.mediaCount)) {
                totalImages += parseInt(media.mediaCount[0], 10);
              }
            }
          }
        });
        
        console.log('\nObject Types found:');
        console.log(Array.from(objectTypes).join(', '));
        
        console.log('\nDates found:');
        console.log(Array.from(dates).join(', '));

        console.log(`\nTotal number of images across all entries: ${totalImages}`);

        // Save entries data to file
        const entriesFilePath = path.join(process.cwd(), 'data', 'Smithsonian', 'data_art_design.json');
        await fs.writeFile(entriesFilePath, JSON.stringify(entriesData, null, 2));
        console.log(`\n[Test] Full response saved to ${entriesFilePath}`);
      } else {
        console.log('[Test] No entries found or unexpected data structure.');
      }
    } else {
      console.log('[Test] No cultures found.');
    }
  } catch (error) {
    console.error('[Test] An error occurred:', error);
  }
})();

export { getAllCultures, getEntriesByCulture, fetchSampleData };

