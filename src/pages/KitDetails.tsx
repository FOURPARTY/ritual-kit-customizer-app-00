
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Kit {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price: string;
  product_ids: number[];
  image: string;
  ritual_type: string;
  difficulty: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface KitDetailsProps {
  kit: Kit;
  onBack: () => void;
  onCustomize: (kit: Kit) => void;
  onAddToCart: (kit: Kit, products: Product[]) => void;
}

const KitDetails = ({ kit, onBack, onCustomize, onAddToCart }: KitDetailsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load all products and filter by kit's product_ids
    import('../data/products.json').then((data) => {
      const kitProducts = data.default.filter((product: Product) =>
        kit.product_ids.includes(product.id)
      );
      setProducts(kitProducts);
    });
  }, [kit.product_ids]);

  const handleAddToCart = () => {
    onAddToCart(kit, products);
    toast({
      title: "Kit adicionado!",
      description: `${kit.name} foi adicionado ao seu carrinho.`,
    });
  };

  const savings = parseFloat(kit.original_price.replace('R$ ', '').replace(',', '.')) - 
                 parseFloat(kit.price.replace('R$ ', '').replace(',', '.'));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Kits
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kit Image and Info */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src={kit.image}
                alt={kit.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-500 hover:bg-green-600">
                  Economize R$ {savings.toFixed(2).replace('.', ',')}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Badge variant="outline">{kit.ritual_type}</Badge>
              <Badge variant="outline">{kit.difficulty}</Badge>
              <Badge variant="outline">
                <Package className="h-3 w-3 mr-1" />
                {kit.product_ids.length} itens
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{kit.name}</h1>
            <p className="text-muted-foreground text-lg mb-6">{kit.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <span className="text-sm text-muted-foreground line-through">
                  {kit.original_price}
                </span>
                <div className="text-3xl font-bold text-primary">{kit.price}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar Kit ao Carrinho
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onCustomize(kit)}
              >
                <Edit3 className="h-5 w-5 mr-2" />
                Customizar
              </Button>
            </div>
          </div>

          {/* Products in Kit */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Itens inclusos no kit</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.description}
                        </p>
                        <span className="font-semibold text-primary">
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitDetails;
