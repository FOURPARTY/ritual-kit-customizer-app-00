
import React from 'react';
import { Package, Wheat, Flame } from 'lucide-react';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
