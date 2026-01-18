
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardOverview from '@/pages/dashboard/DashboardOverview';
import EmployeesPage from '@/pages/dashboard/EmployeesPage';
import ServicesPage from '@/pages/dashboard/ServicesPage';
import CustomersPage from '@/pages/dashboard/CustomersPage';
import TasksPage from '@/pages/dashboard/TasksPage';
import InquiriesPage from '@/pages/dashboard/InquiriesPage';

const Dashboard: React.FC = () => {
  const { user, isLoading, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Übersicht';
    if (path.includes('/employees')) return 'Mitarbeiter';
    if (path.includes('/services')) return 'Leistungen';
    if (path.includes('/customers')) return 'Kunden';
    if (path.includes('/tasks')) return 'Aufträge';
    if (path.includes('/inquiries')) return 'Anfragen';
    return 'Dashboard';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0f0f]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/portal" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(true)} 
          title={getPageTitle()}
        />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="inquiries" element={<InquiriesPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
