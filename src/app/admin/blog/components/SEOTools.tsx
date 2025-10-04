'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seoSchema, type SeoFormData } from '../lib/validation';
import toast from 'react-hot-toast';

export default function SEOTools() {
  const [activeTab, setActiveTab] = useState<'meta' | 'keywords' | 'sitemap'>('meta');
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SeoFormData>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      metaTitle: '',
      metaDescription: '',
      robots: 'index,follow',
      keywords: [],
    }
  });

  const metaTitle = watch('metaTitle') || '';
  const metaDescription = watch('metaDescription') || '';

  const onSubmit = (data: SeoFormData) => {
    toast.success('SEO settings saved!');
    console.log('SEO Data:', data);
  };

  const keywords = [
    { keyword: 'Next.js', position: 3, trend: 'up', volume: 45000 },
    { keyword: 'React', position: 5, trend: 'up', volume: 82000 },
    { keyword: 'TypeScript', position: 8, trend: 'down', volume: 38000 },
    { keyword: 'Web Development', position: 12, trend: 'stable', volume: 95000 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">SEO Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Optimize your content for search engines
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex border-b dark:border-gray-700">
          {(['meta', 'keywords', 'sitemap'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'meta' && '🏷️ Meta Tags'}
              {tab === 'keywords' && '🔍 Keywords'}
              {tab === 'sitemap' && '🗺️ Sitemap'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'meta' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Title
                  <span className="text-gray-500 ml-2">({metaTitle.length}/60)</span>
                </label>
                <input
                  {...register('metaTitle')}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter meta title..."
                />
                {errors.metaTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
                )}
                <div className="mt-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        metaTitle.length > 60 ? 'bg-red-500' :
                        metaTitle.length > 50 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((metaTitle.length / 60) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Description
                  <span className="text-gray-500 ml-2">({metaDescription.length}/160)</span>
                </label>
                <textarea
                  {...register('metaDescription')}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter meta description..."
                />
                {errors.metaDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.metaDescription.message}</p>
                )}
                <div className="mt-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        metaDescription.length > 160 ? 'bg-red-500' :
                        metaDescription.length > 140 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((metaDescription.length / 160) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Canonical URL</label>
                <input
                  {...register('canonicalUrl')}
                  type="url"
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://example.com/post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Robots</label>
                <select
                  {...register('robots')}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="index,follow">Index, Follow</option>
                  <option value="noindex,nofollow">No Index, No Follow</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                💾 Save SEO Settings
              </button>
            </form>
          )}

          {activeTab === 'keywords' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Keyword Tracking</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  ➕ Add Keyword
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Keyword</th>
                      <th className="px-4 py-3 text-left font-semibold">Position</th>
                      <th className="px-4 py-3 text-left font-semibold">Trend</th>
                      <th className="px-4 py-3 text-left font-semibold">Volume</th>
                      <th className="px-4 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((kw, idx) => (
                      <tr key={idx} className="border-t dark:border-gray-700">
                        <td className="px-4 py-3 font-medium">{kw.keyword}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            #{kw.position}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {kw.trend === 'up' && <span className="text-green-600">↑ Up</span>}
                          {kw.trend === 'down' && <span className="text-red-600">↓ Down</span>}
                          {kw.trend === 'stable' && <span className="text-gray-600">→ Stable</span>}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {kw.volume.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Sitemap Status</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Last generated: October 4, 2025 at 10:30 AM
                </p>
                <button
                  onClick={() => toast.success('Sitemap generated successfully!')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  🔄 Regenerate Sitemap
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-medium">Posts Sitemap</p>
                    <p className="text-sm text-gray-500">55 URLs included</p>
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    View →
                  </a>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <div>
                    <p className="font-medium">Categories Sitemap</p>
                    <p className="text-sm text-gray-500">8 URLs included</p>
                  </div>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    View →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
