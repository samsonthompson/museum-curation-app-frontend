import harvardCultures from '../harvardCultures.json' assert { type: 'json' };
import { writeFile } from 'fs';

function extractCultures({ records }) {
  return records.map(({ name, id }) => ({
    culture: name,
    cultureId: id,
  }));
}

const culturesArray = extractCultures(harvardCultures);

const jsonData = JSON.stringify(culturesArray, null, 2);

writeFile('cultures.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  }
});
