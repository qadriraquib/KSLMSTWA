import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/resources`;

interface Resource {
  id: number;
  name: string;
  designation: string;
  school_name: string;
  school_address: string;
  subject?: string;
  description?: string;
  photo?: string;
}

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: "",
    designation: "",
    school_name: "",
    school_address: "",
    subject: "",
    description: "",
    photo: null,
  });

  const limit = 5;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}?page=${page}&limit=${limit}`);
      setResources(res.data.data);
      setTotal(res.data.total);
    } catch {
      toast.error("Failed to load resources");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      school_name: "",
      school_address: "",
      subject: "",
      description: "",
      photo: null,
    });
    setEditing(null);
  };

  const handleSubmit = async () => {
  if (
    !formData.name?.trim() ||
    !formData.designation?.trim() ||
    !formData.school_name?.trim() ||
    !formData.school_address?.trim()
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  const data = new FormData();

  Object.keys(formData).forEach((key) => {
    if (formData[key] !== null && formData[key] !== "")
      data.append(key, formData[key]);
  });

  try {
    setLoading(true);

    if (editing) {
      await axios.put(`${API}/${editing.id}`, data);
      toast.success("Resource updated successfully 🎉");
    } else {
      await axios.post(API, data);
      toast.success("Resource added successfully 🎉");
    }

    resetForm();
    fetchData();
  } catch (err: any) {
    console.log(err);
    toast.error(
      err?.response?.data?.detail ||
      err?.response?.data?.error ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Deleted Successfully");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditing(resource);
    setFormData({
      ...resource,
      photo: null,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Resources</h2>

      {/* FORM */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Input name="name" placeholder="Name *" value={formData.name} onChange={handleChange} />
        <Input name="designation" placeholder="Designation *" value={formData.designation} onChange={handleChange} />
        <Input name="school_name" placeholder="School Name *" value={formData.school_name} onChange={handleChange} />
        <Input name="school_address" placeholder="School Address *" value={formData.school_address} onChange={handleChange} />
        <Input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
        <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <Input type="file" name="photo" onChange={handleChange} />

        <div className="col-span-2 flex gap-4">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Processing..."
              : editing
              ? "Update Resource"
              : "Add Resource"}
          </Button>

          {editing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Designation</th>
            <th className="p-2">School</th>
            <th className="p-2">Address</th>
            <th className="p-2">Photo</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {resources.map((r) => (
            <tr key={r.id} className="border-t text-center">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.designation}</td>
              <td className="p-2">{r.school_name}</td>
              <td className="p-2">{r.school_address}</td>
              <td className="p-2">
                {r.photo && (
                  <img
                    src={`${API_BASE}/${r.photo}`}
                    className="w-12 h-12 object-cover mx-auto rounded"
                    alt="resource"
                  />
                )}
              </td>
              <td className="p-2 space-x-2">
                <Button size="sm" onClick={() => handleEdit(r)}>
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Resource?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(r.id)}>
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="flex items-center text-sm">Page {page}</span>
        <Button
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
