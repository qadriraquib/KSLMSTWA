// const API_BASE = "http://localhost:8000/api"; 
const API =
  import.meta.env.VITE_API_BASE_URL;

  
const API_BASE = `${API}/api`;
export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  if (!res.ok) {
    throw new Error("Failed to fetch gallery");
  }
  return res.json();
}

export async function uploadGallery(form: FormData) {
  return fetch(`${API_BASE}/gallery/upload`, {
    method: "POST",
    body: form,
  });
}

export async function deleteGallery(id: string) {
  return fetch(`${API_BASE}/gallery/${id}`, {
    method: "DELETE",
  });
}

export async function updateGallery(id: string, form: FormData) {
  return fetch(`${API_BASE}/gallery/${id}`, {
    method: "PUT",
    body: form,
  });
}
