
import { Home, Search, Package, ShoppingBag, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      icon: Home, 
      label: 'Início',
      path: '/home',
      isActive: location.pathname === '/home'
    },
    { 
      icon: Search, 
      label: 'Buscar',
      path: '/buscar',
      isActive: location.pathname === '/buscar'
    },
    { 
      icon: Package, 
      label: 'Kits',
      path: '/kits',
      isActive: location.pathname === '/kits'
    },
    { 
      icon: ShoppingBag, 
      label: 'Pedidos',
      path: '/pedidos',
      isActive: location.pathname === '/pedidos'
    },
    { 
      icon: User, 
      label: 'Perfil',
      path: '/perfil',
      isActive: location.pathname === '/perfil'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100/50 active:scale-95 ${
                  item.isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <Icon 
                  className={`h-5 w-5 transition-all duration-200 ${
                    item.isActive ? 'fill-current' : ''
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
                {item.isActive && (
                  <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
