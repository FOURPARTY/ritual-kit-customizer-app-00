
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category_id: number;
  price: string;
  image: string;
  description: string;
}

interface ProductCatalogProps {
  categoryId: number;
  categoryName: string;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductCatalog = ({ categoryId, categoryName, onBack, onAddToCart }: ProductCatalogProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading products from JSON
    import('../data/products.json').then((data) => {
      const filteredProducts = data.default.filter(
        (product: Product) => product.category_id === categoryId
      );
      setProducts(filteredProducts);
    });
  }, [categoryId]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
            <p className="text-muted-foreground mt-1">
              {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
