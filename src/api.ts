// src/api.ts

// Always prefer the env var, fallback only for local dev
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; 
// 👆 adjust localhost:5000 to your backend's local dev port

// Example helper
export async function getArtworks() {
  const res = await fetch(`${API_BASE}/api/artworks`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
