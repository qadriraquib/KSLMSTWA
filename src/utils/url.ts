const API_BASE = import.meta.env.VITE_API_BASE_URL

export const buildFileUrl = (path?: string) => {
  if (!path) return undefined;

  // Already absolute URL
  if (path.startsWith("http")) return path;

  // Remove leading slash if exists
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${API_BASE}/${cleanPath}`;
};
