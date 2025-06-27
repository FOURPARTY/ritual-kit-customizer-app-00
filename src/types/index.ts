
export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  type: 'product' | 'kit';
  kitName?: string;
}

export interface Kit {
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

export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: string;
  image: string;
  description: string;
}
