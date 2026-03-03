import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    
    setSliderValue(position);
  };

  const handleInteractionStart = () => { isDragging.current = true; };
  const handleInteractionEnd = () => { isDragging.current = false; };

  // Global mouse up handler to stop dragging even if mouse leaves component
  useEffect(() => {
    window.addEventListener('mouseup', handleInteractionEnd);
    window.addEventListener('touchend', handleInteractionEnd);
    return () => {
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, []);

  return (
    <section id="transformations" className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="inline-block px-3 py-1 border border-accent/50 rounded-full text-accent text-xs font-semibold tracking-wider mb-4 uppercase">
              Transformación Real
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              El arte de la <span className="text-accent">perfección</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Desliza para ver cómo devolvemos la confianza. Cada sonrisa es un proyecto único de arquitectura dental diseñado para armonizar con tu rostro.
            </p>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/20 w-12"></div>
                <span className="text-sm text-accent uppercase tracking-widest">Caso Clínico #2048</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border-4 border-white/10 group cursor-ew-resize select-none"
              onMouseDown={handleInteractionStart}
              onTouchStart={handleInteractionStart}
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
            >
              {/* After Image (Background) */}
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQrKi7gwckxL9pQPUQRPVg6evKE6cLwJpIRnpxU8s1eyQAG1KBTd1ucdAoSQ_l9xkk2s5L4FaYfzJtnqKa-cfqOF48q0CgXHBZIX8u4EXFDv_3aoy7G77kcAxKRhv9FbMWw7Gt5I3AU2Ft4jNB9cjXDfkUTtfGqhVHSM-4PfHaiItBtBwhUCWVF7lYxtJ277V3qThdnhW6hRox_gD0GT880EFLsBN396JLNLiymvjais7kDGg03u9NpekdisqtgzjEPkU6w7zk" 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
              />
              
              {/* Before Image (Overlay) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-accent bg-white"
                style={{ width: `${sliderValue}%` }}
              >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhCuO7MN9NIHg402U-5uU3q_bKqMs9B_K0y8eVZL3b9CtCOnS7Ou7K_TuFOZrEoBzGOHbrVxMIgBuh0e7U0Y4YIpd4o29XHBRnFOBiQCxUQ-iIFRYNyzaZOC0y4o1L0BnYA_-i5PGQ7Ivve3QZtHNABxqcDDbrYavljNaD7BeB5vd55ku9aLWtpNZZgAdxTBlsOToYsDhQ2hsB7cLJ7r4cCZs0obcSYX-jNX3Sw39H0EDSp8MaL2VrxAGz5E8cNTVcONJQRmkg" 
                  alt="Before" 
                  className="absolute inset-0 h-full w-full max-w-none object-cover pointer-events-none"
                  style={{ width: `${100 * (100/sliderValue)}%` }} // Counter scale is complex, better to use fixed width container
                />
                {/* Easier technique for Before/After: render image at full width but clip container */}
                <div className="absolute inset-0 h-full w-[100vw] sm:w-[50vw] md:w-[600px] pointer-events-none">
                     <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhCuO7MN9NIHg402U-5uU3q_bKqMs9B_K0y8eVZL3b9CtCOnS7Ou7K_TuFOZrEoBzGOHbrVxMIgBuh0e7U0Y4YIpd4o29XHBRnFOBiQCxUQ-iIFRYNyzaZOC0y4o1L0BnYA_-i5PGQ7Ivve3QZtHNABxqcDDbrYavljNaD7BeB5vd55ku9aLWtpNZZgAdxTBlsOToYsDhQ2hsB7cLJ7r4cCZs0obcSYX-jNX3Sw39H0EDSp8MaL2VrxAGz5E8cNTVcONJQRmkg" 
                        alt="Before" 
                        className="h-full w-full object-cover"
                    />
                </div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
                style={{ left: `calc(${sliderValue}% - 16px)` }}
              >
                <div className="h-8 w-8 bg-accent rounded-full shadow-lg flex items-center justify-center">
                  <ArrowLeftRight className="text-white w-4 h-4" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium pointer-events-none">ANTES</div>
              <div className="absolute bottom-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-medium text-primary pointer-events-none">DESPUÉS</div>
            </div>
            <p className="text-center text-xs text-white/50 mt-4 italic md:hidden">Desliza para comparar</p>
          </div>
        </div>
      </div>
    </section>
  );
};
