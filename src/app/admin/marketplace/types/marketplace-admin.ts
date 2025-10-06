export type ProjectStatus = 'pending' | 'approved' | 'rejected' | 'unlisted' | 'featured';
export type SellerTier = 'basic' | 'pro' | 'verified';
export type TransactionStatus = 'pending' | 'completed' | 'refunded' | 'disputed';
export type DisputeStatus = 'open' | 'in-review' | 'resolved' | 'escalated';
export type EscrowStatus = 'pending' | 'released' | 'disputed' | 'on-hold';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  price: number;
  sellerId: string;
  sellerName: string;
  status: ProjectStatus;
  version: string;
  fileCount: number;
  fileSize: number; // bytes
  thumbnail: string;
  previewImages: string[];
  downloads: number;
  rating: number;
  reviewCount: number;
  uploadedAt: string;
  updatedAt: string;
  approvedAt?: string;
  revenue: number;
  isFeatured: boolean;
  metadata: {
    framework?: string;
    license?: string;
    compatibility?: string[];
  };
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: SellerTier;
  verified: boolean;
  joinedAt: string;
  lastActive: string;
  stats: {
    totalProjects: number;
    totalSales: number;
    totalRevenue: number;
    avgRating: number;
    refundRatio: number;
  };
  commission: number; // percentage
  bankVerified: boolean;
  idVerified: boolean;
  warnings: number;
  status: 'active' | 'suspended' | 'banned';
}

export interface Buyer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  lastPurchase: string;
  stats: {
    totalPurchases: number;
    totalSpent: number;
    avgPurchaseValue: number;
    reviewsGiven: number;
  };
  coins: number;
  status: 'active' | 'suspended';
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'refund' | 'payout' | 'commission';
  projectId: string;
  projectName: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  commission: number;
  platformFee: number;
  paymentMethod: string;
  status: TransactionStatus;
  createdAt: string;
  completedAt?: string;
  refundedAt?: string;
  escrowReleaseDate?: string;
}

export interface Dispute {
  id: string;
  transactionId: string;
  projectId: string;
  projectName: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  reason: string;
  description: string;
  evidence: string[];
  status: DisputeStatus;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  resolution?: 'refund' | 'release' | 'partial-refund';
  resolutionNotes?: string;
}

export interface Review {
  id: string;
  projectId: string;
  projectName: string;
  buyerId: string;
  buyerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  reported: boolean;
  reportReason?: string;
  sellerResponse?: string;
  status: 'approved' | 'pending' | 'flagged' | 'deleted';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentId?: string;
  projectCount: number;
  revenue: number;
  order: number;
  isActive: boolean;
}

export interface RewardConfig {
  id: string;
  action: string;
  coinsEarned: number;
  enabled: boolean;
  limit?: number;
}

export interface MarketplaceDashboardStats {
  overview: {
    totalProjects: number;
    activeSellers: number;
    totalBuyers: number;
    totalRevenue: number;
    pendingApprovals: number;
    activeDisputes: number;
  };
  revenue: {
    today: number;
    week: number;
    month: number;
    platformFees: number;
    commissions: number;
  };
  projects: {
    pending: number;
    approved: number;
    rejected: number;
    featured: number;
  };
  users: {
    newSellersToday: number;
    newBuyersToday: number;
    activeUsers: number;
  };
}

export interface ActivityLog {
  id: string;
  type: 'project' | 'transaction' | 'dispute' | 'review' | 'user';
  action: string;
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
