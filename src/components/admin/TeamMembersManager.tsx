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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { DISTRICTS, TeamMember } from "@/lib/storage";
import { DISTRICT_TALUKAS } from "@/lib/talukaData";

import {
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMemberApi,
  bulkUploadMembers,
} from "@/lib/api/teamMembers";

const PAGE_SIZE = 10;

export function TeamMembersManager() {
  const { toast } = useToast();

  /* ================= STATE ================= */

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [page, setPage] = useState(1);

  const [filterDistrict, setFilterDistrict] = useState("");
const [filterTaluka, setFilterTaluka] = useState("");

const [appliedDistrict, setAppliedDistrict] = useState("");
const [appliedTaluka, setAppliedTaluka] = useState("");
const filteredMembers = members.filter((m) => {
  // district filter
  if (appliedDistrict && m.district !== appliedDistrict) {
    return false;
  }

  // taluka filter (SAFE check)
  if (appliedTaluka && (m.taluka || "") !== appliedTaluka) {
    return false;
  }

  return true;
});


  const [formData, setFormData] = useState({
    id: "",
    name: "",
    designation: "",
    district: "",
    taluka: "",
    photo: "",
    photoFile: null as File | null,
  });

  /* ================= FETCH ================= */

  const loadMembers = async () => {
    const data = await fetchTeamMembers({
      district: filterDistrict || undefined,
      taluka: filterTaluka || undefined,
      page,
      limit: PAGE_SIZE,
    });
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, [filterDistrict, filterTaluka, page]);

  /* ================= FORM ================= */

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      designation: "",
      district: "",
      taluka: "",
      photo: "",
      photoFile: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("designation", formData.designation);
    fd.append("district", formData.district);
    if (formData.taluka) fd.append("taluka", formData.taluka);
    if (formData.photoFile) fd.append("photo", formData.photoFile);

    if (formData.id) {
      await updateTeamMember(formData.id, fd);
      toast({ title: "Updated", description: "Team member updated" });
    } else {
      await createTeamMember(fd);
      toast({ title: "Created", description: "Team member added" });
    }

    resetForm();
    loadMembers();
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      id: member.id,
      name: member.name,
      designation: member.designation,
      district: member.district,
      taluka: member.taluka || "",
      photo: member.photo,
      photoFile: null,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this member?")) return;
    await deleteTeamMemberApi(id);
    toast({ title: "Deleted", description: "Team member deleted" });
    loadMembers();
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* ================= FORM ================= */}
      <Card>
        <CardHeader>
          <CardTitle>
            {formData.id ? "Edit Team Member" : "Add Team Member"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Designation</Label>
                <Input
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      designation: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label>District</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      district: value,
                      taluka: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTRICTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Taluka (optional)</Label>
                <Select
                  value={formData.taluka}
                  onValueChange={(value) =>
                    setFormData({ ...formData, taluka: value })
                  }
                  disabled={!formData.district}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select taluka" />
                  </SelectTrigger>
                  <SelectContent>
                    {(DISTRICT_TALUKAS[formData.district] || []).map(
                      (t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Photo</Label>
                {formData.photoFile && (
                  <img
                    src={URL.createObjectURL(formData.photoFile)}
                    className="h-16 w-16 rounded-full mb-2"
                  />
                )}
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg"
                  required={!formData.id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      photoFile: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                {formData.id ? "Update" : "Add"}
              </Button>

              {formData.id && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ================= FILTERS + BULK ================= */}
      {/* <div className="flex flex-wrap gap-4">
        <Select
          value={filterDistrict}
          onValueChange={(v) => {
            setFilterDistrict(v);
            setFilterTaluka("");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter district" />
          </SelectTrigger>
          <SelectContent>
            {DISTRICTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filterTaluka}
          onValueChange={(v) => {
            setFilterTaluka(v);
            setPage(1);
          }}
          disabled={!filterDistrict}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter taluka" />
          </SelectTrigger>
          <SelectContent>
            {(DISTRICT_TALUKAS[filterDistrict] || []).map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="file"
          accept=".xlsx"
          onChange={(e) =>
            e.target.files && bulkUploadMembers(e.target.files[0])
          }
        />
      </div> */}
<div className="flex flex-wrap gap-4 mb-4 items-end">
  <Select
    value={filterDistrict}
    onValueChange={(v) => {
      setFilterDistrict(v);
      setFilterTaluka(""); // reset taluka
    }}
  >
    <SelectTrigger className="w-48">
      <SelectValue placeholder="Select district" />
    </SelectTrigger>
    <SelectContent>
      {DISTRICTS.map(d => (
        <SelectItem key={d} value={d}>{d}</SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Select
    value={filterTaluka}
    onValueChange={setFilterTaluka}
    disabled={!filterDistrict}
  >
    <SelectTrigger className="w-48">
      <SelectValue placeholder="Select taluka" />
    </SelectTrigger>
    <SelectContent>
      {(DISTRICT_TALUKAS[filterDistrict] || []).map(t => (
        <SelectItem key={t} value={t}>{t}</SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Button
    onClick={() => {
      setAppliedDistrict(filterDistrict);
      setAppliedTaluka(filterTaluka);
    }}
  >
    Apply
  </Button>

  <Button
    variant="outline"
    onClick={() => {
      setFilterDistrict("");
      setFilterTaluka("");
      setAppliedDistrict("");
      setAppliedTaluka("");
    }}
  >
    Clear
  </Button>
</div>

      {/* ================= TABLE ================= */}
      <table className="w-full border text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2">Photo</th>
            <th>Name</th>
            <th>Designation</th>
            <th>District</th>
            <th>Taluka</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
  {filteredMembers.map((member) => (
    <tr key={member.id} className="border-t text-center align-middle">
      
      <td className="p-2">
        <div className="flex justify-center">
          <img
            src={`http://127.0.0.1:8000/${member.photo}`}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </td>

      <td className="align-middle">{member.name}</td>
      <td className="align-middle">{member.designation}</td>
      <td className="align-middle">{member.district}</td>
      <td className="align-middle">{member.taluka || "-"}</td>

      <td className="align-middle">
        <div className="flex justify-center gap-2">
          <Button size="sm" onClick={() => handleEdit(member)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(member.id)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
