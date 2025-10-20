import { Heart, MessageCircle, Share2, Send, Info, MapPin, Calendar, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type FeedItemType = "issue" | "place" | "event";

interface FeedItem {
  id: number;
  type: FeedItemType;
  title: string;
  image: string;
  likes: number;
  comments: number;
  description: string;
  location: string;
  date: string;
  status?: string;
  category: string;
  rating?: number;
  reviews?: number;
  priceLevel?: number;
  eventDate?: string;
  eventTime?: string;
}

const mockFeedItems: FeedItem[] = [
  {
    id: 1,
    type: "issue",
    title: "BURACO NA RUA MATILDE",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    likes: 12,
    comments: 5,
    description: "Grande buraco na via principal causando risco para motoristas e pedestres. O buraco tem aproximadamente 50cm de profundidade e está crescendo com as chuvas.",
    location: "Rua Matilde, nº 234 - Centro",
    date: "há 3 dias",
    status: "Em análise",
    category: "Infraestrutura",
  },
  {
    id: 2,
    type: "place",
    title: "CAFÉ CENTRAL",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    likes: 128,
    comments: 34,
    description: "Café aconchegante com ótimos doces artesanais e café especial. Ambiente perfeito para trabalhar ou relaxar.",
    location: "Av. Principal, 567 - Centro",
    date: "A 500m de você",
    category: "Café",
    rating: 4.8,
    reviews: 127,
    priceLevel: 2,
  },
  {
    id: 3,
    type: "event",
    title: "FESTIVAL DE MÚSICA AO AR LIVRE",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop",
    likes: 256,
    comments: 89,
    description: "Festival gratuito com bandas locais e food trucks. Venha aproveitar um dia incrível de música e cultura!",
    location: "Parque das Flores",
    date: "Amanhã",
    category: "Cultura",
    eventDate: "15 de Outubro",
    eventTime: "14h - 22h",
  },
  {
    id: 4,
    type: "issue",
    title: "PRAÇA DOS CÃES REVIGORADA",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&h=300&fit=crop",
    likes: 28,
    comments: 8,
    description: "A praça foi completamente reformada com nova área para pets, bancos e iluminação adequada. Muito obrigado à prefeitura pelo excelente trabalho!",
    location: "Praça dos Cães - Bairro Jardim",
    date: "há 1 dia",
    status: "Resolvido",
    category: "Espaços Públicos",
  },
  {
    id: 5,
    type: "place",
    title: "RESTAURANTE BELLA VISTA",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    likes: 89,
    comments: 45,
    description: "Culinária italiana autêntica com vista panorâmica da cidade. Massas frescas e vinhos selecionados.",
    location: "Rua do Mirante, 123",
    date: "A 1.2km de você",
    category: "Restaurante",
    rating: 4.6,
    reviews: 89,
    priceLevel: 3,
  },
  {
    id: 6,
    type: "event",
    title: "FEIRA DE ARTESANATO LOCAL",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop",
    likes: 145,
    comments: 56,
    description: "Feira com artesãos locais, produtos orgânicos e apresentações culturais. Apoie o comércio local!",
    location: "Praça Central",
    date: "Este fim de semana",
    category: "Comércio",
    eventDate: "Sábado e Domingo",
    eventTime: "9h - 18h",
  },
  {
    id: 7,
    type: "issue",
    title: "ILUMINAÇÃO DEFICIENTE",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    likes: 7,
    comments: 3,
    description: "Poste de iluminação queimado há mais de uma semana, deixando toda a rua escura durante a noite. Situação preocupante para segurança dos moradores.",
    location: "Rua das Flores, altura do nº 567",
    date: "há 5 dias",
    status: "Aguardando resposta",
    category: "Iluminação Pública",
  },
];

const mockComments = [
  { id: 1, author: "João Silva", text: "Já reportei isso na prefeitura também!", time: "há 2 horas" },
  { id: 2, author: "Maria Santos", text: "Situação crítica mesmo", time: "há 5 horas" },
  { id: 3, author: "Pedro Costa", text: "Obrigado por compartilhar!", time: "há 1 dia" },
];

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [newComment, setNewComment] = useState("");

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getItemBadgeColor = (type: FeedItemType) => {
    switch (type) {
      case "issue":
        return "bg-destructive text-destructive-foreground";
      case "place":
        return "bg-primary text-primary-foreground";
      case "event":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getItemIcon = (type: FeedItemType) => {
    switch (type) {
      case "issue":
        return <MapPin className="w-3 h-3" />;
      case "place":
        return <Star className="w-3 h-3" />;
      case "event":
        return <Calendar className="w-3 h-3" />;
    }
  };

  const getItemTypeLabel = (type: FeedItemType) => {
    switch (type) {
      case "issue":
        return "Problema";
      case "place":
        return "Recomendação";
      case "event":
        return "Evento";
    }
  };

  const getPriceIndicator = (level?: number) => {
    if (level === undefined) return null;
    if (level === 0) return "Gratuito";
    return "$".repeat(level);
  };

  return (
    <div className="pb-20 px-4 pt-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feed da Comunidade</h1>
      
      {mockFeedItems.map((item) => {
        const isLiked = likedPosts.has(item.id);
        
        return (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start justify-between">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <Badge className={`${getItemBadgeColor(item.type)} flex items-center gap-1 shrink-0 ml-2`}>
                  {getItemIcon(item.type)}
                  {getItemTypeLabel(item.type)}
                </Badge>
              </div>
              
              <div className="aspect-video w-full bg-muted overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => toggleLike(item.id)}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span>{item.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>{item.comments}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Comentários - {item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{comment.author}</p>
                            <p className="text-xs text-muted-foreground">{comment.time}</p>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Input
                        placeholder="Adicione um comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-5 h-5" />
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                      <Info className="w-5 h-5" />
                      <span>Detalhes</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-video w-full bg-muted overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Badge className={getItemBadgeColor(item.type)}>
                            {getItemTypeLabel(item.type)}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Descrição</h4>
                          <p className="text-sm">{item.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Localização</h4>
                            <p className="text-sm">{item.location}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Categoria</h4>
                            <p className="text-sm">{item.category}</p>
                          </div>
                          
                          {item.type === "issue" && (
                            <>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Data</h4>
                                <p className="text-sm">{item.date}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Status</h4>
                                <p className="text-sm font-medium">{item.status}</p>
                              </div>
                            </>
                          )}
                          
                          {item.type === "place" && (
                            <>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Distância</h4>
                                <p className="text-sm">{item.date}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Preço</h4>
                                <p className="text-sm">{getPriceIndicator(item.priceLevel)}</p>
                              </div>
                            </>
                          )}
                          
                          {item.type === "event" && (
                            <>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Data do Evento</h4>
                                <p className="text-sm flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {item.eventDate}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Horário</h4>
                                <p className="text-sm flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.eventTime}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {item.type === "place" && item.rating && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Avaliação</h4>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                              <span className="text-sm font-medium">{item.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({item.reviews} avaliações)
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-6 pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{item.likes + (isLiked ? 1 : 0)} curtidas</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{item.comments} comentários</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Feed;
