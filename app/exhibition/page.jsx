import { fetchObjectsByCulture } from '../../API/harvardAPI.mjs';
import { fetchArtworksByCulture } from '../../API/clevelandAPI.mjs';
import harvardCultures from '../../data/Harvard/cultures.json';
import clevelandCultures from '../../data/Cleveland/cultures.json';
import Carousel from '../components/Carousel';

export async function generateMetadata({ searchParams }) {
  console.log('[Exhibition] generateMetadata - searchParams:', searchParams);
  const { collection, culture, cultureId } = searchParams;
  const cultureName = collection === 'harvard' 
    ? harvardCultures.find(c => c.cultureId.toString() === cultureId)?.culture
    : culture;
  console.log('[Exhibition] generateMetadata - found culture:', cultureName);
  return { title: `Exhibition: ${cultureName || 'Unknown Culture'}` };
}

export default async function Exhibition({ searchParams }) {
  console.log('[Exhibition] Starting Exhibition component - searchParams:', searchParams);
  const { collection, culture, cultureId } = searchParams;
  console.log('[Exhibition] Extracted collection:', collection, 'culture:', culture, 'cultureId:', cultureId);

  let exhibitionData;
  let cultureName;

  if (collection === 'harvard') {
    console.log('[Exhibition] Harvard Cultures data:', harvardCultures);
    const harvardCulture = harvardCultures.find(c => c.cultureId.toString() === cultureId);
    console.log('[Exhibition] Found Harvard culture:', harvardCulture);

    if (!harvardCulture) {
      console.log('[Exhibition] Harvard culture not found, returning error message');
      return <div>Invalid culture selection. Please go back and select a culture.</div>;
    }

    cultureName = harvardCulture.culture;
    console.log('[Exhibition] Fetching objects for Harvard culture:', harvardCulture);
    exhibitionData = await fetchObjectsByCulture(harvardCulture.cultureId, harvardCulture.culture);
  } else if (collection === 'cleveland') {
    console.log('[Exhibition] Cleveland Cultures data:', clevelandCultures);
    const clevelandCulture = clevelandCultures.find(c => c === culture);
    console.log('[Exhibition] Found Cleveland culture:', clevelandCulture);

    if (!clevelandCulture) {
      console.log('[Exhibition] Cleveland culture not found, returning error message');
      return <div>Invalid culture selection. Please go back and select a culture.</div>;
    }

    cultureName = clevelandCulture;
    console.log('[Exhibition] Fetching artworks for Cleveland culture:', clevelandCulture);
    exhibitionData = await fetchArtworksByCulture(clevelandCulture);
    console.log('[Exhibition] Data fetched from Cleveland API:', exhibitionData);

    // Transform Cleveland data to match Harvard data structure
    exhibitionData = exhibitionData.map(item => ({
      id: item.id,
      title: item.title,
      culture: item.culture.join(', '),
      medium: item.technique, // Map technique to medium
      dimensions: item.measurements,
      date: item.creation_date,
      imageUrl: item.images?.web?.url,
      tombstone: item.tombstone,
      url: item.url
    }));
    console.log('[Exhibition] Transformed Cleveland data:', exhibitionData);
  } else {
    console.log('[Exhibition] Invalid collection, returning error message');
    return <div>Invalid collection selection. Please go back and select a collection.</div>;
  }

  console.log('[Exhibition] Fetched exhibition data:', exhibitionData);

  if (!exhibitionData || exhibitionData.length === 0) {
    console.log('[Exhibition] No items found for culture');
    return <div>No items found for this culture. Please try another culture.</div>;
  }

  return <Carousel items={exhibitionData} culture={cultureName} collection={collection} />;
}