import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

const mockComments = [
  { id: 1, author: "João Silva", text: "Já reportei isso na prefeitura também!", time: "há 2 horas" },
  { id: 2, author: "Maria Santos", text: "Situação crítica mesmo", time: "há 5 horas" },
  { id: 3, author: "Pedro Costa", text: "Obrigado por compartilhar!", time: "há 1 dia" },
];

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [newComment, setNewComment] = useState("");

  const toggleLike = (issueId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
      }
      return newSet;
    });
  };

  return (
    <div className="pb-20 px-4 pt-6 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Problemas Urbanos</h1>
      
      {mockIssues.map((issue) => {
        const isLiked = likedPosts.has(issue.id);
        
        return (
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => toggleLike(issue.id)}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span>{issue.likes + (isLiked ? 1 : 0)}</span>
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>{issue.comments}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Comentários</DialogTitle>
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
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Feed;
