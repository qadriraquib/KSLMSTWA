import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Pen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function BlogManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    name: "",
    role: "",
    content: "",
  });
const [editId, setEditId] = useState<string | null>(null);

  const { toast } = useToast();

  /* ---------------- LOAD TESTIMONIALS ---------------- */
  const loadTestimonials = () => {
    fetch(`${API_BASE}/testimonials`)
      .then(res => res.json())
      .then(setTestimonials);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  /* ---------------- ADD TESTIMONIAL ---------------- */
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const url = editId
    ? `${API_BASE}/testimonials/${editId}`
    : `${API_BASE}/testimonials`;

  const method = editId ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  toast({
    title: "Success",
    description: editId
      ? "Testimonial updated successfully"
      : "Testimonial added successfully",
  });

  setForm({ name: "", role: "", content: "" });
  setEditId(null);        // ✅ important: exit edit mode
  loadTestimonials();
};

  // edit
const handleEdit = (t: any) => {
  setForm({
    name: t.name,
    role: t.role,
    content: t.content,
  });
  setEditId(t.id);
};

  /* ---------------- DELETE TESTIMONIAL ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    await fetch(`${API_BASE}/testimonials/${id}`, {
      method: "DELETE",
    });

    toast({
      title: "Deleted",
      description: "Testimonial deleted",
    });

    loadTestimonials();
  };

  return (
    <div className="space-y-8">

      {/* ================= ADD TESTIMONIAL ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Add Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              placeholder="Role"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              required
            />
            <Textarea
              placeholder="Testimonial content"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              required
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ================= TESTIMONIAL LIST ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {testimonials.length === 0 && (
            <p className="text-sm text-muted-foreground">No testimonials added yet.</p>
          )}

          {testimonials.map(t => (
            <div
              key={t.id}
              className="flex justify-between gap-4 border p-4 rounded-lg"
            >
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
                <p className="text-xs mt-2">{t.content}</p>
              </div>
<Button
  size="sm"
  variant="outline"
  onClick={() => handleEdit(t)}
>
 <Pen className="h-4 w-4" />
</Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(t.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
