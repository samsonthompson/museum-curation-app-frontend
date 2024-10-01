   'use client'

   import React, { useState, useEffect } from 'react';
   import { useRouter } from 'next/navigation';
   import harvardCulturesData from '../../data/Harvard/cultures.json';  
   import clevelandCulturesData from '../../data/Cleveland/cultures.json';
   import FilterDropdown from './FilterDropdown';

   const collectionNames = {
     harvard: 'Harvard Art Museums',
     cleveland: 'Cleveland Museum of Art'
   };

   export default function FilterSection() {
     const [selectedCollection, setSelectedCollection] = useState('');
     const [selectedCulture, setSelectedCulture] = useState('');
     const [cultures, setCultures] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     useEffect(() => {
       console.log('useEffect triggered. selectedCollection:', selectedCollection);
       if (selectedCollection === 'harvard') {
         console.log('Setting Harvard cultures:', harvardCulturesData);
         setCultures(harvardCulturesData);
       } else if (selectedCollection === 'cleveland') {
         console.log('Setting Cleveland cultures:', clevelandCulturesData);
         setCultures(clevelandCulturesData);
       } else {
         console.log('Clearing cultures');
         setCultures([]);
       }
       setSelectedCulture('');
     }, [selectedCollection]);

     const handleCollectionSelect = (option) => {
       console.log('Collection selected:', option);
       setSelectedCollection(option);
     };

     const handleCultureSelect = (option) => {
       console.log('Culture selected:', option);
       const culture = typeof option === 'object' ? option.culture : option;
       console.log('Parsed culture:', culture);
       setSelectedCulture(culture);
     };

     const handleExploreThisCulture = async () => {
       console.log('Create exhibition clicked. selectedCulture:', selectedCulture);
       if (selectedCulture) {
         const selectedCultureData = cultures.find(c => 
           typeof c === 'object' ? c.culture === selectedCulture : c === selectedCulture
         );
         console.log('Selected culture data:', selectedCultureData);
         const cultureId = selectedCollection === 'harvard' ? selectedCultureData.cultureId : null;
         console.log('Culture ID:', cultureId);
         setIsLoading(true);
         const url = `/exhibition?collection=${selectedCollection}&culture=${encodeURIComponent(selectedCulture)}${cultureId ? `&cultureId=${cultureId}` : ''}`;
         console.log('Navigating to:', url);
         router.push(url);
       } else {
         console.log('No culture selected, showing alert');
         alert('Please select a culture first');
       }
     };

     console.log('Rendering FilterSection. State:', { selectedCollection, selectedCulture, cultures, isLoading });

     return (
       <section className="bg-offWhite py-10 px-4">
         <div className="container mx-auto max-w-2xl">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
             Explore Our Collections
           </h2>
           <div className="flex space-x-4 mb-4">
             <div className="w-1/2">
               <FilterDropdown 
                 title={selectedCollection ? collectionNames[selectedCollection] : "Select Collection"}
                 options={[
                   { value: 'harvard', label: 'Harvard Art Museums' },
                   { value: 'cleveland', label: 'Cleveland Museum of Art' }
                 ]}
                 onSelect={handleCollectionSelect}
               />
             </div>

             <div className="w-1/2">
               <FilterDropdown 
                 title={selectedCulture || "Select Culture"}
                 options={cultures.map(c => {
                   
                   return typeof c === 'object' ? c.culture : c;
                 })}
                 onSelect={handleCultureSelect}
                 disabled={!selectedCollection}
               />
             </div>
           </div>

           <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
             <button 
               onClick={handleExploreThisCulture} 
               disabled={!selectedCulture || isLoading}
               className={`w-full sm:w-auto bg-highlight text-background font-semibold px-6 py-2 rounded 
                 ${!selectedCulture || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'} 
                 transition-colors`}
             >
               {isLoading ? 'Creating...' : 'Explore This Culture'}
             </button>
           </div>
         </div>
       </section>
     );
   }