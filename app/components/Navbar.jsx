import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-background py-6 px-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-foreground hover:text-highlight font-serif text-5xl font-bold">
          <Link href="/">Cultura</Link>
        </div>

        {/* Links */}
        <div className="space-x-6">
          <Link href="/exhibition" className="text-foreground hover:text-highlight font-semibold">
            Exhibition
          </Link>
          <Link href="/about" className="text-foreground hover:text-highlight font-semibold">
            About
          </Link>
          <Link href="/contact" className="text-foreground hover:text-highlight font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
