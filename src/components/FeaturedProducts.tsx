
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  description: string;
}

interface FeaturedProductsProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts = ({ products, loading, error, onAddToCart }: FeaturedProductsProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Produtos em Destaque
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comece suas compras com nossos produtos mais populares, vindos diretamente do nosso banco de dados.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-lg">Carregando axé...</div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-600">Erro ao carregar produtos: {error}</div>
          <p className="text-sm text-gray-500 mt-2">Verifique o console para mais detalhes.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-600">Nenhum produto encontrado no banco de dados.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                product={{
                  ...product,
                  image: product.image_url || '/placeholder.svg'
                }}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
