import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BreadcrumbProps {
  items: { label: string; route?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { setActiveRoute } = useApp();

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-gray-500 mb-3" aria-label="Breadcrumb">
      <button 
        onClick={() => setActiveRoute('/dashboard')}
        className="flex items-center hover:text-indigo-600 transition-colors p-0.5 rounded cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>EduNexus</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {isLast || !item.route ? (
              <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => setActiveRoute(item.route!)}
                className="hover:text-indigo-600 transition-colors truncate max-w-[160px] cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
