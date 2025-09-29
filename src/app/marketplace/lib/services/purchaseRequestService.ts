// marketplace/src/lib/services/purchaseRequestService.ts

import {
  PurchaseRequest,
  ProjectRequest,
  CreatePurchaseRequestData,
  ReviewPurchaseRequestData,
  PurchaseRequestFilters,
  ProjectRequestFilters,
  PurchaseRequestListResponse,
  ProjectRequestListResponse,
  PurchaseRequestStats,
  ProjectRequestStats,
  PurchaseRequestNotification,
  ProjectState,
  PurchaseRequestState
} from '../../types/purchase-request';
import { Project } from '../../types/project';

// Mock data storage (in production, this would be database calls)
let purchaseRequests: PurchaseRequest[] = [
  {
    id: 'req_1',
    projectId: 'proj_1',
    projectTitle: 'E-commerce React Template',
    projectDescription: 'A modern e-commerce template built with React and TypeScript',
    projectPrice: 299,
    projectLicenseType: 'commercial',
    buyerId: 'buyer_1',
    buyerName: 'Alice Johnson',
    buyerEmail: 'alice@example.com',
    buyerMessage: 'I\'m interested in using this for my client\'s online store. Can you provide any additional documentation?',
    sellerId: 'seller_1',
    sellerName: 'John Developer',
    sellerEmail: 'john@example.com',
    state: 'pending',
    requestedAt: '2024-01-20T10:30:00Z',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    downloadCount: 0,
    maxDownloads: 3,
    platformFee: 14.95,
    sellerPayout: 284.05,
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: 'req_2',
    projectId: 'proj_2',
    projectTitle: 'Mobile App UI Kit',
    projectDescription: 'Complete UI kit for mobile applications with 50+ components',
    projectPrice: 199,
    projectLicenseType: 'commercial',
    buyerId: 'buyer_2',
    buyerName: 'Bob Smith',
    buyerEmail: 'bob@example.com',
    buyerMessage: 'This looks perfect for my startup\'s mobile app. Is it compatible with React Native 0.72?',
    sellerId: 'seller_2',
    sellerName: 'Sarah Designer',
    sellerEmail: 'sarah@example.com',
    state: 'approved',
    requestedAt: '2024-01-19T14:20:00Z',
    reviewedAt: '2024-01-19T16:45:00Z',
    sellerResponse: 'Yes, it\'s fully compatible with React Native 0.72. I\'ve included detailed setup instructions.',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    downloadCount: 0,
    maxDownloads: 3,
    platformFee: 9.95,
    sellerPayout: 189.05,
    createdAt: '2024-01-19T14:20:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: 'req_3',
    projectId: 'proj_1',
    projectTitle: 'E-commerce React Template',
    projectDescription: 'A modern e-commerce template built with React and TypeScript',
    projectPrice: 299,
    projectLicenseType: 'commercial',
    buyerId: 'buyer_3',
    buyerName: 'Carol Wilson',
    buyerEmail: 'carol@example.com',
    buyerMessage: 'I need this for a client project. Can you provide the source code as well?',
    sellerId: 'seller_1',
    sellerName: 'John Developer',
    sellerEmail: 'john@example.com',
    state: 'completed',
    requestedAt: '2024-01-18T09:15:00Z',
    reviewedAt: '2024-01-18T11:30:00Z',
    paidAt: '2024-01-18T15:20:00Z',
    completedAt: '2024-01-18T15:20:00Z',
    sellerResponse: 'Absolutely! The package includes full source code, documentation, and setup instructions.',
    paymentMethod: 'card',
    paymentStatus: 'completed',
    transactionId: 'txn_123456789',
    accessToken: 'access_token_abc123',
    downloadCount: 1,
    maxDownloads: 3,
    downloadExpiresAt: '2024-02-17T15:20:00Z',
    platformFee: 14.95,
    sellerPayout: 284.05,
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-18T15:20:00Z'
  },
  {
    id: 'req_4',
    projectId: 'proj_2',
    projectTitle: 'Mobile App UI Kit',
    projectDescription: 'Complete UI kit for mobile applications with 50+ components',
    projectPrice: 199,
    projectLicenseType: 'commercial',
    buyerId: 'buyer_4',
    buyerName: 'David Brown',
    buyerEmail: 'david@example.com',
    buyerMessage: 'Interested in this UI kit. Do you have any examples of apps using this design?',
    sellerId: 'seller_2',
    sellerName: 'Sarah Designer',
    sellerEmail: 'sarah@example.com',
    state: 'rejected',
    requestedAt: '2024-01-17T16:45:00Z',
    reviewedAt: '2024-01-17T18:20:00Z',
    rejectionReason: 'Sorry, this project is no longer available. I\'m working on an updated version.',
    paymentMethod: 'card',
    paymentStatus: 'pending',
    downloadCount: 0,
    maxDownloads: 3,
    platformFee: 9.95,
    sellerPayout: 189.05,
    createdAt: '2024-01-17T16:45:00Z',
    updatedAt: '2024-01-17T18:20:00Z'
  }
];

