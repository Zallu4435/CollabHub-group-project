// market/src/app/layout.tsx
import React from 'react';
import { Header } from '@/app/marketplace/components/layout/Header';
import { Footer } from '@/app/marketplace/components/layout/Footer';
import './globals.css';

export const metadata = {
  title: 'DevMarket - Marketplace for Developers',
  description: 'Buy and sell high-quality code templates, projects, and developer resources',
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
}
