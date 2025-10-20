import { MapPin, Star, Clock, DollarSign } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockLocations = [
  {
    id: 1,
    lat: 45,
    lng: 25,
    name: "Café Central",
    category: "Café",
    rating: 4.8,
    priceLevel: 2,
    description: "Café aconchegante com ótimos doces artesanais e café especial",
    openHours: "8h - 20h",
    reviews: 127
  },
  {
    id: 2,
    lat: 55,
    lng: 60,
    name: "Restaurante Bella Vista",
    category: "Restaurante",
    rating: 4.6,
    priceLevel: 3,
    description: "Culinária italiana autêntica com vista panorâmica da cidade",
    openHours: "12h - 23h",
    reviews: 89
  },
  {
    id: 3,
    lat: 30,
    lng: 75,
    name: "Parque das Flores",
    category: "Parque",
    rating: 4.9,
    priceLevel: 0,
    description: "Espaço verde perfeito para caminhadas e piqueniques",
    openHours: "6h - 22h",
    reviews: 245
  },
  {
    id: 4,
    lat: 65,
    lng: 35,
    name: "Museu de Arte Moderna",
    category: "Cultura",
    rating: 4.7,
    priceLevel: 1,
    description: "Exposições de arte contemporânea e eventos culturais",
    openHours: "10h - 18h",
    reviews: 156
  },
  {
    id: 5,
    lat: 75,
    lng: 80,
    name: "Pizzaria Napolitana",
    category: "Restaurante",
    rating: 4.5,
    priceLevel: 2,
    description: "Pizzas tradicionais no forno a lenha",
    openHours: "18h - 00h",
    reviews: 203
  },
];

const Recommendations = () => {
  const getPriceIndicator = (level: number) => {
    if (level === 0) return "Gratuito";
    return "$".repeat(level);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Café: "bg-amber-500",
      Restaurante: "bg-orange-500",
      Parque: "bg-green-500",
      Cultura: "bg-purple-500",
    };
    return colors[category] || "bg-primary";
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] pb-20">
      <div className="absolute inset-0 bg-muted">
        {/* Map placeholder - styled to look like a city map */}
        <div className="w-full h-full relative bg-[#f5f5f0]">
          {/* Grid pattern to simulate streets */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid-rec" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#999" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-rec)" />
          </svg>
          
          {/* Green areas (parks) */}
          <div className="absolute top-[15%] left-[10%] w-24 h-20 bg-green-200 rounded opacity-60" />
          <div className="absolute top-[25%] right-[15%] w-32 h-24 bg-green-200 rounded opacity-60" />
          <div className="absolute bottom-[30%] left-[20%] w-28 h-32 bg-green-200 rounded opacity-60" />
          
          {/* Blue areas (water) */}
          <div className="absolute top-[40%] left-[35%] w-20 h-28 bg-blue-200 rounded opacity-50" />
          
          {/* Location markers */}
          {mockLocations.map((location) => (
            <Popover key={location.id}>
              <PopoverTrigger asChild>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform group"
                  style={{
                    top: `${location.lat}%`,
                    left: `${location.lng}%`,
                  }}
                >
                  <div className="relative">
                    <MapPin className={`w-8 h-8 ${getCategoryColor(location.category)} drop-shadow-lg`} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border-2 border-background shadow-sm">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <Badge variant="secondary" className="shrink-0">
                        {location.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-medium">{location.rating}</span>
                      <span className="text-muted-foreground">({location.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{getPriceIndicator(location.priceLevel)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{location.openHours}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" className="flex-1">Como chegar</Button>
                    <Button size="sm" variant="outline" className="flex-1">Mais detalhes</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
          
          {/* User location marker */}
          <div className="absolute bottom-[40%] left-[15%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-card rounded-lg shadow-lg p-3">
          <p className="text-sm text-muted-foreground text-center">
            {mockLocations.length} lugares recomendados perto de você
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
