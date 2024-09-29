import { fetchObjectsByCulture } from '../../API/harvardAPI.mjs';
import cultures from '../../data/Harvard/cultures.json';
import Carousel from '../components/Carousel';

export async function generateMetadata({ searchParams }) {
  console.log('[Exhibition] generateMetadata - searchParams:', searchParams);
  const culture = cultures.find(c => c.cultureId.toString() === searchParams.id);
  console.log('[Exhibition] generateMetadata - found culture:', culture);
  return { title: `Exhibition: ${culture ? culture.culture : 'Unknown Culture'}` };
}

export default async function Exhibition({ searchParams }) {
  console.log('[Exhibition] Starting Exhibition component - searchParams:', searchParams);
  const { id } = searchParams;
  console.log('[Exhibition] Extracted id:', id);

  console.log('[Exhibition] Cultures data:', cultures);
  const culture = cultures.find(c => c.cultureId.toString() === id);
  console.log('[Exhibition] Found culture:', culture);

  if (!culture) {
    console.log('[Exhibition] Culture not found, returning error message');
    return <div>Invalid culture selection. Please go back and select a culture.</div>;
  }

  console.log('[Exhibition] Fetching objects for culture:', culture);
  const exhibitionData = await fetchObjectsByCulture(culture.cultureId, culture.culture);
  console.log('[Exhibition] Fetched exhibition data:', exhibitionData);

  if (!exhibitionData || exhibitionData.length === 0) {
    console.log('[Exhibition] No items found for culture');
    return <div>No items found for this culture. Please try another culture.</div>;
  }

  return <Carousel items={exhibitionData} culture={culture} />;
}