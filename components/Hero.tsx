import React, { useEffect, useRef } from 'react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Moved updateText definition outside useEffect or before its usage to prevent ReferenceError
  const updateText = (p: number) => {
    if (!textRef.current) return;
    const stageEl = textRef.current.querySelector('#stage-id');
    const descEl = textRef.current.querySelector('#stage-desc');
    const metricsEl = textRef.current.querySelector('#metrics');
    
    // Logo Teal for highlights
    const accent = '#72C8C2';

    if (p < 0.25) {
        if(stageEl) stageEl.innerHTML = `<span style="color:${accent}">01</span> // LIDAR_SCAN`;
        if(descEl) descEl.textContent = "GEOMETRY VERIFICATION";
        if(metricsEl) metricsEl.innerHTML = "POINTS: 14,020<br/>TOLERANCE: ±0.01mm";
    } else if (p < 0.55) {
        if(stageEl) stageEl.innerHTML = `<span style="color:${accent}">02</span> // CNC_MILLING`;
        if(descEl) descEl.textContent = "SUBTRACTIVE MACHINING";
        if(metricsEl) metricsEl.innerHTML = "SPINDLE: 24K RPM<br/>MATERIAL: AL-7075";
    } else if (p < 0.85) {
        if(stageEl) stageEl.innerHTML = `<span style="color:${accent}">03</span> // INJECTION`;
        if(descEl) descEl.textContent = "THERMAL FLUID DYNAMICS";
        if(metricsEl) metricsEl.innerHTML = "TEMP: 185°C<br/>PRESS: 450 PSI";
    } else {
        if(stageEl) stageEl.innerHTML = `<span style="color:${accent}">04</span> // QC_PASS`;
        if(descEl) descEl.textContent = "SURFACE INSPECTION";
        if(metricsEl) metricsEl.innerHTML = "SHORE: 70A<br/>STATUS: APPROVED";
    }
  };

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !canvasRef.current || !containerRef.current) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- GEOMETRY DATA ---
    const hexRadius = 200;
    const createHex = (r: number) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6; 
        points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }
      return points;
    };
    
    // Abstract patch design
    const logoPath = [
      { x: -60, y: -100 }, { x: 60, y: -100 }, { x: 100, y: -60 }, { x: 100, y: 60 },
      { x: 60, y: 100 }, { x: -60, y: 100 }, { x: -100, y: 60 }, { x: -100, y: -60 },
      { x: -60, y: -100 }
    ];
    
    const innerDetail = [
       { x: 0, y: -70 }, { x: 70, y: 50 }, { x: 0, y: 30 }, { x: -70, y: 50 }
    ];

    const outerHex = createHex(hexRadius);
    
    // Helper: Draw Path
    const drawPath = (ctx: CanvasRenderingContext2D, path: {x:number, y:number}[], close = true) => {
      ctx.beginPath();
      path.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      if (close) ctx.closePath();
    };

    // Helper: Draw Grid
    const drawGrid = (ctx: CanvasRenderingContext2D, opacity: number) => {
      if (opacity <= 0) return;
      ctx.save();
      ctx.strokeStyle = `rgba(50, 50, 50, ${opacity})`;
      ctx.lineWidth = 1;
      
      const gridSize = 100;
      const xOff = (width / 2) % gridSize;
      const yOff = (height / 2) % gridSize;

      ctx.beginPath();
      // Vertical lines
      for (let x = xOff; x < width; x += gridSize) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = yOff; y < height; y += gridSize) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = `rgba(114, 200, 194, ${opacity * 0.5})`; // Teal crosshairs
      ctx.lineWidth = 2;
      const chSize = 10;
      for (let x = xOff; x < width; x += gridSize) {
        for (let y = yOff; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x - chSize, y); ctx.lineTo(x + chSize, y);
            ctx.moveTo(x, y - chSize); ctx.lineTo(x, y + chSize);
            ctx.stroke();
        }
      }

      ctx.restore();
    };

    // --- RENDER LOOP ---
    const draw = (progress: number) => {
      // Clear with Void Black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      drawGrid(ctx, 1 - progress * 0.3);

      ctx.save();
      ctx.translate(cx, cy);
      
      const scale = 0.8 + Math.pow(progress, 2) * 0.3;
      ctx.scale(scale, scale);

      // --- STAGE 1: LIDAR SCAN (0.0 - 0.25) ---
      if (progress < 0.3) {
        const p1 = Math.min(1, progress / 0.25);
        
        // Scan line effect
        const scanY = (p1 * 400) - 200; // Moving scan plane

        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        
        // "Ghost" wireframe
        ctx.strokeStyle = '#1a1a1a';
        drawPath(ctx, outerHex);
        ctx.stroke();

        // Active Scan Area
        ctx.save();
        ctx.beginPath();
        ctx.rect(-300, scanY - 20, 600, 40); // Scan bar height
        ctx.clip();
        
        ctx.strokeStyle = '#72C8C2'; // Logo Teal
        ctx.shadowColor = '#72C8C2';
        ctx.shadowBlur = 10;
        drawPath(ctx, outerHex);
        ctx.stroke();
        
        // Data points (LiDAR dots)
        ctx.fillStyle = '#fff';
        outerHex.forEach(p => {
             if (Math.abs(p.y - scanY) < 50) {
                 ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
             }
        });
        
        ctx.restore();

        // Scan Line itself
        ctx.strokeStyle = 'rgba(114, 200, 194, 0.5)';
        ctx.beginPath();
        ctx.moveTo(-300, scanY);
        ctx.lineTo(300, scanY);
        ctx.stroke();
      }

      // --- STAGE 2: CNC MILLING (0.25 - 0.55) ---
      if (progress >= 0.25 && progress < 0.6) {
        const p2 = (progress - 0.25) / 0.35; 
        
        // Base Material (Raw Aluminum)
        ctx.fillStyle = '#111';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        drawPath(ctx, outerHex);
        ctx.fill();
        ctx.stroke();

        // Milled Cavity
        if (p2 > 0.1) {
            ctx.save();
            // Noise Pattern for rough milled surface
            ctx.fillStyle = '#080808';
            drawPath(ctx, logoPath);
            ctx.fill();
            
            ctx.clip();
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            for(let i=0; i<50; i++) {
                ctx.fillRect(Math.random()*200 - 100, Math.random()*200 - 100, 2, 2);
            }
            ctx.restore();
        }

        // The Cutter (Teal/Blue Hotspot for tech feel)
        if (p2 < 0.9) {
           const angle = p2 * Math.PI * 8;
           const cutX = Math.cos(angle) * (50 + p2*20);
           const cutY = Math.sin(angle) * (50 + p2*20);
           
           ctx.shadowColor = '#72C8C2';
           ctx.shadowBlur = 20;
           ctx.fillStyle = '#72C8C2';
           ctx.beginPath();
           ctx.arc(cutX, cutY, 4, 0, Math.PI*2);
           ctx.fill();
           ctx.shadowBlur = 0;
           
           // Sparks
           ctx.fillStyle = '#fff';
           for(let i=0; i<3; i++) {
               ctx.fillRect(cutX + Math.random()*20-10, cutY + Math.random()*20-10, 1, 1);
           }
        }
      }

      // --- STAGE 3: INJECTION (0.55 - 0.85) ---
      if (progress >= 0.55) {
        const p3 = (progress - 0.55) / 0.3;
        const fillLevel = Math.min(1, Math.max(0, p3 * 1.3)); 
        
        // Mold Block
        ctx.fillStyle = '#111';
        drawPath(ctx, outerHex);
        ctx.fill();
        ctx.strokeStyle = '#333';
        drawPath(ctx, outerHex);
        ctx.stroke();

        // Liquid PVC
        ctx.save();
        drawPath(ctx, logoPath);
        ctx.clip();
        
        ctx.fillStyle = '#000';
        ctx.fillRect(-200, -200, 400, 400);

        // Gradient: White -> Teal -> Blue
        const grad = ctx.createLinearGradient(0, -100, 0, 100);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#72C8C2');
        grad.addColorStop(1, '#5D9CC9');

        ctx.fillStyle = grad;
        const liquidY = 150 - (300 * fillLevel);
        
        ctx.beginPath();
        ctx.moveTo(-150, liquidY);
        for(let x = -150; x <= 150; x+=10) {
            ctx.lineTo(x, liquidY + Math.sin(x*0.1 + progress*10)*5);
        }
        ctx.lineTo(150, 200);
        ctx.lineTo(-150, 200);
        ctx.fill();

        ctx.restore();
      }

      // --- STAGE 4: FINAL (0.85 - 1.0) ---
      if (progress >= 0.85) {
        // Base
        ctx.fillStyle = '#111';
        drawPath(ctx, outerHex);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#333';
        drawPath(ctx, outerHex);
        ctx.stroke();

        // Patch Color (Teal)
        ctx.fillStyle = '#72C8C2';
        drawPath(ctx, logoPath);
        ctx.fill();
        
        // Inner Detail (Black)
        ctx.fillStyle = '#0a0a0a';
        drawPath(ctx, innerDetail);
        ctx.fill();
        
        // Subtle Specular Highlight
        ctx.save();
        drawPath(ctx, logoPath);
        ctx.clip();
        const grad = ctx.createLinearGradient(-50, -50, 50, 50);
        grad.addColorStop(0, 'rgba(255,255,255,0.2)');
        grad.addColorStop(0.5, 'transparent');
        grad.addColorStop(1, 'rgba(0,0,0,0.2)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // --- SCROLL TRIGGER ---
    const st = window.ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3500", // Longer scroll for more control
      pin: true,
      scrub: 0.5,
      onUpdate: (self: any) => {
        draw(self.progress);
        updateText(self.progress);
      }
    });

    draw(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      st.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden border-b border-zinc-900">
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      {/* UI OVERLAY */}
      <div ref={textRef} className="absolute inset-0 z-30 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
        
        {/* Top Left Branding */}
        <div className="flex flex-col gap-1">
           <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">ELASTIC<span className="text-elastic-accent">.</span></h1>
           <p className="text-zinc-500 font-mono text-[10px] tracking-[0.3em] uppercase pl-1">Manufacturing Division</p>
        </div>

        {/* Right Side Status Panel */}
        <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 text-right">
            <div className="flex flex-col items-end gap-1 mb-8">
                <div id="stage-id" className="font-mono text-3xl font-bold text-white tracking-tighter">00 // INIT</div>
                <div id="stage-desc" className="text-elastic-accent font-mono text-xs tracking-widest uppercase">SYSTEM STANDBY</div>
            </div>
            
            <div className="border-r border-zinc-800 pr-4 py-2">
                <div id="metrics" className="text-zinc-600 font-mono text-[10px] leading-relaxed uppercase">
                    WAITING FOR INPUT...
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end border-t border-zinc-900 pt-6">
           <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
              Unit: 24-B<br/>
              Loc: Global
           </div>
           
           <div className="flex items-center gap-4">
              <span className="text-[9px] font-mono text-elastic-accent animate-pulse">SCROLL_TO_PROCESS</span>
              <div className="w-12 h-[1px] bg-elastic-accent"></div>
           </div>
        </div>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] pointer-events-none"></div>
    </section>
  );
};