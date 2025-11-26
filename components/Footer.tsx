import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs font-mono">
        <div className="mb-4 md:mb-0 flex items-center gap-2">
            {/* Logo Component usage */}
            <Logo className="h-8 w-auto" variant="icon" />
           <span>© {new Date().getFullYear()} ELASTIC MFG. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex gap-6">
           <a href="#" className="hover:text-elastic-accent">INSTAGRAM</a>
           <a href="#" className="hover:text-elastic-accent">LINKEDIN</a>
           <a href="#" className="hover:text-elastic-accent">PRIVACY</a>
        </div>
      </div>
    </footer>
  );
};