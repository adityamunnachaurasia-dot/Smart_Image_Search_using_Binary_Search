import { useState } from 'react';
import { uploadImage } from '../services/api.js';

export default function UploadModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!file) return setError('Please pick an image file.');
    if (!title.trim()) return setError('Title is required.');
    if (!category.trim()) return setError('Category is required.');
    if (file.size > 5 * 1024 * 1024) return setError('File is larger than 5 MB.');
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return setError('Only JPEG, PNG, WebP, GIF are allowed.');

    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', title.trim());
    fd.append('description', description.trim());
    fd.append('category', category.trim());
    fd.append('tags', tags);

    try {
      setProgress(0);
      const data = await uploadImage(fd, setProgress);
      setSuccess('Uploaded successfully!');
      onUploaded?.(data.image);
      setFile(null); setTitle(''); setDescription(''); setCategory(''); setTags('');
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'Upload failed');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal upload-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2>Upload Image</h2>
        <form onSubmit={submit} className="upload-form">
          <label>Image file
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          </label>
          <label>Title *
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </label>
          <label>Category *
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </label>
          <label>Tags (comma separated)
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="lion, wildlife, africa" />
          </label>
          {progress > 0 && progress < 100 && (
            <div className="progress"><div style={{ width: `${progress}%` }} /></div>
          )}
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit" className="btn-primary">Upload</button>
        </form>
      </div>
    </div>
  );
}