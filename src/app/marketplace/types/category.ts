// market/src/types/category.ts
export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    projectCount: number;
    subcategories?: Subcategory[];
  }
  
  export interface Subcategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    projectCount: number;
  }
  