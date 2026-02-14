import { API_BASE_URL } from "@/lib/api/config";

export interface ResourceAuthor {
  id: number;
  name: string;
  designation: string;
  school_name: string;
  school_address: string;
  subject?: string;
  description?: string;
  photo?: string;
}

export const fetchResourceAuthors = async (
  page = 1,
  limit = 50
) => {
  const res = await fetch(
    `${API_BASE_URL}/resources/?page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch resources");
  }

  return res.json();
};
