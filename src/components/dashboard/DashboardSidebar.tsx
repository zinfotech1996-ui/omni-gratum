
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Building2, 
  ClipboardList, 
  MessageSquare,
  LogOut,
  X
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Übersicht', path: '/dashboard' },
    { icon: Users, label: 'Mitarbeiter', path: '/dashboard/employees' },
    { icon: Briefcase, label: 'Leistungen', path: '/dashboard/services' },
    { icon: Building2, label: 'Kunden', path: '/dashboard/customers' },
    { icon: ClipboardList, label: 'Aufträge', path: '/dashboard/tasks' },
    { icon: MessageSquare, label: 'Anfragen', path: '/dashboard/inquiries' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ff0f0f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OG</span>
              </div>
              <span className="text-white font-bold">Admin</span>
            </Link>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ff0f0f]/20 rounded-full flex items-center justify-center">
                <span className="text-[#ff0f0f] font-semibold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-gray-400 text-xs">{user?.position}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#ff0f0f] text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={() => { logout(); onClose(); }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full"
            >
              <LogOut size={20} />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
