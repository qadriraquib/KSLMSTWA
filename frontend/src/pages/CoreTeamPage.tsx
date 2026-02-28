import { useState } from "react";
import { useTranslation } from "react-i18next";

// Images
import core1 from "@/assets/core1.jpeg";
import core2 from "@/assets/core2.jpeg";
import core3 from "@/assets/core3.jpeg";
import core4 from "@/assets/core4.jpeg";
import core5 from "@/assets/core5.jpeg";
import core6 from "@/assets/core6.jpeg";
import core7 from "@/assets/core7.jpeg";
import core8 from "@/assets/core8.jpg";
import core9 from "@/assets/core9.jpeg";
import core10 from "@/assets/core10.jpg";
import core11 from "@/assets/core11.jpeg";
import core12 from "@/assets/core12.jpg";
import core13 from "@/assets/core13.jpeg";
import core14 from "@/assets/core14.jpeg";
import core15 from "@/assets/core15.jpeg";
import core16 from "@/assets/core16.jpeg";
import user from "@/assets/user.png";
import mentorsGroup from "@/assets/mentors.jpeg";
import { Users } from "lucide-react"; // add at top
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
const [showMentors, setShowMentors] = useState(false);
const [zoom, setZoom] = useState(1);

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
      id: 10,
      name: "Sudhakar Gaikwad",
      designation: "State Vice President",
    photo: core10,
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
    {
      id: 7,
      name: "Nafees Khan Pathan",
      designation: "State Vice President",
      photo: core7,
    },
{
      id: 8,
      name: "Nizamuddin Watchmaker",
      designation: "State Joint Secretary",
    photo: core8,
    },
{
      id: 9,
      name: "B A Moolimani",
      designation: "State Vice President",
    photo: core9,
    },

{
      id: 11,
      name: "Bhomaji Y Kamble",
      designation: "State Organising Secretary",
    photo: core11,
    },
{
      id: 12,
      name: "Ayyub Donur ",
      designation: "State Treasurer",
    photo: core12,
    },
    {
      id: 13,
      name: "Ahmed Ali Nadaf",
      designation: "State Executive Member",
      photo: core13,
    },
{
      id: 14,
      name: "Sushitha",
      designation: "State Organising Secretary",
    photo: core14,
    },
{
      id: 15,
      name: "Sardar Attar",
      designation: "State Organising Secretary",
    photo: core15,
    },
{
      id: 16,
      name: "Venkat Rao",
      designation: "State Executive Member",
    photo: core16,
    },

  ];

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
       {/* Header */}
{/* Header */}
<div className="flex flex-col items-center mb-14">

  <div className="flex items-center gap-5 flex-wrap justify-center">

    <h1 className="text-4xl font-bold text-primary">
      Core Team
    </h1>

    {/* Premium Mentors Button */}
   <button
  onClick={() => setShowMentors(true)}
  className="
    relative overflow-hidden
    flex items-center gap-3
    px-6 py-3 rounded-full
    font-semibold text-white
    bg-gradient-to-r from-blue-600 to-indigo-600
    shadow-lg shadow-blue-500/30
    transition-all duration-300
    hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40
    active:scale-95
  "
>
  {/* Shine Effect */}
  <span className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/40 to-transparent
    translate-x-[-100%]
    hover:translate-x-[100%]
    transition-transform duration-700
  " />

  {/* Icon */}
  <Users size={20} />

  {/* 🔥 Two-line text container */}
  <div className="flex flex-col leading-tight text-left">
    <span className="font-semibold">Our Mentors</span>
    <span className="text-xs text-blue-100">
      Click to view
    </span>
  </div>

</button>

  </div>

  <p className="text-xl text-muted-foreground mt-4 text-center">
    Leadership guiding our mission and vision
  </p>

</div>
{/* ===== Mentors Group Button ===== */}

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
{/* ===== Mentors Image Modal ===== */}
{showMentors && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

    <div className="relative max-w-5xl w-full p-4">

      {/* Close Button */}
      <button
        onClick={() => {
          setShowMentors(false);
          setZoom(1);
        }}
        className="absolute top-2 right-2 text-white text-2xl"
      >
        ✕
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-2 left-2 flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
          className="bg-white px-3 py-1 rounded font-bold"
        >
          +
        </button>

        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
          className="bg-white px-3 py-1 rounded font-bold"
        >
          −
        </button>
      </div>

      {/* Image */}
      <div className="overflow-auto max-h-[80vh] rounded-xl">
        <img
          src={mentorsGroup}
          alt="Mentors Group"
          style={{ transform: `scale(${zoom})` }}
          className="mx-auto transition"
        />
      </div>

    </div>
  </div>
)}
      </div>
    </div>
    
  );
 
};

export default CoreTeamPage;
