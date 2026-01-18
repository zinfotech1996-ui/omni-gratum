
import { supabase } from '@/lib/supabase';

export interface Employee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'employee';
  phone: string;
  position: string;
  status: 'active' | 'inactive';
  hire_date: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'gebaudereinigung' | 'gartenservice' | 'hausmeisterdienst';
  price_from: number;
  price_unit: string;
  is_active: boolean;
  created_at: string;
}

export interface Customer {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  industry: string;
  notes: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Task {
  id: string;
  employee_id: string;
  customer_id: string;
  service_id: string;
  title: string;
  description: string;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  completed_at: string | null;
  created_at: string;
  customers?: { company_name: string };
  services?: { name: string };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_interest: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export interface DashboardStats {
  activeEmployees: number;
  totalCustomers: number;
  pendingTasks: number;
  newInquiries: number;
}

const callApi = async (action: string, data?: any) => {
  const { data: result, error } = await supabase.functions.invoke('omni-gratum-api', {
    body: { action, data }
  });
  
  if (error) throw new Error(error.message);
  if (result?.error) throw new Error(result.error);
  
  return result;
};

export const api = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    const result = await callApi('getDashboardStats');
    return result.stats;
  },

  // Employees
  getEmployees: async (): Promise<Employee[]> => {
    const result = await callApi('getEmployees');
    return result.employees;
  },
  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    const result = await callApi('updateEmployee', { id, updates });
    return result.employee;
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    const result = await callApi('getServices');
    return result.services;
  },
  createService: async (service: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
    const result = await callApi('createService', service);
    return result.service;
  },
  updateService: async (id: string, updates: Partial<Service>): Promise<Service> => {
    const result = await callApi('updateService', { id, updates });
    return result.service;
  },

  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    const result = await callApi('getCustomers');
    return result.customers;
  },
  createCustomer: async (customer: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> => {
    const result = await callApi('createCustomer', customer);
    return result.customer;
  },

  // Tasks
  getTasks: async (employeeId?: string): Promise<Task[]> => {
    const result = await callApi('getTasks', employeeId ? { employee_id: employeeId } : undefined);
    return result.tasks;
  },
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const result = await callApi('updateTask', { id, updates });
    return result.task;
  },

  // Inquiries
  getInquiries: async (): Promise<Inquiry[]> => {
    const result = await callApi('getInquiries');
    return result.inquiries;
  },
  createInquiry: async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> => {
    const result = await callApi('createInquiry', inquiry);
    return result.inquiry;
  },
  updateInquiry: async (id: string, updates: Partial<Inquiry>): Promise<Inquiry> => {
    const result = await callApi('updateInquiry', { id, updates });
    return result.inquiry;
  }
};
