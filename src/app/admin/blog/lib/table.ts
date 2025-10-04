export interface PaginationState {
    pageIndex: number;
    pageSize: number;
  }
  
  export interface SortState {
    column: string;
    direction: 'asc' | 'desc';
  }
  
  export interface FilterState {
    [key: string]: any;
  }
  
  export const paginate = <T>(data: T[], pagination: PaginationState): T[] => {
    const { pageIndex, pageSize } = pagination;
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  };
  
  export const sortData = <T>(data: T[], sort: SortState | null): T[] => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sort.column];
      const bVal = (b as any)[sort.column];
      if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  export const filterData = <T>(data: T[], filters: FilterState): T[] => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        const itemValue = (item as any)[key];
        if (Array.isArray(value)) return value.includes(itemValue);
        if (typeof value === 'string' && typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        return itemValue === value;
      });
    });
  };
  
  export const searchData = <T>(data: T[], searchTerm: string, searchKeys: string[]): T[] => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(item => {
      return searchKeys.some(key => {
        const value = (item as any)[key];
        return value && String(value).toLowerCase().includes(lowerSearch);
      });
    });
  };
  