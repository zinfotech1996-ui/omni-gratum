
import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Check, X } from 'lucide-react';
import { api, Service } from '@/lib/api';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: 'gebaudereinigung' as Service['category'],
    price_from: 0,
    price_unit: '',
    is_active: true
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let result = services;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter((s) => s.category === categoryFilter);
    }

    setFilteredServices(result);
  }, [searchTerm, categoryFilter, services]);

  const toggleActive = async (service: Service) => {
    try {
      const updated = await api.updateService(service.id, { is_active: !service.is_active });
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? { ...s, is_active: updated.is_active } : s))
      );
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await api.createService(newService);
      setServices((prev) => [...prev, created]);
      setShowAddModal(false);
      setNewService({
        name: '',
        description: '',
        category: 'gebaudereinigung',
        price_from: 0,
        price_unit: '',
        is_active: true
      });
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      gebaudereinigung: 'Gebäudereinigung',
      gartenservice: 'Gartenservice',
      hausmeisterdienst: 'Hausmeisterdienst'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      gebaudereinigung: 'bg-blue-100 text-blue-800',
      gartenservice: 'bg-green-100 text-green-800',
      hausmeisterdienst: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff0f0f]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Leistung suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent bg-white"
          >
            <option value="all">Alle Kategorien</option>
            <option value="gebaudereinigung">Gebäudereinigung</option>
            <option value="gartenservice">Gartenservice</option>
            <option value="hausmeisterdienst">Hausmeisterdienst</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-[#ff0f0f] text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Neue Leistung
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
              !service.is_active ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                {getCategoryLabel(service.category)}
              </span>
              <button
                onClick={() => toggleActive(service)}
                className={`p-1 rounded transition-colors ${
                  service.is_active
                    ? 'text-green-600 hover:bg-green-50'
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
                title={service.is_active ? 'Deaktivieren' : 'Aktivieren'}
              >
                {service.is_active ? <Check size={18} /> : <X size={18} />}
              </button>
            </div>

            <h3 className="font-bold text-gray-900 text-lg mb-2">{service.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="flex items-end justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-[#ff0f0f]">
                  {service.price_from.toFixed(2).replace('.', ',')} €
                </p>
                <p className="text-sm text-gray-500">{service.price_unit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          Keine Leistungen gefunden
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Neue Leistung hinzufügen</h2>
            
            <form onSubmit={handleAddService} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value as Service['category'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent bg-white"
                >
                  <option value="gebaudereinigung">Gebäudereinigung</option>
                  <option value="gartenservice">Gartenservice</option>
                  <option value="hausmeisterdienst">Hausmeisterdienst</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preis ab</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newService.price_from}
                    onChange={(e) => setNewService({ ...newService, price_from: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Einheit</label>
                  <input
                    type="text"
                    value={newService.price_unit}
                    onChange={(e) => setNewService({ ...newService, price_unit: e.target.value })}
                    placeholder="z.B. pro Stunde"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff0f0f] text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Hinzufügen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
