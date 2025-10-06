'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FiBarChart2,
  FiCheckCircle,
  FiPercent,
  FiLayers,
  FiTrendingUp,
  FiShoppingCart,
  FiFilter,
  FiSettings,
  FiAward,
  FiClock,
  FiX,
  FiCheck
} from 'react-icons/fi';

interface ComparisonLog {
  id: string;
  userId: string;
  userName: string;
  products: string[];
  timestamp: string;
  converted: boolean;
  purchasedProduct?: string;
}

const mockComparisonLogs: ComparisonLog[] = [
  {
    id: 'comp-1',
    userId: 'user-1',
    userName: 'Alice Johnson',
    products: ['React Admin Dashboard Pro', 'Next.js E-commerce Template'],
    timestamp: new Date(2025, 9, 5, 10, 30).toISOString(),
    converted: true,
    purchasedProduct: 'React Admin Dashboard Pro',
  },
  {
    id: 'comp-2',
    userId: 'user-2',
    userName: 'Bob Smith',
    products: ['Vue.js Mobile App UI Kit', 'Angular Dashboard Kit', 'React Admin Dashboard Pro'],
    timestamp: new Date(2025, 9, 4, 15, 20).toISOString(),
    converted: false,
  },
  {
    id: 'comp-3',
    userId: 'user-3',
    userName: 'Carol Williams',
    products: ['Next.js E-commerce Template', 'Landing Page Builder'],
    timestamp: new Date(2025, 9, 3, 9, 45).toISOString(),
    converted: true,
    purchasedProduct: 'Landing Page Builder',
  },
];

export default function ComparisonTools() {
  const [comparisonLogs, setComparisonLogs] = useState(mockComparisonLogs);
  const [filterConverted, setFilterConverted] = useState('all');

  const filteredLogs = comparisonLogs.filter(log =>
    filterConverted === 'all' ||
    (filterConverted === 'converted' && log.converted) ||
    (filterConverted === 'not-converted' && !log.converted)
  );

  // Analytics
  const totalComparisons = comparisonLogs.length;
  const conversions = comparisonLogs.filter(log => log.converted).length;
  const conversionRate = ((conversions / totalComparisons) * 100).toFixed(1);
  const avgProductsCompared = (comparisonLogs.reduce((acc, log) => acc + log.products.length, 0) / totalComparisons).toFixed(1);

  // Most compared products
  const productComparisonCount = comparisonLogs.reduce((acc, log) => {
    log.products.forEach(product => {
      acc[product] = (acc[product] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  const mostCompared = Object.entries(productComparisonCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Most purchased after comparison
  const purchasedAfterComparison = comparisonLogs
    .filter(log => log.purchasedProduct)
    .reduce((acc, log) => {
      acc[log.purchasedProduct!] = (acc[log.purchasedProduct!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  const topConverting = Object.entries(purchasedAfterComparison).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Comparison Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track product comparisons and user behavior
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Comparisons"
          value={totalComparisons}
          icon={<FiBarChart2 size={20} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Conversions"
          value={conversions}
          icon={<FiCheckCircle size={20} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<FiPercent size={20} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Avg Products"
          value={avgProductsCompared}
          icon={<FiLayers size={20} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Most Compared Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-blue-600" size={18} />
          Most Compared Products
        </h3>
        <div className="space-y-3">
          {mostCompared.map(([product, count], idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-900">{product}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{count}</p>
                <p className="text-xs text-gray-600">times compared</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Converting Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAward className="text-emerald-600" size={18} />
          Top Converting Products (After Comparison)
        </h3>
        <div className="space-y-3">
          {topConverting.map(([product, count], idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-900">{product}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600 flex items-center gap-1 justify-end">
                  <FiShoppingCart size={16} />
                  {count}
                </p>
                <p className="text-xs text-gray-600">purchases</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <select
          value={filterConverted}
          onChange={(e) => setFilterConverted(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium"
        >
          <option value="all">All Comparisons</option>
          <option value="converted">Converted</option>
          <option value="not-converted">Not Converted</option>
        </select>
      </div>

      {/* Comparison Logs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products Compared</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Count</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Converted</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Purchased</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900">{log.userName}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {log.products.map((product, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-medium">
                          {product}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                      <FiLayers size={12} />
                      {log.products.length}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {log.converted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-semibold">
                        <FiCheck size={10} />
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700 border border-gray-200 rounded-md text-xs font-semibold">
                        <FiX size={10} />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {log.purchasedProduct ? (
                      <span className="font-medium text-gray-900">{log.purchasedProduct}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1">
                    <FiClock size={12} />
                    {new Date(log.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBarChart2 size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No comparisons found</h3>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {/* Comparison Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiSettings className="text-purple-600" size={18} />
          Comparison Tool Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Products to Compare</label>
              <input
                type="number"
                defaultValue={3}
                min={2}
                max={5}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comparison Attributes</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm font-medium">
                <option>All Attributes</option>
                <option>Price, Features, Rating</option>
                <option>Custom Selection</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Enable Product Comparison</p>
              <p className="text-sm text-gray-600 mt-1">Allow users to compare products</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Show Comparison Suggestions</p>
              <p className="text-sm text-gray-600 mt-1">Suggest similar products to compare</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-sm"></div>
            </label>
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
