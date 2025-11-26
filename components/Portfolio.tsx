import React, { useState } from 'react';
import { SectionId, Product } from '../types';

const products: Product[] = [
  { id: 'TAC-001', title: 'OPS_PATCH_V1', category: 'MORALE', description: 'Standard issue morale patch with hook backing.', imageUrl: 'https://images.unsplash.com/photo-1620310214309-906927d627b4?q=80&w=1000&auto=format&fit=crop', details: ['3.5mm PVC', 'VELCRO HOOK', 'IR COMPATIBLE'] },
  { id: 'KEY-092', title: 'HEX_CHAIN_L2', category: 'EDC', description: 'Rubberized keychain with hexagonal pattern.', imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=1000&auto=format&fit=crop', details: ['PANTONE 802C', 'MATTE FINISH', 'BLK SPLIT RING'] },
  { id: 'IND-442', title: 'CORP_BRAND', category: 'PROMO', description: 'Flat corporate branding asset, soft touch.', imageUrl: 'https://images.unsplash.com/photo-1616401776146-236b23d9df6d?q=80&w=1000&auto=format&fit=crop', details: ['2D MOLD', '4 COLOR', 'POLYBAG'] },
  { id: 'FIG-X01', title: 'UNIT_CREST', category: 'MIL-SPEC', description: 'Heavy duty unit crest patch.', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop', details: ['HAND PAINTED', 'SILICONE', 'HEAVY BASE'] },
];

export const Portfolio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id={SectionId.PORTFOLIO} className="py-32 bg-black border-b border-zinc-900">
      <div className="container mx-auto px-6">
        
        <div className="mb-16 flex items-center justify-between">
           <div>
              <span className="text-elastic-accent font-mono text-[9px] uppercase tracking-[0.3em] block mb-2">
                 ( 03 ) Archive
              </span>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Selected Works</h2>
           </div>
           <div className="hidden md:block w-32 h-px bg-zinc-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
          {products.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative aspect-[3/4] bg-black cursor-pointer overflow-hidden"
            >
              {/* Image grayscale by default, color on hover */}
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105" 
              />
              
              {/* Tech Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
                 <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-elastic-accent text-black text-[9px] font-mono px-1 py-0.5">{product.id}</span>
                 </div>
                 
                 <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-white font-bold text-lg uppercase leading-none mb-1">{product.title}</h3>
                    <p className="text-zinc-400 text-[10px] font-mono uppercase">{product.category}</p>
                 </div>
              </div>

              {/* Scanline hover effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20 blur-sm transform -translate-y-full group-hover:animate-scan"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Brutalist Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-black border border-zinc-800 w-full max-w-4xl grid md:grid-cols-2 shadow-[0_0_50px_rgba(0,0,0,0.8)]" onClick={(e) => e.stopPropagation()}>
            
            {/* Image */}
            <div className="bg-zinc-900/50 relative group">
                <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt={selectedProduct.title} />
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            </div>

            {/* Info */}
            <div className="p-12 flex flex-col justify-center border-l border-zinc-800 relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-elastic-accent font-mono text-xl">
                    &times;
                </button>
                
                <div className="text-elastic-accent font-mono text-[10px] mb-4">{selectedProduct.id} // {selectedProduct.category}</div>
                <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">{selectedProduct.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-sans">
                    {selectedProduct.description}
                </p>

                <div className="border-t border-zinc-800 pt-6">
                    <div className="grid grid-cols-1 gap-2">
                        {selectedProduct.details?.map((d, i) => (
                            <div key={i} className="flex justify-between text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-1">
                                <span>SPEC_0{i+1}</span>
                                <span className="text-zinc-300">{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="mt-8 w-full py-3 bg-white text-black font-bold font-mono text-xs uppercase hover:bg-elastic-accent transition-colors">
                    Inquire About Object
                </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};