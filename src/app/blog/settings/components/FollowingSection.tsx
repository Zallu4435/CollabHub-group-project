"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Following {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followedAt: string;
  isVerified: boolean;
  followersCount: number;
  postsCount: number;
  lastPostAt: string;
  isActive: boolean;
}

// Mock following data
const mockFollowing: Following[] = [
  {
    id: "following_1",
    name: "TechCrunch",
    username: "techcrunch",
    avatarUrl: "/avatars/techcrunch.jpg",
    bio: "Breaking technology news, analysis, and insights from the startup world",
    followedAt: "2024-11-28T10:00:00.000Z",
    isVerified: true,
    followersCount: 2500000,
    postsCount: 12500,
    lastPostAt: "2024-12-15T08:30:00.000Z",
    isActive: true
  },
  {
    id: "following_2",
    name: "Dan Abramov",
    username: "dan_abramov",
    avatarUrl: "/avatars/dan.jpg",
    bio: "React core team member. Co-creator of Redux. Building tools for developers.",
    followedAt: "2024-11-25T14:20:00.000Z",
    isVerified: true,
    followersCount: 180000,
    postsCount: 890,
    lastPostAt: "2024-12-14T16:45:00.000Z",
    isActive: true
  },
  {
    id: "following_3",
    name: "Design Systems Daily",
    username: "designsystems",
    avatarUrl: "/avatars/designsystems.jpg",
    bio: "Curated design system resources, tools, and best practices",
    followedAt: "2024-11-20T09:15:00.000Z",
    isVerified: false,
    followersCount: 45000,
    postsCount: 1200,
    lastPostAt: "2024-12-13T12:00:00.000Z",
    isActive: true
  },
  {
    id: "following_4",
    name: "Kent C. Dodds",
    username: "kentcdodds",
    avatarUrl: "/avatars/kent.jpg",
    bio: "Making the world better, one developer at a time. Creator of Testing Library.",
    followedAt: "2024-11-18T11:30:00.000Z",
    isVerified: true,
    followersCount: 95000,
    postsCount: 2100,
    lastPostAt: "2024-12-12T14:20:00.000Z",
    isActive: true
  },
  {
    id: "following_5",
    name: "CSS-Tricks",
    username: "css",
    avatarUrl: "/avatars/css-tricks.jpg",
    bio: "Daily articles about CSS, HTML, JavaScript, and all things related to web design and development",
    followedAt: "2024-11-15T16:45:00.000Z",
    isVerified: true,
    followersCount: 320000,
    postsCount: 8500,
    lastPostAt: "2024-12-11T10:15:00.000Z",
    isActive: true
  },
  {
    id: "following_6",
    name: "Sarah Drasner",
    username: "sarah_edo",
    avatarUrl: "/avatars/sarah.jpg",
    bio: "VP of Developer Experience at Netlify. SVG, CSS, Vue.js enthusiast.",
    followedAt: "2024-11-10T13:20:00.000Z",
    isVerified: true,
    followersCount: 75000,
    postsCount: 1800,
    lastPostAt: "2024-12-08T09:30:00.000Z",
    isActive: false
  }
];

export default function FollowingSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "active" | "inactive">("all");
  const router = useRouter();

  const filteredFollowing = mockFollowing.filter(following => {
    const matchesSearch = following.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         following.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         following.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "active" && following.isActive) ||
                         (filterBy === "inactive" && !following.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getActivityStatus = (following: Following) => {
    const lastPostDate = new Date(following.lastPostAt);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - lastPostDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return { status: "Very Active", color: "text-green-600" };
    if (diffDays <= 7) return { status: "Active", color: "text-green-500" };
    if (diffDays <= 30) return { status: "Moderately Active", color: "text-yellow-500" };
    return { status: "Inactive", color: "text-gray-500" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Following</h2>
        <p className="text-sm text-gray-500">Blogs and authors you follow ({mockFollowing.length} total)</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Search by name, username, or bio..."
              />
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as "all" | "active" | "inactive")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
            >
              <option value="all" className="text-black">All</option>
              <option value="active" className="text-black">Active</option>
              <option value="inactive" className="text-black">Inactive</option>
            </select>
          </div>
        </div>

        {(searchQuery || filterBy !== "all") && (
          <div className="text-sm text-gray-600">
            Showing {filteredFollowing.length} of {mockFollowing.length} following
          </div>
        )}
      </div>

      {/* Following List */}
      {filteredFollowing.length > 0 ? (
        <div className="space-y-4">
          {filteredFollowing.map((following) => {
            const activityStatus = getActivityStatus(following);
            return (
              <div key={following.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {following.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{following.name}</h3>
                      {following.isVerified && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm text-gray-500">@{following.username}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{following.bio}</p>
                    
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <span>{following.followersCount.toLocaleString()} followers</span>
                      <span>{following.postsCount.toLocaleString()} posts</span>
                      <span>Followed {formatDate(following.followedAt)}</span>
                      <span className={activityStatus.color}>{activityStatus.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 space-x-2">
                    <button 
                      onClick={() => router.push(`/profile/${following.username}`)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                      Unfollow
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}
