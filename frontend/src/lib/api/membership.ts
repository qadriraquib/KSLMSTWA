// const API = "http://localhost:8000/api/memberships/";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/memberships`;

export const createMembership = async (data: any) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to submit membership");
  }

  return await res.json();
};

export const getMemberships = async (district?: string, taluka?: string) => {
  const params = new URLSearchParams();
  if (district) params.append("district", district);
  if (taluka) params.append("taluka", taluka);

  const res = await fetch(`${API}?${params.toString()}`);
  return res.json();
};

export const deleteMembership = async (id: string) => {
  await fetch(`${API}${id}`, { method: "DELETE" });
};

export const downloadReceipt = (id: string) => {
  window.open(
    `${API}receipt/${id}`,
    "_blank"
  );
};

export const exportExcel = (district?: string, taluka?: string) => {
  window.open(
    `${API}export/excel?district=${district ?? ""}&taluka=${taluka ?? ""}`,
    "_blank"
  );
};

export const exportPdf = (district?: string, taluka?: string) => {
  window.open(
    `${API}export/pdf?district=${district ?? ""}&taluka=${taluka ?? ""}`,
    "_blank"
  );
};

export const updateMembership = async (id: string, data: any) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};