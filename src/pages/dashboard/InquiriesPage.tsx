
import React, { useEffect, useState } from 'react';
import { Search, MessageSquare, Mail, Phone, Building2 } from 'lucide-react';
import { api, Inquiry } from '@/lib/api';

const InquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await api.getInquiries();
        setInquiries(data);
        setFilteredInquiries(data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  useEffect(() => {
    let result = inquiries;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(term) ||
          i.email.toLowerCase().includes(term) ||
          i.company?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((i) => i.status === statusFilter);
    }

    setFilteredInquiries(result);
  }, [searchTerm, statusFilter, inquiries]);

  const updateInquiryStatus = async (inquiryId: string, newStatus: Inquiry['status']) => {
    try {
      const updated = await api.updateInquiry(inquiryId, { status: newStatus });
      setInquiries((prev) =>
        prev.map((i) => (i.id === inquiryId ? { ...i, status: updated.status } : i))
      );
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: updated.status });
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      converted: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    const labels: Record<string, string> = {
      new: 'Neu',
      contacted: 'Kontaktiert',
      converted: 'Konvertiert',
      closed: 'Geschlossen'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
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
              placeholder="Anfrage suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent bg-white"
          >
            <option value="all">Alle Status</option>
            <option value="new">Neu</option>
            <option value="contacted">Kontaktiert</option>
            <option value="converted">Konvertiert</option>
            <option value="closed">Geschlossen</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => setSelectedInquiry(inquiry)}
              className={`bg-white rounded-xl shadow-sm border p-4 cursor-pointer transition-all ${
                selectedInquiry?.id === inquiry.id
                  ? 'border-[#ff0f0f] ring-1 ring-[#ff0f0f]'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#ff0f0f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} className="text-[#ff0f0f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{inquiry.name}</h3>
                    <p className="text-sm text-gray-500">{inquiry.company || 'Kein Unternehmen'}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(inquiry.created_at).toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
                {getStatusBadge(inquiry.status)}
              </div>
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{inquiry.message}</p>
            </div>
          ))}

          {filteredInquiries.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
              Keine Anfragen gefunden
            </div>
          )}
        </div>

        {/* Detail View */}
        <div className="lg:sticky lg:top-24 h-fit">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.name}</h2>
                  <p className="text-gray-500">{selectedInquiry.company || 'Kein Unternehmen'}</p>
                </div>
                {getStatusBadge(selectedInquiry.status)}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-gray-400" />
                  <a href={`mailto:${selectedInquiry.email}`} className="text-[#ff0f0f] hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone size={18} className="text-gray-400" />
                    <a href={`tel:${selectedInquiry.phone}`} className="text-gray-700 hover:text-[#ff0f0f]">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                {selectedInquiry.service_interest && (
                  <div className="flex items-center space-x-3">
                    <Building2 size={18} className="text-gray-400" />
                    <span className="text-gray-700">{selectedInquiry.service_interest}</span>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Nachricht</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status ändern</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateInquiryStatus(selectedInquiry.id, e.target.value as Inquiry['status'])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff0f0f] focus:border-transparent bg-white"
                >
                  <option value="new">Neu</option>
                  <option value="contacted">Kontaktiert</option>
                  <option value="converted">Konvertiert</option>
                  <option value="closed">Geschlossen</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Wählen Sie eine Anfrage aus, um Details anzuzeigen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiriesPage;
