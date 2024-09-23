'use client'

import { useState } from 'react';
import mediumsData from '../../data/categories/mediums.json';
import culturesData from '../../data/categories/cultures.json'
import centuriesData from '../../data/categories/centuries.json'
import { fetchHarvardData } from '../../API/harvardAPI';

export default function FilterSection() {
  const [medium, setMedium] = useState('');
  const [date, setDate] = useState('');
  const [culture, setCulture] = useState('');

  console.log(date, 'date', medium, 'medium', culture, 'culture');
  

  const handleCreateExhibition = async () => {
    console.log(`Creating exhibition with Medium ID: ${mediumId}, Century ID: ${centuryId}, Culture ID: ${cultureId}`);
    
    const data = await fetchHarvardData(mediumId, centuryId, cultureId);
    
    if (data.length > 0) {
      console.log('Exhibition data:', data);
      // Do something with the data
    }
  };
  return (
    <section className="flex flex-col items-center py-10">
      <div className="space-y-4">
        {/* Medium Dropdown */}
        <select
          className="p-2 border"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
        >
          <option value="">Select Medium</option>
          {mediumsData.map((item) => (
            <option key={item.mediumid} value={item.mediumid}>
              {item.medium}
            </option>
          ))}
        </select>

        {/* Century Dropdown */}
        <select
          className="p-2 border"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="">Select Century</option>
          {centuriesData.map((item) => (
            <option key={item.centuryId} value={item.centuryId}>
              {item.century}
            </option>
          ))}
        </select>

        {/* Culture Dropdown */}
        <select
          className="p-2 border"
          value={culture}
          onChange={(e) => setCulture(e.target.value)}
        >
          <option value="">Select Culture</option>
          {culturesData.map((item) => (
            <option key={item.cultureId} value={item.cultureId}>
              {item.culture}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCreateExhibition}
        className="mt-6 px-6 py-3 bg-foreground text-white font-bold rounded-full"
      >
        Create Your Own Exhibition
      </button>
    </section>
  );
}
