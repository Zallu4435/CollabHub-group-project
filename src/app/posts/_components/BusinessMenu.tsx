import React from 'react';
import Link from 'next/link';

interface BusinessMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BusinessMenu({ isOpen, onClose }: BusinessMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-300 w-[480px] z-50">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - My Apps */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">My Apps</h3>
              
               <div className="space-y-1 mb-6">
                 <Link 
                   href="/posts/business/leads"
                   onClick={onClose}
                   className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                 >
                   <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
                     </svg>
                   </div>
                   <span className="text-sm font-medium text-gray-900">Find Leads</span>
                 </Link>
                
                <Link 
                  href="/posts/business/group"
                  onClick={onClose}
                  className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Groups</span>
                </Link>
              </div>

              {/* Talent Section */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Talent</h4>
                 <div className="space-y-1">
                   <Link 
                     href="/posts/business/talent"
                     onClick={onClose}
                     className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                   >
                     <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                       <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                       </svg>
                     </div>
                     <span className="text-sm font-medium text-gray-900">Talent Insights</span>
                   </Link>
                  
                  <Link 
                    href="/posts/jobs"
                    onClick={onClose}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Post a job</span>
                  </Link>
                </div>
              </div>

               {/* Sales Section */}
               <div className="mb-6">
                 <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Sales</h4>
                 <Link 
                   href="/posts/business/marketplace"
                   onClick={onClose}
                   className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                 >
                   <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                     </svg>
                   </div>
                   <span className="text-sm font-medium text-gray-900">Services Marketplace</span>
                 </Link>
               </div>

               {/* Marketing Section */}
               <div className="mb-6">
                 <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Marketing</h4>
                 <Link 
                   href="/posts/business/advertise"
                   onClick={onClose}
                   className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                 >
                   <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                     </svg>
                   </div>
                   <span className="text-sm font-medium text-gray-900">Advertise</span>
                 </Link>
               </div>

               {/* Learning Section */}
               <div>
                 <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Learning</h4>
                 <Link 
                   href="/posts/business/learning"
                   onClick={onClose}
                   className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition-all"
                 >
                   <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
                     <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z"/>
                     </svg>
                   </div>
                   <span className="text-sm font-medium text-gray-900">Learning</span>
                 </Link>
               </div>
            </div>

            {/* Right Column - Explore more for business */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-base">Explore more for business</h3>
              
              <div className="space-y-1">
                 <Link 
                   href="/posts/business/talent"
                   onClick={onClose}
                   className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all block"
                 >
                   <div className="text-sm font-semibold text-gray-900 mb-0.5">Hire on DevConnect</div>
                   <div className="text-xs text-gray-600 leading-relaxed">Find, attract and recruit talent</div>
                 </Link>
                
                 <Link 
                   href="/posts/business/marketplace"
                   onClick={onClose}
                   className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all block"
                 >
                   <div className="text-sm font-semibold text-gray-900 mb-0.5">Sell with DevConnect</div>
                   <div className="text-xs text-gray-600 leading-relaxed">Unlock sales opportunities</div>
                 </Link>
                
                <Link 
                  href="/jobs/post"
                  onClick={onClose}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all block"
                >
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">Post a job for free</div>
                  <div className="text-xs text-gray-600 leading-relaxed">Get your job in front of quality candidates</div>
                </Link>
                
                 <Link 
                   href="/posts/business/advertise"
                   onClick={onClose}
                   className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all block"
                 >
                   <div className="text-sm font-semibold text-gray-900 mb-0.5">Market with DevConnect</div>
                   <div className="text-xs text-gray-600 leading-relaxed">Acquire customers and grow your business</div>
                 </Link>
                
                 <Link 
                   href="/posts/business/learning"
                   onClick={onClose}
                   className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all block"
                 >
                   <div className="text-sm font-semibold text-gray-900 mb-0.5">Learn with DevConnect</div>
                   <div className="text-xs text-gray-600 leading-relaxed">Courses to develop your employees</div>
                 </Link>
                
                <button className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all">
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">Admin Center</div>
                  <div className="text-xs text-gray-600 leading-relaxed">Manage billing and account details</div>
                </button>

                <div className="border-t border-gray-300 my-2"></div>
                
                <button className="w-full text-left p-3 hover:bg-gray-100 rounded transition-all">
                  <div className="text-sm font-semibold text-blue-600 mb-0.5 flex items-center gap-1">
                    Create a Company Page
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
