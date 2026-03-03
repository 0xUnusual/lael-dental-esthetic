import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from './Button';
import { addToGoogleCalendar } from '../utils/calendar';

interface HeroProps {
  onAestheticClick: () => void;
  onUrgencyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAestheticClick, onUrgencyClick }) => {
  return (
    <div className="relative pt-20 min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#242424]">
        <img
          src="/doctor-hero.jpg"
          alt="Dr. de Lael Dental Esthetic"
          className="absolute inset-0 w-full h-full object-cover object-[center_top] md:object-[65%_15%]"
        />
        {/* Gradiente oscuro que asegura que el texto se lea perfecto a la izquierda dejando la cara clara a la derecha */}
        <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#242424] via-[#242424]/70 md:via-[#242424]/50 to-transparent md:w-4/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center md:items-start justify-center min-h-full py-12 sm:py-20 text-center md:text-left">
        <div className="max-w-3xl flex flex-col items-center md:items-start w-full">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6 bg-white/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full border border-white/20">
            <div className="flex text-accent gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <span className="text-white text-xs font-medium tracking-wide">4.9/5 en Google Reviews</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight sm:leading-[1.1] mb-4 sm:mb-6 drop-shadow-xl px-2 sm:px-0">
            Vuelve a Sonreír con la <span className="text-accent italic block sm:inline mt-1 sm:mt-0">Elegancia</span> que Mereces
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 font-light max-w-xl leading-relaxed px-4 sm:px-0">
            Diseño de sonrisa sin dolor, resultados naturales y atención personalizada en el corazón de RD.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center md:justify-start px-4 sm:px-0">
            <Button
              variant="gold"
              className="w-full sm:w-auto px-8 py-4 text-base"
              onClick={() => onAestheticClick()}
            >
              Reservar Evaluación Estética
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 text-base bg-red-600/20 border-red-500/50 hover:bg-red-600/30"
              onClick={() => onUrgencyClick()}
            >
              <Zap className="w-5 h-5 mr-1" />
              Urgencia Dental
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};