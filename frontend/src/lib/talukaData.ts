// Taluka data for each district
export const DISTRICT_TALUKAS: Record<string, string[]> = {
  "Belagavi": [
    "Athani", "Bailhongal", "Belagavi", "Chikkodi", "Gokak",
    "Hukkeri", "Khanapur", "Ramdurg", "Raybag", "Savadatti"
  ],
  "Bagalkot": [
    "Badami", "Bagalkot", "Bilgi", "Hungund", "Jamkhandi", "Mudhol"
  ],
  "Ballari": [
    "Ballari", "Hadagali", "Hospet", "Kudligi", "Sandur", "Siruguppa"
  ],
  "Bengaluru Urban": [
    "Anekal", "Bengaluru East", "Bengaluru North", "Bengaluru South", "Yelahanka"
  ],
  "Bengaluru Rural": [
    "Devanahalli", "Doddaballapur", "Hosakote", "Nelamangala"
  ],
  "Bidar": [
    "Aurad", "Basavakalyan", "Bhalki", "Bidar", "Humnabad"
  ],
  "Chamarajanagar": [
    "Chamarajanagar", "Gundlupet", "Kollegal", "Yelandur"
  ],
  "Chikkaballapur": [
    "Bagepalli", "Chikkaballapur", "Chintamani", "Gowribidanur", "Gudibanda", "Sidlaghatta"
  ],
  "Chikkamagaluru": [
    "Chikkamagaluru", "Kadur", "Koppa", "Mudigere", "Narasimharajapura", "Sringeri", "Tarikere"
  ],
  "Chitradurga": [
    "Challakere", "Chitradurga", "Hiriyur", "Holalkere", "Hosadurga", "Molakalmuru"
  ],
  "Dakshina Kannada": [
    "Bantwal", "Belthangady", "Mangaluru", "Puttur", "Sullia"
  ],
  "Davanagere": [
    "Channagiri", "Davanagere", "Harihara", "Honnali", "Jagaluru", "Nyamathi"
  ],
  "Dharwad": [
    "Dharwad", "Hubli", "Kalghatgi", "Kundgol", "Navalgund"
  ],
  "Gadag": [
    "Gadag", "Mundargi", "Nargund", "Ron", "Shirahatti"
  ],
  "Hassan": [
    "Alur", "Arsikere", "Belur", "Channarayapatna", "Hassan", "Holenarasipura", "Sakleshpur", "Arakalgud"
  ],
  "Haveri": [
    "Byadgi", "Hanagal", "Haveri", "Hirekerur", "Ranebennur", "Savanur", "Shiggaon"
  ],
  "Kalaburagi": [
    "Afzalpur", "Aland", "Chincholi", "Chittapur", "Jewargi", "Kalaburagi", "Sedam"
  ],
  "Kodagu": [
    "Madikeri", "Somwarpet", "Virajpet"
  ],
  "Kolar": [
    "Bangarpet", "Kolar", "Malur", "Mulbagal", "Srinivaspur"
  ],
  "Koppal": [
    "Gangavathi", "Koppal", "Kushtagi", "Yelburga"
  ],
  "Mandya": [
    "K R Pet", "Maddur", "Malavalli", "Mandya", "Nagamangala", "Pandavapura", "Srirangapatna"
  ],
  "Mysuru": [
    "H D Kote", "Hunsur", "K R Nagar", "Mysuru", "Nanjangud", "Periyapatna", "T Narasipura"
  ],
  "Raichur": [
    "Devadurga", "Lingasugur", "Manvi", "Raichur", "Sindhanur"
  ],
  "Ramanagara": [
    "Channapatna", "Kanakapura", "Magadi", "Ramanagara"
  ],
  "Shivamogga": [
    "Bhadravathi", "Hosanagara", "Sagar", "Shikaripura", "Shivamogga", "Sorab", "Thirthahalli"
  ],
  "Tumakuru": [
    "Chiknayakanhalli", "Gubbi", "Koratagere", "Kunigal", "Madhugiri", "Pavagada", "Sira", "Tiptur", "Tumakuru", "Turuvekere"
  ],
  "Udupi": [
    "Byndoor", "Karkala", "Kundapura", "Udupi"
  ],
  "Uttara Kannada": [
    "Ankola", "Bhatkal", "Haliyal", "Honavar", "Karwar", "Kumta", "Mundgod", "Siddapur", "Sirsi", "Yellapur"
  ],
  "Vijayapura": [
    "B Bagewadi", "Bijapur", "Indi", "Muddebihal", "Sindagi"
  ],
  "Yadgir": [
    "Shahapur", "Shorapur", "Yadgir"
  ]
};

// Generate sample team members for districts and talukas
const designations = [
  "Block Education Officer",
  "Assistant Block Education Officer", 
  "Cluster Resource Person",
  "Education Coordinator",
  "Academic Supervisor",
  "Resource Teacher"
];

const photos = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
];

const names = [
  "Sri. Ramesh Kumar", "Smt. Lakshmi Devi", "Dr. Suresh Patil", "Smt. Anita Sharma",
  "Sri. Mahesh Gowda", "Smt. Kavitha Rao", "Dr. Nagaraj Reddy", "Smt. Suma Hegde",
  "Sri. Basavaraj Joshi", "Smt. Rekha Bhat", "Dr. Venkatesh Murthy", "Smt. Padma Kulkarni"
];

// export const generateDistrictTeamMembers = (district: string) => {
//   // Generate 6 district-level team members
//   return Array.from({ length: 6 }, (_, i) => ({
//     id: `${district.toLowerCase().replace(/\s+/g, '-')}-district-${i + 1}`,
//     name: names[i % names.length],
//     designation: designations[i % designations.length],
//     photo: photos[i % photos.length],
//     district,
//   }));
// };

// export const generateTalukaTeamMembers = (district: string, taluka: string) => {
//   // Generate 6 taluka-level team members
//   return Array.from({ length: 6 }, (_, i) => ({
//     id: `${district.toLowerCase().replace(/\s+/g, '-')}-${taluka.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
//     name: names[(i + 3) % names.length],
//     designation: designations[i % designations.length],
//     photo: photos[(i + 2) % photos.length],
//     district,
//     taluka,
//   }));
// };
