import React, { useState, useRef, useEffect } from 'react';
import { Building2, TreeDeciduous, Wrench, ArrowRight, Check } from 'lucide-react';

interface UseInViewReturn {
  ref: React.RefObject<HTMLDivElement>;
  isInView: boolean;
}

const useInView = (options = {}): UseInViewReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isInView };
};

const ServicesSection: React.FC = () => {
  const { ref, isInView } = useInView();
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Building2,
      title: 'Gebäudereinigung',
      subtitle: 'Professionelle Sauberkeit',
      image: 'https://d64gsuwffb70l.cloudfront.net/696c228599a140a49e2ed9c0_1768694554167_88c58a90.png',
      description: 'Umfassende Reinigungsdienstleistungen für Büros, Praxen, Geschäfte und Produktionsstätten. Wir sorgen für hygienische Sauberkeit nach höchsten Standards.',
      features: [
        'Büroreinigung',
        'Fensterreinigung',
        'Grundreinigung',
        'Treppenhausreinigung',
        'Praxisreinigung',
        'Industriereinigung'
      ]
    },
    {
      icon: TreeDeciduous,
      title: 'Gartenservice',
      subtitle: 'Grüne Perfektion',
      image: 'https://d64gsuwffb70l.cloudfront.net/696c228599a140a49e2ed9c0_1768694586159_e07d2b26.png',
      description: 'Professionelle Gartenpflege und Landschaftsgestaltung für Firmengelände und Gewerbeobjekte. Wir halten Ihre Außenanlagen das ganze Jahr über gepflegt.',
      features: [
        'Rasenpflege',
        'Heckenschnitt',
        'Baumschnitt',
        'Beetpflege',
        'Laubbeseitigung',
        'Neupflanzungen'
      ]
    },
    {
      icon: Wrench,
      title: 'Hausmeisterdienst',
      subtitle: 'Rundum-Betreuung',
      image: 'https://d64gsuwffb70l.cloudfront.net/696c228599a140a49e2ed9c0_1768694601140_6ba61a94.jpg',
      description: 'Zuverlässige Objektbetreuung und technische Dienstleistungen. Von Kleinreparaturen bis zum Winterdienst – wir kümmern uns um Ihre Immobilie.',
      features: [
        'Winterdienst',
        'Kleinreparaturen',
        'Objektbetreuung',
        'Entrümpelung',
        'Schlüsseldienst',
        'Notfalldienst'
      ]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} id="services" className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span 
            className={`text-[#ff0f0f] font-semibold text-sm uppercase tracking-wider ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            Unsere Leistungen
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            Drei Bereiche. Eine Qualität.
          </h2>
          <p 
            className={`text-gray-600 text-lg ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Von der Gebäudereinigung über Gartenpflege bis zum Hausmeisterservice – 
            wir bieten Ihnen alle Dienstleistungen aus einer Hand.
          </p>
        </div>

        {/* Service Tabs */}
        <div 
          className={`flex flex-wrap justify-center gap-4 mb-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveService(index)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${
                activeService === index
                  ? 'bg-[#ff0f0f] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <service.icon size={24} />
              <span className="font-semibold">{service.title}</span>
            </button>
          ))}
        </div>

        {/* Active Service Detail */}
        <div 
          className={`bg-white rounded-2xl shadow-xl overflow-hidden ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto">
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#ff0f0f]/10 rounded-xl flex items-center justify-center">
                  {React.createElement(services[activeService].icon, { size: 24, className: 'text-[#ff0f0f]' })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{services[activeService].title}</h3>
                  <p className="text-gray-500">{services[activeService].subtitle}</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {services[activeService].description}
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check size={18} className="text-[#ff0f0f]" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center bg-[#ff0f0f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Angebot anfragen
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;