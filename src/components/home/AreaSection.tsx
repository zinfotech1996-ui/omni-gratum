import React, { useRef, useEffect, useState } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

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

const AreaSection: React.FC = () => {
  const { ref, isInView } = useInView();

  const cities = [
    'Syke', 'Bremen', 'Bassum', 'Twistringen', 'Stuhr', 'Weyhe',
    'Diepholz', 'Sulingen', 'Nienburg', 'Verden', 'Achim', 'Delmenhorst'
  ];

  return (
    <section ref={ref} id="area" className="py-16 lg:py-24 bg-white overflow-hidden">
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
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
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
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span 
              className={`text-[#ff0f0f] font-semibold text-sm uppercase tracking-wider ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
            >
              Einsatzgebiet
            </span>
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
              style={{ animationDelay: '0.1s' }}
            >
              Ihr Partner in Niedersachsen
            </h2>
            <p 
              className={`text-gray-600 leading-relaxed mb-8 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              Mit Sitz in Syke sind wir in ganz Niedersachsen für Sie im Einsatz. 
              Unser Einzugsgebiet umfasst den Landkreis Diepholz, Bremen und die 
              umliegenden Regionen. Flexibel und zuverlässig – auch bei Ihnen vor Ort.
            </p>

            {/* Main Location */}
            <div 
              className={`bg-gray-50 rounded-xl p-6 mb-8 ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#ff0f0f] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Hauptsitz Syke</h3>
                  <p className="text-gray-600 mt-1">
                    Musterstraße 1<br />
                    28857 Syke<br />
                    Landkreis Diepholz
                  </p>
                </div>
              </div>
            </div>

            {/* Cities Grid */}
            <div className={isInView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.4s' }}>
              <h4 className="font-semibold text-gray-900 mb-4">Wir sind aktiv in:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cities.map((city, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-2 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                  >
                    <CheckCircle size={16} className="text-[#ff0f0f]" />
                    <span className="text-gray-700">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <div 
            className={`relative ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-gray-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
              {/* Stylized Map */}
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
                {/* Background */}
                <rect fill="#f3f4f6" width="400" height="400" rx="16" />
                
                {/* Niedersachsen outline (simplified) */}
                <path
                  d="M80 100 L150 80 L220 90 L280 70 L340 100 L350 150 L340 220 L300 280 L250 320 L180 340 L120 320 L80 280 L60 220 L70 150 Z"
                  fill="#e5e7eb"
                  stroke="#d1d5db"
                  strokeWidth="2"
                />
                
                {/* Service area highlight */}
                <ellipse
                  cx="200"
                  cy="200"
                  rx="100"
                  ry="80"
                  fill="#ff0f0f"
                  fillOpacity="0.1"
                  stroke="#ff0f0f"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                />
                
                {/* Syke marker */}
                <g transform="translate(200, 200)">
                  <circle r="12" fill="#ff0f0f" />
                  <circle r="6" fill="white" />
                </g>
                
                {/* City dots */}
                <circle cx="160" cy="160" r="4" fill="#6b7280" />
                <circle cx="240" cy="180" r="4" fill="#6b7280" />
                <circle cx="180" cy="240" r="4" fill="#6b7280" />
                <circle cx="220" cy="220" r="4" fill="#6b7280" />
                <circle cx="150" cy="200" r="4" fill="#6b7280" />
                <circle cx="250" cy="150" r="4" fill="#6b7280" />
                
                {/* Labels */}
                <text x="200" y="175" textAnchor="middle" fill="#ff0f0f" fontWeight="bold" fontSize="14">Syke</text>
                <text x="160" y="150" textAnchor="middle" fill="#6b7280" fontSize="10">Bremen</text>
                <text x="240" y="170" textAnchor="middle" fill="#6b7280" fontSize="10">Verden</text>
                <text x="180" y="260" textAnchor="middle" fill="#6b7280" fontSize="10">Diepholz</text>
              </svg>
            </div>

            {/* Stats Overlay */}
            <div 
              className={`absolute -bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 flex justify-around ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="text-center">
                <div className={`text-2xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={50} suffix="+" duration={2000} isActive={isInView} />
                </div>
                <div className="text-xs text-gray-500">km Radius</div>
              </div>
              <div className="text-center border-l border-r px-6">
                <div className={`text-2xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={12} suffix="+" duration={2000} isActive={isInView} />
                </div>
                <div className="text-xs text-gray-500">Städte</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold text-[#ff0f0f] ${isInView ? 'animate-pulse-light' : ''}`}>
                  <AnimatedNumber end={100} suffix="%" duration={2000} isActive={isInView} />
                </div>
                <div className="text-xs text-gray-500">Flexibel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaSection;