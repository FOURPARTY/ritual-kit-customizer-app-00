
import { useState, useEffect } from 'react';
import { ArrowLeft, X, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  category_id: number;
  price: string;
  image: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface CustomProduct extends Product {
  quantity: number;
}

interface KitCustomizerProps {
  kit: Kit;
  onBack: () => void;
  onSaveAndAddToCart: (customKit: any) => void;
}

const KitCustomizer = ({ kit, onBack, onSaveAndAddToCart }: KitCustomizerProps) => {
  const [customKitName, setCustomKitName] = useState(kit.name);
  const [kitProducts, setKitProducts] = useState<CustomProduct[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial data
    Promise.all([
      import('../data/products.json'),
      import('../data/categories.json')
    ]).then(([productsData, categoriesData]) => {
      setAllProducts(productsData.default);
      setCategories(categoriesData.default.filter(cat => cat.id !== 3)); // Exclude kits category
      
      // Initialize kit products
      const initialProducts = productsData.default
        .filter((product: Product) => kit.product_ids.includes(product.id))
        .map((product: Product) => ({ ...product, quantity: 1 }));
      setKitProducts(initialProducts);
    });
  }, [kit.product_ids]);

  const addProductToKit = (product: Product) => {
    const existingProduct = kitProducts.find(p => p.id === product.id);
    if (existingProduct) {
      setKitProducts(prev =>
        prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setKitProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu kit.`,
    });
  };

  const removeProductFromKit = (productId: number) => {
    setKitProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateProductQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromKit(productId);
      return;
    }
    
    setKitProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity } : p
      )
    );
  };

  const calculateTotal = () => {
    return kitProducts.reduce((total, product) => {
      const price = parseFloat(product.price.replace('R$ ', '').replace(',', '.'));
      return total + (price * product.quantity);
    }, 0);
  };

  const handleSaveAndAddToCart = () => {
    const customKit = {
      id: `custom-${Date.now()}`,
      name: customKitName,
      products: kitProducts,
      total: calculateTotal()
    };
    
    onSaveAndAddToCart(customKit);
    
    toast({
      title: "Kit personalizado salvo!",
      description: `Seu kit "${customKitName}" foi adicionado ao carrinho.`,
    });
  };

  const filteredProducts = allProducts.filter(p => 
    p.category_id === selectedCategory && !kitProducts.some(kp => kp.id === p.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Detalhes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kit Builder */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="kit-name">Nome do seu kit</Label>
                    <Input
                      id="kit-name"
                      value={customKitName}
                      onChange={(e) => setCustomKitName(e.target.value)}
                      placeholder="Digite o nome do seu kit personalizado"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Itens no seu kit</h3>
                    {kitProducts.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        Nenhum item adicionado ainda
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {kitProducts.map((product) => (
                          <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updateProductQuantity(product.id, product.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="text-sm w-8 text-center">{product.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">{product.price}</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 mt-1"
                                onClick={() => removeProductFromKit(product.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold text-primary">
                        R$ {calculateTotal().toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleSaveAndAddToCart}
                    disabled={kitProducts.length === 0}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar e Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Browser */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Adicionar produtos</h3>
                
                <Tabs value={selectedCategory.toString()} onValueChange={(value) => setSelectedCategory(parseInt(value))}>
                  <TabsList className="grid w-full grid-cols-2">
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id.toString()}>
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id.toString()}>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredProducts.length === 0 ? (
                          <p className="text-muted-foreground text-sm text-center py-8">
                            Todos os produtos desta categoria já estão no seu kit
                          </p>
                        ) : (
                          filteredProducts.map((product) => (
                            <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{product.name}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {product.description}
                                </p>
                                <span className="font-semibold text-primary text-sm">
                                  {product.price}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addProductToKit(product)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Adicionar
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitCustomizer;
