import harvardCenturies from '../centuries.json' assert { type: 'json' };
import { writeFile } from 'fs';

function extractCenturies(data) {
  return data.map(({ name, id }) => ({
    century: name,
    centuryId: id,
  }));
}

const centuriesArray = extractCenturies(harvardCenturies);

const jsonData = JSON.stringify(centuriesArray, null, 2);

writeFile('centuries.json', jsonData, (err) => {
  if (err) {
  }
});
