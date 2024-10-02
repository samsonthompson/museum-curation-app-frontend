'use client';

import { useState, useEffect } from 'react';
import { useCollection } from '../contexts/collectionContext';
import Link from 'next/link';
import Image from 'next/image';

export default function MyCollection() {
  const { collection, removeFromCollection } = useCollection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uniqueMediums, setUniqueMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState('');

  useEffect(() => {
    if (collection && collection.length > 0) {
      const mediums = [...new Set(collection.map(item => item.medium).filter(Boolean))];
      setUniqueMediums(mediums);
    }
  }, [collection]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const filteredItems = selectedMedium 
    ? collection.filter(item => item.medium === selectedMedium) 
    : collection;

  if (collection.length === 0) {
    return (
      <main className="bg-offWhite min-h-screen flex items-center justify-center">
        <p className="text-center text-softGray">
          Your collection is empty. Start adding items after searching our
          <Link href="/" className="text-highlight hover:underline ml-1">
             collections
          </Link>.
        </p>
      </main>
    );
  }

  const currentItem = filteredItems[currentIndex];

  return (
    <main className="bg-offWhite min-h-screen">
      <section className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-8 text-center">
          My Collection
        </h1>
        
        {/* Carousel Section */}
        <div className="carousel bg-background text-foreground shadow-lg rounded-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevSlide} className="bg-highlight text-background px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Previous</button>
            <button 
              onClick={() => removeFromCollection(currentItem.id)}
              className="bg-red-500 text-background px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
            >
              ❤️ Remove from Collection
            </button>
            <span className="font-semibold">Entry {currentIndex + 1} of {filteredItems.length}</span>
            <button onClick={nextSlide} className="bg-highlight text-background px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Next</button>
          </div>

          <h2 className="text-2xl font-serif font-bold mb-4 text-center">{currentItem.title || 'Untitled'}</h2>
          {currentItem.imageUrl && (
            <Image 
              src={currentItem.imageUrl} 
              layout="fill" 
              objectFit="contain" 
              alt={currentItem.title || 'Artwork'} 
              className="max-w-full h-auto mx-auto mb-4 rounded shadow-md" 
            />
          )}
          <p className="mb-2">{currentItem.description || 'No description available'}</p>
          <p className="font-semibold">Medium: {currentItem.medium || 'Unknown'}</p>
          <p>Date: {currentItem.date || 'Unknown'}</p>
          <p>Dimensions: {currentItem.dimensions || 'Not specified'}</p>
          <p>Culture: {currentItem.culture || 'Not specified'}</p>
          <a 
            href={currentItem.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-highlight hover:underline"
          >
            View on original website
          </a>
        </div>

        {uniqueMediums.length > 1 && (
          <div className="mb-6">
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
        
        {/* Grid Section */}
        <h3 className="text-2xl font-serif font-bold mt-8 mb-4">All Collection Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-background rounded-lg shadow-md overflow-hidden cursor-pointer ${index === currentIndex ? 'ring-2 ring-highlight' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image 
                src={item.imageUrl} 
                layout="fill" 
                objectFit="contain" 
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-softGray text-sm mb-2">{item.artist || item.culture}</p>
                <p className="text-softGray text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
