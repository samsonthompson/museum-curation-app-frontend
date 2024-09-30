# Cultura: Virtual Art Exhibition Curator for Cultural Studies


## Project Description
Cultura is an educational web application designed for students studying specific cultures and artistic mediums. It allows users to curate virtual art exhibitions using collections from the Harvard Art Museums and Cleveland Museum of Art. The platform enables students to explore artworks by culture, filter by medium, and create personalized collections, enhancing their understanding of cultural and artistic diversity.


## Key Features
- Search artworks by culture from two major museum collections
- Filter artworks by medium in both search results and personal collections
- Create and manage a personal collection of artworks
- Interactive carousel and grid views for exploring artworks
- Detailed information about each artwork, including links to original museum pages


## Technologies Used
- Next.js 13 (React framework)
- Tailwind CSS (Styling)
- Context API (State management)
- Harvard Art Museums API
- Cleveland Museum of Art API
- Vercel (Deployment)


## Setup Instructions (Local Development)


1. Clone the repository:
   ```
   git clone https://github.com/your-username/cultura.git
   cd cultura
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   HARVARD_API_KEY=your_harvard_api_key
   ```
   Replace `your_harvard_api_key` with your actual API key from the harvard art museums collection.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Keys
To use this application, you'll need API keys for:
- Harvard Art Museums API: Click on['Send a request'](https://harvardartmuseums.org/collections/api)

## Usage Instructions
1. On the home page, select a museum collection and choose a specific culture to explore.
2. Browse through the artworks in the carousel view.
3. Use the medium filter to focus on specific types of artworks (e.g., paintings, sculptures).
4. Click the "Add to Collection" button to save artworks to your personal collection.
5. Navigate to "My Collection" to view your saved artworks.
6. In "My Collection", use the carousel for detailed views and the grid for an overview.
7. Use the "Filter by Medium" dropdown in My Collection to organize your saved artworks.
8. Click on any artwork in the grid view to see it in the carousel with full details.

## Educational Use
Cultura is particularly useful for:
- Art history students studying specific cultures or periods
- Comparative cultural studies, allowing easy comparison of artistic styles across cultures
- Research projects focusing on particular artistic mediums across different cultures
- Creating visual presentations or virtual exhibitions for class projects

## Deployed Version
The live version of this application can be found at: [https://cultura-liard.vercel.app](https://cultura-liard.vercel.app)

## Login Credentials
This application currently does not require login credentials. All features are accessible without authentication, making it easy for students to use without barriers.

## Accessibility
This project has been developed with accessibility in mind, following WCAG guidelines. We've ensured proper color contrast, keyboard navigation, and screen reader compatibility to make it usable for all students.

## Future Enhancements
- User accounts for saving collections across sessions
- Integration of additional museum APIs for broader cultural coverage
- Advanced search options (e.g., by time period, artist)
- Collaborative features for group projects
- Export functionality for creating reports or presentations

## Contributing
Contributions to Cultura are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.