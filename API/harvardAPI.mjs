const HARVARD_BASE_URL = "https://api.harvardartmuseums.org";
const HARVARD_API_KEY = process.env.NEXT_PUBLIC_HARVARD_API_KEY;

export async function fetchObjectsByCulture(cultureId, cultureName) {
  try {
    let entries = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const url = `${HARVARD_BASE_URL}/object?apikey=${HARVARD_API_KEY}&q=culture:${encodeURIComponent(cultureName)}&size=${pageSize}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.records && data.records.length > 0) {
        entries = entries.concat(data.records);
        
        if (data.info.next === null) {
          break;
        }
        page++;
      } else {
        break;
      }
    }

    return entries;
  } catch (error) {
    throw error;
  }
}