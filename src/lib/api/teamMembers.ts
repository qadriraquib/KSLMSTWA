const API = "http://127.0.0.1:8000/team-members";

export const fetchPublicTeamMembers = async () => {
  const res = await fetch(API);
  return res.json();
};


export const createTeamMember = async (data: FormData) => {
  await fetch(API, {
    method: "POST",
    body: data,
  });
};

export const deleteTeamMemberApi = async (id: string) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
};

export const updateTeamMember = async (id: string, data: FormData) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    body: data,
  });
};


export const fetchTeamMembers = async (params: {
  district?: string;
  taluka?: string;
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([_, v]) => v) as any
  );
  const res = await fetch(`${API}?${query}`);
  return res.json();
};

export const bulkUploadMembers = async (file: File) => {
  const fd = new FormData();
  fd.append("file", file);
  await fetch(`${API}/bulk-upload`, {
    method: "POST",
    body: fd,
  });
};
