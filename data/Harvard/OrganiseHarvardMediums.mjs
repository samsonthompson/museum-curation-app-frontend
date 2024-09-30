import harvardMediums from '../harvardMediums.json' assert { type: 'json' };
import { writeFile } from 'fs';

function extractMediums(data) {
  return data.map(item => {
    return {
      medium: item.name,
      mediumId: item.mediumid
    };
  });
}

const mediumsArray = extractMediums(harvardMediums);

const jsonData = JSON.stringify(mediumsArray, null, 2);

writeFile('mediums.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  }
});
