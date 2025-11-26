import React, { useState } from 'react';
import { SectionId, ContactFormState } from '../types';
import { generateManufacturingSpecs } from '../services/geminiService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({ name: '', email: '', company: '', details: '' });
  const [aiIdea, setAiIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleAiGenerate = async () => {
    if (!aiIdea) return;
    setIsGenerating(true);
    setAiResponse('');
    
    const result = await generateManufacturingSpecs(aiIdea);
    setIsGenerating(false);
    
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
        setAiResponse(result.slice(0, i));
        i++;
        if (i > result.length) clearInterval(interval);
    }, 2);
  };

  const insertIntoForm = () => {
    setFormData(prev => ({ ...prev, details: prev.details + (prev.details ? '\n\n' : '') + aiResponse }));
  };

  const openMap = () => {
    window.open("https://maps.app.goo.gl/u9YErcp85ETwBXi98?g_st=ipc", "_blank");
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-black border-b border-zinc-900 relative">
       <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-0 border border-zinc-800">
          
          {/* Left: AI Console & Map Data */}
          <div className="bg-[#050505] font-mono text-sm border-r border-zinc-800 relative flex flex-col">
             
             {/* AI Section */}
             <div className="p-8 md:p-12 border-b border-zinc-800">
                <div className="text-zinc-500 mb-6 text-[10px] tracking-widest uppercase">
                    // System.AI_Assistant<br/>
                    // Status: Online
                </div>
                <div className="mb-4 text-white">
                    <span className="text-elastic-accent mr-2">root@elastic:~#</span>
                    ./generate_specs.sh
                </div>
                <textarea 
                    value={aiIdea}
                    onChange={(e) => setAiIdea(e.target.value)}
                    placeholder="INPUT_CONCEPT_PARAMETERS..."
                    className="w-full bg-transparent border-b border-zinc-700 text-zinc-300 p-2 focus:border-elastic-accent focus:outline-none h-24 resize-none mb-6 text-xs placeholder-zinc-700"
                />
                <button 
                    onClick={handleAiGenerate}
                    disabled={isGenerating || !aiIdea}
                    className="group flex items-center gap-2 text-xs text-elastic-accent uppercase tracking-widest hover:text-white transition-colors"
                >
                    [{isGenerating ? 'PROCESSING...' : 'EXECUTE'}]
                    <span className="block w-2 h-2 bg-elastic-accent group-hover:animate-pulse"></span>
                </button>
                {aiResponse && (
                <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
                    {aiResponse}
                    <button onClick={insertIntoForm} className="block mt-4 text-elastic-accent hover:underline decoration-1 underline-offset-4">
                        >> APPEND_TO_LOG
                    </button>
                </div>
                )}
             </div>

             {/* Map / Location Data */}
             <div className="p-8 md:p-12 bg-zinc-900/10 flex-grow relative overflow-hidden group cursor-pointer" onClick={openMap}>
                <div className="absolute top-0 right-0 p-2 opacity-50">
                    <svg className="w-12 h-12 text-elastic-accent animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                        <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="5 5" />
                        <path d="M50 10 V90 M10 50 H90" strokeWidth="1" />
                    </svg>
                </div>
                
                <h3 className="text-white font-bold uppercase tracking-tight mb-2">Facility Coordinates</h3>
                <div className="text-elastic-accent font-mono text-xs mb-4">
                   30°02'42.1"N 31°14'34.2"E
                </div>
                <p className="text-zinc-500 text-xs mb-6 max-w-xs">
                   ELASTIC HQ. CAIRO, EGYPT.<br/>
                   ADVANCED POLYMER FABRICATION UNIT.
                </p>
                
                <button className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white border border-zinc-700 px-4 py-2 hover:bg-elastic-accent hover:text-black hover:border-elastic-accent transition-all">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   Establish Visual
                </button>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
             </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-black p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-8">
              Initialize Order
            </h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group relative">
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="peer w-full bg-transparent border-b border-zinc-700 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder-transparent"
                      placeholder="Name"
                    />
                    <label className="absolute left-0 -top-3.5 text-zinc-500 text-[9px] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[9px] peer-focus:text-white">Officer Name</label>
                  </div>
                  <div className="group relative">
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="peer w-full bg-transparent border-b border-zinc-700 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder-transparent"
                      placeholder="Company"
                    />
                    <label className="absolute left-0 -top-3.5 text-zinc-500 text-[9px] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[9px] peer-focus:text-white">Organization ID</label>
                  </div>
               </div>
               
               <div className="group relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="peer w-full bg-transparent border-b border-zinc-700 py-2 text-white text-sm focus:border-white focus:outline-none transition-colors placeholder-transparent"
                    placeholder="Email"
                  />
                  <label className="absolute left-0 -top-3.5 text-zinc-500 text-[9px] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[9px] peer-focus:text-white">Comms Link</label>
               </div>

               <div className="group relative pt-4">
                  <textarea 
                    value={formData.details}
                    onChange={e => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-zinc-900/30 border border-zinc-800 p-4 text-white text-sm focus:border-elastic-accent focus:outline-none transition-colors h-40 font-mono text-xs"
                    placeholder="// ENTER_TECHNICAL_DATA..."
                  ></textarea>
               </div>

               <button className="w-full py-4 border border-white text-white font-bold font-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all uppercase">
                 Transmit Signal
               </button>
            </form>
          </div>
       </div>
    </section>
  );
};