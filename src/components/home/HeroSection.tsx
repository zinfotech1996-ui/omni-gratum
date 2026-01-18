import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/696c228599a140a49e2ed9c0_1768694527153_87d490e0.png)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div 
            className={`inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-2 h-2 bg-[#ff0f0f] rounded-full mr-2"></span>
            <span className="text-white/90 text-sm">Familienbetrieb seit 2022</span>
          </div>

          {/* Headline */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Kompetenz.{' '}
            <span className="text-[#ff0f0f]">Zuverlässigkeit.</span>{' '}
            Verantwortung.
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg md:text-xl text-white/80 mb-8 leading-relaxed ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            Professionelle Gebäudereinigung, Gartenservice und Hausmeisterdienst 
            für Unternehmen in Syke und ganz Niedersachsen.
          </p>

          {/* Trust Indicators */}
          <div 
            className={`flex flex-wrap gap-4 mb-8 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center text-white/90">
              <CheckCircle size={18} className="text-[#ff0f0f] mr-2" />
              <span className="text-sm">26 Mitarbeiter</span>
            </div>
            <div className="flex items-center text-white/90">
              <CheckCircle size={18} className="text-[#ff0f0f] mr-2" />
              <span className="text-sm">Niedersachsen-weit</span>
            </div>
            <div className="flex items-center text-white/90">
              <CheckCircle size={18} className="text-[#ff0f0f] mr-2" />
              <span className="text-sm">Kostenlose Beratung</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center bg-[#ff0f0f] text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Anfrage stellen
              <ArrowRight size={20} className="ml-2" />
            </button>
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Unsere Leistungen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;