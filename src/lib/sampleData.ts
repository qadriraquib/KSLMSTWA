import { TeamMember, Circular, saveTeamMember, saveCircular, getCirculars } from './storage';



const sampleCirculars: Omit<Circular, 'id'>[] = [
  {
    title: "Guidelines for Annual Examination 2024-25",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-12-10",
  },
  {
    title: "Teacher Training Program Schedule - January 2025",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-12-08",
  },
  {
    title: "Holiday List for Academic Year 2024-25",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-12-05",
  },
  {
    title: "New Curriculum Implementation Notice",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-12-01",
  },
  {
    title: "School Infrastructure Development Scheme",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-11-28",
  },
  {
    title: "Student Scholarship Application Deadline Extended",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-11-25",
  },
  {
    title: "Digital Learning Initiative Launch",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-11-20",
  },
  {
    title: "Sports Competition District Level Results",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    date: "2024-11-15",
  },
];

// export const seedSampleData = () => {
//   const existingMembers = getTeamMembers();
//   const existingCirculars = getCirculars();

//   // Only add if no data exists
//   // if (existingMembers.length === 0) {
//   //   sampleTeamMembers.forEach((member, index) => {
//   //     saveTeamMember({
//   //       ...member,
//   //       id: `sample-member-${index + 1}`,
//   //     });
//   //   });
//   // }

//   if (existingCirculars.length === 0) {
//     sampleCirculars.forEach((circular, index) => {
//       saveCircular({
//         ...circular,
//         id: `sample-circular-${index + 1}`,
//       });
//     });
//   }

//   return {
//     membersAdded: existingMembers.length === 0 ? sampleTeamMembers.length : 0,
//     circularsAdded: existingCirculars.length === 0 ? sampleCirculars.length : 0,
//   };
// };

export const clearSampleData = () => {
  localStorage.removeItem('teamMembers');
  localStorage.removeItem('circulars');
};
