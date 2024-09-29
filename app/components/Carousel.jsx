'use client'

import { useState, useEffect } from 'react';

export default function Carousel({ items, culture }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uniqueMediums, setUniqueMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState('');

  useEffect(() => {
    if (items && items.length > 0) {
      console.log('[Carousel] Items received:', items);
      const mediums = [...new Set(items.map(item => item.medium).filter(Boolean))];
      setUniqueMediums(mediums);
    }
  }, [items]);

  useEffect(() => {
    console.log('[Carousel] Culture received:', culture);
  }, [culture]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const filteredItems = selectedMedium 
    ? items.filter(item => item.medium === selectedMedium) 
    : items;

  if (!filteredItems || filteredItems.length === 0) {
    return <div className="text-center py-10">No items to display</div>;
  }

  const currentItem = filteredItems[currentIndex];

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-6 text-center">{culture.culture} entries from the Harvard Art collection</h1>
        
        <div className="carousel bg-offWhite shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevSlide} className="bg-highlight text-background px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Previous</button>
            <span className="font-semibold">Entry {currentIndex + 1} of {filteredItems.length}</span>
            <button onClick={nextSlide} className="bg-highlight text-background px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Next</button>
          </div>

          <h2 className="text-2xl font-serif font-bold mb-4 text-center">{currentItem.title || 'Untitled'}</h2>
          {currentItem.primaryimageurl && (
            <img 
              src={currentItem.primaryimageurl} 
              alt={currentItem.title || 'Artwork'} 
              className="max-w-full h-auto mx-auto mb-4 rounded shadow-md" 
            />
          )}
          <p className="mb-2">{currentItem.description || 'No description available'}</p>
          <p className="font-semibold">Medium: {currentItem.medium || 'Unknown'}</p>
        </div>

        {uniqueMediums.length > 1 && (
          <div className="mb-6 mt-6">
            <label htmlFor="mediumFilter" className="mr-2 font-semibold">Filter by Medium:</label>
            <select 
              id="mediumFilter" 
              value={selectedMedium} 
              onChange={(e) => {
                setSelectedMedium(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-background border border-softGray rounded px-2 py-1"
            >
              <option value="">All</option>
              {uniqueMediums.map((medium, index) => (
                <option key={index} value={medium}>{medium}</option>
              ))}
            </select>
          </div>
        )}

        <h3 className="text-2xl font-serif font-bold mt-8 mb-4">From this collection</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <li 
              key={index} 
              onClick={() => setCurrentIndex(index)} 
              className={`cursor-pointer p-2 rounded ${index === currentIndex ? 'bg-highlight text-background' : 'bg-offWhite hover:bg-highlight hover:text-background'} transition-colors`}
            >
              {item.title || `Item ${index + 1}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}