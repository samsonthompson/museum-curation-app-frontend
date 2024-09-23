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

// Convert the array to a JSON string
const jsonData = JSON.stringify(mediumsArray, null, 2);

// Write the data to a file
writeFile('mediums.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('Mediums data has been written to mediums.json');
  }
});
