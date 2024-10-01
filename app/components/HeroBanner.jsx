import Image from 'next/image';

export default function HeroBanner() {
    return (
      <section className="relative bg-offWhite overflow-hidden" style={{ height: '300px' }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cultura-hero-banner.webp"
            alt="Art exhibition background"
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white">
          <div className="max-w-3xl mx-auto px-4 py-2">
            <h1 className="text-xl font-serif">
            Create Your Own Virtual Exhibitions from World-Class Collections
            </h1>
            <p className="text-sm mt-1">
            Because Real Museums Don't Let You Rearrange the Art
            </p>
          </div>
        </div>
      </section>
    );
}
