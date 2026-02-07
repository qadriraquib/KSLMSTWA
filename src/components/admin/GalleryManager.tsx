import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchGallery,uploadGallery,deleteGallery,updateGallery } from "@/lib/api/galleryApi";


import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export function GalleryManager() {
  const { toast } = useToast();

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchGallery().then(setPhotos);
  }, []);

  // 🔹 ADD / UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);

      if (file) form.append("file", file);

      if (editingId) {
        await updateGallery(editingId, form);
        toast({ title: "Updated", description: "Image updated successfully" });
      } else {
        if (!file) {
          toast({ title: "Error", description: "Image required" });
          return;
        }
        await uploadGallery(form);
        toast({ title: "Added", description: "Image uploaded successfully" });
      }

      setPhotos(await fetchGallery());
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFile(null);
    setFormData({ title: "", description: "" });
  };

  // 🔹 EDIT
  const handleEdit = (photo: GalleryPhoto) => {
    setEditingId(photo.id);
    setFormData({
      title: photo.title,
      description: photo.description || "",
    });
  };

  // 🔹 DELETE
  const handleDelete = async (id: string) => {
    await deleteGallery(id);
    setPhotos(await fetchGallery());
    toast({ title: "Deleted", description: "Image removed" });
  };

  return (
    <div className="space-y-6">
      {/* ================= FORM ================= */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Gallery Image" : "Add Gallery Image"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image {editingId && "(optional)"}</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    if (f.size > 4 * 1024 * 1024) {
                      toast({
                        title: "Error",
                        description: "Max 4MB allowed",
                      });
                      return;
                    }
                    setFile(f);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                <Plus className="mr-2 h-4 w-4" />
                {editingId ? "Update" : "Add"}
              </Button>

              {editingId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ================= GALLERY ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 rounded-lg">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(photo)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(photo.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <p className="mt-2 text-sm text-center font-medium">
                  {photo.title}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
