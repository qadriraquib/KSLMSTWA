import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DISTRICTS } from "@/lib/storage";
import { DISTRICT_TALUKAS } from "@/lib/talukaData";

import { fetchPublicTeamMembers } from "@/lib/api/teamMembers";
import { TeamMember } from "@/lib/storage";

import { TeamMemberCard } from "@/components/TeamMemberCard";
import { TalukaModal } from "@/components/TalukaModal";
import { DistrictMemberCard } from "@/components/DistrictMemberCard";

const District = () => {
  const { districtId } = useParams();

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTaluka, setSelectedTaluka] = useState<string | null>(null);

  if (!districtId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">District Not Found</h1>
      </div>
    );
  }

  // Convert slug to district name
  const districtName =
    DISTRICTS.find(
      (d) => d.toLowerCase().replace(/\s+/g, "-") === districtId
    ) || districtId;

  const talukas = DISTRICT_TALUKAS[districtName] || [];

  // 🔥 FETCH FROM FASTAPI (ONLY SOURCE)
  useEffect(() => {
    fetchPublicTeamMembers()
      .then((data) => {
        console.log("API MEMBERS:", data);
        setMembers(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  // fetchPublicTeamMembers().then(setMembers);
  // Filter members for this district
  const districtMembers = members.filter(
    (m) => m.district.toLowerCase() === districtName.toLowerCase()
  );

  // District-level members (no taluka)
  const districtLevelMembers = districtMembers.filter((m) => !m.taluka);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {districtName}
          </h1>
          <p className="text-muted-foreground text-lg">
            District Organisation Members
          </p>
        </div>

        {/* Loading / Empty */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading members...
          </p>
        )}

        {!loading && districtMembers.length === 0 && (
          <p className="text-center text-muted-foreground">
            No members found for this district
          </p>
        )}

        {/* District-level members */}
        {districtLevelMembers.length > 0 && (
          <div  className="
    justify-items-center">
            {/* <h2 className="text-2xl font-semibold mb-6 ">
              District Level Team
            </h2> */}

            <div className="
    justify-items-center">
              {districtLevelMembers.map((m) => (
                <DistrictMemberCard
  key={m.id}
  name={m.name}
  designation={m.designation}
  photo={m.photo}
/>

              ))}
            </div>
            </div>
    
        )}

        {/* Talukas */}
        {talukas.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Talukas ({talukas.length})
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {talukas.map((taluka) => (
                <Button
                  key={taluka}
                  variant="outline"
                  size="lg"
                  className="h-auto py-4 justify-start"
                  onClick={() => setSelectedTaluka(taluka)}
                >
                  {taluka}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Taluka Modal */}
        <TalukaModal
          isOpen={!!selectedTaluka}
          onClose={() => setSelectedTaluka(null)}
          talukaName={selectedTaluka || ""}
          members={districtMembers.filter(
            (m) => m.taluka === selectedTaluka
          )}
        />
      </div>
    </div>
  );
};

export default District;
