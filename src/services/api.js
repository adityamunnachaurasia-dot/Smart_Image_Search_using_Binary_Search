import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const api = axios.create({ baseURL: BASE });

// Normalize image URLs so <img src> works no matter where frontend is hosted.
export function imageUrl(pathOrUrl) {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${BASE}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

export const searchImages = (params) => api.get('/api/images/search', { params }).then((r) => r.data);
export const listImages   = (params) => api.get('/api/images', { params }).then((r) => r.data);
export const getStats     = () => api.get('/api/stats').then((r) => r.data);
export const getCategories= () => api.get('/api/categories').then((r) => r.data);
export const chatWithAI = ({ message, history }) =>
  api.post('/api/chat', { message, history }).then((r) => r.data);

export const uploadImage = (formData, onProgress) =>
  api.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  }).then((r) => r.data);

export const deleteImage = (id) => api.delete(`/api/images/${id}`).then((r) => r.data);