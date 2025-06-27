
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  description: string;
  category: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Buscando produtos via Edge Function...');
        
        // Chama a Edge Function get-products
        const { data, error } = await supabase.functions.invoke('get-products');

        if (error) {
          throw error;
        }

        if (data && data.products) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }

      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
