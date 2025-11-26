import React, { useRef, useEffect } from 'react';
import { SectionId } from '../types';

export const Showcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section id={SectionId.SHOWCASE} className="relative py-32 bg-black border-b border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
                       Live_Feed
                   </h2>
                   <p className="text-zinc-500 font-mono text-xs tracking-widest">
                       OPERATIONAL SURVEILLANCE // CAM_04
                   </p>
                </div>
                <div className="animate-pulse flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-red-600 font-mono text-xs tracking-widest">REC</span>
                </div>
            </div>

            <div className="relative aspect-video border border-zinc-800 bg-zinc-900 overflow-hidden group">
                {/* Video Placeholder - CNC/Machining */}
                <video 
                    ref={videoRef}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    src="https://videos.pexels.com/video-files/2516159/2516159-hd_1920_1080_24fps.mp4"
                />

                {/* Camera UI Overlay */}
                <div className="absolute inset-4 border border-zinc-700/50 flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-between">
                        <div className="w-8 h-8 border-l-2 border-t-2 border-elastic-accent"></div>
                        <div className="w-8 h-8 border-r-2 border-t-2 border-elastic-accent"></div>
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="w-12 h-12 border border-elastic-accent/30 rounded-full flex items-center justify-center">
                             <div className="w-1 h-1 bg-elastic-accent"></div>
                         </div>
                    </div>

                    <div className="flex justify-between">
                        <div className="w-8 h-8 border-l-2 border-b-2 border-elastic-accent"></div>
                        <div className="w-8 h-8 border-r-2 border-b-2 border-elastic-accent"></div>
                    </div>
                </div>

                {/* Data Readout */}
                <div className="absolute bottom-8 left-8 text-white font-mono text-[10px] space-y-1 bg-black/50 p-2 backdrop-blur-sm border border-zinc-800">
                    <div>ISO: 800</div>
                    <div>SHUTTER: 1/120</div>
                    <div>APERTURE: F/2.8</div>
                    <div className="text-elastic-accent">FOCAL: AUTOMATED</div>
                </div>
            </div>
        </div>
    </section>
  );
};