import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  fetchCirculars,
  createCircular,
  updateCircular,
  deleteCircularApi,
} from "@/lib/api/circular";

export function CircularsManager() {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    id: "",
    title: "",
    date: "",
    pdf: null,
  });

  const { toast } = useToast();

  // 🔹 Fetch circulars
  useEffect(() => {
    fetchCirculars().then(setCirculars);
  }, []);

  // 🔹 Submit (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("date", form.date);
    if (form.pdf) fd.append("pdf", form.pdf);

    if (form.id) {
      await updateCircular(form.id, fd);
      toast({ title: "Updated", description: "Circular updated" });
    } else {
      await createCircular(fd);
      toast({ title: "Created", description: "Circular added" });
    }

    setCirculars(await fetchCirculars());
    setForm({ id: "", title: "", date: "", pdf: null });
  };

  // 🔹 Delete with confirmation
  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this circular?");
    if (!ok) return;

    await deleteCircularApi(id);
    setCirculars(await fetchCirculars());

    toast({ title: "Deleted", description: "Circular deleted" });
  };

  // 🔹 Edit
  const handleEdit = (c: any) => {
    setForm({
      id: c.id,
      title: c.title,
      date: c.date,
      pdf: null, // optional re-upload
    });
  };

  return (
    <div className="space-y-6">
      {/* ADD / EDIT FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Add / Edit Circular</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />

          <Input
  type="file"
  accept="application/pdf"
  onChange={(e) =>
    setForm({ ...form, pdf: e.target.files?.[0] || null })
  }
/>

{!form.pdf && (
  <p className="text-xs text-destructive">
    Please select a PDF to continue
  </p>
)}

            <Button
  type="submit"
  disabled={!form.pdf}
>
  <Plus className="mr-2 h-4 w-4" />
  {form.id ? "Update" : "Add"} Circular
</Button>

          </form>
        </CardContent>
      </Card>

      {/* LIST */}
      <Card>
        <CardHeader>
          <CardTitle>All Circulars</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {circulars.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(c.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
