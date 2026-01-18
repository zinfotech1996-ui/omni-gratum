
import React, { useEffect, useState } from 'react';
import { Users, Building2, ClipboardList, MessageSquare } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { api, DashboardStats, Inquiry, Task } from '@/lib/api';

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, inquiriesData, tasksData] = await Promise.all([
          api.getDashboardStats(),
          api.getInquiries(),
          api.getTasks()
        ]);
        setStats(statsData);
        setRecentInquiries(inquiriesData.slice(0, 5));
        setRecentTasks(tasksData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0f0f]"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels: Record<string, string> = {
      new: 'Neu',
      contacted: 'Kontaktiert',
      converted: 'Konvertiert',
      closed: 'Geschlossen',
      pending: 'Ausstehend',
      in_progress: 'In Bearbeitung',
      completed: 'Erledigt',
      cancelled: 'Storniert'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Aktive Mitarbeiter"
          value={stats?.activeEmployees || 0}
          icon={Users}
          color="red"
        />
        <StatsCard
          title="Kunden"
          value={stats?.totalCustomers || 0}
          icon={Building2}
          color="blue"
        />
        <StatsCard
          title="Offene Aufträge"
          value={stats?.pendingTasks || 0}
          icon={ClipboardList}
          color="yellow"
        />
        <StatsCard
          title="Neue Anfragen"
          value={stats?.newInquiries || 0}
          icon={MessageSquare}
          color="green"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Neueste Anfragen</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.name}</p>
                      <p className="text-sm text-gray-500">{inquiry.company || 'Kein Unternehmen'}</p>
                      <p className="text-sm text-gray-400 mt-1">{inquiry.service_interest}</p>
                    </div>
                    {getStatusBadge(inquiry.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                Keine Anfragen vorhanden
              </div>
            )}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Anstehende Aufträge</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">{task.location}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(task.scheduled_date).toLocaleDateString('de-DE')} {task.scheduled_time && `um ${task.scheduled_time}`}
                      </p>
                    </div>
                    {getStatusBadge(task.status)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                Keine Aufträge vorhanden
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
