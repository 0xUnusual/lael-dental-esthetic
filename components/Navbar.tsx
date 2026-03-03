import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

import { addToGoogleCalendar } from '../utils/calendar';

interface NavbarProps {
  onSchedule?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSchedule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScheduleDefault = () => {
    addToGoogleCalendar("Cita Odontológica - Lael Dental", "Consulta General / Primera Visita");
  };

  const handleClick = onSchedule || handleScheduleDefault;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo-lael.png" alt="Lael Dental Logo" className="h-10 w-auto object-contain" />
            <div>
              <h1 className={`font-serif text-2xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>Lael Dental</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">Esthetic</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#experience" className={`font-medium text-sm transition-colors hover:text-accent ${isScrolled ? 'text-primary' : 'text-white'}`}>Experiencia</a>
            <a href="#transformations" className={`font-medium text-sm transition-colors hover:text-accent ${isScrolled ? 'text-primary' : 'text-white'}`}>Transformaciones</a>
            <a href="#services" className={`font-medium text-sm transition-colors hover:text-accent ${isScrolled ? 'text-primary' : 'text-white'}`}>Servicios</a>
            <a href="#financing" className={`font-medium text-sm transition-colors hover:text-accent ${isScrolled ? 'text-primary' : 'text-white'}`}>Financiamiento</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button variant="gold" className="px-6 py-2.5" onClick={() => handleClick()}>Agendar Cita</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`transition-colors hover:text-accent ${isScrolled ? 'text-primary' : 'text-white'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#experience" className="block px-3 py-2 text-primary hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Experiencia</a>
            <a href="#transformations" className="block px-3 py-2 text-primary hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Transformaciones</a>
            <a href="#services" className="block px-3 py-2 text-primary hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Servicios</a>
            <a href="#financing" className="block px-3 py-2 text-primary hover:bg-gray-50 rounded" onClick={() => setIsOpen(false)}>Financiamiento</a>
            <div className="pt-4">
              <Button variant="gold" className="w-full justify-center" onClick={() => { handleClick(); setIsOpen(false); }}>Agendar Cita</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};