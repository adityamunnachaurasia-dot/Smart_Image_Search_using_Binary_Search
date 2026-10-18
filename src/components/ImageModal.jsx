import { useEffect } from 'react';
import { imageUrl } from '../services/api.js';

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <img src={imageUrl(image.imageUrl)} alt={image.title} className="modal-img" />
        <div className="modal-body">
          <h2>{image.title}</h2>
          <p>{image.description || 'No description'}</p>
          <p><b>Category:</b> {image.category}</p>
          <p><b>Uploaded:</b> {new Date(image.createdAt).toLocaleString()}</p>
          <p><b>Size:</b> {(image.fileSize / 1024).toFixed(1)} KB</p>
          {image.tags?.length > 0 && (
            <div className="tags">
              {image.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}