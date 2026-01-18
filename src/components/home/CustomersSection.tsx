import React, { useRef, useEffect, useState } from 'react';
import { Stethoscope, Scale, ShoppingCart, Factory, Trash2, Building, Car, Landmark } from 'lucide-react';

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

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  isActive: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ end, suffix = '', duration = 2000, isActive }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setDisplayValue(Math.floor(end * progress));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [end, duration, isActive]);

  return <>{displayValue}{suffix}</>;
};

const CustomersSection: React.FC = () => {
  const { ref, isInView } = useInView();

  const industries = [
    {
      icon: Stethoscope,
      title: 'Arztpraxen',
      description: 'Hygienische Reinigung nach höchsten medizinischen Standards'
    },
    {
      icon: Scale,
      title: 'Rechtsanwälte',
      description: 'Diskrete und gründliche Büroreinigung für Kanzleien'
    },
    {
      icon: ShoppingCart,
      title: 'Supermärkte',
      description: 'Professionelle Reinigung für den Einzelhandel'
    },
    {
      icon: Factory,
      title: 'Produktionsbetriebe',
      description: 'Industriereinigung und Hallenreinigung'
    },
    {
      icon: Trash2,
      title: 'Entsorgungsunternehmen',
      description: 'Spezialreinigung und Objektbetreuung'
    },
    {
      icon: Building,
      title: 'Bürogebäude',
      description: 'Regelmäßige Unterhaltsreinigung'
    },
    {
      icon: Car,
      title: 'Autohäuser',
      description: 'Showroom- und Werkstattreinigung'
    },
    {
      icon: Landmark,
      title: 'Banken',
      description: 'Sicherheitsbewusste Gebäudepflege'
    }
  ];

  return (
    <section ref={ref} id="customers" className="py-16 lg:py-24 bg-gray-50 overflow-hidden">
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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
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
        .animate-pulse-light {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span 
            className={`text-[#ff0f0f] font-semibold text-sm uppercase tracking-wider ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
          >
            Kunden & Branchen
          </span>
          <h2 
            className={`text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            Vertrauen aus allen Branchen
          </h2>
          <p 
            className={`text-gray-600 text-lg ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Von der Arztpraxis bis zum Produktionsbetrieb – wir verstehen die 
            individuellen Anforderungen jeder Branche und liefern maßgeschneiderte Lösungen.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-default ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#ff0f0f]/10 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <industry.icon size={28} className="text-gray-600 group-hover:text-[#ff0f0f] transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{industry.title}</h3>
              <p className="text-gray-600 text-sm">{industry.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div 
          className={`mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Werden Sie Teil unserer zufriedenen Kunden
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Seit 2022 vertrauen uns Unternehmen in ganz Niedersachsen ihre 
                Gebäudedienstleistungen an. Überzeugen Sie sich selbst von 
                unserer Qualität und Zuverlässigkeit.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-8">
              <div className="text-center">
                <div className={`text-4xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={50} suffix="+" duration={2000} isActive={isInView} />
                </div>
                <div className="text-gray-400 text-sm mt-1">Zufriedene Kunden</div>
              </div>
              <div className="text-center border-l border-r px-6">
                <div className={`text-4xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={3} suffix="+" duration={2000} isActive={isInView} />
                </div>
                <div className="text-gray-400 text-sm mt-1">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={98} suffix="%" duration={2000} isActive={isInView} />
                </div>
                <div className="text-gray-400 text-sm mt-1">Kundenzufriedenheit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomersSection;