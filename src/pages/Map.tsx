import { MapPin, Calendar, ThumbsUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const mockMarkers = [
  { 
    id: 1, 
    lat: 50, 
    lng: 30, 
    title: "Buraco na rua",
    description: "Buraco grande na Rua Matilde, altura do nº 234",
    date: "Reportado há 2 dias",
    likes: 12
  },
  { 
    id: 2, 
    lat: 35, 
    lng: 15, 
    title: "Iluminação deficiente",
    description: "Poste apagado na Praça Central",
    date: "Reportado há 1 dia",
    likes: 8
  },
  { 
    id: 3, 
    lat: 60, 
    lng: 70, 
    title: "Lixo acumulado",
    description: "Acúmulo de lixo na esquina da Av. Principal",
    date: "Reportado há 5 horas",
    likes: 15
  },
  { 
    id: 4, 
    lat: 70, 
    lng: 50, 
    title: "Calçada quebrada",
    description: "Calçada danificada em frente ao mercado",
    date: "Reportado há 3 dias",
    likes: 6
  },
  { 
    id: 5, 
    lat: 80, 
    lng: 85, 
    title: "Semáforo quebrado",
    description: "Sinal não funciona no cruzamento",
    date: "Reportado há 1 hora",
    likes: 20
  },
];

const Map = () => {
  return (
    <div className="relative w-full h-[calc(100vh-5rem)] pb-20">
      <div className="absolute inset-0 bg-muted">
        {/* Map placeholder - styled to look like a city map */}
        <div className="w-full h-full relative bg-[#f5f5f0]">
          {/* Grid pattern to simulate streets */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#999" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Green areas (parks) */}
          <div className="absolute top-[15%] left-[10%] w-24 h-20 bg-green-200 rounded opacity-60" />
          <div className="absolute top-[25%] right-[15%] w-32 h-24 bg-green-200 rounded opacity-60" />
          <div className="absolute bottom-[30%] left-[20%] w-28 h-32 bg-green-200 rounded opacity-60" />
          <div className="absolute bottom-[15%] right-[10%] w-36 h-28 bg-green-200 rounded opacity-60" />
          
          {/* Blue areas (water) */}
          <div className="absolute top-[40%] left-[35%] w-20 h-28 bg-blue-200 rounded opacity-50" />
          
          {/* Issue markers */}
          {mockMarkers.map((marker) => (
            <Popover key={marker.id}>
              <PopoverTrigger asChild>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    top: `${marker.lat}%`,
                    left: `${marker.lng}%`,
                  }}
                >
                  <MapPin className="w-8 h-8 text-destructive fill-destructive drop-shadow-lg" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{marker.title}</h3>
                  <p className="text-sm text-muted-foreground">{marker.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{marker.date}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{marker.likes} apoios</span>
                    </div>
                    <Button size="sm" variant="outline">Ver detalhes</Button>
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
            {mockMarkers.length} problemas reportados na sua área
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
