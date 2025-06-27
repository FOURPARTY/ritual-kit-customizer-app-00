
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OrderTracker from '@/components/OrderTracker';
import MapView from '@/components/MapView';
import { toast } from 'sonner';

type OrderStatus = 'payment_confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('payment_confirmed');
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  useEffect(() => {
    // Simulate order progression
    const progressOrder = async () => {
      // Step 1: Preparing (after 5 seconds)
      setTimeout(() => {
        setOrderStatus('preparing');
        toast.success('Seu pedido está sendo preparado!');
      }, 2000);

      // Step 2: Out for delivery (after 8 seconds)
      setTimeout(() => {
        setOrderStatus('out_for_delivery');
        toast.success('Seu pedido saiu para entrega!');
        startDeliveryAnimation();
      }, 5000);

      // Step 3: Delivered (after 25 seconds)
      setTimeout(() => {
        setOrderStatus('delivered');
        setShowDeliveryInfo(true);
        toast.success('Seu pedido foi entregue! Axé!');
      }, 20000);
    };

    progressOrder();
  }, []);

  const startDeliveryAnimation = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDeliveryProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 750); // Updates every 750ms for smooth animation
  };

  const handleRateOrder = () => {
    toast.success('Obrigado pela avaliação!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Acompanhar Pedido</h1>
              <p className="text-sm text-muted-foreground">#{orderId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map and tracking */}
          <div className="space-y-6">
            <MapView 
              showRoute={orderStatus === 'out_for_delivery' || orderStatus === 'delivered'}
              deliveryProgress={deliveryProgress}
            />
            
            <OrderTracker currentStatus={orderStatus} />
          </div>

          {/* Order details and delivery info */}
          <div className="space-y-6">
            {/* Order items */}
            <Card>
              <CardHeader>
                <CardTitle>Itens do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Kit Básico para Ebó de Exu</p>
                    <p className="text-sm text-muted-foreground">Qtd: 1</p>
                  </div>
                  <p className="font-medium">R$ 89,90</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Azeite de Dendê</p>
                    <p className="text-sm text-muted-foreground">Qtd: 2</p>
                  </div>
                  <p className="font-medium">R$ 12,00</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Vela Branca</p>
                    <p className="text-sm text-muted-foreground">Qtd: 1</p>
                  </div>
                  <p className="font-medium">R$ 7,00</p>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">R$ 108,90</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery info (shows when delivered) */}
            {showDeliveryInfo && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Pedido Entregue!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Entregue por: João da Silva</p>
                      <p className="text-sm text-muted-foreground">Entregador</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleRateOrder}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Avaliar Pedido
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Estimated delivery time (shows during preparation and delivery) */}
            {(orderStatus === 'preparing' || orderStatus === 'out_for_delivery') && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary mb-2">
                      {orderStatus === 'preparing' ? '15-20 min' : '8-12 min'}
                    </p>
                    <p className="text-muted-foreground">
                      {orderStatus === 'preparing' 
                        ? 'Tempo estimado de preparo'
                        : 'Tempo estimado para entrega'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
