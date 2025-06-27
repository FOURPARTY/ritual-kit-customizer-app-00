
import { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - será substituído por dados reais
  const mockOrders = [
    {
      id: 'pedido-1751034772197',
      date: '2024-01-15',
      status: 'em_preparo',
      total: 'R$ 89,90',
      items: ['Kit Oxalá Completo', 'Azeite de Dendê Premium']
    },
    {
      id: 'pedido-1751034772198',
      date: '2024-01-10',
      status: 'entregue',
      total: 'R$ 156,50',
      items: ['Kit Iemanjá', 'Velas Azuis', 'Perfume de Alfazema']
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'em_preparo':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Em Preparo' };
      case 'entregue':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Entregue' };
      case 'cancelado':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelado' };
      default:
        return { icon: Package, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Aguardando' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pb-28">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Orders Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meus Pedidos</h1>
          
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Pedido #{order.id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                    <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                    <span className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Itens:</p>
                  <p className="text-sm text-gray-800">{order.items.join(', ')}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg text-primary">{order.total}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = `/pedidos/${order.id}`}
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Você ainda não fez nenhum pedido
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Explorar Produtos
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Orders;
