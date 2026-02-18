// Local storage management for admin data

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo: string;
  district: string;
  taluka?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'pdf' | 'video';
  url: string;
  videoUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface Circular {
  id: string;
  title: string;
  url: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  link?: string;
}
// Teacher Resources
export interface TeacherResource {
  id: string;
  category: string;
  classId: string;
  subject: string;
  title: string;
  type: 'pdf' | 'video';
  file?: File | null;
  youtubeUrl?: string;
}


// Team Members
export const fetchTeamMembers  = (): TeamMember[] => {
  const data = localStorage.getItem('teamMembers');
  return data ? JSON.parse(data) : [];
};

export const saveTeamMember = (member: TeamMember) => {
  const members = fetchTeamMembers ();
  const index = members.findIndex(m => m.id === member.id);
  if (index >= 0) {
    members[index] = member;
  } else {
    members.push(member);
  }
  localStorage.setItem('teamMembers', JSON.stringify(members));
};

export const deleteTeamMember = (id: string) => {
  const members = fetchTeamMembers ().filter(m => m.id !== id);
  localStorage.setItem('teamMembers', JSON.stringify(members));
};

// Resources
export const getResources = (): Resource[] => {
  const data = localStorage.getItem('resources');
  return data ? JSON.parse(data) : [];
};

export const saveResource = (resource: Resource) => {
  const resources = getResources();
  const index = resources.findIndex(r => r.id === resource.id);
  if (index >= 0) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
  localStorage.setItem('resources', JSON.stringify(resources));
};

export const deleteResource = (id: string) => {
  const resources = getResources().filter(r => r.id !== id);
  localStorage.setItem('resources', JSON.stringify(resources));
};

// Sample gallery photos
const sampleGalleryPhotos: GalleryPhoto[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', title: 'Classroom Learning', description: 'Students engaged in classroom activities' },
  { id: '2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', title: 'Teacher Training', description: 'Professional development session' },
  { id: '3', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800', title: 'School Assembly', description: 'Morning assembly at school' },
  { id: '4', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', title: 'Library Reading', description: 'Students reading in the library' },
  { id: '5', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', title: 'Study Materials', description: 'Educational books and resources' },
  { id: '6', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800', title: 'Group Activity', description: 'Collaborative learning session' },
  { id: '7', url: 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=800', title: 'Science Lab', description: 'Students in science laboratory' },
  { id: '8', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800', title: 'Computer Class', description: 'Digital learning session' },
  { id: '9', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800', title: 'Art Class', description: 'Creative art activities' },
  { id: '10', url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800', title: 'Sports Day', description: 'Annual sports event' },
  { id: '11', url: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800', title: 'Cultural Program', description: 'Cultural event performance' },
  { id: '12', url: 'https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?w=800', title: 'Prize Distribution', description: 'Award ceremony' },
  { id: '13', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', title: 'Graduation Day', description: 'Students celebrating graduation' },
  { id: '14', url: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800', title: 'Workshop', description: 'Educational workshop session' },
  { id: '15', url: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800', title: 'Outdoor Learning', description: 'Learning outside classroom' },
  { id: '16', url: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=800', title: 'Music Class', description: 'Students learning music' },
];

// Gallery
export const getGalleryPhotos = (): GalleryPhoto[] => {
  const data = localStorage.getItem('galleryPhotos');
  const storedPhotos = data ? JSON.parse(data) : [];
  // Return sample photos if no photos stored
  return storedPhotos.length > 0 ? storedPhotos : sampleGalleryPhotos;
};

export const saveGalleryPhoto = (photo: GalleryPhoto) => {
  const photos = getGalleryPhotos();
  const index = photos.findIndex(p => p.id === photo.id);
  if (index >= 0) {
    photos[index] = photo;
  } else {
    photos.push(photo);
  }
  localStorage.setItem('galleryPhotos', JSON.stringify(photos));
};

export const deleteGalleryPhoto = (id: string) => {
  const photos = getGalleryPhotos().filter(p => p.id !== id);
  localStorage.setItem('galleryPhotos', JSON.stringify(photos));
};

// Circulars
export const getCirculars = (): Circular[] => {
  const data = localStorage.getItem('circulars');
  return data ? JSON.parse(data) : [];
};

export const saveCircular = (circular: Circular) => {
  const circulars = getCirculars();
  const index = circulars.findIndex(c => c.id === circular.id);
  if (index >= 0) {
    circulars[index] = circular;
  } else {
    circulars.push(circular);
  }
  localStorage.setItem('circulars', JSON.stringify(circulars));
};

export const deleteCircular = (id: string) => {
  const circulars = getCirculars().filter(c => c.id !== id);
  localStorage.setItem('circulars', JSON.stringify(circulars));
};

// Blog Posts
export const getBlogPosts = (): BlogPost[] => {
  const data = localStorage.getItem('blogPosts');
  return data ? JSON.parse(data) : [];
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = getBlogPosts();
  const index = posts.findIndex(p => p.id === post.id);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

export const deleteBlogPost = (id: string) => {
  const posts = getBlogPosts().filter(p => p.id !== id);
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};


export const getTeacherResources = (): TeacherResource[] => {
  const data = localStorage.getItem('teacherResources');
  return data ? JSON.parse(data) : [];
};

export const saveTeacherResource = (resource: TeacherResource) => {
  const resources = getTeacherResources();
  const index = resources.findIndex(r => r.id === resource.id);
  if (index >= 0) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
  localStorage.setItem('teacherResources', JSON.stringify(resources));
};

export const deleteTeacherResource = (id: string) => {
  const resources = getTeacherResources().filter(r => r.id !== id);
  localStorage.setItem('teacherResources', JSON.stringify(resources));
};

// Districts list
export const DISTRICTS = [
  "Bagalkot", "Ballari", "Belagavi","Chikodi","Bengaluru Rural", "Bengaluru Urban",
  "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
  "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
  "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal",
  "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga",
  "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
];
