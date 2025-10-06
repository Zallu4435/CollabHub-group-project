'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiPercent,
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiCalendar,
  FiGlobe,
  FiShield,
  FiFileText
} from 'react-icons/fi';

interface TaxRate {
  id: string;
  region: string;
  country: string;
  state?: string;
  taxType: string;
  rate: number;
  enabled: boolean;
  lastUpdated: string;
}

const mockTaxRates: TaxRate[] = [
  {
    id: 'tax-1',
    region: 'United States - California',
    country: 'USA',
    state: 'California',
    taxType: 'Sales Tax',
    rate: 7.25,
    enabled: true,
    lastUpdated: new Date(2025, 8, 1).toISOString(),
  },
  {
    id: 'tax-2',
    region: 'United States - New York',
    country: 'USA',
    state: 'New York',
    taxType: 'Sales Tax',
    rate: 8.875,
    enabled: true,
    lastUpdated: new Date(2025, 8, 1).toISOString(),
  },
  {
    id: 'tax-3',
    region: 'United Kingdom',
    country: 'UK',
    taxType: 'VAT',
    rate: 20,
    enabled: true,
    lastUpdated: new Date(2025, 7, 15).toISOString(),
  },
  {
    id: 'tax-4',
    region: 'India',
    country: 'India',
    taxType: 'GST',
    rate: 18,
    enabled: true,
    lastUpdated: new Date(2025, 9, 1).toISOString(),
  },
  {
    id: 'tax-5',
    region: 'European Union - Germany',
    country: 'Germany',
    taxType: 'VAT',
    rate: 19,
    enabled: true,
    lastUpdated: new Date(2025, 8, 10).toISOString(),
  },
];

export default function TaxManagement() {
  const [taxRates, setTaxRates] = useState(mockTaxRates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');

  const filteredRates = taxRates.filter(rate => {
    const matchesSearch = rate.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || rate.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = Array.from(new Set(taxRates.map(r => r.country)));

  const handleToggleTax = (taxId: string) => {
    setTaxRates(taxRates.map(t =>
      t.id === taxId ? { ...t, enabled: !t.enabled } : t
    ));
    toast.success('Tax rate status updated');
  };

  const handleUpdateRate = (taxId: string, newRate: number) => {
    setTaxRates(taxRates.map(t =>
      t.id === taxId ? { ...t, rate: newRate, lastUpdated: new Date().toISOString() } : t
    ));
    toast.success('Tax rate updated');
  };

  const totalTaxCollected = 12450.75;
  const avgTaxRate = taxRates.reduce((acc, t) => acc + t.rate, 0) / taxRates.length;
  const activeTaxRates = taxRates.filter(t => t.enabled).length;

  const getTaxTypeColor = (taxType: string) => {
    switch (taxType) {
      case 'Sales Tax': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'VAT': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'GST': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage tax rates and compliance by region
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all flex items-center gap-2"
        >
          <FiPlus size={16} />
          Add Tax Rate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Tax Rates"
          value={taxRates.length}
          icon={<FiPercent size={20} />}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
        />
        <StatCard
          title="Tax Collected (30d)"
          value={`$${totalTaxCollected.toLocaleString()}`}
          icon={<FiDollarSign size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Avg Tax Rate"
          value={`${avgTaxRate.toFixed(2)}%`}
          icon={<FiTrendingUp size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Regions"
          value={activeTaxRates}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
            />
          </div>
          
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tax Rates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Region</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rate (%)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRates.map(rate => (
                <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-1">
                    <FiGlobe size={12} />
                    {rate.region}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{rate.country}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getTaxTypeColor(rate.taxType)}`}>
                      <FiFileText size={10} />
                      {rate.taxType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={rate.rate}
                        onChange={(e) => handleUpdateRate(rate.id, parseFloat(e.target.value))}
                        step="0.01"
                        className="w-20 px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-semibold"
                      />
                      <FiPercent size={12} className="text-gray-600" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiCalendar size={12} />
                    {new Date(rate.lastUpdated).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rate.enabled}
                        onChange={() => handleToggleTax(rate.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors">
                      <FiEdit2 size={12} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredRates.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPercent size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tax rates found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Tax Compliance Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiShield className="text-purple-600" size={18} />
          Tax Compliance Information
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiGlobe size={14} />
              United States
            </p>
            <p className="text-sm text-gray-700">
              Sales tax nexus established in California, New York, and Texas. Economic nexus thresholds apply.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiGlobe size={14} />
              European Union
            </p>
            <p className="text-sm text-gray-700">
              VAT MOSS scheme enabled for digital services. VAT registered in Ireland for EU sales.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FiGlobe size={14} />
              India
            </p>
            <p className="text-sm text-gray-700">
              GST registered. IGST applicable for inter-state transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, iconColor }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
