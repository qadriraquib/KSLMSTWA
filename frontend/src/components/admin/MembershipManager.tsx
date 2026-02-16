import { useEffect, useState } from "react";
import {
  getMemberships,
  deleteMembership,
  downloadReceipt,
  exportExcel,
  exportPdf,
  updateMembership,
} from "@/lib/api/membership";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DISTRICTS } from "@/lib/storage";
import { DISTRICT_TALUKAS } from "@/lib/talukaData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
// const API = `${API_BASE}/resources/`;
export default function MembershipManager() {
  const [data, setData] = useState<any[]>([]);
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");

  const [editing, setEditing] = useState<any | null>(null);
const [deleteId, setDeleteId] = useState<string | null>(null);
const [successOpen, setSuccessOpen] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

  const loadData = async () => {
    const res = await getMemberships(district, taluka);
    setData(res);
  };

 
useEffect(() => {
  loadData();
  setCurrentPage(1);
}, [district, taluka]);

const totalRecords = data.length;
const totalPages = Math.ceil(totalRecords / pageSize);

const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;

const paginatedData = data.slice(startIndex, endIndex);


 const handleDelete = async (id: string) => {
  await deleteMembership(id);
  loadData();

  setSuccessMessage("Membership deleted successfully.");
  setSuccessOpen(true);
};


const saveEdit = async () => {
  await updateMembership(editing.id, editing);
  setEditing(null);
  loadData();

  setSuccessMessage("Membership updated successfully.");
  setSuccessOpen(true);
};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Membership Applications</h2>

      {/* Filters + Export */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
  {/* District */}
  <Select
    value={district}
    onValueChange={(val) => {
      setDistrict(val);
      setTaluka("");
    }}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select District" />
    </SelectTrigger>
    <SelectContent>
      {DISTRICTS.map((d) => (
        <SelectItem key={d} value={d}>
          {d}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* Taluka */}
  <Select
    value={taluka}
    onValueChange={setTaluka}
    disabled={!district}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select Taluka" />
    </SelectTrigger>
    <SelectContent>
      {(DISTRICT_TALUKAS[district] || []).map((t) => (
        <SelectItem key={t} value={t}>
          {t}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* Actions */}
  <div className="flex gap-2">
    <Button onClick={loadData}>Filter</Button>
   <Button
  variant="outline"
  onClick={() => exportExcel(district, taluka)}
>
  Export Excel
</Button>

<Button
  variant="outline"
  onClick={() => exportPdf(district, taluka)}
>
  Export PDF
</Button>


  </div>
</div>

<p className="text-sm text-muted-foreground mb-2">
  Showing {data.length} membership records
</p>
<div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
  <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden border rounded-lg bg-white">
        <table className="w-full text-sm">
  <thead className="bg-muted sticky top-0 z-10">
    <tr className="border-b">
      {[
        "Membership ID",
        "Name",
        "Father / Husband",
        "DOB",
        "Gender",
        "Designation",
        "Subject",
        "Institution",
        "Management",
        "Medium",
        "Experience",
        "District",
        "Taluka",
        "Mobile",
        "WhatsApp",
        "Email",
        "Address",
        "Receipt",
        "Action",
      ].map((h) => (
        <th
          key={h}
          className="px-3 py-2 text-left font-semibold whitespace-nowrap"
        >
          {h}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {/* {data.map((m, index) => ( */}
      {paginatedData.map((m, index) => (

      <tr
        key={m.id}
        className={`border-b ${
          index % 2 === 0 ? "bg-white" : "bg-muted/30"
        } hover:bg-muted`}
      >
        <td className="px-3 py-2 font-medium">{m.membership_no}</td>
        <td className="px-3 py-2 font-medium">{m.full_name}</td>
        <td className="px-3 py-2">{m.father_or_husband_name}</td>
        <td className="px-3 py-2 whitespace-nowrap">{m.date_of_birth}</td>

        {/* Gender badge */}
        <td className="px-3 py-2">
          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
            {m.gender}
          </span>
        </td>

        <td className="px-3 py-2">{m.designation}</td>
        <td className="px-3 py-2">{m.subject_taught}</td>

        {/* Institution wrap */}
        <td className="px-3 py-2 max-w-[220px] break-words">
          {m.institution_name}
        </td>

        {/* Management badge */}
        <td className="px-3 py-2">
          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
            {m.management}
          </span>
        </td>

        {/* Medium badge */}
        <td className="px-3 py-2">
          <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700">
            {m.medium}
          </span>
        </td>

        <td className="px-3 py-2 text-center">
          {m.years_of_experience}
        </td>

        <td className="px-3 py-2">{m.district}</td>
        <td className="px-3 py-2">{m.taluka}</td>

        <td className="px-3 py-2 whitespace-nowrap">
          {m.mobile_no}
        </td>

        <td className="px-3 py-2 whitespace-nowrap">
          {m.whatsapp_no || "-"}
        </td>

        <td className="px-3 py-2">
          {m.email || "-"}
        </td>

        {/* Address wrap */}
        <td className="px-3 py-2 max-w-[260px] break-words">
          {m.residential_address}
        </td>

        {/* PDF */}
        <td className="px-3 py-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                `${API_BASE}/api/memberships/receipt/${m.id}`,
                "_blank"
              )
            }
          >
            PDF
          </Button>
        </td>

        {/* Actions */}
        <td className="px-3 py-2 flex gap-2">
          {/* <Button size="sm" variant="outline">
            Edit
          </Button> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Membership</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the member {m.full_name} with ID {m.membership_no} From record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() => handleDelete(m.id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </td>
      </tr>
    ))}
  </tbody>
</table>

       
      </div>
      {/* PAGINATION */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">

  {/* Records Info */}
  <p className="text-sm text-muted-foreground">
    Showing {startIndex + 1} -{" "}
    {Math.min(endIndex, totalRecords)} of {totalRecords} records
  </p>

  <div className="flex items-center gap-2">

    {/* Page Size Selector */}
    <Select
      value={String(pageSize)}
      onValueChange={(val) => {
        setPageSize(Number(val));
        setCurrentPage(1);
      }}
    >
      <SelectTrigger className="w-[90px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[5, 10, 20, 50].map((size) => (
          <SelectItem key={size} value={String(size)}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Previous Button */}
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
    >
      Prev
    </Button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .slice(Math.max(0, currentPage - 3), currentPage + 2)
      .map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}

    {/* Next Button */}
    <Button
      variant="outline"
      size="sm"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
    >
      Next
    </Button>

  </div>
</div>

    </div>
  </div>
</div>

  
      {/* EDIT MODAL (SIMPLE INLINE) */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-[400px] space-y-2">
            <h3 className="font-bold">Edit Membership</h3>

            <Input
              value={editing.full_name}
              onChange={(e) =>
                setEditing({ ...editing, full_name: e.target.value })
              }
              placeholder="Full Name"
            />
            <Input
              value={editing.mobile_no}
              onChange={(e) =>
                setEditing({ ...editing, mobile_no: e.target.value })
              }
              placeholder="Mobile"
            />
            <Input
              value={editing.district}
              onChange={(e) =>
                setEditing({ ...editing, district: e.target.value })
              }
              placeholder="District"
            />
            <Input
              value={editing.taluka}
              onChange={(e) =>
                setEditing({ ...editing, taluka: e.target.value })
              }
              placeholder="Taluka"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={saveEdit}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Success</AlertDialogTitle>
      <AlertDialogDescription>
        {successMessage}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>OK</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

}
