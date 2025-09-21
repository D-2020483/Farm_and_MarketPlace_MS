import Hero from '@/Hero';
import NavBar from '@/NavBar';
import React from 'react';
import CardGroup from '@/CardGroup';

function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 mt-1">
      <NavBar />
      <Hero />
      <CardGroup />
    </main>
  );
}

export default HomePage;