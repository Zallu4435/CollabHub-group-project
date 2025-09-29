// market/src/lib/services/escrowService.ts

import { 
  EscrowProject, 
  EscrowState, 
  CreateEscrowRequest, 
  PurchaseEscrowRequest,
  RaiseDisputeRequest,
  ResolveDisputeRequest,
  EscrowFilters,
  EscrowListResponse,
  EscrowStats,
  EscrowTransaction,
  EscrowDispute,
  EscrowNotification
} from '../../types/escrow';

// Mock data storage (in real app, this would be database calls)
let escrows: EscrowProject[] = [
  {
    id: 'escrow_1',
    projectId: 'project_1',
    projectTitle: 'Modern E-commerce Dashboard',
    projectDescription: 'Complete admin dashboard for e-commerce platforms with analytics, product management, order tracking, and customer insights. Built with modern React patterns and TypeScript for maximum maintainability.',
    projectFiles: [
      {
        id: 'file_1',
        name: 'ecommerce-dashboard.zip',
        url: '/downloads/ecommerce-dashboard.zip',
        size: 15728640, // 15MB
        type: 'application/zip',
        checksum: 'abc123def456',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
      framework: 'Next.js 14',
      database: 'PostgreSQL',
      deployment: ['Vercel', 'Netlify', 'AWS'],
      browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      mobileResponsive: true
    },
    sellerId: 'seller_1',
    sellerName: 'Sarah Johnson',
    sellerEmail: 'sarah@example.com',
    buyerId: 'buyer_1',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    price: 79.99,
    licenseType: 'commercial',
    state: 'released',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    releasedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    transactionId: 'txn_123',
    paymentMethod: 'card',
    platformFee: 3.99,
    sellerPayout: 75.99,
    accessToken: 'token_abc123',
    downloadCount: 1,
    maxDownloads: 3
  },
  {
    id: 'escrow_2',
    projectId: 'project_2',
    projectTitle: 'React Native Food Delivery App',
    projectDescription: 'Complete food delivery mobile app with restaurant listings, order tracking, payment integration, and real-time notifications. Includes both iOS and Android versions.',
    projectFiles: [
      {
        id: 'file_2',
        name: 'food-delivery-app.zip',
        url: '/downloads/food-delivery-app.zip',
        size: 25165824, // 24MB
        type: 'application/zip',
        checksum: 'def456ghi789',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
      framework: 'React Native 0.72',
      database: 'Firebase Firestore',
      deployment: ['App Store', 'Google Play'],
      browserCompat: ['iOS Safari', 'Chrome Mobile'],
      mobileResponsive: true
    },
    sellerId: 'seller_2',
    sellerName: 'Mike Chen',
    sellerEmail: 'mike@example.com',
    price: 149.99,
    licenseType: 'extended',
    state: 'pending_payment',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    paymentDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    platformFee: 7.50,
    sellerPayout: 142.49,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 'escrow_3',
    projectId: 'project_3',
    projectTitle: 'Vue.js SaaS Landing Page',
    projectDescription: 'Modern SaaS landing page with pricing tables, testimonials, feature showcases, and contact forms. Fully responsive with smooth animations and SEO optimized.',
    projectFiles: [
      {
        id: 'file_3',
        name: 'saas-landing-page.zip',
        url: '/downloads/saas-landing-page.zip',
        size: 8388608, // 8MB
        type: 'application/zip',
        checksum: 'ghi789jkl012',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Framer Motion'],
      framework: 'Nuxt 3',
      database: 'None (Static)',
      deployment: ['Vercel', 'Netlify', 'Static Hosting'],
      browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      mobileResponsive: true
    },
    sellerId: 'seller_1',
    sellerName: 'Sarah Johnson',
    sellerEmail: 'sarah@example.com',
    buyerId: 'buyer_2',
    buyerName: 'Jane Smith',
    buyerEmail: 'jane@example.com',
    price: 49.99,
    licenseType: 'personal',
    state: 'disputed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    paymentDeadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    releasedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    disputeRaisedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    transactionId: 'txn_456',
    paymentMethod: 'paypal',
    platformFee: 2.50,
    sellerPayout: 47.49,
    accessToken: 'token_def456',
    downloadCount: 1,
    maxDownloads: 3,
    disputeReason: 'Project does not match description'
  },
  {
    id: 'escrow_4',
    projectId: 'project_4',
    projectTitle: 'Node.js API Backend',
    projectDescription: 'RESTful API backend with authentication, database integration, file uploads, and comprehensive documentation. Includes testing suite and deployment scripts.',
    projectFiles: [
      {
        id: 'file_4',
        name: 'nodejs-api-backend.zip',
        url: '/downloads/nodejs-api-backend.zip',
        size: 12582912, // 12MB
        type: 'application/zip',
        checksum: 'jkl012mno345',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      framework: 'Express.js',
      database: 'MongoDB',
      deployment: ['Heroku', 'AWS', 'Docker'],
      browserCompat: ['All (API)'],
      mobileResponsive: false
    },
    sellerId: 'seller_3',
    sellerName: 'Alex Rodriguez',
    sellerEmail: 'alex@example.com',
    price: 99.99,
    licenseType: 'commercial',
    state: 'cancelled',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    paymentDeadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    cancelledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    platformFee: 5.00,
    sellerPayout: 94.99,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 'escrow_5',
    projectId: 'project_5',
    projectTitle: 'E-commerce React Store',
    projectDescription: 'Complete e-commerce store with shopping cart, user authentication, payment integration, and admin dashboard. Built with React, Node.js, and MongoDB.',
    projectFiles: [
      {
        id: 'file_5',
        name: 'ecommerce-store.zip',
        url: '/downloads/ecommerce-store.zip',
        size: 31457280, // 30MB
        type: 'application/zip',
        checksum: 'mno345pqr678',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
      framework: 'React 18',
      database: 'MongoDB',
      deployment: ['Heroku', 'AWS', 'Vercel'],
      browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      mobileResponsive: true
    },
    sellerId: 'seller_4',
    sellerName: 'Emma Wilson',
    sellerEmail: 'emma@example.com',
    price: 199.99,
    licenseType: 'white-label',
    state: 'pending_payment',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    paymentDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    platformFee: 10.00,
    sellerPayout: 189.99,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 'escrow_6',
    projectId: 'project_6',
    projectTitle: 'Portfolio Website Template',
    projectDescription: 'Modern portfolio website with dark/light mode, smooth animations, contact form, and blog section. Perfect for developers and designers.',
    projectFiles: [
      {
        id: 'file_6',
        name: 'portfolio-template.zip',
        url: '/downloads/portfolio-template.zip',
        size: 10485760, // 10MB
        type: 'application/zip',
        checksum: 'pqr678stu901',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      framework: 'Next.js 14',
      database: 'None (Static)',
      deployment: ['Vercel', 'Netlify', 'Static Hosting'],
      browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      mobileResponsive: true
    },
    sellerId: 'seller_5',
    sellerName: 'David Kim',
    sellerEmail: 'david@example.com',
    price: 39.99,
    licenseType: 'personal',
    state: 'pending_payment',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    paymentDeadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    platformFee: 2.00,
    sellerPayout: 37.99,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 'escrow_7',
    projectId: 'project_7',
    projectTitle: 'Task Management App',
    projectDescription: 'Full-stack task management application with real-time collaboration, drag-and-drop, file attachments, and team management features.',
    projectFiles: [
      {
        id: 'file_7',
        name: 'task-management-app.zip',
        url: '/downloads/task-management-app.zip',
        size: 20971520, // 20MB
        type: 'application/zip',
        checksum: 'stu901vwx234',
        uploadedAt: new Date().toISOString(),
        isEncrypted: true
      }
    ],
    projectMetadata: {
      techStack: ['Vue.js', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
      framework: 'Vue 3',
      database: 'PostgreSQL',
      deployment: ['Docker', 'AWS', 'DigitalOcean'],
      browserCompat: ['Chrome', 'Firefox', 'Safari', 'Edge'],
      mobileResponsive: true
    },
    sellerId: 'seller_6',
    sellerName: 'Lisa Chen',
    sellerEmail: 'lisa@example.com',
    price: 129.99,
    licenseType: 'commercial',
    state: 'pending_payment',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    paymentDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    platformFee: 6.50,
    sellerPayout: 123.49,
    downloadCount: 0,
    maxDownloads: 3
  }
];

let transactions: EscrowTransaction[] = [
  {
    id: 'txn_123',
    escrowId: 'escrow_1',
    type: 'payment',
    amount: 79.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'card',
    transactionId: 'payment_123',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'txn_456',
    escrowId: 'escrow_3',
    type: 'payment',
    amount: 49.99,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'paypal',
    transactionId: 'payment_456',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

let disputes: EscrowDispute[] = [
  {
    id: 'dispute_1',
    escrowId: 'escrow_3',
    raisedBy: 'buyer',
    raisedByUserId: 'buyer_2',
    reason: 'Project does not match description',
    description: 'The landing page does not include the pricing tables as described in the project details. The code is also missing several key features mentioned in the description.',
    evidence: [
      {
        id: 'evidence_1',
        type: 'screenshot',
        url: '/evidence/screenshot1.png',
        description: 'Screenshot showing missing pricing section',
        uploadedBy: 'buyer_2',
        uploadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ],
    status: 'open',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
];

let notifications: EscrowNotification[] = [
  {
    id: 'notif_1',
    userId: 'seller_1',
    escrowId: 'escrow_1',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $79.99 received for "Modern E-commerce Dashboard"',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/marketplace/escrow/escrow_1'
  },
  {
    id: 'notif_2',
    userId: 'buyer_1',
    escrowId: 'escrow_1',
    type: 'project_released',
    title: 'Project Released',
    message: 'Your project "Modern E-commerce Dashboard" has been released and is ready for download',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/marketplace/escrow/escrow_1'
  },
  {
    id: 'notif_3',
    userId: 'seller_1',
    escrowId: 'escrow_3',
    type: 'dispute_raised',
    title: 'Dispute Raised',
    message: 'A dispute has been raised for "Vue.js SaaS Landing Page"',
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/marketplace/escrow/escrow_3'
  }
];

// Simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique IDs
const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Calculate platform fee (5% of project price)
const calculatePlatformFee = (price: number) => price * 0.05;

// Calculate seller payout
const calculateSellerPayout = (price: number) => price - calculatePlatformFee(price);

export const escrowService = {
  // Create new escrow project
  createEscrow: async (data: CreateEscrowRequest, sellerId: string): Promise<EscrowProject> => {
    await delay();
    
    const now = new Date();
    const expiresAt = new Date(data.paymentDeadline);
    
    const newEscrow: EscrowProject = {
      id: generateId('escrow'),
      projectId: data.projectId,
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      projectFiles: [], // Will be populated after file upload
      projectMetadata: data.projectMetadata,
      sellerId,
      sellerName: 'Current User', // In real app, get from user context
      sellerEmail: 'seller@example.com',
      price: data.price,
      licenseType: data.licenseType,
      state: 'pending_payment',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      paymentDeadline: data.paymentDeadline,
      platformFee: calculatePlatformFee(data.price),
      sellerPayout: calculateSellerPayout(data.price),
      downloadCount: 0,
      maxDownloads: 3, // Default max downloads
      notes: data.notes
    };
    
    escrows.push(newEscrow);
    return newEscrow;
  },

  // Get escrow by ID
  getEscrow: async (id: string): Promise<EscrowProject> => {
    await delay();
    
    const escrow = escrows.find(e => e.id === id);
    if (!escrow) {
      throw new Error('Escrow not found');
    }
    
    return escrow;
  },

  // Get escrows for seller
  getSellerEscrows: async (sellerId: string, filters?: EscrowFilters): Promise<EscrowListResponse> => {
    await delay();
    
    let filteredEscrows = escrows.filter(e => e.sellerId === sellerId);
    
    // Apply filters
    if (filters?.state && filters.state.length > 0) {
      filteredEscrows = filteredEscrows.filter(e => filters.state!.includes(e.state));
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEscrows = filteredEscrows.filter(e => 
        e.projectTitle.toLowerCase().includes(searchLower) ||
        e.projectDescription.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by updated date (newest first)
    filteredEscrows.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return {
      escrows: filteredEscrows,
      pagination: {
        page: 1,
        limit: 50,
        total: filteredEscrows.length,
        totalPages: 1
      },
      filters: filters || {},
      sort: { field: 'updatedAt', direction: 'desc' }
    };
  },

  // Get escrows for buyer
  getBuyerEscrows: async (buyerId: string, filters?: EscrowFilters): Promise<EscrowListResponse> => {
    await delay();
    
    let filteredEscrows = escrows.filter(e => e.buyerId === buyerId);
    
    // Apply same filters as seller
    if (filters?.state && filters.state.length > 0) {
      filteredEscrows = filteredEscrows.filter(e => filters.state!.includes(e.state));
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredEscrows = filteredEscrows.filter(e => 
        e.projectTitle.toLowerCase().includes(searchLower) ||
        e.projectDescription.toLowerCase().includes(searchLower)
      );
    }
    
    filteredEscrows.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    return {
      escrows: filteredEscrows,
      pagination: {
        page: 1,
        limit: 50,
        total: filteredEscrows.length,
        totalPages: 1
      },
      filters: filters || {},
      sort: { field: 'updatedAt', direction: 'desc' }
    };
  },

  // Purchase escrow (initiate payment)
  purchaseEscrow: async (data: PurchaseEscrowRequest, buyerId: string): Promise<EscrowProject> => {
    await delay();
    
    const escrow = escrows.find(e => e.id === data.escrowId);
    if (!escrow) {
      throw new Error('Escrow not found');
    }
    
    if (escrow.state !== 'pending_payment') {
      throw new Error('Escrow is not available for purchase');
    }
    
    // Update escrow with buyer info
    escrow.buyerId = buyerId;
    escrow.buyerName = 'Current Buyer'; // In real app, get from user context
    escrow.buyerEmail = data.billingAddress.email;
    escrow.updatedAt = new Date().toISOString();
    
    // Create transaction record
    const transaction: EscrowTransaction = {
      id: generateId('txn'),
      escrowId: escrow.id,
      type: 'payment',
      amount: escrow.price,
      currency: 'USD',
      status: 'pending',
      paymentMethod: data.paymentMethod,
      transactionId: generateId('payment'),
      createdAt: new Date().toISOString()
    };
    
    transactions.push(transaction);
    
    return escrow;
  },

  // Confirm payment (simulate payment success)
  confirmPayment: async (escrowId: string): Promise<EscrowProject> => {
    await delay();
    
    const escrow = escrows.find(e => e.id === escrowId);
    if (!escrow) {
      throw new Error('Escrow not found');
    }
    
    if (escrow.state !== 'pending_payment') {
      throw new Error('Payment already processed');
    }
    
    // Update escrow state
    escrow.state = 'released';
    escrow.releasedAt = new Date().toISOString();
    escrow.updatedAt = new Date().toISOString();
    escrow.accessToken = generateId('token'); // Generate download token
    
    // Update transaction
    const transaction = transactions.find(t => t.escrowId === escrowId);
    if (transaction) {
      transaction.status = 'completed';
      transaction.processedAt = new Date().toISOString();
    }
    
    // Create notification for seller
    const notification: EscrowNotification = {
      id: generateId('notif'),
      userId: escrow.sellerId,
      escrowId: escrow.id,
      type: 'payment_received',
      title: 'Payment Received',
      message: `Payment of $${escrow.price} received for "${escrow.projectTitle}"`,
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: `/marketplace/escrow/${escrow.id}`
    };
    notifications.push(notification);
    
    return escrow;
  },

  // Reclaim project (seller reclaims if payment not completed)
  reclaimProject: async (escrowId: string, sellerId: string): Promise<EscrowProject> => {
    await delay();
    
    const escrow = escrows.find(e => e.id === escrowId);
    if (!escrow) {
      throw new Error('Escrow not found');
    }
    
    if (escrow.sellerId !== sellerId) {
      throw new Error('Unauthorized');
    }
    
    if (escrow.state !== 'pending_payment') {
      throw new Error('Cannot reclaim project in current state');
    }
    
    // Check if payment deadline has passed
    const now = new Date();
    const deadline = new Date(escrow.paymentDeadline);
    
    if (now < deadline) {
      throw new Error('Payment deadline has not passed yet');
    }
    
    // Update escrow state
    escrow.state = 'cancelled';
    escrow.cancelledAt = new Date().toISOString();
    escrow.updatedAt = new Date().toISOString();
    
    return escrow;
  },

  // Raise dispute
  raiseDispute: async (data: RaiseDisputeRequest, userId: string): Promise<EscrowDispute> => {
    await delay();
    
    const escrow = escrows.find(e => e.id === data.escrowId);
    if (!escrow) {
      throw new Error('Escrow not found');
    }
    
    if (escrow.state !== 'released') {
      throw new Error('Cannot raise dispute for escrow in current state');
    }
    
    // Update escrow state
    escrow.state = 'disputed';
    escrow.disputeRaisedAt = new Date().toISOString();
    escrow.updatedAt = new Date().toISOString();
    
    // Create dispute
    const dispute: EscrowDispute = {
      id: generateId('dispute'),
      escrowId: data.escrowId,
      raisedBy: escrow.buyerId === userId ? 'buyer' : 'seller',
      raisedByUserId: userId,
      reason: data.reason,
      description: data.description,
      evidence: [], // Will be populated after file upload
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    disputes.push(dispute);
    
    return dispute;
  },

  // Get escrow statistics
  getStats: async (userId: string, role: 'seller' | 'buyer'): Promise<EscrowStats> => {
    await delay();
    
    const userEscrows = role === 'seller' 
      ? escrows.filter(e => e.sellerId === userId)
      : escrows.filter(e => e.buyerId === userId);
    
    const totalEscrows = userEscrows.length;
    const pendingPayment = userEscrows.filter(e => e.state === 'pending_payment').length;
    const released = userEscrows.filter(e => e.state === 'released').length;
    const cancelled = userEscrows.filter(e => e.state === 'cancelled').length;
    const onHold = userEscrows.filter(e => e.state === 'on_hold').length;
    const disputed = userEscrows.filter(e => e.state === 'disputed').length;
    
    const totalValue = userEscrows.reduce((sum, e) => sum + e.price, 0);
    const totalFees = userEscrows.reduce((sum, e) => sum + e.platformFee, 0);
    
    return {
      totalEscrows,
      pendingPayment,
      released,
      cancelled,
      onHold,
      disputed,
      totalValue,
      totalFees,
      averageResolutionTime: 0, // Calculate based on actual data
      disputeRate: totalEscrows > 0 ? (disputed / totalEscrows) * 100 : 0
    };
  },

  // Get all available escrow projects for browsing
  getAvailableEscrows: async (): Promise<EscrowProject[]> => {
    await delay();
    
    const availableEscrows = escrows.filter(escrow => 
      escrow.state === 'pending_payment'
    );
    
    // Sort by creation date (newest first)
    availableEscrows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return availableEscrows;
  }
};
