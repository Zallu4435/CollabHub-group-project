// marketplace/src/types/purchase-request.ts

export type ProjectState = 
  | 'available_for_request' 
  | 'pending_request' 
  | 'approved_for_purchase' 
  | 'sold';

export type PurchaseRequestState = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'completed';

export interface PurchaseRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectPrice: number;
  projectLicenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  
  // Buyer information
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerMessage?: string;
  
  // Seller information
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  
  // Request details
  state: PurchaseRequestState;
  requestedAt: string;
  reviewedAt?: string;
  completedAt?: string;
  
  // Approval/Rejection details
  sellerResponse?: string;
  rejectionReason?: string;
  
  // Payment details (after approval)
  paymentMethod?: 'card' | 'paypal' | 'bank_transfer';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: string;
  
  // Access control
  accessToken?: string;
  downloadCount: number;
  maxDownloads: number;
  downloadExpiresAt?: string;
  
  // Platform fees
  platformFee: number;
  sellerPayout: number;
  
  // Additional metadata
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectPrice: number;
  projectLicenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  
  // Seller information
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  
  // Request settings
  isRequestOnly: boolean;
  state: ProjectState;
  
  // Request statistics
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  completedRequests: number;
  
  // Access control
  requiresApproval: boolean;
  autoApprove: boolean;
  maxRequestsPerBuyer: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastRequestAt?: string;
}

export interface CreatePurchaseRequestData {
  projectId: string;
  buyerMessage?: string;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer';
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    company?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cardDetails?: {
    number: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
}

export interface ReviewPurchaseRequestData {
  requestId: string;
  action: 'approve' | 'reject';
  response?: string;
  rejectionReason?: string;
}

export interface PurchaseRequestFilters {
  state?: PurchaseRequestState[];
  projectId?: string;
  sellerId?: string;
  buyerId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  minPrice?: number;
  maxPrice?: number;
  licenseType?: string[];
  search?: string;
}

export interface ProjectRequestFilters {
  state?: ProjectState[];
  sellerId?: string;
  isRequestOnly?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  minPrice?: number;
  maxPrice?: number;
  licenseType?: string[];
  search?: string;
}

export interface PurchaseRequestSortOptions {
  field: 'requestedAt' | 'reviewedAt' | 'completedAt' | 'projectPrice' | 'state';
  direction: 'asc' | 'desc';
}

export interface ProjectRequestSortOptions {
  field: 'createdAt' | 'updatedAt' | 'lastRequestAt' | 'projectPrice' | 'totalRequests';
  direction: 'asc' | 'desc';
}

export interface PurchaseRequestPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PurchaseRequestListResponse {
  requests: PurchaseRequest[];
  pagination: PurchaseRequestPagination;
  filters: PurchaseRequestFilters;
  sort: PurchaseRequestSortOptions;
}

export interface ProjectRequestListResponse {
  projects: ProjectRequest[];
  pagination: PurchaseRequestPagination;
  filters: ProjectRequestFilters;
  sort: ProjectRequestSortOptions;
}

export interface PurchaseRequestStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  completedRequests: number;
  totalValue: number;
  totalFees: number;
  averageResponseTime: number;
  approvalRate: number;
}

export interface ProjectRequestStats {
  totalProjects: number;
  availableForRequest: number;
  pendingRequest: number;
  approvedForPurchase: number;
  sold: number;
  totalRequests: number;
  totalValue: number;
  averageRequestsPerProject: number;
}

export interface PurchaseRequestNotification {
  id: string;
  userId: string;
  requestId: string;
  type: 'request_received' | 'request_approved' | 'request_rejected' | 'payment_required' | 'payment_completed' | 'project_available';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Extended Project interface to support request-based purchases
export interface RequestBasedProject {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  
  // Technical specs
  techStack: string[];
  framework?: string;
  database?: string;
  deployment: string[];
  browserCompat: string[];
  mobileResponsive: boolean;
  
  // Media
  screenshots: string[];
  demoUrl?: string;
  videoUrl?: string;
  documentationUrl?: string;
  
  // Pricing & licensing
  price: number;
  licenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  
  // Categories
  category: string;
  subcategory?: string;
  tags: string[];
  
  // Stats
  downloads: number;
  views: number;
  rating: number;
  reviewCount: number;
  
  // Status
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  
  // Request-based purchase settings
  isRequestOnly: boolean;
  state: ProjectState;
  requiresApproval: boolean;
  autoApprove: boolean;
  maxRequestsPerBuyer: number;
  
  // Request statistics
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  completedRequests: number;
  
  createdAt: string;
  updatedAt: string;
  lastRequestAt?: string;
}
