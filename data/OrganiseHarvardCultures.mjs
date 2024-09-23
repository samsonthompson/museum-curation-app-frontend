import harvardCultures from '../harvardCultures.json' assert { type: 'json' };
import { writeFile } from 'fs';

function extractCultures({ records }) {
  return records.map(({ name, id }) => ({
    culture: name,
    cultureId: id,
  }));
}

const culturesArray = extractCultures(harvardCultures);

// Convert the array to a JSON string
const jsonData = JSON.stringify(culturesArray, null, 2);

// Write the data to a file
writeFile('cultures.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('Cultures data has been written to cultures.json');
  }
});
