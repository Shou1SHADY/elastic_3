import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-black/90 backdrop-blur-md border-zinc-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Branding - Replaced with Logo Component */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo(SectionId.HERO)}>
           <Logo className="h-12 w-auto transition-all duration-300" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 text-[9px] font-mono tracking-[0.2em] text-zinc-500">
          {[SectionId.ABOUT, SectionId.PROCESS, SectionId.SHOWCASE, SectionId.PORTFOLIO].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="hover:text-white hover:text-elastic-accent transition-colors uppercase relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-elastic-accent group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button 
          onClick={() => scrollTo(SectionId.CONTACT)}
          className="hidden md:block px-6 py-2 border border-zinc-800 text-[9px] font-mono text-white hover:bg-elastic-accent hover:border-elastic-accent hover:text-black transition-all uppercase tracking-widest"
        >
          Initialize_Project
        </button>
        
        {/* Mobile Toggle */}
        <div className="md:hidden text-white font-mono text-xs cursor-pointer hover:text-elastic-accent">///</div>
      </div>
    </nav>
  );
};