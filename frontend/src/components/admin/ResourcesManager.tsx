import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getResources, saveResource, deleteResource, Resource } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

export function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    subject: "",
    type: "pdf" as "pdf" | "video",
    url: "",
    videoUrl: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setResources(getResources());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resource: Resource = {
      ...formData,
      id: formData.id || Date.now().toString(),
      videoUrl: formData.type === "video" ? formData.videoUrl : undefined,
    };
    saveResource(resource);
    setResources(getResources());
    setFormData({ id: "", title: "", description: "", subject: "", type: "pdf", url: "", videoUrl: "" });
    toast({
      title: "Success",
      description: "Resource saved successfully",
    });
  };

  const handleDelete = (id: string) => {
    deleteResource(id);
    setResources(getResources());
    toast({
      title: "Deleted",
      description: "Resource deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Resource</CardTitle>
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
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value: "pdf" | "video") => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">PDF URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                  required
                />
              </div>
              {formData.type === "video" && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="videoUrl">YouTube Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  />
                </div>
              )}
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {formData.id ? "Update" : "Add"} Resource
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.subject} - {resource.type}</p>
                  <p className="text-xs text-muted-foreground">{resource.description}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(resource.id)}
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
