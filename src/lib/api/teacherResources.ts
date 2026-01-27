import { mapTeacherResource } from "./teacherResource.mapper";
import { TeacherResource } from "./types";

const API = "http://127.0.0.1:8000/teacher-resources";

export const fetchResources = async (): Promise<TeacherResource[]> => {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch teacher resources");
  }

  const data = await res.json();

  // ✅ NORMALIZE ONCE, USE EVERYWHERE
  return data.map(mapTeacherResource);
};

export const createResource = async (data: FormData) => {
  await fetch(API, { method: "POST", body: data });
};

export const updateResource = async (id: string, data: FormData) => {
  await fetch(`${API}/${id}`, { method: "PUT", body: data });
};

export const deleteResourceApi = async (id: string) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Failed to delete resource");
  }
};
