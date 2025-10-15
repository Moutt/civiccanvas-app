import { useState } from "react";
import { Camera, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const issueTypes = [
  "Buraco",
  "Iluminação",
  "Lixo",
  "Calçada",
  "Semáforo",
  "Outro",
];

const Report = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = () => {
    if (!selectedImage || !description || selectedTypes.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Problema reportado!",
      description: "Obrigado por ajudar a melhorar nossa cidade",
    });
    
    navigate("/");
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reportar Problema</h1>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Image upload */}
          <div className="space-y-3">
            {selectedImage ? (
              <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video w-full border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Adicionar foto</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">INSERIR LEGENDA</label>
            <Textarea
              placeholder="Descreva o problema..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Issue type selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">SELEÇÃO DE TIPO</label>
            <div className="grid grid-cols-3 gap-2">
              {issueTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="w-full"
                  onClick={() => toggleType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => setSelectedImage(null)}
            >
              OUTRA FOTO
            </Button>
            <Button
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              onClick={handleSubmit}
            >
              POSTAR
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
