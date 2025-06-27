
import { useState } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pb-28">
      <Header cartCount={0} onCartClick={() => {}} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Buscar Produtos</h1>
          
          {/* Search Input */}
          <div className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar produtos, kits, ingredientes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {searchQuery ? (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Buscando por "{searchQuery}"
              </h3>
              <p className="text-gray-500">
                Implementação da busca será adicionada em breve
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                O que você está procurando?
              </h3>
              <p className="text-gray-500">
                Digite acima para encontrar produtos, kits e ingredientes
              </p>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Search;
