import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SystemArchitecture from '@/components/SystemArchitecture';
import FeaturedSystems from '@/components/FeaturedSystems';
import TheVault from '@/components/TheVault';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712]">
      <Navigation />
      <Hero />
      <SystemArchitecture />
      <FeaturedSystems />
      <TheVault />
      <Footer />
    </main>
  );
}
