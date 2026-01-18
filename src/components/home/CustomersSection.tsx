
import React from 'react';
import { Stethoscope, Scale, ShoppingCart, Factory, Trash2, Building, Car, Landmark } from 'lucide-react';

const CustomersSection: React.FC = () => {
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
    <section id="customers" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span className="text-[#ff0f0f] font-semibold text-sm uppercase tracking-wider">Kunden & Branchen</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Vertrauen aus allen Branchen
          </h2>
          <p className="text-gray-600 text-lg">
            Von der Arztpraxis bis zum Produktionsbetrieb – wir verstehen die 
            individuellen Anforderungen jeder Branche und liefern maßgeschneiderte Lösungen.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-default"
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
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12">
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
                <div className="text-4xl font-bold text-[#ff0f0f]">50+</div>
                <div className="text-gray-400 text-sm mt-1">Zufriedene Kunden</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#ff0f0f]">3+</div>
                <div className="text-gray-400 text-sm mt-1">Jahre Erfahrung</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#ff0f0f]">98%</div>
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
