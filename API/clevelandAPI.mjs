// Function to fetch artworks by culture and return results
export async function fetchArtworksByCulture(culture) {
    const url = `https://openaccess-api.clevelandart.org/api/artworks/?q=${encodeURIComponent(culture)}&limit=1000`;
    console.log(`[fetchArtworksByCulture] Fetching URL: ${url}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`[fetchArtworksByCulture] Total results from API: ${data.data.length}`);
    
    const filteredArtworks = data.data.filter(artwork => artwork.culture && artwork.culture.includes(culture));
    console.log(`[fetchArtworksByCulture] Filtered results for culture "${culture}": ${filteredArtworks.length}`);
    
    return filteredArtworks;
}
