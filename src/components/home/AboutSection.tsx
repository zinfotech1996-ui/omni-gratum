import React, { useRef, useEffect, useState } from 'react';
import { Shield, Award, Users, Heart } from 'lucide-react';

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

const AboutSection: React.FC = () => {
  const { ref, isInView } = useInView();

  const values = [
    {
      icon: Shield,
      title: 'Kompetenz',
      description: 'Fachlich geschulte Mitarbeiter mit langjähriger Erfahrung in allen Bereichen.'
    },
    {
      icon: Award,
      title: 'Zuverlässigkeit',
      description: 'Pünktlich, gründlich und termingerecht – darauf können Sie sich verlassen.'
    },
    {
      icon: Users,
      title: 'Erfahrung',
      description: 'Seit 2022 betreuen wir erfolgreich Unternehmen in ganz Niedersachsen.'
    },
    {
      icon: Heart,
      title: 'Verantwortung',
      description: 'Als Arbeitgeber und Partner übernehmen wir Verantwortung für Qualität.'
    }
  ];

  return (
    <section ref={ref} id="about" className="py-16 lg:py-24 bg-white overflow-hidden">
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
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div 
            className={`relative ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <img
              src="https://d64gsuwffb70l.cloudfront.net/696c228599a140a49e2ed9c0_1768694617443_6f799dbb.jpg"
              alt="Omni Gratum Team"
              className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            />
            <div 
              className={`absolute -bottom-6 -right-6 bg-[#ff0f0f] text-white p-6 rounded-xl shadow-lg hidden md:block ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-4xl font-bold">26</div>
              <div className="text-sm">Mitarbeiter</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span 
              className={`text-[#ff0f0f] font-semibold text-sm uppercase tracking-wider ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={{ animationDelay: '0.1s' }}
            >
              Über uns
            </span>
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6 ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              Ihr Partner für professionelle Gebäudedienstleistungen
            </h2>
            <p 
              className={`text-gray-600 leading-relaxed mb-6 ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              Omni Gratum ist ein familiengeführtes Unternehmen mit Sitz in Syke. 
              Seit unserer Gründung im Jahr 2022 haben wir uns als zuverlässiger Partner 
              für Gebäudereinigung, Gartenservice und Hausmeisterdienst in Niedersachsen etabliert.
            </p>
            <p 
              className={`text-gray-600 leading-relaxed mb-8 ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              Mit einem Team von 26 engagierten Mitarbeitern betreuen wir Arztpraxen, 
              Rechtsanwaltskanzleien, Supermärkte, Produktionsbetriebe und viele weitere 
              Unternehmen. Transparenz und Qualität stehen bei uns an erster Stelle.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 p-4 bg-gray-50 rounded-lg ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-[#ff0f0f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon size={20} className="text-[#ff0f0f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{value.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;