'use client'

import { useState } from 'react';

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Check if items is undefined or empty
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  const currentItem = items[currentIndex];

  return (
    <div className="carousel">
      {currentItem.image && <img src={currentItem.image} alt={currentItem.title || 'Artwork'} />}
      <h2>{currentItem.title || 'Untitled'}</h2>
      <p>{currentItem.description || 'No description available'}</p>
      <button onClick={prevSlide}>Previous</button>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
}
