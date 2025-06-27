
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Package, Receipt, User } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    { id: 'home', label: 'Início', icon: Home, path: '/' },
    { id: 'search', label: 'Buscar', icon: Search, path: '/buscar' },
    { id: 'kits', label: 'Kits', icon: Package, path: '/kits' },
    { id: 'orders', label: 'Pedidos', icon: Receipt, path: '/pedidos' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/perfil' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Ilha Flutuante */}
      <div className="mx-4 mb-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-around py-3 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 active:scale-95 min-w-[60px] ${
                    active 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`transition-all duration-200 ${active ? 'animate-bounce' : ''}`}>
                    <Icon 
                      className={`h-5 w-5 mb-1 ${active ? 'fill-current' : ''}`}
                      strokeWidth={active ? 2 : 1.5}
                    />
                  </div>
                  <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
