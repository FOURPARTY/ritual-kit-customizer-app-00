
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  showRoute: boolean;
  deliveryProgress: number; // 0 to 100
}

const MapView = ({ showRoute, deliveryProgress }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [deliveryPosition, setDeliveryPosition] = useState({ x: 20, y: 80 });

  useEffect(() => {
    if (showRoute && deliveryProgress > 0) {
      // Simulate delivery movement along the route
      const startX = 20;
      const startY = 80;
      const endX = 80;
      const endY = 20;
      
      const progress = deliveryProgress / 100;
      const newX = startX + (endX - startX) * progress;
      const newY = startY + (endY - startY) * progress;
      
      setDeliveryPosition({ x: newX, y: newY });
    }
  }, [showRoute, deliveryProgress]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div 
        ref={mapRef}
        className="relative h-64 md:h-80 bg-gradient-to-br from-green-100 to-blue-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20zM0 20v20h20c0-11.046-8.954-20-20-20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {/* Store location */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: '20%', top: '80%' }}
        >
          <div className="bg-primary text-white p-2 rounded-full shadow-lg">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="bg-white px-2 py-1 rounded shadow-lg mt-1 text-xs font-medium whitespace-nowrap">
            Ilê Axé - Loja
          </div>
        </div>

        {/* Customer location */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: '80%', top: '20%' }}
        >
          <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="bg-white px-2 py-1 rounded shadow-lg mt-1 text-xs font-medium whitespace-nowrap">
            Sua Casa
          </div>
        </div>

        {/* Route */}
        {showRoute && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <pattern id="dashed" patternUnits="userSpaceOnUse" width="8" height="8">
                <rect width="4" height="2" fill="#ef4444" />
              </pattern>
            </defs>
            <line 
              x1="20%" 
              y1="80%" 
              x2="80%" 
              y2="20%" 
              stroke="#ef4444" 
              strokeWidth="3"
              strokeDasharray="8,4"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Delivery person */}
        {showRoute && deliveryProgress > 0 && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ease-linear"
            style={{ 
              left: `${deliveryPosition.x}%`, 
              top: `${deliveryPosition.y}%` 
            }}
          >
            <div className="bg-yellow-500 text-white p-2 rounded-full shadow-lg animate-bounce">
              <Navigation className="h-4 w-4" />
            </div>
            <div className="bg-white px-2 py-1 rounded shadow-lg mt-1 text-xs font-medium whitespace-nowrap">
              João - Entregador
            </div>
          </div>
        )}

        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-400"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
