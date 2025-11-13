"use client"

import React, { useState } from 'react';

// Import actual admin layouts
import BlogAdminLayout from '@/app/admin/blog/layout';
import PostsAdminLayout from '@/app/admin/posts/layout';
import QAAdminLayout from '@/app/admin/qa/layout';
import CommunityAdminLayout from '@/app/admin/community/layout';
import ProjectAdminLayout from '@/app/admin/projects/layout';
import MarketplaceAdminLayout from '@/app/admin/marketplace/layout';

type ModuleKey = 'blog' | 'posts' | 'qa' | 'community' | 'projects' | 'marketplace';

const ModuleViews: Record<ModuleKey, () => React.ReactElement> = {
  blog: () => (
    <div className="border rounded-lg overflow-hidden">
      <BlogAdminLayout>
        <div className="p-6 text-sm text-gray-600">Blog Admin loaded inside Super Admin.</div>
      </BlogAdminLayout>
    </div>
  ),
  posts: () => (
    <div className="border rounded-lg overflow-hidden">
      <PostsAdminLayout>
        <div className="p-6 text-sm text-gray-600">Posts Admin loaded inside Super Admin.</div>
      </PostsAdminLayout>
    </div>
  ),
  qa: () => (
    <div className="border rounded-lg overflow-hidden">
      <QAAdminLayout>
        <div className="p-6 text-sm text-gray-600">QA Admin loaded inside Super Admin.</div>
      </QAAdminLayout>
    </div>
  ),
  community: () => (
    <div className="border rounded-lg overflow-hidden">
      <CommunityAdminLayout>
        <div className="p-6 text-sm text-gray-600">Community Admin loaded inside Super Admin.</div>
      </CommunityAdminLayout>
    </div>
  ),
  projects: () => (
    <div className="border rounded-lg overflow-hidden">
      <ProjectAdminLayout>
        <div className="p-6 text-sm text-gray-600">Projects Admin loaded inside Super Admin.</div>
      </ProjectAdminLayout>
    </div>
  ),
  marketplace: () => (
    <div className="border rounded-lg overflow-hidden">
      <MarketplaceAdminLayout>
        <div className="p-6 text-sm text-gray-600">Marketplace Admin loaded inside Super Admin.</div>
      </MarketplaceAdminLayout>
    </div>
  ),
};

export default function RemotesPage() {
  const [selected, setSelected] = useState<ModuleKey>('blog');
  const Selected = ModuleViews[selected];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {(
          Object.keys(ModuleViews) as ModuleKey[]
        ).map((key) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-3 py-1.5 rounded-md text-sm border transition-colors
              ${selected === key ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 super-embed overflow-hidden">
        <Selected />
      </div>

      <style jsx global>{`
        /* Hide embedded platform sidebars inside the Super Admin viewer */
        .super-embed aside { display: none !important; }
        /* Remove left margins added for hidden sidebars (e.g., ml-72 / ml-20) */
        .super-embed [class*="ml-72"],
        .super-embed [class*="ml-20"] { margin-left: 0 !important; }
        /* Ensure embedded headers/content don't overlap our own sidebar */
        .super-embed [class*="sticky"] { left: 0; }
      `}</style>
    </div>
  );
}


