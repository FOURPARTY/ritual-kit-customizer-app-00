
import { CheckCircle, Clock, Truck, MapPin } from 'lucide-react';

interface OrderStatus {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  active: boolean;
}

interface OrderTrackerProps {
  currentStatus: 'payment_confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
}

const OrderTracker = ({ currentStatus }: OrderTrackerProps) => {
  const getStatuses = (): OrderStatus[] => {
    const statusOrder = ['payment_confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return [
      {
        id: 'payment_confirmed',
        label: 'Pagamento Confirmado',
        icon: CheckCircle,
        completed: currentIndex >= 0,
        active: currentIndex === 0
      },
      {
        id: 'preparing',
        label: 'Preparando seu Pedido',
        icon: Clock,
        completed: currentIndex >= 1,
        active: currentIndex === 1
      },
      {
        id: 'out_for_delivery',
        label: 'Saiu para Entrega',
        icon: Truck,
        completed: currentIndex >= 2,
        active: currentIndex === 2
      },
      {
        id: 'delivered',
        label: 'Pedido Entregue',
        icon: MapPin,
        completed: currentIndex >= 3,
        active: currentIndex === 3
      }
    ];
  };

  const statuses = getStatuses();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Status do Pedido</h3>
      
      <div className="space-y-4">
        {statuses.map((status, index) => {
          const Icon = status.icon;
          
          return (
            <div key={status.id} className="flex items-center gap-4">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full
                ${status.completed 
                  ? 'bg-green-100 text-green-600' 
                  : status.active 
                    ? 'bg-primary/10 text-primary animate-pulse' 
                    : 'bg-gray-100 text-gray-400'
                }
              `}>
                <Icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  status.completed 
                    ? 'text-green-600' 
                    : status.active 
                      ? 'text-primary' 
                      : 'text-gray-400'
                }`}>
                  {status.label}
                </p>
                {status.active && (
                  <p className="text-sm text-muted-foreground">Em andamento...</p>
                )}
                {status.completed && !status.active && (
                  <p className="text-sm text-green-600">Concluído</p>
                )}
              </div>
              
              {status.completed && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
