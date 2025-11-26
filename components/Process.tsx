import React, { useEffect, useRef } from 'react';
import { SectionId } from '../types';

const steps = [
  { id: '01', title: 'VECTOR', desc: 'CAD Optimization' },
  { id: '02', title: 'MILLING', desc: 'CNC Mold 7075-Alum' },
  { id: '03', title: 'PIGMENT', desc: 'Pantone® Matching' },
  { id: '04', title: 'INJECT', desc: 'Liquid PVC Dispense' },
  { id: '05', title: 'CURING', desc: 'Thermal Bonding' }
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !containerRef.current) return;
    
    // Horizontal scroll effect logic could go here, for now simple fade up
    window.gsap.from(containerRef.current.querySelectorAll('.process-step'), {
       y: 50,
       opacity: 0,
       stagger: 0.1,
       scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%'
       }
    });

  }, []);

  return (
    <section id={SectionId.PROCESS} ref={containerRef} className="py-32 bg-black border-b border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-zinc-900 pb-8">
           <h2 className="text-3xl font-bold text-white tracking-tight uppercase">
             Production<span className="text-elastic-accent">_</span>Protocol
           </h2>
           <div className="text-zinc-500 font-mono text-[10px] tracking-widest mt-4 md:mt-0">
             // SEQUENCE: LINEAR<br/>// STATUS: AUTOMATED
           </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-l border-zinc-900">
          {steps.map((step, idx) => (
            <div key={idx} className="process-step border-r border-b md:border-b-0 border-zinc-900 p-8 h-64 flex flex-col justify-between group hover:bg-zinc-900/20 transition-colors relative overflow-hidden">
               
               {/* Hover Accent Bar */}
               <div className="absolute top-0 left-0 w-full h-1 bg-elastic-accent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>

               <div className="font-mono text-[10px] text-zinc-600 group-hover:text-elastic-accent transition-colors">
                  STEP_{step.id}
               </div>
               
               <div>
                  <div className="w-2 h-2 bg-zinc-800 group-hover:bg-elastic-accent mb-4 transition-colors"></div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">{step.title}</h3>
                  <p className="text-zinc-500 text-xs font-mono uppercase">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};