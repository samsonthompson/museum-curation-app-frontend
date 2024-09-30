   'use client'

   import React, { useState, useEffect } from 'react';
   import { useRouter } from 'next/navigation';
   import harvardCulturesData from '../../data/Harvard/cultures.json';  
   import clevelandCulturesData from '../../data/Cleveland/cultures.json';

   export default function FilterSection() {
     const [selectedCollection, setSelectedCollection] = useState('');
     const [selectedCulture, setSelectedCulture] = useState('');
     const [cultures, setCultures] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     useEffect(() => {
       if (selectedCollection === 'harvard') {
         setCultures(harvardCulturesData);
       } else if (selectedCollection === 'cleveland') {
         setCultures(clevelandCulturesData);
       } else {
         setCultures([]);
       }
       setSelectedCulture('');
     }, [selectedCollection]);

     const handleCollectionChange = (e) => {
       setSelectedCollection(e.target.value);
     };

     const handleCultureChange = (e) => {
       setSelectedCulture(e.target.value);
     };

     const handleCreateExhibition = async () => {
       if (selectedCulture) {
         const selectedCultureData = cultures.find(c => 
           typeof c === 'object' ? c.culture === selectedCulture : c === selectedCulture
         );
         const cultureId = selectedCollection === 'harvard' ? selectedCultureData.cultureId : null;
         setIsLoading(true);
         router.push(`/exhibition?collection=${selectedCollection}&culture=${encodeURIComponent(selectedCulture)}${cultureId ? `&cultureId=${cultureId}` : ''}`);
       } else {
         alert('Please select a culture first');
       }
     };

     return (
       <section className="bg-offWhite py-10 px-4">
         <div className="container mx-auto max-w-2xl">
           <h2 className="text-3xl font-serif font-bold text-foreground mb-6 text-center">
             Create Your Exhibition
           </h2>
           <div className="flex space-x-4 mb-4">
             <div className="w-1/2">
               <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                 Select Collection
               </label>
               <select
                 id="collection"
                 value={selectedCollection}
                 onChange={handleCollectionChange}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
               >
                 <option value="">Select a collection</option>
                 <option value="harvard">Harvard Art Museum</option>
                 <option value="cleveland">The Cleveland Museum of Art</option>
               </select>
             </div>

             <div className="w-1/2">
               <label htmlFor="culture" className="block text-sm font-medium text-gray-700">
                 Select Culture
               </label>
               <select
                 id="culture"
                 value={selectedCulture}
                 onChange={handleCultureChange}
                 disabled={!selectedCollection}
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
               >
                 <option value="">Select a culture</option>
                 {cultures.map((culture, index) => (
                   <option key={index} value={typeof culture === 'object' ? culture.culture : culture}>
                     {typeof culture === 'object' ? culture.culture : culture}
                   </option>
                 ))}
               </select>
             </div>
           </div>

           <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
             <button 
               onClick={handleCreateExhibition} 
               disabled={!selectedCulture || isLoading}
               className={`w-full sm:w-auto bg-highlight text-background font-semibold px-6 py-2 rounded 
                 ${!selectedCulture || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80'} 
                 transition-colors`}
             >
               {isLoading ? 'Creating...' : 'CREATE YOUR EXHIBITION'}
             </button>
           </div>
         </div>
       </section>
     );
   }