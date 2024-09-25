'use client'

import { useState, useEffect } from 'react';
import mediumsData from '../../data/categories/mediums.json';
import { fetchUniqueCulturesByMedium } from '../../API/harvardAPI.mjs';

export default function FilterSection({ onCreateExhibition }) {
  const [mediumId, setMediumId] = useState('');
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState('');
  const [isCultureDropdownDisabled, setIsCultureDropdownDisabled] = useState(true);

  useEffect(() => {
    if (mediumId) {
      fetchUniqueCulturesByMedium(mediumId).then((uniqueCultures) => {
        setCultures(uniqueCultures);
        setSelectedCulture('');
        setIsCultureDropdownDisabled(false);
      });
    } else {
      setCultures([]);
      setSelectedCulture('');
      setIsCultureDropdownDisabled(true);
    }
  }, [mediumId]);

  const handleCreateExhibition = () => {
    if (mediumId && selectedCulture) {
      onCreateExhibition(mediumId, selectedCulture);
    } else {
      console.log('Please select a medium and a culture before creating an exhibition.');
    }
  };

  return (
    <section className="flex flex-col items-center py-10">
      <div className="space-y-4">
        {/* Medium Dropdown */}
        <select
          className="p-2 border"
          value={mediumId}
          onChange={(e) => {
            setMediumId(e.target.value);
            console.log(`Selected Medium ID: ${e.target.value}`);
          }}
        >
          <option value="">Select Medium</option>
          {mediumsData.map((item) => (
            <option key={item.mediumId} value={item.mediumId}>
              {item.medium}
            </option>
          ))}
        </select>

        {/* Culture Dropdown */}
        <select
          className="p-2 border"
          value={selectedCulture}
          onChange={(e) => {
            setSelectedCulture(e.target.value);
            console.log(`Selected Culture: ${e.target.value}`);
          }}
          disabled={isCultureDropdownDisabled}
        >
          <option value="">Select Culture</option>
          {cultures.map((culture, index) => (
            <option key={index} value={culture}>
              {culture}
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
