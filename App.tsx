import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="bg-elastic-black min-h-screen text-zinc-200 selection:bg-elastic-accent selection:text-black">
      <Navbar />
      <Hero />
      <div className="relative z-30 bg-elastic-black">
        <About />
        <Process />
        <Showcase />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;