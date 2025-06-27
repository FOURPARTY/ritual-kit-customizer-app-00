
import { useState, useEffect } from 'react';
import { Wheat, Droplets, Flame, Apple, Bird, Package2, Package } from 'lucide-react';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import CartSidebar from '@/components/CartSidebar';
import BottomNavigation from '@/components/BottomNavigation';
import ProductCatalog from './ProductCatalog';
import KitDetails from './KitDetails';
import KitCustomizer from './KitCustomizer';
import ProductCard from '@/components/ProductCard';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  type: 'product' | 'kit';
  kitName?: string;
}

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

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'kit-details' | 'kit-customizer'>('home');
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string }>({ id: 1, name: '' });
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Load featured products for home
  useEffect(() => {
    import('../data/products.json').then((data) => {
      // Get first 6 products as featured
      setFeaturedProducts(data.default.slice(0, 6));
    });
  }, []);

  const categories = [
    { id: 1, name: 'Grãos e Farinhas', icon: Wheat, description: 'Ingredientes fundamentais para oferendas e rituais' },
    { id: 2, name: 'Líquidos e Azeites', icon: Droplets, description: 'Azeites sagrados, mel e bebidas rituais' },
    { id: 3, name: 'Velas e Itens Rituais', icon: Flame, description: 'Velas, tecidos e ferramentas para seus rituais' },
    { id: 4, name: 'Frutas e Verduras', icon: Apple, description: 'Frutas, legumes e verduras para oferendas' },
    { id: 5, name: 'Animais Sagrados', icon: Bird, description: 'Animais para rituais e oferendas sagradas' },
    { id: 6, name: 'Utensílios Rituais', icon: Package2, description: 'Bacias, terrinas e utensílios tradicionais' },
    { id: 7, name: 'Kits Prontos', icon: Package, description: 'Conjuntos completos para rituais específicos' }
  ];

  const handleCategoryClick = (category: any) => {
    if (category.id === 7) {
      navigate('/kits');
    } else {
      setSelectedCategory(category);
      setCurrentView('products');
    }
  };

  const handleKitClick = (kit: Kit) => {
    setSelectedKit(kit);
    setCurrentView('kit-details');
  };

  const handleCustomizeKit = (kit: Kit) => {
    setSelectedKit(kit);
    setCurrentView('kit-customizer');
  };

  const addProductToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: `product-${product.id}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      type: 'product'
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === cartItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, cartItem];
    });
  };

  const addKitToCart = (kit: Kit, products: Product[]) => {
    const kitItems: CartItem[] = products.map(product => ({
      id: `kit-${kit.id}-${product.id}`,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      type: 'kit',
      kitName: kit.name
    }));

    setCartItems(prev => [...prev, ...kitItems]);
  };

  const addCustomKitToCart = (customKit: any) => {
    const kitItems: CartItem[] = customKit.products.map((product: any) => ({
      id: `custom-${customKit.id}-${product.id}`,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      type: 'kit',
      kitName: customKit.name
    }));

    setCartItems(prev => [...prev, ...kitItems]);
    setCurrentView('home');
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'products':
        return (
          <ProductCatalog
            categoryId={selectedCategory.id}
            categoryName={selectedCategory.name}
            onBack={() => setCurrentView('home')}
            onAddToCart={addProductToCart}
          />
        );
      case 'kit-details':
        return selectedKit ? (
          <KitDetails
            kit={selectedKit}
            onBack={() => setCurrentView('home')}
            onCustomize={handleCustomizeKit}
            onAddToCart={addKitToCart}
          />
        ) : null;
      case 'kit-customizer':
        return selectedKit ? (
          <KitCustomizer
            kit={selectedKit}
            onBack={() => setCurrentView('kit-details')}
            onSaveAndAddToCart={addCustomKitToCart}
          />
        ) : null;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pb-28">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                  Bem-vindo ao Ebo Ayo
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
                  Sua casa digital para encontrar tudo que precisa para seus rituais sagrados. 
                  Produtos autênticos, kits personalizados e a tradição ao seu alcance.
                </p>
                <div className="flex justify-center items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Produtos Autênticos</span>
                  </div>
                  <div className="w-1 h-4 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Kits Personalizáveis</span>
                  </div>
                  <div className="w-1 h-4 bg-white/30"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Entrega Rápida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Products Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Produtos em Destaque
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comece suas compras com nossos produtos mais populares, selecionados especialmente para você.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={addProductToCart}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Explore Nossas Categorias
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Encontre exatamente o que precisa para seus rituais, desde ingredientes individuais 
                  até kits completos personalizáveis.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CategoryCard
                      name={category.name}
                      description={category.description}
                      icon={category.icon}
                      onClick={() => handleCategoryClick(category)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Por que escolher o Ebo Ayo?
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Kits Personalizáveis</h3>
                    <p className="text-muted-foreground">
                      Monte seu próprio kit ou customize os prontos. Total flexibilidade para suas necessidades.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wheat className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Produtos Autênticos</h3>
                    <p className="text-muted-foreground">
                      Ingredientes selecionados e preparados seguindo tradições ancestrais.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Flame className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Experiência Completa</h3>
                    <p className="text-muted-foreground">
                      Do planejamento à execução, temos tudo para seus rituais sagrados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={getTotalCartCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {renderCurrentView()}

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
      />

      {/* Mostrar menu apenas na home */}
      {currentView === 'home' && <BottomNavigation />}
    </div>
  );
};

export default Index;
