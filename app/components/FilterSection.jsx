'use client'

import { useState } from 'react';
export default function FilterSection() {
  const [medium, setMedium] = useState('');
  const [date, setDate] = useState('');
  const [culture, setCulture] = useState('');

  const handleCreateExhibition = () => {
    console.log(`Creating exhibition with ${medium}, ${date}, ${culture}`);
    // need to add logic to handle creating exhibition
  };

  return (
    <section className="flex flex-col items-center py-10">
      <div className="space-y-4">
        <select
          className="p-2 border"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
        >
          <option value="">Select Medium</option>
          <option value="Painting">Painting</option>
          <option value="Sculpture">Sculpture</option>
          {/* we can add more optons if we want to add an asdvanced search section */}
        </select>

        <select
          className="p-2 border"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="">Select Date</option>
          <option value="2020">2020</option>
          <option value="2010">2010</option>
          {/* Add more options */}
        </select>

        <select
          className="p-2 border"
          value={culture}
          onChange={(e) => setCulture(e.target.value)}
        >
          <option value="">Select Culture</option>
          <option value="Byzantine">Byzantine</option>
          <option value="Roman">Roman</option>
          {/* Add more options */}
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