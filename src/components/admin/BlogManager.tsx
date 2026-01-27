import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts, saveBlogPost, deleteBlogPost, BlogPost } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    date: "",
    author: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: BlogPost = {
      ...formData,
      id: formData.id || Date.now().toString(),
    };
    saveBlogPost(post);
    setPosts(getBlogPosts());
    setFormData({ id: "", title: "", excerpt: "", content: "", image: "", date: "", author: "" });
    toast({
      title: "Success",
      description: "Blog post saved successfully",
    });
  };

  const handleDelete = (id: string) => {
    deleteBlogPost(id);
    setPosts(getBlogPosts());
    toast({
      title: "Deleted",
      description: "Blog post deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Blog Post</CardTitle>
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
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  required
                />
              </div>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {formData.id ? "Update" : "Add"} Blog Post
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex gap-4">
                  <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h4 className="font-semibold">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">{post.author} - {post.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">{post.excerpt}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.id)}
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
