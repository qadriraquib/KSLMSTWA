import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGalleryPhotos, saveGalleryPhoto, deleteGalleryPhoto, GalleryPhoto } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

export function GalleryManager() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    url: "",
    title: "",
    description: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setPhotos(getGalleryPhotos());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const photo: GalleryPhoto = {
      ...formData,
      id: formData.id || Date.now().toString(),
    };
    saveGalleryPhoto(photo);
    setPhotos(getGalleryPhotos());
    setFormData({ id: "", url: "", title: "", description: "" });
    toast({
      title: "Success",
      description: "Photo saved successfully",
    });
  };

  const handleDelete = (id: string) => {
    deleteGalleryPhoto(id);
    setPhotos(getGalleryPhotos());
    toast({
      title: "Deleted",
      description: "Photo deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Gallery Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="url">Photo URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {formData.id ? "Update" : "Add"} Photo
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img src={photo.url} alt={photo.title} className="w-full h-40 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-2 font-medium">{photo.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
