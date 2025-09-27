"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Follower {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followedAt: string;
  isVerified: boolean;
  followersCount: number;
  postsCount: number;
}

// Mock followers data
const mockFollowers: Follower[] = [
  {
    id: "follower_1",
    name: "Alex Chen",
    username: "alexchen",
    avatarUrl: "/avatars/alex.jpg",
    bio: "Full-stack developer passionate about React and Node.js",
    followedAt: "2024-12-10T14:30:00.000Z",
    isVerified: true,
    followersCount: 1250,
    postsCount: 45
  },
  {
    id: "follower_2",
    name: "Maria Rodriguez",
    username: "mariarod",
    avatarUrl: "/avatars/maria.jpg",
    bio: "UI/UX Designer creating beautiful digital experiences",
    followedAt: "2024-12-08T09:15:00.000Z",
    isVerified: false,
    followersCount: 890,
    postsCount: 32
  },
  {
    id: "follower_3",
    name: "David Kim",
    username: "davidkim",
    avatarUrl: "/avatars/david.jpg",
    bio: "Product Manager & Tech Writer. Building the future of work.",
    followedAt: "2024-12-05T16:45:00.000Z",
    isVerified: true,
    followersCount: 2100,
    postsCount: 78
  },
  {
    id: "follower_4",
    name: "Sarah Wilson",
    username: "sarahw",
    avatarUrl: "/avatars/sarah.jpg",
    bio: "Frontend developer specializing in Vue.js and TypeScript",
    followedAt: "2024-12-03T11:20:00.000Z",
    isVerified: false,
    followersCount: 650,
    postsCount: 28
  },
  {
    id: "follower_5",
    name: "James Thompson",
    username: "jamest",
    avatarUrl: "/avatars/james.jpg",
    bio: "DevOps engineer and cloud architecture enthusiast",
    followedAt: "2024-12-01T13:10:00.000Z",
    isVerified: true,
    followersCount: 1800,
    postsCount: 56
  }
];

export default function FollowersSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredFollowers = mockFollowers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Followers</h2>
        <p className="text-sm text-gray-500">People who follow your blog ({mockFollowers.length} total)</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
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
            placeholder="Search followers by name, username, or bio..."
          />
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600">
            Showing {filteredFollowers.length} of {mockFollowers.length} followers
          </div>
        )}
      </div>

      {/* Followers List */}
      {filteredFollowers.length > 0 ? (
        <div className="space-y-4">
          {filteredFollowers.map((follower) => (
            <div key={follower.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {follower.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{follower.name}</h3>
                    {follower.isVerified && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-500">@{follower.username}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">{follower.bio}</p>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <span>{follower.followersCount.toLocaleString()} followers</span>
                    <span>{follower.postsCount} posts</span>
                    <span>Followed {formatDate(follower.followedAt)}</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => router.push(`/profile/${follower.username}`)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No followers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}
