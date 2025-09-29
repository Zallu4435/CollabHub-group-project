// market/src/types/escrow.ts

export type EscrowState = 'pending_payment' | 'released' | 'cancelled' | 'on_hold' | 'disputed' | 'expired';

export type EscrowAction = 
  | 'upload_project'
  | 'initiate_purchase'
  | 'confirm_payment'
  | 'release_project'
  | 'reclaim_project'
  | 'raise_dispute'
  | 'resolve_dispute'
  | 'cancel_escrow'
  | 'expire_escrow';

export interface EscrowProject {
  id: string;
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectFiles: EscrowFile[];
  projectMetadata: {
    techStack: string[];
    framework?: string;
    database?: string;
    deployment: string[];
    browserCompat: string[];
    mobileResponsive: boolean;
  };
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  buyerId?: string;
  buyerName?: string;
  buyerEmail?: string;
  price: number;
  licenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  state: EscrowState;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  paymentDeadline: string;
  releasedAt?: string;
  cancelledAt?: string;
  disputeRaisedAt?: string;
  disputeResolvedAt?: string;
  transactionId?: string;
  paymentMethod?: string;
  platformFee: number;
  sellerPayout: number;
  disputeReason?: string;
  disputeResolution?: string;
  disputeResolvedBy?: string;
  accessToken?: string; // For secure download access
  downloadCount: number;
  maxDownloads: number;
  notes?: string;
}

export interface EscrowFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  checksum: string;
  uploadedAt: string;
  isEncrypted: boolean;
  encryptionKey?: string;
}

export interface EscrowTransaction {
  id: string;
  escrowId: string;
  type: 'payment' | 'refund' | 'payout' | 'fee';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: string;
  transactionId: string;
  gatewayResponse?: any;
  createdAt: string;
  processedAt?: string;
  failureReason?: string;
}

export interface EscrowDispute {
  id: string;
  escrowId: string;
  raisedBy: 'buyer' | 'seller';
  raisedByUserId: string;
  reason: string;
  description: string;
  evidence: EscrowDisputeEvidence[];
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EscrowDisputeEvidence {
  id: string;
  type: 'image' | 'document' | 'message' | 'screenshot';
  url: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface EscrowNotification {
  id: string;
  userId: string;
  escrowId: string;
  type: 'payment_received' | 'project_released' | 'dispute_raised' | 'dispute_resolved' | 'payment_expired' | 'project_reclaimed';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface EscrowStats {
  totalEscrows: number;
  pendingPayment: number;
  released: number;
  cancelled: number;
  onHold: number;
  disputed: number;
  totalValue: number;
  totalFees: number;
  averageResolutionTime: number;
  disputeRate: number;
}

export interface CreateEscrowRequest {
  projectId: string;
  projectTitle: string;
  projectDescription: string;
  projectFiles: File[];
  projectMetadata: {
    techStack: string[];
    framework?: string;
    database?: string;
    deployment: string[];
    browserCompat: string[];
    mobileResponsive: boolean;
  };
  price: number;
  licenseType: 'personal' | 'commercial' | 'extended' | 'white-label';
  paymentDeadline: string; // ISO string
  notes?: string;
}

export interface PurchaseEscrowRequest {
  escrowId: string;
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

export interface RaiseDisputeRequest {
  escrowId: string;
  reason: string;
  description: string;
  evidence: File[];
}

export interface ResolveDisputeRequest {
  disputeId: string;
  resolution: string;
  action: 'release_to_buyer' | 'refund_buyer' | 'partial_refund' | 'close_dispute';
  refundAmount?: number;
}

export interface EscrowFilters {
  state?: EscrowState[];
  dateRange?: {
    start: string;
    end: string;
  };
  minPrice?: number;
  maxPrice?: number;
  licenseType?: string[];
  search?: string;
}

export interface EscrowSortOptions {
  field: 'createdAt' | 'updatedAt' | 'price' | 'expiresAt' | 'state';
  direction: 'asc' | 'desc';
}

export interface EscrowPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EscrowListResponse {
  escrows: EscrowProject[];
  pagination: EscrowPagination;
  filters: EscrowFilters;
  sort: EscrowSortOptions;
}