let projectRequests: ProjectRequest[] = [];

let notifications: PurchaseRequestNotification[] = [
  {
    id: 'notif_1',
    userId: 'seller_1',
    requestId: 'req_1',
    type: 'request_received',
    title: 'New Purchase Request',
    message: 'You have received a new purchase request for "E-commerce React Template"',
    isRead: false,
    createdAt: '2024-01-20T10:30:00Z',
    actionUrl: '/marketplace/requests/req_1'
  },
  {
    id: 'notif_2',
    userId: 'buyer_2',
    requestId: 'req_2',
    type: 'request_approved',
    title: 'Purchase Request Approved',
    message: 'Your request for "Mobile App UI Kit" has been approved. You can now complete the payment.',
    isRead: false,
    createdAt: '2024-01-19T16:45:00Z',
    actionUrl: '/marketplace/requests/req_2/payment'
  },
  {
    id: 'notif_3',
    userId: 'buyer_3',
    requestId: 'req_3',
    type: 'project_available',
    title: 'Project Available for Download',
    message: 'Your purchase of "E-commerce React Template" is complete. You can now download the project files.',
    isRead: true,
    createdAt: '2024-01-18T15:20:00Z',
    actionUrl: '/marketplace/requests/req_3/download'
  },
  {
    id: 'notif_4',
    userId: 'buyer_4',
    requestId: 'req_4',
    type: 'request_rejected',
    title: 'Purchase Request Rejected',
    message: 'Your request for "Mobile App UI Kit" has been rejected. Sorry, this project is no longer available.',
    isRead: false,
    createdAt: '2024-01-17T18:20:00Z',
    actionUrl: '/marketplace/requests/req_4'
  }
];

// Utility functions
const generateId = (prefix: string): string => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const delay = (ms: number = 500): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const calculatePlatformFee = (price: number): number => Math.round(price * 0.05 * 100) / 100; // 5% platform fee

const calculateSellerPayout = (price: number): number => price - calculatePlatformFee(price);

