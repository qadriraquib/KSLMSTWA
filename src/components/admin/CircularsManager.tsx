import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCirculars, saveCircular, deleteCircular, Circular } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

export function CircularsManager() {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    url: "",
    date: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setCirculars(getCirculars());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const circular: Circular = {
      ...formData,
      id: formData.id || Date.now().toString(),
    };
    saveCircular(circular);
    setCirculars(getCirculars());
    setFormData({ id: "", title: "", url: "", date: "" });
    toast({
      title: "Success",
      description: "Circular saved successfully",
    });
  };

  const handleDelete = (id: string) => {
    deleteCircular(id);
    setCirculars(getCirculars());
    toast({
      title: "Deleted",
      description: "Circular deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Circular</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="url">PDF URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/circular.pdf"
                  required
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {formData.id ? "Update" : "Add"} Circular
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Circulars List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {circulars.map((circular) => (
              <div key={circular.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{circular.title}</h4>
                  <p className="text-sm text-muted-foreground">{circular.date}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(circular.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
