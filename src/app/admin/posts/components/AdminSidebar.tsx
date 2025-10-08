"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiFileText,
  FiUsers,
  FiImage,
  FiMessageSquare,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiShield,
  FiCheckCircle,
  FiBell,
  FiMonitor,
  FiSearch,
  FiTrendingUp,
} from "react-icons/fi";

interface AdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Overview",
    "Content Management",
    "Moderation",
    "Analytics & Reports",
    "System & Security",
  ]);

  const sidebarItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <FiHome size={20} />,
      description: "Overview and key metrics",
      path: "/admin/posts",
      category: "Overview",
    },
    {
      id: "management",
      title: "Post Management",
      icon: <FiFileText size={20} />,
      description: "Manage posts, drafts, and scheduling",
      path: "/admin/posts/management",
      category: "Content Management",
    },
    {
      id: "media",
      title: "Media Library",
      icon: <FiImage size={20} />,
      description: "Images, videos, and media files",
      path: "/admin/posts/media",
      category: "Content Management",
    },
    {
      id: "users",
      title: "User Insights",
      icon: <FiUsers size={20} />,
      description: "User profiles and engagement",
      path: "/admin/posts/users",
      category: "Content Management",
    },
    {
      id: "comments",
      title: "Comments & Reactions",
      icon: <FiMessageSquare size={20} />,
      description: "Moderate comments and engagement",
      path: "/admin/posts/comments",
      category: "Moderation",
    },
    {
      id: "moderation",
      title: "Reports & Flags",
      icon: <FiCheckCircle size={20} />,
      description: "Content moderation and reports",
      path: "/admin/posts/moderation",
      category: "Moderation",
    },
    {
      id: "curation",
      title: "Content Curation",
      icon: <FiShield size={20} />,
      description: "Curate and feature posts",
      path: "/admin/posts/curation",
      category: "Moderation",
    },
    {
      id: "analytics",
      title: "Analytics & Trends",
      icon: <FiTrendingUp size={20} />,
      description: "Post analytics and insights",
      path: "/admin/posts/analytics",
      category: "Analytics & Reports",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <FiBell size={20} />,
      description: "Notification management",
      path: "/admin/posts/notifications",
      category: "System & Security",
    },
    {
      id: "monitoring",
      title: "System Monitoring",
      icon: <FiMonitor size={20} />,
      description: "System health and performance",
      path: "/admin/posts/monitoring",
      category: "System & Security",
    },
    {
      id: "settings",
      title: "Settings",
      icon: <FiSettings size={20} />,
      description: "Configuration and preferences",
      path: "/admin/posts/settings",
      category: "System & Security",
    },
  ];

  const groupedItems = [
    {
      category: "Overview",
      items: sidebarItems.filter((item) => item.category === "Overview"),
    },
    {
      category: "Content Management",
      items: sidebarItems.filter(
        (item) => item.category === "Content Management"
      ),
    },
    {
      category: "Moderation",
      items: sidebarItems.filter((item) => item.category === "Moderation"),
    },
    {
      category: "Analytics & Reports",
      items: sidebarItems.filter(
        (item) => item.category === "Analytics & Reports"
      ),
    },
    {
      category: "System & Security",
      items: sidebarItems.filter(
        (item) => item.category === "System & Security"
      ),
    },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredGroupedItems = groupedItems
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0 || sidebarCollapsed);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Overview: "from-cyan-500 to-blue-600",
      "Content Management": "from-blue-500 to-indigo-600",
      Moderation: "from-orange-500 to-amber-600",
      "Analytics & Reports": "from-purple-500 to-pink-600",
      "System & Security": "from-slate-600 to-gray-700",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 h-21 px-4 flex items-center justify-between border-b border-gray-200/80 bg-gradient-to-r from-cyan-50/50 to-blue-50/50">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  Posts Admin
                </div>
                <div className="text-xs text-gray-500">
                  LinkedIn-Style Feed
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 hidden lg:flex items-center justify-center"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <FiChevronRight size={18} />
            ) : (
              <FiChevronLeft size={18} />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {!sidebarCollapsed && (
          <div className="px-3 py-3 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {filteredGroupedItems.map((group) => (
              <div key={group.category} className="mb-3">
                {!sidebarCollapsed && (
                  <div
                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold cursor-pointer group"
                    onClick={() => toggleCategory(group.category)}
                  >
                    <span
                      className={`bg-gradient-to-r ${getCategoryColor(
                        group.category
                      )} bg-clip-text text-transparent uppercase tracking-wide`}
                    >
                      {group.category}
                    </span>
                    <div className="h-5 w-5 rounded-md flex items-center justify-center transition-all duration-300 bg-gray-50 hover:bg-gray-100">
                      <svg
                        className={`h-3 w-3 text-gray-500 transition-transform ${
                          expandedCategories.includes(group.category)
                            ? "rotate-180"
                            : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {sidebarCollapsed && (
                  <div className="my-2 border-t border-gray-200 mx-2" />
                )}

                <div
                  className={`space-y-0.5 ${
                    !sidebarCollapsed &&
                    !expandedCategories.includes(group.category)
                      ? "hidden"
                      : ""
                  }`}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : "justify-start"
                      } px-3 py-2.5 rounded-lg transition-all duration-200 relative group
                        ${
                          pathname === item.path ||
                          (item.id === "dashboard" &&
                            pathname === "/admin/posts")
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-200"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div
                        className={`flex items-center ${
                          !sidebarCollapsed ? "w-full" : ""
                        }`}
                      >
                        <div
                          className={`relative flex-shrink-0 transition-all duration-200
                            ${
                              hoveredItem === item.id &&
                              pathname !== item.path
                                ? "transform scale-110"
                                : ""
                            }`}
                        >
                          {item.icon}
                        </div>

                        {!sidebarCollapsed && (
                          <div className="ml-3 flex-1 min-w-0">
                            <div
                              className={`text-sm font-medium truncate ${
                                hoveredItem === item.id ? "font-semibold" : ""
                              }`}
                            >
                              {item.title}
                            </div>
                            <div
                              className={`text-xs truncate ${
                                pathname === item.path ||
                                (item.id === "dashboard" &&
                                  pathname === "/admin/posts")
                                  ? "text-cyan-100"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.description}
                            </div>
                          </div>
                        )}
                      </div>

                      {!sidebarCollapsed &&
                        (pathname === item.path ||
                          (item.id === "dashboard" &&
                            pathname === "/admin/posts")) && (
                          <div className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                        )}

                      {(pathname === item.path ||
                        (item.id === "dashboard" &&
                          pathname === "/admin/posts")) && (
                        <div className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-r-md transform -translate-y-1/2 shadow-sm" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200/80 bg-gradient-to-b from-white to-gray-50/50">
          <div
            className={`flex ${
              sidebarCollapsed
                ? "flex-col items-center"
                : "items-center justify-between"
            }`}
          >
            <div
              className={`flex items-center ${
                sidebarCollapsed ? "flex-col" : ""
              }`}
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm ring-2 ring-cyan-100">
                  <span className="text-sm font-bold text-white">PA</span>
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              </div>

              {!sidebarCollapsed && (
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    Posts Admin
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Content Manager
                  </p>
                </div>
              )}
            </div>

            <button
              className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                sidebarCollapsed ? "mt-2" : ""
              }`}
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>

          {!sidebarCollapsed && (
            <Link
              href="/admin"
              className="w-full mt-3 px-3 py-2 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all duration-200 flex items-center justify-center font-medium border border-cyan-200 hover:border-cyan-300"
            >
              ← Back to Main Admin
            </Link>
          )}
        </div>
      </aside>

      {/* Content Spacer */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "ml-20" : "ml-72"
        }`}
      ></div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;
