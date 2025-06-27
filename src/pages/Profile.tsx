
import { useState } from 'react';
import { User, Settings, MapPin, Phone, Mail, Edit3, LogOut, Heart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 99999-9999',
    casa_axe: 'Casa de Oxalá',
    cidade: 'São Paulo, SP'
  });

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('loginMethod');
    
    // Redirect to welcome page
    navigate('/', { replace: true });
  };

  const profileOptions = [
    { icon: Edit3, label: 'Editar Perfil', description: 'Alterar dados pessoais' },
    { icon: MapPin, label: 'Endereços', description: 'Gerenciar endereços de entrega' },
    { icon: Heart, label: 'Favoritos', description: 'Produtos e kits salvos' },
    { icon: Package, label: 'Histórico', description: 'Todos os seus pedidos' },
    { icon: Settings, label: 'Configurações', description: 'Preferências do app' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pb-28">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.casa_axe}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Edit3 className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{user.cidade}</span>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          {profileOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
