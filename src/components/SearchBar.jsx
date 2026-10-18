import { useEffect, useState } from 'react';

export default function SearchBar({ onSearch, onClear, initial = '', suggestions = [] }) {
  const [q, setQ] = useState(initial);

  useEffect(() => { setQ(initial); }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <form className="searchbar" onSubmit={submit} role="search" id="search-anchor">
      <div className="searchbar-field">
        <span className="searchbar-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, tag, or category…"
          aria-label="Search images"
          autoComplete="off"
        />
        {q && (
          <button
            type="button"
            className="btn-clear"
            onClick={() => { setQ(''); onClear(); }}
            aria-label="Clear search"
            title="Clear"
          >×</button>
        )}
      </div>
      <button type="submit" className="btn-primary">Search</button>

      {suggestions.length > 0 && (
        <div className="suggestions" aria-label="Popular searches">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="chip"
              onClick={() => { setQ(s); onSearch(s); }}
            >{s}</button>
          ))}
        </div>
      )}
    </form>
  );
}