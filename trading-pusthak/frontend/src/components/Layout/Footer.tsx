import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Trading Pusthak
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Made with
            </span>
            <Heart className="h-4 w-4 text-red-500" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              for traders
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 Trading Pusthak. All rights reserved. Remember: Trading involves risk and past performance doesn't guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;