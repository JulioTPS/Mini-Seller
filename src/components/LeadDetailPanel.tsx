import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, PencilIcon, CheckIcon, XMarkIcon as CancelIcon } from '@heroicons/react/24/outline';
import type { Lead, LeadStatus, Opportunity } from '../types';
import { validateEmail } from '../utils/api';
import clsx from 'clsx';

interface LeadDetailPanelProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (leadId: string, updates: Partial<Lead>) => void;
  onConvertToOpportunity: (lead: Lead, opportunity: Omit<Opportunity, 'id'>) => void;
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'qualified', 'unqualified'];

export default function LeadDetailPanel({ 
  lead, 
  isOpen, 
  onClose, 
  onUpdateLead, 
  onConvertToOpportunity 
}: LeadDetailPanelProps) {
  const [editingField, setEditingField] = useState<'status' | 'email' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertFormData, setConvertFormData] = useState({
    stage: 'discovery',
    amount: '',
  });

  if (!lead) return null;

  const handleEditStart = (field: 'status' | 'email') => {
    setEditingField(field);
    setEditValue(field === 'status' ? lead.status : lead.email);
    setEmailError('');
  };

  const handleEditSave = () => {
    if (editingField === 'email') {
      if (!validateEmail(editValue)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError('');
    }

    onUpdateLead(lead.id, { [editingField!]: editValue });
    setEditingField(null);
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setEditValue('');
    setEmailError('');
  };

  const handleConvertToOpportunity = () => {
    const opportunity: Omit<Opportunity, 'id'> = {
      name: `${lead.company} - ${lead.name}`,
      stage: convertFormData.stage,
      amount: convertFormData.amount ? parseFloat(convertFormData.amount) : undefined,
      accountName: lead.company,
    };

    onConvertToOpportunity(lead, opportunity);
    setIsConverting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md transform transition ease-in-out duration-300 sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Lead Details
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="space-y-6">
                    {/* Lead Info */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-500">{lead.company}</p>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 flex items-center space-x-2">
                        {editingField === 'email' ? (
                          <>
                            <input
                              type="email"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className={clsx(
                                'flex-1 border rounded-md px-3 py-2 text-sm',
                                emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                              )}
                            />
                            <button
                              onClick={handleEditSave}
                              className="text-green-600 hover:text-green-800"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="text-red-600 hover:text-red-800"
                            >
                              <CancelIcon className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-gray-900">{lead.email}</span>
                            <button
                              onClick={() => handleEditStart('email')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">{emailError}</p>
                      )}
                    </div>

                    {/* Status Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1 flex items-center space-x-2">
                        {editingField === 'status' ? (
                          <>
                            <select
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500"
                            >
                              {statusOptions.map(status => (
                                <option key={status} value={status}>
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={handleEditSave}
                              className="text-green-600 hover:text-green-800"
                            >
                              <CheckIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="text-red-600 hover:text-red-800"
                            >
                              <CancelIcon className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-gray-900 capitalize">{lead.status}</span>
                            <button
                              onClick={() => handleEditStart('status')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Other Fields (Read-only) */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Source</label>
                        <p className="mt-1 text-sm text-gray-900">{lead.source}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Score</label>
                        <div className="mt-1 flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">{lead.score}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={clsx(
                                'h-2 rounded-full',
                                lead.score >= 80 ? 'bg-green-600' : 
                                lead.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                              )}
                              style={{ width: `${lead.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Convert to Opportunity Section */}
                    <div className="border-t pt-6">
                      {!isConverting ? (
                        <button
                          onClick={() => setIsConverting(true)}
                          disabled={lead.status !== 'qualified'}
                          className={clsx(
                            'w-full px-4 py-2 rounded-md text-sm font-medium transition-colors',
                            lead.status === 'qualified'
                              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          )}
                        >
                          Convert to Opportunity
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-900">Convert to Opportunity</h4>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Stage</label>
                            <select
                              value={convertFormData.stage}
                              onChange={(e) => setConvertFormData({ ...convertFormData, stage: e.target.value })}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500"
                            >
                              <option value="discovery">Discovery</option>
                              <option value="proposal">Proposal</option>
                              <option value="negotiation">Negotiation</option>
                              <option value="closed-won">Closed Won</option>
                              <option value="closed-lost">Closed Lost</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Amount (optional)</label>
                            <input
                              type="number"
                              placeholder="0.00"
                              value={convertFormData.amount}
                              onChange={(e) => setConvertFormData({ ...convertFormData, amount: e.target.value })}
                              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500"
                            />
                          </div>

                          <div className="flex space-x-3">
                            <button
                              onClick={handleConvertToOpportunity}
                              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                            >
                              Create Opportunity
                            </button>
                            <button
                              onClick={() => setIsConverting(false)}
                              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {lead.status !== 'qualified' && !isConverting && (
                        <p className="mt-2 text-xs text-gray-500">
                          Lead must be qualified to convert to opportunity
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}