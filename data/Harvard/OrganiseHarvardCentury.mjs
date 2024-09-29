import harvardCenturies from '../centuries.json' assert { type: 'json' };
import { writeFile } from 'fs';

function extractCenturies(data) {
  return data.map(({ name, id }) => ({
    century: name,
    centuryId: id,
  }));
}

const centuriesArray = extractCenturies(harvardCenturies);

// Convert the array to a JSON string
const jsonData = JSON.stringify(centuriesArray, null, 2);

// Write to file
writeFile('centuries.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('Centuries data has been written to centuries.json');
  }
});
