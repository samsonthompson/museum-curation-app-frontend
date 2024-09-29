   // app/components/FilterSection.jsx
   'use client'

   import { useState } from 'react';
   import { useRouter } from 'next/navigation';
   import culturesData from '../../data/Harvard/cultures.json';

   export default function FilterSection() {
     const [selectedCulture, setSelectedCulture] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     const handleCultureChange = (e) => {
       const cultureId = e.target.value;
       const selectedCultureObject = culturesData.find(c => c.cultureId.toString() === cultureId);
       console.log(`[FilterSection] Selected culture:`, selectedCultureObject);
       setSelectedCulture(cultureId);
     };

     const handleCreateExhibition = async () => {
       if (selectedCulture) {
         const selectedCultureObject = culturesData.find(c => c.cultureId.toString() === selectedCulture);
         console.log(`[FilterSection] Sending to exhibition page:`, {
           id: selectedCulture,
           culture: selectedCultureObject.culture
         });
         setIsLoading(true);
         router.push(`/exhibition?id=${selectedCulture}`);
       } else {
         console.warn('[FilterSection] Attempted to create exhibition without selecting a culture');
         alert('Please select a culture first');
       }
     };

     return (
       <section className="bg-offWhite py-10 px-4">
         <div className="container mx-auto max-w-2xl">
           <h2 className="text-3xl font-serif font-bold text-foreground mb-6 text-center">
             Create Your Exhibition
           </h2>
           <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
             <select 
               onChange={handleCultureChange} 
               value={selectedCulture}
               className="w-full sm:w-auto bg-background text-foreground border border-softGray rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight"
             >
               <option value="">Select Culture</option>
               {culturesData.map((culture) => (
                 <option key={culture.cultureId} value={culture.cultureId}>
                   {culture.culture}
                 </option>
               ))}
             </select>

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