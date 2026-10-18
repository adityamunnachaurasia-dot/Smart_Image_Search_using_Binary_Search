import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import Filters from '../components/Filters.jsx';
import ImageCard from '../components/ImageCard.jsx';
import ImageModal from '../components/ImageModal.jsx';
import UploadModal from '../components/UploadModal.jsx';
import StatsBar from '../components/StatsBar.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Reveal from '../components/Reveal.jsx';
import AnimatedNumber from '../components/AnimatedNumber.jsx';
import { useSearch } from '../hooks/useSearch.js';
import { getCategories, getStats, imageUrl } from '../services/api.js';

const POPULAR = ['Lions', 'Nature', 'Cars', 'Technology', 'Architecture', 'Food'];

function SkeletonGrid() {
  return (
    <div className="skeleton-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const s = useSearch();
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [openImage, setOpenImage] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    getCategories().then((d) => setCategories(d.categories));
  }, []);

  useEffect(() => {
    getStats().then((d) => setStats(d.stats));
  }, []);

  const refreshStats = () => getStats().then((d) => setStats(d.stats));

  // Pick up to 3 real images for the hero visual composition.
  const heroImages = useMemo(() => s.results.slice(0, 3), [s.results]);

  return (
    <main className="container">
      {/* ---- HERO ---- */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-eyebrow">Smart Image Discovery</span>
          <h1 className="hero-title">
            Find the <span className="red">image.</span><br />
            Discover the <span className="red">details.</span>
          </h1>
          <p className="hero-sub">
            Explore a collection of images with an intelligent search experience powered by
            binary search and organized image metadata.
          </p>

          {/* --- SEARCH ANCHOR --- */}
          <div id="search-anchor">
            <SearchBar
              onSearch={s.runSearch}
              onClear={s.clear}
              initial={s.query}
              suggestions={POPULAR}
            />
          </div>

          {stats && (
            <span className="hero-status">
              {stats.totalImages} IMAGES IN THE COLLECTION
            </span>
          )}
        </div>

        <div className="hero-visual" aria-hidden="true">
          {heroImages[0] && (
            <div className="hero-tile main">
              <img src={imageUrl(heroImages[0].imageUrl)} alt="" />
              <div className="tile-meta">
                <span className="tile-cat">{heroImages[0].category}</span>
                <span className="tile-title">{heroImages[0].title}</span>
              </div>
            </div>
          )}
          {heroImages[1] && (
            <div className="hero-tile top">
              <img src={imageUrl(heroImages[1].imageUrl)} alt="" />
              <div className="tile-meta">
                <span className="tile-cat">{heroImages[1].category}</span>
                <span className="tile-title">{heroImages[1].title}</span>
              </div>
            </div>
          )}
          {heroImages[2] && (
            <div className="hero-tile bottom">
              <img src={imageUrl(heroImages[2].imageUrl)} alt="" />
              <div className="tile-meta">
                <span className="tile-cat">{heroImages[2].category}</span>
                <span className="tile-title">{heroImages[2].title}</span>
              </div>
            </div>
          )}
          {heroImages.length === 0 && (
            <div className="hero-tile main hero-tile-empty">Loading collection…</div>
          )}
        </div>
      </section>

      {/* ---- EXPLORE / GALLERY ---- */}
      <section id="explore">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">The Gallery</span>
            <h2>Explore the Collection.</h2>
            <p>Every search brings you closer to the image you're looking for.</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="toolbar">
            <span className="muted">
              {s.meta
                ? `${s.meta.resultCount} result${s.meta.resultCount === 1 ? '' : 's'}`
                : stats
                ? `${stats.totalImages} images · ${stats.totalCategories} categories`
                : 'Loading collection…'}
            </span>
            <button className="btn-primary" onClick={() => setUploadOpen(true)}>
              + Upload Image
            </button>
          </div>
        </Reveal>

        {s.meta && <StatsBar data={s.meta} />}

        {s.loading && (
          <>
            <p className="loading">Searching the sorted index…</p>
            <SkeletonGrid />
          </>
        )}

        {!s.loading && s.error && (
          <div className="error-state">
            <div className="empty-icon">⚠</div>
            <h3>Something went wrong</h3>
            <p>{s.error}</p>
          </div>
        )}

        {!s.loading && !s.error && s.results.length === 0 && (
          <div className="empty">
            <div className="empty-icon">◌</div>
            <h3>No matches found</h3>
            <p>Try a shorter prefix like <code>lio</code> or <code>mou</code>, or clear the category filter.</p>
          </div>
        )}

        {!s.loading && !s.error && s.results.length > 0 && (
          <section className="grid">
            {s.results.map((img, i) => (
              <Reveal key={img.id} delay={Math.min(i * 40, 360)}>
                <ImageCard image={img} onClick={setOpenImage} />
              </Reveal>
            ))}
          </section>
        )}
      </section>

      {/* ---- CATEGORIES ANCHOR ---- */}
      <section id="categories" style={{ marginTop: '40px' }}>
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Filter</span>
            <h2>Categories.</h2>
            <p>Narrow down the collection by topic.</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <Filters
            categories={categories}
            category={s.category}
            onCategory={s.setCategory}
            sort={s.sort}
            onSort={s.setSort}
            compare={s.compare}
            onCompare={s.setCompare}
          />
        </Reveal>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <HowItWorks />

      {/* ---- STATS ---- */}
      {stats && (
        <section className="stats-section" aria-label="Project statistics">
          <div className="stat-block">
            <div className="num"><AnimatedNumber value={stats.totalImages} /></div>
            <div className="label">Total Images</div>
          </div>
          <div className="stat-block">
            <div className="num"><AnimatedNumber value={stats.totalCategories} /></div>
            <div className="label">Categories</div>
          </div>
          <div className="stat-block">
            <div className="num">
              {s.meta ? <AnimatedNumber value={s.meta.resultCount} /> : <AnimatedNumber value={s.results.length} />}
            </div>
            <div className="label">Search Results</div>
          </div>
          <div className="stat-block">
            <div className="num">
              {s.meta ? (
                <>
                  <AnimatedNumber value={s.meta.comparisonCount} />
                  <span className="accent"> · </span>
                  {s.meta.searchTimeMs}
                  <span className="accent">ms</span>
                </>
              ) : (
                <>—</>
              )}
            </div>
            <div className="label">Comparisons · Search Time</div>
          </div>
        </section>
      )}

      {openImage && <ImageModal image={openImage} onClose={() => setOpenImage(null)} />}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={() => { s.loadAll(); refreshStats(); }}
      />
    </main>
  );
}