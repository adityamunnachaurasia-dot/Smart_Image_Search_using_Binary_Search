import { imageUrl } from '../services/api.js';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
       <rect width="100%" height="100%" fill="#241116"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             fill="#7c6a70" font-family="system-ui, sans-serif" font-size="18">
         No preview
       </text>
     </svg>`
  );

export default function ImageCard({ image, onClick }) {
  return (
    <article
      className="card"
      onClick={() => onClick(image)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(image);
        }
      }}
    >
      <div className="card-img-wrap">
        <span className="card-view">View Image →</span>
        <img
          src={imageUrl(image.imageUrl)}
          alt={image.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK; }}
        />
      </div>
      <div className="card-body">
        <h3>{image.title}</h3>
        <span className="badge">{image.category}</span>
        {image.tags?.length > 0 && (
          <div className="tags">
            {image.tags.slice(0, 4).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
        <p className="date">
          {new Date(image.createdAt).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
          })}
        </p>
      </div>
    </article>
  );
}