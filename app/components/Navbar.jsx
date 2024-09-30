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
          <Link href="/" className="text-foreground hover:text-highlight font-semibold">
            Search
          </Link>
          <Link href="/my-collection" className="text-foreground hover:text-highlight font-semibold">
            My Collection
          </Link>
        </div>
      </div>
    </nav>
  );
}
