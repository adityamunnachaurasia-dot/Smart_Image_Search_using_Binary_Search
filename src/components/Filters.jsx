export default function Filters({
  categories,
  category, onCategory,
  sort, onSort,
  compare, onCompare,
}) {
  return (
    <div className="filters" id="categories">
      <div className="filter-group">
        <label htmlFor="f-category">Category</label>
        <select
          id="f-category"
          value={category}
          onChange={(e) => onCategory(e.target.value)}
        >
          <option value="">All Images</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="f-sort">Sort by</label>
        <select
          id="f-sort"
          value={sort}
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="title_asc">Title A → Z</option>
          <option value="title_desc">Title Z → A</option>
          <option value="date_desc">Newest first</option>
          <option value="date_asc">Oldest first</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="checkbox" htmlFor="f-compare">
          <input
            id="f-compare"
            type="checkbox"
            checked={compare}
            onChange={(e) => onCompare(e.target.checked)}
          />
          Compare with Linear Search
        </label>
      </div>
    </div>
  );
}