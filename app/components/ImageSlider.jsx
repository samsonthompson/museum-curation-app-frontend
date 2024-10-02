'use client'

import React from 'react';
import Image from 'next/image';

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
  </svg>
);

const ImageSlider = ({ items, onSlideChange, currentIndex }) => {
  const nextSlide = () => {
    onSlideChange((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    onSlideChange((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 duration-700 ease-in-out ${index === currentIndex ? '' : 'hidden'}`}
            data-carousel-item={index === currentIndex ? 'active' : ''}
          >
            {item.imageUrl ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Image
                  src={item.imageUrl}
                  layout="fill"
                  objectFit="contain"
                  alt={item.title}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <p className="text-sm text-offWhite">No image available</p>
                  <p className="text-sm text-offWhite">
                    Check if an image is available at the{' '}
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="underline text-darkGray hover:text-highlight"
                    >
                      source
                    </a>.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Entry count */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {currentIndex + 1}/{items.length}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 left-2 z-30 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="absolute top-1/2 -translate-y-1/2 right-2 z-30 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
