import { useState } from "react";
import { useTranslation } from "react-i18next";

// Images
import core1 from "@/assets/core1.jpeg";
import core2 from "@/assets/core2.jpeg";
import core3 from "@/assets/core3.jpeg";
import core4 from "@/assets/core4.jpeg";
import core5 from "@/assets/core5.jpeg";
import core6 from "@/assets/core6.jpeg";
import user from "@/assets/user.png";

type Member = {
  id: number;
  name: string;
  designation: string;
//   department: string;
//   location: string;
//   bio: string;
  photo: string;
};

const CoreTeamPage = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Member | null>(null);

  const coreTeam: Member[] = [
    {
      id: 1,
      name: "Muhammad Saleem Mujawar",
      designation: "State President",
    //   department: "Academic Leadership",
    //   location: "Chikodi",
    //   bio: "Dr. Rajesh Kumar leads the organization with over 25 years of experience in education reform and institutional development.",
      photo: core1,
    },
    {
      id: 2,
      name: "T. Anandeshwar Rao",
      designation: "Senior Vice President",
    //   department: "Teacher Development",
    //   location: "Vijayawada",
    //   bio: "Lakshmi Devi oversees teacher training programs and curriculum innovation across multiple districts.",
      photo: core2,
    },
    {
      id: 3,
      name: "D.H.Kamble",
      designation: "General Secretary",
    //   department: "Operations",
    //   location: "Guntur",
    //   bio: "Suresh Reddy manages administrative operations, logistics, and institutional partnerships.",
      photo: core3,
    },
     {
      id: 4,
      name: "Meera sab Mulla",
      designation: "Vice President",
    //   department: "Academic Leadership",
    //   location: "Chikodi",
    //   bio: "Dr. Rajesh Kumar leads the organization with over 25 years of experience in education reform and institutional development.",
      photo: core4,
    },
    {
      id: 5,
      name: "Mukhtar Ahmed Lalawale",
      designation: "Vice President",
    //   department: "Teacher Development",
    //   location: "Vijayawada",
    //   bio: "Lakshmi Devi oversees teacher training programs and curriculum innovation across multiple districts.",
      photo: core5,
    },
    {
      id: 6,
      name: "Mohammed Zaki Qazi",
      designation: "Resource Convener",
    //   department: "Operations",
    //   location: "Guntur",
    //   bio: "Suresh Reddy manages administrative operations, logistics, and institutional partnerships.",
      photo: core6,
    },
  ];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            { "Core Team"}
          </h1>

          <p className="text-xl text-muted-foreground">
            {
              "Leadership guiding our mission and vision"}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {coreTeam.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelected(member)}
              className="cursor-pointer bg-card rounded-xl shadow hover:shadow-lg transition p-4 text-center"
            >
              {/* Photo */}
              <img
                src={member.photo}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-primary/20"
              />

              {/* Name */}
              <h3 className="font-semibold text-lg">
                {member.name}
              </h3>

              {/* Designation Badge */}
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {member.designation}
              </span>

              {/* Department */}
              {/* <p className="text-sm mt-2 text-muted-foreground">
                {member.department}
              </p>

              <p className="text-xs text-muted-foreground">
                {member.location}
              </p> */}
            </div>
          ))}

        </div>

        {/* ===== Profile Popup Modal ===== */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-background rounded-xl shadow-xl max-w-md w-full p-6 relative">

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>

              {/* Profile */}
              <div className="text-center">

                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-primary/20"
                />

                <h2 className="text-xl font-bold">
                  {selected.name}
                </h2>

                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {selected.designation}
                </span>

                {/* <p className="mt-3 font-medium">
                  {selected.department}
                </p>

                <p className="text-sm text-muted-foreground">
                  {selected.location}
                </p>

                <p className="mt-4 text-sm leading-relaxed">
                  {selected.bio}
                </p> */}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CoreTeamPage;
