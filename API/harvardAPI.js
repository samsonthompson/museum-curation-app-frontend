export const fetchHarvardData = async (mediumId, centuryId, cultureId) => {
    const url = `https://api.harvardartmuseums.org/object?apikey=YOUR_API_KEY&medium=${mediumId}&century=${centuryId}&culture=${cultureId}&size=100`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.records && data.records.length > 0) {
        return data.records;
      } else {
        console.log('No matching objects found for the selected filters');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  