// Mock projects data (in production, this would come from the main project service)
const mockProjects: Project[] = [
  {
    id: 'proj_1',
    title: 'E-commerce React Template',
    description: 'A modern e-commerce template built with React and TypeScript',
    shortDescription: 'Modern e-commerce template',
    sellerId: 'seller_1',
    sellerName: 'John Developer',
    sellerAvatar: '/avatars/john.jpg',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    framework: 'Next.js',
    database: 'PostgreSQL',
    deployment: ['Vercel', 'Netlify'],
    browserCompat: ['Chrome', 'Firefox', 'Safari'],
    mobileResponsive: true,
    screenshots: ['/screenshots/ecommerce-1.jpg', '/screenshots/ecommerce-2.jpg'],
    demoUrl: 'https://demo.example.com',
    price: 299,
    licenseType: 'commercial',
    category: 'Web Templates',
    subcategory: 'E-commerce',
    tags: ['react', 'ecommerce', 'typescript'],
    downloads: 150,
    views: 1200,
    rating: 4.8,
    reviewCount: 45,
    featured: true,
    trending: false,
    isNew: false,
    isRequestOnly: true,
    state: 'pending_request',
    requiresApproval: true,
    autoApprove: false,
    maxRequestsPerBuyer: 1,
    totalRequests: 2,
    pendingRequests: 1,
    approvedRequests: 0,
    rejectedRequests: 0,
    completedRequests: 1,
    lastRequestAt: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'proj_2',
    title: 'Mobile App UI Kit',
    description: 'Complete UI kit for mobile applications with 50+ components',
    shortDescription: 'Mobile UI kit with 50+ components',
    sellerId: 'seller_2',
    sellerName: 'Sarah Designer',
    sellerAvatar: '/avatars/sarah.jpg',
    techStack: ['React Native', 'Figma', 'Sketch'],
    framework: 'React Native',
    deployment: ['iOS', 'Android'],
    browserCompat: ['iOS Safari', 'Chrome Mobile'],
    mobileResponsive: true,
    screenshots: ['/screenshots/mobile-1.jpg', '/screenshots/mobile-2.jpg'],
    price: 199,
    licenseType: 'commercial',
    category: 'Mobile UI',
    subcategory: 'UI Kits',
    tags: ['mobile', 'ui', 'react-native'],
    downloads: 89,
    views: 650,
    rating: 4.6,
    reviewCount: 23,
    featured: false,
    trending: true,
    isNew: true,
    isRequestOnly: true,
    state: 'available_for_request',
    requiresApproval: true,
    autoApprove: false,
    maxRequestsPerBuyer: 2,
    totalRequests: 2,
    pendingRequests: 0,
    approvedRequests: 1,
    rejectedRequests: 1,
    completedRequests: 0,
    lastRequestAt: '2024-01-19T14:20:00Z',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  }
];

