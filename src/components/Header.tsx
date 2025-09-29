import React from 'react';
import Link from 'next/link';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 h-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">CP</span>
          </div>
          <span className="text-white text-xl font-bold">Community Platform</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-blue-200 font-medium">Home</Link>
          <Link href="/about" className="text-white hover:text-blue-200 font-medium">About</Link>
          <Link href="/services" className="text-white hover:text-blue-200 font-medium">Services</Link>
          <Link href="/com" className="text-white hover:text-blue-200 font-medium">Community</Link>
          <Link href="/contact" className="text-white hover:text-blue-200 font-medium">Contact</Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Currency Selector */}
          <div className="hidden sm:block">
            <CurrencySelector 
              variant="minimal" 
              size="sm" 
              showFlag={true}
              showSymbol={false}
              showName={false}
              className="text-white"
            />
          </div>
          
          <Link href="/auth/login" className="px-4 py-2 bg-white bg-opacity-20 text-gray-800 rounded-full text-sm font-semibold hover:bg-opacity-30 transition-all">
            Sign In
          </Link>
          <Link href="/auth/register" className="px-5 py-2 bg-gradient-to-b from-orange-400 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
