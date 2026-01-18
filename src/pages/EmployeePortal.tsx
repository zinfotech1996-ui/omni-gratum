
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api, Task } from '@/lib/api';
import { 
  Home, 
  LogOut, 
  User, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const EmployeePortal: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        try {
          const data = await api.getTasks(user.id);
          setTasks(data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        } finally {
          setIsLoadingTasks(false);
        }
      }
    };

    fetchTasks();
  }, [user]);

  const completeTask = async (taskId: string) => {
    try {
      await api.updateTask(taskId, { 
        status: 'completed',
        completed_at: new Date().toISOString()
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'completed' as const } : t))
      );
    } catch (error) {
      console.error('Error completing task:', error);
    }
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

  const pendingTasks = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Ausstehend';
      case 'in_progress': return 'In Bearbeitung';
      case 'completed': return 'Erledigt';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#ff0f0f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OG</span>
              </div>
              <span className="text-lg font-bold text-gray-900 hidden sm:block">Mitarbeiterportal</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 text-gray-600 hover:text-[#ff0f0f] hover:bg-gray-100 rounded-lg"
                title="Zur Website"
              >
                <Home size={20} />
              </Link>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-[#ff0f0f] hover:bg-gray-100 rounded-lg"
                title="Abmelden"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#ff0f0f] to-red-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Willkommen, {user.first_name}!
              </h1>
              <p className="text-white/80">{user.position}</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mein Profil</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">{user.first_name} {user.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">E-Mail</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefon</p>
              <p className="font-medium text-gray-900">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle size={20} className="mr-2 text-yellow-500" />
              Anstehende Aufgaben ({pendingTasks.length})
            </h2>
            
            {isLoadingTasks ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff0f0f]"></div>
              </div>
            ) : pendingTasks.length > 0 ? (
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-[#ff0f0f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar size={20} className="text-[#ff0f0f]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{task.title}</h3>
                            {task.description && (
                              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mt-4 ml-13">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            {new Date(task.scheduled_date).toLocaleDateString('de-DE', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                            {task.scheduled_time && ` um ${task.scheduled_time}`}
                          </div>
                          {task.location && (
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-1" />
                              {task.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusLabel(task.status)}
                        </span>
                        <button
                          onClick={() => completeTask(task.id)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Erledigt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <p className="text-gray-600">Keine anstehenden Aufgaben</p>
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle size={20} className="mr-2 text-green-500" />
                Erledigte Aufgaben ({completedTasks.length})
              </h2>
              
              <div className="space-y-4">
                {completedTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 opacity-75"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(task.scheduled_date).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Erledigt
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeePortal;
