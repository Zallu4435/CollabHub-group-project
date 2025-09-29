// market/src/lib/hooks/useCart.ts
import { useState, useEffect } from 'react';
import { CartItem } from '../../types/cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('marketplace-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('marketplace-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.projectId}-${item.licenseType}-${Date.now()}`
    };

    setItems(prevItems => {
      // Check if item already exists with same project and license
      const existingItem = prevItems.find(
        existing => existing.projectId === item.projectId && existing.licenseType === item.licenseType
      );

      if (existingItem) {
        // Update quantity
        return prevItems.map(existing =>
          existing.id === existingItem.id
            ? { ...existing, quantity: existing.quantity + 1 }
            : existing
        );
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateLicense = (itemId: string, newLicense: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, licenseType: newLicense as any } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const licenseMultiplier = {
        personal: 1,
        commercial: 1.5,
        extended: 2.5,
        'white-label': 4
      }[item.licenseType] || 1;
      
      return total + (item.price * licenseMultiplier * item.quantity);
    }, 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const platformFee = subtotal * 0.05; // 5% platform fee
    return subtotal + platformFee;
  };

  const getUniqueSellers = () => {
    return new Set(items.map(item => item.sellerId)).size;
  };

  const isItemInCart = (projectId: string, licenseType: string) => {
    return items.some(item => item.projectId === projectId && item.licenseType === licenseType);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  return {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    updateLicense,
    clearCart,
    getItemCount,
    getSubtotal,
    getTotal,
    getUniqueSellers,
    isItemInCart,
    openCart,
    closeCart,
    toggleCart
  };
};
