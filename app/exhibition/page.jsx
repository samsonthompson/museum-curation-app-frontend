import { fetchObjectsByCulture } from '../../API/harvardAPI.mjs';
import { fetchArtworksByCulture } from '../../API/clevelandAPI.mjs';
import harvardCultures from '../../data/Harvard/cultures.json';
import clevelandCultures from '../../data/Cleveland/cultures.json';
import Carousel from '../components/Carousel';

export async function generateMetadata({ searchParams }) {
  const { collection, culture, cultureId } = searchParams;
  const cultureName = collection === 'harvard' 
    ? harvardCultures.find(c => c.cultureId.toString() === cultureId)?.culture
    : culture;
  return { title: `Exhibition: ${cultureName || 'Unknown Culture'}` };
} 

export default async function Exhibition({ searchParams }) {
  const { collection, culture, cultureId } = searchParams;

  let exhibitionData;
  let cultureName;

  const transformItem = (item, collection) => {
    if (collection === 'harvard') {
      return {
        id: item.id,
        title: item.title,
        culture: item.culture,
        medium: item.medium,
        dimensions: item.dimensions,
        date: item.dated,
        imageUrl: item.primaryimageurl,
        description: item.description || item.labeltext,
        url: item.url
      };
    } else if (collection === 'cleveland') {
      return {
        id: item.id,
        title: item.title,
        culture: Array.isArray(item.culture) ? item.culture.join(', ') : item.culture,
        medium: item.technique,
        dimensions: item.measurements,
        date: item.creation_date,
        imageUrl: item.images?.web?.url,
        description: item.tombstone,
        url: item.url
      };
    }
  };

  if (collection === 'harvard') {
    const harvardCulture = harvardCultures.find(c => c.cultureId.toString() === cultureId);

    if (!harvardCulture) {
      return <div>Invalid culture selection. Please go back and select a culture.</div>;
    }

    cultureName = harvardCulture.culture;
    
    exhibitionData = await fetchObjectsByCulture(harvardCulture.cultureId, harvardCulture.culture);
    
    exhibitionData = exhibitionData.map(item => transformItem(item, 'harvard'));
  } else if (collection === 'cleveland') {
    const clevelandCulture = clevelandCultures.find(c => c === culture);

    if (!clevelandCulture) {
      return <div>Invalid culture selection. Please go back and select a culture.</div>;
    }

    cultureName = clevelandCulture;
    
    exhibitionData = await fetchArtworksByCulture(clevelandCulture);
    
    exhibitionData = exhibitionData.map(item => transformItem(item, 'cleveland'));
  } else {
    return <div>Invalid collection selection. Please go back and select a collection.</div>;
  }

  if (!exhibitionData || exhibitionData.length === 0) {
    return <div>No items found for this culture. Please try another culture.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2"> 
      <h1 className="text-xl font-semibold mb-2 text-center">
        {cultureName} entries from the {collection === 'harvard' ? 'Harvard Art' : 'Cleveland Museum of Art'} collection
      </h1>

      <Carousel items={exhibitionData} culture={cultureName} collection={collection} />
    </div>
  );
}