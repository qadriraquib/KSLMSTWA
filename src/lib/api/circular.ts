const API = "http://127.0.0.1:8000/circulars";

export const fetchCirculars = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createCircular = async (data: FormData) => {
  await fetch(API, { method: "POST", body: data });
};

export const updateCircular = async (id: string, data: FormData) => {
  await fetch(`${API}/${id}`, { method: "PUT", body: data });
};

export const deleteCircularApi = async (id: string) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};
