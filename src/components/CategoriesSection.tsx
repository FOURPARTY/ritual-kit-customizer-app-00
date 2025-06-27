
import React from 'react';
import { Wheat, Droplets, Flame, Apple, Bird, Package2, Package } from 'lucide-react';
import CategoryCard from './CategoryCard';

interface CategoriesSectionProps {
  onCategoryClick: (category: any) => void;
}

const CategoriesSection = ({ onCategoryClick }: CategoriesSectionProps) => {
  const categories = [
    { id: 1, name: 'Grãos e Farinhas', icon: Wheat, description: 'Ingredientes fundamentais para oferendas e rituais' },
    { id: 2, name: 'Líquidos e Azeites', icon: Droplets, description: 'Azeites sagrados, mel e bebidas rituais' },
    { id: 3, name: 'Velas e Itens Rituais', icon: Flame, description: 'Velas, tecidos e ferramentas para seus rituais' },
    { id: 4, name: 'Frutas e Verduras', icon: Apple, description: 'Frutas, legumes e verduras para oferendas' },
    { id: 5, name: 'Animais Sagrados', icon: Bird, description: 'Animais para rituais e oferendas sagradas' },
    { id: 6, name: 'Utensílios Rituais', icon: Package2, description: 'Bacias, terrinas e utensílios tradicionais' },
    { id: 7, name: 'Kits Prontos', icon: Package, description: 'Conjuntos completos para rituais específicos' }
  ];

  return (
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
              onClick={() => onCategoryClick(category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
