'use client';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/#about', label: t('nav.about') },
    { href: '/#services', label: t('nav.services') },
    { href: '/#area', label: t('nav.area') },
    { href: '/#customers', label: t('nav.customers') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
          
      <img 
                src="omni_gratum_logo.png" 
                alt="Omni Gratum Logo" 
                className="h-full w-auto object-contain"
              />
            {/* <div className="w-10 h-10 bg-[#ff0f0f] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">OG</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Omni Gratum</span>
              <span className="block text-xs text-gray-500">Organizing Services</span>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-600 hover:text-[#ff0f0f] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth & Language Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-[#ff0f0f] transition-colors p-2">
                  <Globe size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('de')}>
                  🇩🇪 Deutsch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  🇫🇷 Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user.role === 'admin' ? '/dashboard' : '/portal'}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#ff0f0f] transition-colors"
                >
                  <User size={18} />
                  <span className="text-sm font-medium">{user.first_name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-[#ff0f0f] transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#ff0f0f] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                {t('nav.employeeLogin')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#ff0f0f]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-gray-600 hover:text-[#ff0f0f] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t space-y-3">
                {/* Language Selector Mobile */}
                <div className="flex items-center space-x-2">
                  <Globe size={18} />
                  <span className="text-sm font-medium text-gray-600">Sprache:</span>
                </div>
                <div className="flex flex-col space-y-2 ml-6">
                  <button
                    onClick={() => { changeLanguage('de'); setMobileMenuOpen(false); }}
                    className={`text-sm ${i18n.language === 'de' ? 'text-[#ff0f0f] font-medium' : 'text-gray-600'}`}
                  >
                    🇩🇪 Deutsch
                  </button>
                  <button
                    onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }}
                    className={`text-sm ${i18n.language === 'en' ? 'text-[#ff0f0f] font-medium' : 'text-gray-600'}`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => { changeLanguage('fr'); setMobileMenuOpen(false); }}
                    className={`text-sm ${i18n.language === 'fr' ? 'text-[#ff0f0f] font-medium' : 'text-gray-600'}`}
                  >
                    🇫🇷 Français
                  </button>
                </div>

                <div className="pt-2 border-t">
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <Link
                        to={user.role === 'admin' ? '/dashboard' : '/portal'}
                        className="flex items-center space-x-2 text-gray-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User size={18} />
                        <span>{user.first_name} {user.last_name}</span>
                      </Link>
                      <button
                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                        className="flex items-center space-x-2 text-gray-500"
                      >
                        <LogOut size={18} />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="block bg-[#ff0f0f] text-white px-5 py-2 rounded-lg text-center font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.employeeLogin')}
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
