export default function Footer() {
    return (
      <footer className="bg-foreground text-background py-6 px-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="text-sm">
            © 2024 Cultura. All rights reserved.
          </div>
  
          {/* Right Side: Social Links */}
          <div className="space-x-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-highlight">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-highlight">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-highlight">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    );
  }
  