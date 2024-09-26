'use client'

import { useState, useEffect } from 'react';
import mediumsData from '../../data/categories/mediums.json';
import { fetchUniqueCulturesAndCenturiesByMedium, fetchEntriesByMediumCultureCentury } from '../../API/harvardAPI.mjs';

export default function FilterSection({ onCreateExhibition }) {
  const [mediumId, setMediumId] = useState('');
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState('');
  const [centuries, setCenturies] = useState([]);
  const [selectedCentury, setSelectedCentury] = useState('');
  const [isCultureDropdownDisabled, setIsCultureDropdownDisabled] = useState(true);
  const [isCenturyDropdownDisabled, setIsCenturyDropdownDisabled] = useState(true);
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);

  useEffect(() => {
    if (mediumId) {
      console.log(`Fetching unique cultures and centuries for Medium ID: ${mediumId}`);
      fetchUniqueCulturesAndCenturiesByMedium(mediumId).then(({ uniqueCultures, uniqueCenturies }) => {
        console.log(`Fetched unique cultures: ${uniqueCultures}`);
        console.log(`Fetched unique centuries: ${uniqueCenturies}`);
        setCultures(uniqueCultures);
        setCenturies(uniqueCenturies);
        setSelectedCulture('');
        setSelectedCentury('');
        setIsCultureDropdownDisabled(false);
        setIsCenturyDropdownDisabled(true);
        setIsCreateButtonDisabled(true);
      });
    } else {
      setCultures([]);
      setCenturies([]);
      setSelectedCulture('');
      setSelectedCentury('');
      setIsCultureDropdownDisabled(true);
      setIsCenturyDropdownDisabled(true);
      setIsCreateButtonDisabled(true);
    }
  }, [mediumId]);

  useEffect(() => {
    if (selectedCulture) {
      setIsCenturyDropdownDisabled(false);
    } else {
      setSelectedCentury('');
      setIsCenturyDropdownDisabled(true);
      setIsCreateButtonDisabled(true);
    }
  }, [selectedCulture]);

  useEffect(() => {
    if (selectedCentury) {
      setIsCreateButtonDisabled(false);
    } else {
      setIsCreateButtonDisabled(true);
    }
  }, [selectedCentury]);

  const handleCreateExhibition = () => {
    if (mediumId && selectedCulture && selectedCentury) {
      console.log(`Creating exhibition with Medium ID: ${mediumId}, Culture: ${selectedCulture}, Century: ${selectedCentury}`);
      fetchEntriesByMediumCultureCentury(mediumId, selectedCulture, selectedCentury).then((entries) => {
        console.log(`Fetched entries: ${entries}`);
        onCreateExhibition(entries);
      });
    } else {
      console.log('Please select a medium, a culture, and a century before creating an exhibition.');
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

        {/* Century Dropdown */}
        <select
          className="p-2 border"
          value={selectedCentury}
          onChange={(e) => {
            setSelectedCentury(e.target.value);
            console.log(`Selected Century: ${e.target.value}`);
          }}
          disabled={isCenturyDropdownDisabled}
        >
          <option value="">Select Century</option>
          {centuries.map((century, index) => (
            <option key={index} value={century}>
              {century}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCreateExhibition}
        className="mt-6 px-6 py-3 bg-foreground text-white font-bold rounded-full"
        disabled={isCreateButtonDisabled}
      >
        Create Your Own Exhibition
      </button>
    </section>
  );
}
