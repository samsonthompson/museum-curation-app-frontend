'use client'

import { useState } from 'react';
import mediumsData from '../../data/categories/mediums.json';
import { fetchHarvardObjectsByMedium } from '../../API/harvardAPI.mjs';

export default function FilterSection() {
  const [mediumId, setMediumId] = useState('');

  const handleCreateExhibition = async () => {
    console.log(`Fetching data for Medium ID: ${mediumId}`);
    
    const data = await fetchHarvardObjectsByMedium(mediumId);
    
    if (data.length > 0) {
      console.log('Exhibition data:', data);
    } else {
      console.log('No data found.');
    }
  };

  return (
    <section className="flex flex-col items-center py-10">
      <div className="space-y-4">
        {/* Medium Dropdown */}
        <select
          className="p-2 border"
          value={mediumId}
          onChange={(e) => setMediumId(e.target.value)}
        >
          <option value="">Select Medium</option>
          {mediumsData.map((item) => (
            <option key={item.mediumId} value={item.mediumId}>
              {item.medium}
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
