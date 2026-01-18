
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Home } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick, title }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            title="Zur Website"
          >
            <Home size={20} />
          </Link>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff0f0f] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
