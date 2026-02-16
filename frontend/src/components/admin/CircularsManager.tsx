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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CircularsManager() {
  const [circulars, setCirculars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
    id: "",
    title: "",
    date: "",
    pdf: null,
  });

  const { toast } = useToast();

  // 🔹 Load circulars
  const loadCirculars = async () => {
    try {
      const data = await fetchCirculars();
      setCirculars(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load circulars",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadCirculars();
  }, []);

  // 🔹 Submit (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.title || !form.date) {
      toast({
        title: "Validation Error",
        description: "Title and Date are required",
        variant: "destructive",
      });
      return;
    }

    if (!form.id && !form.pdf) {
      toast({
        title: "Validation Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("date", form.date);
    if (form.pdf) fd.append("pdf", form.pdf);

    try {
      setLoading(true);

      if (form.id) {
        await updateCircular(form.id, fd);

        toast({
          title: "Updated Successfully",
          description: "Circular updated successfully",
        });
      } else {
        await createCircular(fd);

        toast({
          title: "Created Successfully",
          description: "Circular added successfully",
        });
      }

      setForm({ id: "", title: "", date: "", pdf: null });
      await loadCirculars();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Edit
  const handleEdit = (c: any) => {
    setForm({
      id: c.id,
      title: c.title,
      date: c.date,
      pdf: null,
    });
  };

  return (
    <div className="space-y-6">

      {/* ================= FORM ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Add / Edit Circular</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />

            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setForm({ ...form, pdf: e.target.files?.[0] || null })
              }
            />

            <Button type="submit" disabled={loading}>
              <Plus className="mr-2 h-4 w-4" />
              {form.id ? "Update Circular" : "Add Circular"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* ================= LIST ================= */}
      <Card>
        <CardHeader>
          <CardTitle>All Circulars</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {circulars.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No circulars available
            </p>
          )}

          {circulars.map((c) => (
            <div
              key={c.id}
              className="flex justify-between items-center p-3 border rounded"
            >
              <div>
                <p className="font-semibold">{c.title}</p>
                <p className="text-xs text-muted-foreground">
                  {c.date}
                </p>
              </div>

              <div className="flex gap-2">

                {/* EDIT */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </Button>

                {/* DELETE WITH SHADCN ALERT */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete Circular?
                      </AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone.
                        This will permanently delete
                        "{c.title}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction
                        onClick={async () => {
                          try {
                            await deleteCircularApi(c.id);

                            toast({
                              title: "Deleted",
                              description:
                                "Circular deleted successfully",
                            });

                            await loadCirculars();
                          } catch (error) {
                            toast({
                              title: "Error",
                              description:
                                "Delete failed",
                              variant: "destructive",
                            });
                          }
                        }}
                        className="bg-destructive text-white hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
