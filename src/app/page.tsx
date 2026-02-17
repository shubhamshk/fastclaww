

import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { MobileDemo } from '@/sections/MobileDemo';
import { UseCases } from '@/sections/UseCases';
import { Configurator } from '@/sections/Configurator';
import { Comparison } from '@/sections/Comparison';

import { Footer } from '@/sections/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <Hero />
      <MobileDemo />
      <Comparison />
      <UseCases />

      <Footer />
    </main>
  );
}
