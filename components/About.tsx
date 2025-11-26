import React, { useEffect, useRef } from 'react';
import { SectionId } from '../types';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !sectionRef.current) return;
    
    // Reveal text lines
    window.gsap.fromTo(sectionRef.current.querySelectorAll('.reveal-text'), 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id={SectionId.ABOUT} ref={sectionRef} className="py-32 bg-black border-b border-zinc-900 relative">
      
      {/* Heavy Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-800"></div>

      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 border-l border-zinc-900 pl-6 md:pl-0 md:border-none">
           <div className="md:col-span-4">
              <span className="text-elastic-accent font-mono text-[9px] tracking-[0.3em] uppercase block mb-6">
                ( 01 ) About
              </span>
              <div className="w-8 h-1 bg-elastic-accent mb-6"></div>
           </div>
           
           <div className="md:col-span-8">
              <h2 className="text-4xl md:text-7xl font-bold text-white leading-[0.9] tracking-tight mb-8 reveal-text">
                WE MOLD IDEAS INTO <span className="text-stroke">TACTICAL REALITY.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl reveal-text font-sans">
                Elastic Industries is a premier B2B fabrication unit specializing in high-tolerance soft PVC and silicone components. We bridge the gap between digital vector art and physical industrial goods.
              </p>
           </div>
        </div>

        {/* Technical Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-zinc-900">
           
           {[
             { title: "Precision", val: "±0.05mm", desc: "Micro-injection tolerance" },
             { title: "Capacity", val: "500K+", desc: "Units per month output" },
             { title: "Material", val: "PVC/TPU", desc: "Medical & Mil-Spec Grades" }
           ].map((stat, i) => (
             <div key={i} className="group border-b md:border-b-0 border-r border-zinc-900 p-8 md:p-12 hover:bg-zinc-900/30 transition-colors">
                <div className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-4 flex justify-between">
                   <span>{stat.title}</span>
                   <span className="opacity-0 group-hover:opacity-100 text-elastic-accent transition-opacity">-></span>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
                <div className="text-zinc-500 text-sm">{stat.desc}</div>
             </div>
           ))}

        </div>

      </div>
    </section>
  );
};