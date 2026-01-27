import { TeacherResource } from "./types";

export const mapTeacherResource = (r: any): TeacherResource => ({
  id: r.id,
  category: r.category,
  classId: String(r.class_id),
  subject: r.subject,
  title: r.title,
  type: r.resource_type,               // pdf | video
  filePath: r.file_path
    ? `http://127.0.0.1:8000/${r.file_path}`
    : undefined,
  youtubeUrl: r.youtube_url || undefined,
});
