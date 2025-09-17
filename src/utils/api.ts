import type { Lead } from '../types';

export const loadLeads = async (): Promise<Lead[]> => {
  try {
    const response = await fetch('/leads.json');
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    const leads = await response.json();
    return leads;
  } catch (error) {
    console.error('Error loading leads:', error);
    throw error;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};