export const purchaseRequestService = {
  // Create a new purchase request
  createPurchaseRequest: async (data: CreatePurchaseRequestData, buyerId: string): Promise<PurchaseRequest> => {
    await delay();
    
    const project = mockProjects.find(p => p.id === data.projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    if (!project.isRequestOnly) {
      throw new Error('This project is not available for request-based purchases');
    }
    
    if (project.state !== 'available_for_request') {
      throw new Error('This project is not currently accepting requests');
    }
    
    // Check if buyer has already made a request for this project
    const existingRequest = purchaseRequests.find(
      req => req.projectId === data.projectId && req.buyerId === buyerId && req.state !== 'rejected'
    );
    
    if (existingRequest) {
      throw new Error('You have already submitted a request for this project');
    }
    
    // Check max requests per buyer
    const buyerRequestCount = purchaseRequests.filter(
      req => req.projectId === data.projectId && req.buyerId === buyerId
    ).length;
    
    if (buyerRequestCount >= project.maxRequestsPerBuyer) {
      throw new Error(`You have reached the maximum number of requests (${project.maxRequestsPerBuyer}) for this project`);
    }
    
    const now = new Date();
    const newRequest: PurchaseRequest = {
      id: generateId('req'),
      projectId: data.projectId,
      projectTitle: project.title,
      projectDescription: project.description,
      projectPrice: project.price,
      projectLicenseType: project.licenseType,
      buyerId,
      buyerName: 'Current Buyer', // In real app, get from user context
      buyerEmail: data.billingAddress.email,
      buyerMessage: data.buyerMessage,
      sellerId: project.sellerId,
      sellerName: project.sellerName,
      sellerEmail: 'seller@example.com', // In real app, get from user context
      state: 'pending',
      requestedAt: now.toISOString(),
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      downloadCount: 0,
      maxDownloads: 3,
      platformFee: calculatePlatformFee(project.price),
      sellerPayout: calculateSellerPayout(project.price),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    
    purchaseRequests.push(newRequest);
    
    // Update project statistics
    project.totalRequests++;
    project.pendingRequests++;
    project.lastRequestAt = now.toISOString();
    project.state = 'pending_request';
    
    // Create notification for seller
    const sellerNotification: PurchaseRequestNotification = {
      id: generateId('notif'),
      userId: project.sellerId,
      requestId: newRequest.id,
      type: 'request_received',
      title: 'New Purchase Request',
      message: `You have received a new purchase request for "${project.title}"`,
      isRead: false,
      createdAt: now.toISOString(),
      actionUrl: `/marketplace/requests/${newRequest.id}`
    };
    notifications.push(sellerNotification);
    
    return newRequest;
  },

  // Get purchase request by ID
  getPurchaseRequest: async (id: string): Promise<PurchaseRequest> => {
    await delay();
    
    const request = purchaseRequests.find(r => r.id === id);
    if (!request) {
      throw new Error('Purchase request not found');
    }
    
    return request;
  },

  // Get purchase requests for seller
  getSellerRequests: async (sellerId: string, filters?: PurchaseRequestFilters): Promise<PurchaseRequestListResponse> => {
    await delay();
    
    let filteredRequests = purchaseRequests.filter(req => req.sellerId === sellerId);
    
    if (filters) {
      if (filters.state && filters.state.length > 0) {
        filteredRequests = filteredRequests.filter(req => filters.state!.includes(req.state));
      }
      
      if (filters.projectId) {
        filteredRequests = filteredRequests.filter(req => req.projectId === filters.projectId);
      }
      
      if (filters.buyerId) {
        filteredRequests = filteredRequests.filter(req => req.buyerId === filters.buyerId);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredRequests = filteredRequests.filter(req => 
          req.projectTitle.toLowerCase().includes(searchLower) ||
          req.buyerName.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.dateRange) {
        filteredRequests = filteredRequests.filter(req => {
          const requestDate = new Date(req.requestedAt);
          return requestDate >= new Date(filters.dateRange!.start) &&
                 requestDate <= new Date(filters.dateRange!.end);
        });
      }
    }
    
    // Sort by requested date (newest first)
    filteredRequests.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
    
    return {
      requests: filteredRequests,
      pagination: {
        page: 1,
        limit: filteredRequests.length,
        total: filteredRequests.length,
        totalPages: 1
      },
      filters: filters || {},
      sort: { field: 'requestedAt', direction: 'desc' }
    };
  },

  // Get purchase requests for buyer
  getBuyerRequests: async (buyerId: string, filters?: PurchaseRequestFilters): Promise<PurchaseRequestListResponse> => {
    await delay();
    
    let filteredRequests = purchaseRequests.filter(req => req.buyerId === buyerId);
    
    if (filters) {
      if (filters.state && filters.state.length > 0) {
        filteredRequests = filteredRequests.filter(req => filters.state!.includes(req.state));
      }
      
      if (filters.projectId) {
        filteredRequests = filteredRequests.filter(req => req.projectId === filters.projectId);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredRequests = filteredRequests.filter(req => 
          req.projectTitle.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Sort by requested date (newest first)
    filteredRequests.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
    
    return {
      requests: filteredRequests,
      pagination: {
        page: 1,
        limit: filteredRequests.length,
        total: filteredRequests.length,
        totalPages: 1
      },
      filters: filters || {},
      sort: { field: 'requestedAt', direction: 'desc' }
    };
  },

  // Review purchase request (approve/reject)
  reviewPurchaseRequest: async (data: ReviewPurchaseRequestData, sellerId: string): Promise<PurchaseRequest> => {
    await delay();
    
    const request = purchaseRequests.find(r => r.id === data.requestId);
    if (!request) {
      throw new Error('Purchase request not found');
    }
    
    if (request.sellerId !== sellerId) {
      throw new Error('You are not authorized to review this request');
    }
    
    if (request.state !== 'pending') {
      throw new Error('This request has already been reviewed');
    }
    
    const now = new Date();
    const project = mockProjects.find(p => p.id === request.projectId);
    
    if (data.action === 'approve') {
      request.state = 'approved';
      request.sellerResponse = data.response;
      request.reviewedAt = now.toISOString();
      
      // Update project state
      if (project) {
        project.pendingRequests--;
        project.approvedRequests++;
        project.state = 'approved_for_purchase';
      }
      
      // Create notification for buyer
      const buyerNotification: PurchaseRequestNotification = {
        id: generateId('notif'),
        userId: request.buyerId,
        requestId: request.id,
        type: 'request_approved',
        title: 'Purchase Request Approved',
        message: `Your request for "${request.projectTitle}" has been approved. You can now complete the payment.`,
        isRead: false,
        createdAt: now.toISOString(),
        actionUrl: `/marketplace/requests/${request.id}/payment`
      };
      notifications.push(buyerNotification);
      
    } else if (data.action === 'reject') {
      request.state = 'rejected';
      request.rejectionReason = data.rejectionReason;
      request.reviewedAt = now.toISOString();
      
      // Update project state
      if (project) {
        project.pendingRequests--;
        project.rejectedRequests++;
        // If no more pending requests, set back to available
        if (project.pendingRequests === 0) {
          project.state = 'available_for_request';
        }
      }
      
      // Create notification for buyer
      const buyerNotification: PurchaseRequestNotification = {
        id: generateId('notif'),
        userId: request.buyerId,
        requestId: request.id,
        type: 'request_rejected',
        title: 'Purchase Request Rejected',
        message: `Your request for "${request.projectTitle}" has been rejected. ${data.rejectionReason || ''}`,
        isRead: false,
        createdAt: now.toISOString(),
        actionUrl: `/marketplace/requests/${request.id}`
      };
      notifications.push(buyerNotification);
    }
    
    request.updatedAt = now.toISOString();
    
    return request;
  },

  // Complete payment for approved request
  completePayment: async (requestId: string, buyerId: string): Promise<PurchaseRequest> => {
    await delay();
    
    const request = purchaseRequests.find(r => r.id === requestId);
    if (!request) {
      throw new Error('Purchase request not found');
    }
    
    if (request.buyerId !== buyerId) {
      throw new Error('You are not authorized to complete this payment');
    }
    
    if (request.state !== 'approved') {
      throw new Error('This request is not approved for payment');
    }
    
    if (request.paymentStatus === 'completed') {
      throw new Error('Payment has already been completed');
    }
    
    const now = new Date();
    
    // Simulate payment processing
    request.paymentStatus = 'completed';
    request.transactionId = generateId('txn');
    request.paidAt = now.toISOString();
    request.state = 'completed';
    request.completedAt = now.toISOString();
    request.accessToken = generateId('access');
    request.downloadExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
    
    // Update project state
    const project = mockProjects.find(p => p.id === request.projectId);
    if (project) {
      project.approvedRequests--;
      project.completedRequests++;
      project.state = 'sold';
    }
    
    // Create notification for seller
    const sellerNotification: PurchaseRequestNotification = {
      id: generateId('notif'),
      userId: request.sellerId,
      requestId: request.id,
      type: 'payment_completed',
      title: 'Payment Completed',
      message: `Payment has been completed for "${request.projectTitle}". You will receive your payout shortly.`,
      isRead: false,
      createdAt: now.toISOString(),
      actionUrl: `/marketplace/requests/${request.id}`
    };
    notifications.push(sellerNotification);
    
    // Create notification for buyer
    const buyerNotification: PurchaseRequestNotification = {
      id: generateId('notif'),
      userId: request.buyerId,
      requestId: request.id,
      type: 'project_available',
      title: 'Project Available for Download',
      message: `Your purchase of "${request.projectTitle}" is complete. You can now download the project files.`,
      isRead: false,
      createdAt: now.toISOString(),
      actionUrl: `/marketplace/requests/${request.id}/download`
    };
    notifications.push(buyerNotification);
    
    request.updatedAt = now.toISOString();
    
    return request;
  },

  // Get project download access
  getDownloadAccess: async (requestId: string, buyerId: string): Promise<{ accessToken: string; downloadUrl: string }> => {
    await delay();
    
    const request = purchaseRequests.find(r => r.id === requestId);
    if (!request) {
      throw new Error('Purchase request not found');
    }
    
    if (request.buyerId !== buyerId) {
      throw new Error('You are not authorized to access this download');
    }
    
    if (request.state !== 'completed') {
      throw new Error('This request is not completed');
    }
    
    if (!request.accessToken) {
      throw new Error('Download access not available');
    }
    
    if (request.downloadExpiresAt && new Date(request.downloadExpiresAt) < new Date()) {
      throw new Error('Download access has expired');
    }
    
    if (request.downloadCount >= request.maxDownloads) {
      throw new Error('Maximum download limit reached');
    }
    
    // Increment download count
    request.downloadCount++;
    request.updatedAt = new Date().toISOString();
    
    return {
      accessToken: request.accessToken,
      downloadUrl: `/api/downloads/${requestId}?token=${request.accessToken}`
    };
  },

  // Get request-based projects
  getRequestBasedProjects: async (filters?: ProjectRequestFilters): Promise<ProjectRequestListResponse> => {
    await delay();
    
    let filteredProjects = mockProjects.filter(p => p.isRequestOnly);
    
    if (filters) {
      if (filters.state && filters.state.length > 0) {
        filteredProjects = filteredProjects.filter(p => filters.state!.includes(p.state));
      }
      
      if (filters.sellerId) {
        filteredProjects = filteredProjects.filter(p => p.sellerId === filters.sellerId);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Sort by last request date (most recent first)
    filteredProjects.sort((a, b) => {
      const aDate = a.lastRequestAt ? new Date(a.lastRequestAt).getTime() : 0;
      const bDate = b.lastRequestAt ? new Date(b.lastRequestAt).getTime() : 0;
      return bDate - aDate;
    });
    
    return {
      projects: filteredProjects,
      pagination: {
        page: 1,
        limit: filteredProjects.length,
        total: filteredProjects.length,
        totalPages: 1
      },
      filters: filters || {},
      sort: { field: 'lastRequestAt', direction: 'desc' }
    };
  },

  // Get statistics
  getPurchaseRequestStats: async (userId: string, role: 'seller' | 'buyer'): Promise<PurchaseRequestStats> => {
    await delay();
    
    let userRequests: PurchaseRequest[];
    
    if (role === 'seller') {
      userRequests = purchaseRequests.filter(req => req.sellerId === userId);
    } else {
      userRequests = purchaseRequests.filter(req => req.buyerId === userId);
    }
    
    const totalRequests = userRequests.length;
    const pendingRequests = userRequests.filter(req => req.state === 'pending').length;
    const approvedRequests = userRequests.filter(req => req.state === 'approved').length;
    const rejectedRequests = userRequests.filter(req => req.state === 'rejected').length;
    const completedRequests = userRequests.filter(req => req.state === 'completed').length;
    
    const totalValue = userRequests.reduce((sum, req) => sum + req.projectPrice, 0);
    const totalFees = userRequests.reduce((sum, req) => sum + req.platformFee, 0);
    
    // Calculate average response time (for sellers)
    let averageResponseTime = 0;
    if (role === 'seller') {
      const reviewedRequests = userRequests.filter(req => req.reviewedAt);
      if (reviewedRequests.length > 0) {
        const totalTime = reviewedRequests.reduce((sum, req) => {
          const requestTime = new Date(req.requestedAt).getTime();
          const reviewTime = new Date(req.reviewedAt!).getTime();
          return sum + (reviewTime - requestTime);
        }, 0);
        averageResponseTime = totalTime / reviewedRequests.length / (1000 * 60 * 60); // Convert to hours
      }
    }
    
    const approvalRate = totalRequests > 0 ? (approvedRequests / totalRequests) * 100 : 0;
    
    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      completedRequests,
      totalValue,
      totalFees,
      averageResponseTime,
      approvalRate
    };
  },

  // Get notifications
  getNotifications: async (userId: string): Promise<PurchaseRequestNotification[]> => {
    await delay();
    
    return notifications
      .filter(notif => notif.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string, userId: string): Promise<void> => {
    await delay();
    
    const notification = notifications.find(n => n.id === notificationId && n.userId === userId);
    if (notification) {
      notification.isRead = true;
    }
  }
};
