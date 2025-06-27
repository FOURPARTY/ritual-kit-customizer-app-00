
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Smartphone, QrCode, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'debit'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data - in real app this would come from global state
  const cartItems = [
    { name: 'Kit Básico para Ebó de Exu', price: 89.90, quantity: 1 },
    { name: 'Azeite de Dendê', price: 6.00, quantity: 2 },
    { name: 'Vela Branca', price: 7.00, quantity: 1 }
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFinalizePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate mock order ID
      const orderId = `pedido-${Date.now()}`;
      
      // Clear cart (in real app)
      toast.success('Pagamento realizado com sucesso!');
      
      // Redirect to order tracking
      navigate(`/pedidos/${orderId}`);
    }, 3000);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX0114+5511999999999');
    toast.success('Código Pix copiado!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Finalizar Pedido</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main checkout form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Rua da Harmonia, 123</p>
                  <p className="text-muted-foreground">Bairro da Fé, Rio de Janeiro - RJ</p>
                  <p className="text-muted-foreground">CEP: 20040-020</p>
                </div>
                <Button variant="outline" className="mt-3" disabled>
                  Editar Endereço
                </Button>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    variant={paymentMethod === 'pix' ? 'default' : 'outline'}
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setPaymentMethod('pix')}
                  >
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs">PIX</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'credit' ? 'default' : 'outline'}
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Crédito</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setPaymentMethod('debit')}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="text-xs">Débito</span>
                  </Button>
                </div>

                {/* Payment details */}
                {paymentMethod === 'pix' && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-32 w-32 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-3">
                        Escaneie o QR Code ou copie o código abaixo
                      </p>
                      <Button variant="outline" onClick={copyPixCode} className="w-full">
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar código PIX
                      </Button>
                    </div>
                  </div>
                )}

                {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input id="cardName" placeholder="João da Silva" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  size="lg"
                  onClick={handleFinalizePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processando pagamento...' : 'Pagar e Finalizar Pedido'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg font-medium">Processando pagamento, aguarde...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
