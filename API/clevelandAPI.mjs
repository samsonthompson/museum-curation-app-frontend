export async function fetchArtworksByCulture(culture) {
    const url = `https://openaccess-api.clevelandart.org/api/artworks?limit=100&has_image=1&culture=${encodeURIComponent(culture)}`;
    
    try {
        const response = await fetch(url, { cache: 'no-store' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.data && Array.isArray(data.data)) {
            return data.data;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}
