
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
            <div className="w-40 h-20 flex items-center">
              <img 
                src="omni_gratum_logo_whitebg.jpg" 
                alt="Omni Gratum Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
              {/* <div className="w-10 h-10 bg-[#ff0f0f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OG</span>
              </div>
              <div>
                <span className="text-lg font-bold">Omni Gratum</span>
                <span className="block text-xs text-gray-400">Organizing Services</span>
              </div> */}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Ihr zuverlässiger Partner für Gebäudereinigung, Gartenservice und Hausmeisterdienst in Niedersachsen.
            </p>
            <p className="text-gray-500 text-sm">
              Familienbetrieb seit 2022
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Über uns
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Leistungen
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('area')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Einsatzgebiet
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('customers')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kunden & Branchen
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Leistungen</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Gebäudereinigung</li>
              <li className="text-gray-400 text-sm">Büroreinigung</li>
              <li className="text-gray-400 text-sm">Gartenservice</li>
              <li className="text-gray-400 text-sm">Hausmeisterdienst</li>
              <li className="text-gray-400 text-sm">Winterdienst</li>
              <li className="text-gray-400 text-sm">Objektbetreuung</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#ff0f0f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Hauptstraße 27<br />
                  28832 Syke
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#ff0f0f] flex-shrink-0" />
                <a href="tel:+4942421234567" className="text-gray-400 hover:text-white transition-colors text-sm">
                0172-8785324
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#ff0f0f] flex-shrink-0" />
                <a href="mailto:info@omni-gratum-organizing-services.de" className="text-gray-400 hover:text-white transition-colors text-sm">
                info@omni-gratum-organizing-services.de
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-[#ff0f0f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Mo - Fr: 07:00 - 18:00<br />
                  Sa: 08:00 - 14:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Omni Gratum. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              <Link to="/impressum" className="text-gray-500 hover:text-white transition-colors text-sm">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-gray-500 hover:text-white transition-colors text-sm">
                Datenschutz
              </Link>
              <Link to="/agb" className="text-gray-500 hover:text-white transition-colors text-sm">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
