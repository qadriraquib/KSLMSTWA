import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MembershipPreview({
  data,
  onEdit,
  onConfirm,
}: {
  data: any;
  onEdit: () => void;
  onConfirm: () => void;
}) {
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b">
      <div className="font-semibold text-muted-foreground">{label}</div>
      <div className="md:col-span-2">{value || "-"}</div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto my-10">
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Preview Membership Details
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Please verify all details before submission
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Row label="Full Name" value={data.full_name} />
            <Row label="Father / Husband Name" value={data.father_or_husband_name} />
            <Row label="Date of Birth" value={data.date_of_birth} />
            <Row label="Gender" value={data.gender} />
          </div>

          <div>
            <Row label="Designation" value={data.designation} />
            <Row label="Subject Taught" value={data.subject_taught} />
            <Row label="Institution" value={data.institution_name} />
            <Row label="Management" value={data.management} />
            <Row label="Medium" value={data.medium} />
            <Row label="Experience" value={`${data.years_of_experience} years`} />
          </div>

          <div>
            <Row label="District" value={data.district} />
            <Row label="Taluka" value={data.taluka} />
            <Row label="Mobile" value={data.mobile_no} />
            <Row label="WhatsApp" value={data.whatsapp_no} />
            <Row label="Email" value={data.email} />
            <Row label="Address" value={data.residential_address} />
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onEdit}>
              Edit
            </Button>
            <Button onClick={onConfirm}>
              Confirm & Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
