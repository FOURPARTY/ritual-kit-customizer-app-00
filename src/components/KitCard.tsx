
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Star } from 'lucide-react';

interface Kit {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image: string;
  ritual_type: string;
  difficulty: string;
  product_ids: number[];
}

interface KitCardProps {
  kit: Kit;
  onClick: (kit: Kit) => void;
}

const KitCard = ({ kit, onClick }: KitCardProps) => {
  const savings = parseFloat(kit.original_price.replace('R$ ', '').replace(',', '.')) - 
                 parseFloat(kit.price.replace('R$ ', '').replace(',', '.'));

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onClick={() => onClick(kit)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={kit.image}
            alt={kit.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 hover:bg-green-600">
              Economize R$ {savings.toFixed(2).replace('.', ',')}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90">
              <Package className="h-3 w-3 mr-1" />
              {kit.product_ids.length} itens
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {kit.ritual_type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {kit.difficulty}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 mb-2">
            {kit.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {kit.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground line-through">
                {kit.original_price}
              </span>
              <span className="text-xl font-bold text-primary">
                {kit.price}
              </span>
            </div>
            
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KitCard;
