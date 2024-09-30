import fs from 'fs/promises';
import path from 'path';

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
      return [];
    }
  } catch (error) {
    return [];
  }
}

async function getEntriesByCulture(culture, start = 0, rows = 10) {
  try {
    const url = `${SMITHSONIAN_BASE_URL}/search?api_key=${SMITHSONIAN_API_KEY}&q=culture:"${encodeURIComponent(culture)}"&start=${start}&rows=${rows}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.response) {
      if (Array.isArray(data.response.rows)) {
        return data;
      }
    }

    return data;
  } catch (error) {
    return null;
  }
}

async function fetchSampleData(culture = 'American', rows = 10) {
  try {
    const category = 'art_design';
    const url = `${SMITHSONIAN_BASE_URL}/category/${category}/search?api_key=${SMITHSONIAN_API_KEY}&q=culture:"${encodeURIComponent(culture)}"&rows=${rows}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

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
        imageUrls.forEach(url => {});
      }
    });
  } catch (error) {}
}

logImageUrlsByCulture('American', 0, 10);

module.exports = { fetchArtworksByCulture, extractImageUrls, logImageUrlsByCulture };

(async () => {
  try {
    const allCultures = await getAllCultures();
    
    if (allCultures.length > 0) {
      const culturesFilePath = path.join(process.cwd(), 'data', 'Smithsonian', 'cultures_art_design.json');
      await fs.writeFile(culturesFilePath, JSON.stringify(allCultures, null, 2));
      
      const testCulture = allCultures[0];
      const entriesData = await getEntriesByCulture(testCulture, 0, 20);
      
      if (entriesData && entriesData.response && entriesData.response.rows) {
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
        
        const entriesFilePath = path.join(process.cwd(), 'data', 'Smithsonian', 'data_art_design.json');
        await fs.writeFile(entriesFilePath, JSON.stringify(entriesData, null, 2));
      }
    }
  } catch (error) {}
})();

export { getAllCultures, getEntriesByCulture, fetchSampleData };

