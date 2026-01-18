
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import AreaSection from '@/components/home/AreaSection';
import CustomersSection from '@/components/home/CustomersSection';
import ContactSection from '@/components/home/ContactSection';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <AreaSection />
        <CustomersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
