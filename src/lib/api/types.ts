export interface TeacherResource {
  id: string;
  category: string;
  classId: string;
  subject: string;
  title: string;
  type: "pdf" | "video";
  filePath?: string;
  youtubeUrl?: string;
}
