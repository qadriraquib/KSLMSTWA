import { TeacherResource } from "./types";
import { buildFileUrl } from "@/utils/url";


export const mapTeacherResource = (r: any): TeacherResource => ({
  id: r.id,
  category: r.category,
  classId: String(r.class_id),
  subject: r.subject,
  title: r.title,
  type: r.resource_type,
  filePath: buildFileUrl(r.file_path),
  youtubeUrl: r.youtube_url || undefined,
});

