import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'

export default function Page() {
  const [isCarouselLoaded, setIsCarouselLoaded] = useState(false);

  useEffect(() => {
    setIsCarouselLoaded(true);
  }, []);

  return (
    <div>
      <h1>Exhibition</h1>
      {isCarouselLoaded ? (
        <div>
          <Carousel />
          <p>Carousel loaded successfully!</p>
        </div>
      ) : (
        <div>
          <p>Loading carousel...</p>
          <p>Please wait while the carousel is being loaded.</p>
        </div>
      )}
    </div>
  )
}
