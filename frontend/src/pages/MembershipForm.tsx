import { useState } from "react";
import { createMembership } from "@/lib/api/membership";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MembershipPreview from "./MembershipPreview";
import { DISTRICTS } from "@/lib/storage";
import { DISTRICT_TALUKAS } from "@/lib/talukaData";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const GENDERS = ["Male", "Female", "Other"];
const DESIGNATIONS = ["GPT", "PST", "HST"];
const MANAGEMENTS = ["Govt", "Aided", "Unaided"];
const MEDIUMS = ["Kannada", "English", "Urdu", "Other"];

export default function MembershipForm() {
  const emptyForm = {
    full_name: "",
    father_or_husband_name: "",
    date_of_birth: "",
    gender: "",
    designation: "",
    subject_taught: "",
    institution_name: "",
    management: "",
    medium: "",
    years_of_experience: "",
    district: "",
    taluka: "",
    mobile_no: "",
    whatsapp_no: "",
    email: "",
    residential_address: "",
  };

  const [form, setForm] = useState<any>(emptyForm);
  const [agree, setAgree] = useState(false);
  const [preview, setPreview] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
const [membershipId, setMembershipId] = useState("");

  // ===============================
  // VALIDATIONS
  // ===============================
  const isValidMobile = (mobile: string) =>
    /^[6-9]\d{9}$/.test(mobile);

  const isValidEmail = (email: string) =>
    email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePreview = () => {
    if (!isValidMobile(form.mobile_no)) {
      setErrorMessage("Enter a valid 10-digit mobile number.");
      setErrorOpen(true);
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrorMessage("Enter a valid email address.");
      setErrorOpen(true);
      return;
    }

    setPreview(true);
  };

const handleSubmit = async () => {
  try {
    const result = await createMembership(form);

    setMembershipId(result.membership_no);
    setPreview(false);
    setSuccessOpen(true);

    setTimeout(() => {
      setSuccessOpen(false);
      window.location.href = "/";
    }, 2000);

  } catch (e: any) {
    setErrorMessage(e.message);
    setErrorOpen(true);
  }
};


  const talukas = form.district
    ? DISTRICT_TALUKAS[form.district] || []
    : [];

  // ===============================
  // PREVIEW SCREEN
  // ===============================
  if (preview) {
    return (
      <>
        <MembershipPreview
          data={form}
          onEdit={() => setPreview(false)}
          onConfirm={handleSubmit}
        />

      
      </>
    );
  }

  // ===============================
  // FORM UI
  // ===============================
  return (
    <>
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Teacher Membership Form
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Please fill all details carefully before submission
        </p>

        {/* PERSONAL DETAILS */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="FULL NAME (CAPITAL)"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value.toUpperCase() })
              }
            />

            <Input
              placeholder="Father / Husband Name"
              value={form.father_or_husband_name}
              onChange={(e) =>
                setForm({ ...form, father_or_husband_name: e.target.value })
              }
            />

            <Input
              type="date"
              value={form.date_of_birth}
              onChange={(e) =>
                setForm({ ...form, date_of_birth: e.target.value })
              }
            />

            <Select
              value={form.gender}
              onValueChange={(v) => setForm({ ...form, gender: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* PROFESSIONAL DETAILS */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Professional Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={form.designation}
              onValueChange={(v) => setForm({ ...form, designation: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent>
                {DESIGNATIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Subject Taught"
              value={form.subject_taught}
              onChange={(e) =>
                setForm({ ...form, subject_taught: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Years of Experience"
              value={form.years_of_experience}
              onChange={(e) =>
                setForm({ ...form, years_of_experience: e.target.value })
              }
            />

            <Input
              placeholder="School / College Name"
              value={form.institution_name}
              onChange={(e) =>
                setForm({ ...form, institution_name: e.target.value })
              }
            />

            <Select
              value={form.management}
              onValueChange={(v) => setForm({ ...form, management: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Management" />
              </SelectTrigger>
              <SelectContent>
                {MANAGEMENTS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.medium}
              onValueChange={(v) => setForm({ ...form, medium: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Medium" />
              </SelectTrigger>
              <SelectContent>
                {MEDIUMS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* LOCATION & CONTACT */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg border-b pb-2">
            Location & Contact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={form.district}
              onValueChange={(v) =>
                setForm({ ...form, district: v, taluka: "" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="District" />
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
              value={form.taluka}
              disabled={!form.district}
              onValueChange={(v) => setForm({ ...form, taluka: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Taluka" />
              </SelectTrigger>
              <SelectContent>
                {talukas.map((t: string) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Mobile No"
              value={form.mobile_no}
              onChange={(e) =>
                setForm({ ...form, mobile_no: e.target.value })
              }
            />

            <Input
              placeholder="WhatsApp No"
              value={form.whatsapp_no}
              onChange={(e) =>
                setForm({ ...form, whatsapp_no: e.target.value })
              }
            />

            <Input
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <Textarea
            placeholder="Residential Address"
            value={form.residential_address}
            onChange={(e) =>
              setForm({ ...form, residential_address: e.target.value })
            }
          />
        </section>

        {/* DECLARATION */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <p className="text-sm">
            I hereby declare that the above information is true and correct.
          </p>
        </div>

        <Button
          className="w-full"
          disabled={!agree}
          onClick={handlePreview}
        >
          Preview & Submit
        </Button>
      </div>

      {/* ERROR DIALOG */}
      <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* SUCCESS DIALOG */}
<AlertDialog open={successOpen}>
  <AlertDialogContent className="animate-in zoom-in-95 duration-300">
    <AlertDialogHeader>
      <AlertDialogTitle className="text-green-600 text-xl">
        🎉 Membership Submitted Successfully!
      </AlertDialogTitle>

      <AlertDialogDescription className="mt-3 space-y-2">
        <p>Your membership application has been submitted.</p>

        <div className="bg-gray-100 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500">Membership ID</p>
          <p className="font-bold text-lg text-blue-600">
            {membershipId}
          </p>
        </div>

        <p className="text-xs text-gray-400">
          Redirecting to home page...
        </p>
      </AlertDialogDescription>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

    </>
  );
}
