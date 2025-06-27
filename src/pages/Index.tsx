
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import BottomNavigation from '@/components/BottomNavigation';
import ProductCatalog from './ProductCatalog';
import KitDetails from './KitDetails';
import KitCustomizer from './KitCustomizer';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturesSection from '@/components/FeaturesSection';
import { useProducts } from '@/hooks/useProducts';
import { CartItem, Kit, Product } from '@/types';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'kit-details' | 'kit-customizer'>('home');
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string }>({ id: 1, name: '' });
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Usar o hook de produtos reais
  const { products: featuredProducts, loading: productsLoading, error: productsError } = useProducts();

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
            <HeroSection />
            <FeaturedProducts
              products={featuredProducts}
              loading={productsLoading}
              error={productsError}
              onAddToCart={addProductToCart}
            />
            <CategoriesSection onCategoryClick={handleCategoryClick} />
            <FeaturesSection />
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
