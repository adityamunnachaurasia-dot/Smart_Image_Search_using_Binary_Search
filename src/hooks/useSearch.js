import { useCallback, useEffect, useState } from 'react';
import { searchImages, listImages } from '../services/api.js';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('title_asc');
  const [compare, setCompare] = useState(false);
  const [results, setResults] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await listImages({ sort, category: category || undefined, pageSize: 100 });
      setResults(data.items);
      setMeta(null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [category, sort]);

  const runSearch = useCallback(async (q) => {
    setQuery(q);
    if (!q.trim()) return loadAll();
    setLoading(true); setError(null);
    try {
      const data = await searchImages({ q, category: category || undefined, sort, compare: compare ? 1 : 0 });
      setResults(data.results);
      setMeta(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [category, sort, compare, loadAll]);

  const clear = useCallback(() => { setQuery(''); loadAll(); }, [loadAll]);

  useEffect(() => { loadAll(); /* eslint-disable-next-line */ }, [category, sort]);

  return {
    query, setQuery, category, setCategory, sort, setSort, compare, setCompare,
    results, meta, loading, error, runSearch, loadAll, clear,
  };
}