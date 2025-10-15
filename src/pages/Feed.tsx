import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockIssues = [
  {
    id: 1,
    title: "BURACO NA RUA MATILDE",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    title: "PRAÇA DOS CÃES REVIGORADA",
    image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&h=300&fit=crop",
    likes: 28,
    comments: 8,
  },
  {
    id: 3,
    title: "ILUMINAÇÃO DEFICIENTE",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    likes: 7,
    comments: 3,
  },
];

const Feed = () => {
  return (
    <div className="pb-20 px-4 pt-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Problemas Urbanos</h1>
      
      {mockIssues.map((issue) => (
        <Card key={issue.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-3">{issue.title}</h3>
            </div>
            
            <div className="aspect-video w-full bg-muted overflow-hidden">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="w-5 h-5" />
                <span>{issue.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{issue.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
