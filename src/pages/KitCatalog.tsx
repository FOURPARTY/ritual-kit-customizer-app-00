
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KitCard from '@/components/KitCard';

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

interface KitCatalogProps {
  onBack: () => void;
  onKitClick: (kit: Kit) => void;
}

const KitCatalog = ({ onBack, onKitClick }: KitCatalogProps) => {
  const [kits, setKits] = useState<Kit[]>([]);

  useEffect(() => {
    // Load kits from JSON
    import('../data/kits.json').then((data) => {
      setKits(data.default);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kits Prontos</h1>
            <p className="text-muted-foreground mt-1">
              Conjuntos completos para seus rituais
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kits.map((kit) => (
            <KitCard
              key={kit.id}
              kit={kit}
              onClick={onKitClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitCatalog;
