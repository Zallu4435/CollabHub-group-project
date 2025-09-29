// market/src/types/cart.ts
export interface CartItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  price: number;
  licenseType: string;
  thumbnail: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  addedAt: string;
  quantity: number;
  techStack: string[];
  category: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  fileSize: string;
  lastUpdated: string;
  previewUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  supportIncluded: boolean;
  updatesIncluded: boolean;
  commercialUse: boolean;
  resaleRights: boolean;
  customizationRights: boolean;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  platformFee: number;
  estimatedDelivery: string;
  currency: string;
}

export interface LicenseOption {
  value: string;
  label: string;
  multiplier: number;
  description: string;
  features: string[];
  restrictions: string[];
}
  