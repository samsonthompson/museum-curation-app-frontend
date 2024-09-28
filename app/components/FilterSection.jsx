   // app/components/FilterSection.jsx
   'use client'

   import { useState, useEffect } from 'react';
   import { useRouter } from 'next/navigation';
   import mediums from '../../data/Harvard/mediums.json';
   import { fetchObjectsByMaterial, checkCacheStatus } from '../../API/harvardAPI.mjs';

   export default function FilterSection() {
     const [selectedMaterial, setSelectedMaterial] = useState('');
     const [cultures, setCultures] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();

     useEffect(() => {
       // Check cache status for all mediums when component mounts
       mediums.forEach(medium => {
         const mediumId = medium.mediumId || medium;
         checkCacheStatus(mediumId);
       });
     }, []);

     const fetchCultures = async (mediumId) => {
       if (mediumId) {
         console.log(`[FilterSection] Fetching cultures for medium: ${mediumId}`);
         setIsLoading(true);
         try {
           const data = await fetchObjectsByMaterial(mediumId);
           console.log(`[FilterSection] Received ${data.length} entries for ${mediumId}`);
           const uniqueCultures = [...new Set(data.map(item => item.culture).filter(Boolean))];
           console.log(`[FilterSection] Extracted ${uniqueCultures.length} unique cultures`);
           setCultures(uniqueCultures);
           
           console.log(`[FilterSection] Number of entries for ${mediumId}: ${data.length}`);
           
           // Check cache status after fetching
           checkCacheStatus(mediumId);
         } catch (error) {
           console.error('[FilterSection] Error fetching objects:', error);
         } finally {
           setIsLoading(false);
         }
       }
     };

     const handleMaterialChange = (e) => {
       const mediumId = e.target.value;
       console.log(`[FilterSection] Material selected: ${mediumId}`);
       setSelectedMaterial(mediumId);
       fetchCultures(mediumId);
     };

     const handleCreateExhibition = () => {
       if (selectedMaterial) {
         router.push(`/exhibition?medium=${selectedMaterial}`);
       } else {
         alert('Please select a material first');
       }
     };

     return (
       <section>
         <select onChange={handleMaterialChange}>
           <option value="">Select Material</option>
           {mediums.map((medium, index) => (
             <option key={index} value={medium.mediumId || medium}>{medium.medium || medium}</option>
           ))}
         </select>

         {isLoading && <p>Loading...</p>}

         {/* <select disabled={cultures.length === 0}>
           <option value="">Select Culture</option>
           {cultures.map((culture, index) => (
             <option key={index} value={culture}>{culture}</option>
           ))}
         </select> */}

         <button onClick={handleCreateExhibition} disabled={!selectedMaterial}>
           CREATE YOUR EXHIBITION
         </button>
       </section>
     );
   }